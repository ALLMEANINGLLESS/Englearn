'use strict';

const scheduleInput = (() => {
  const dayMinutes = 1440;
  const number = '[0-9零〇一二两三四五六七八九十百]+';
  const part = '凌晨|早上|早晨|上午|中午|下午|傍晚|晚上|夜里|夜间';
  const time = '(?:(' + part + ')\\s*)?(?:([0-9]{1,2}):([0-9]{2})|(' + number + ')(?:点(?:钟)?|时)(半|一刻|三刻|' + number + '分?)?)(?:\\s*(am|pm))?';
  const date = '\\b[0-9]{4}-[0-9]{2}-[0-9]{2}\\b|(?:(?:20[0-9]{2})年\\s*)?' + number + '月\\s*' + number + '(?:日|号)|大后天|后天|明天|今天|昨天|(?:(下|本|这)\\s*)?(?:周|星期|礼拜)[一二三四五六日天1-7]|\\b(?:today|tomorrow|yesterday)\\b';
  const span = '半个?小时|' + number + '\\s*(?:个?半小时|个?小时(?:\\s*' + number + '\\s*分钟)?|分钟|mins?\\b|minutes?\\b|hours?\\b)';
  const rangeJoin = /^\s*(?:到|至|[-~—–]|to)\s*$/i;

  function numeral(value) {
    if (/^\d+$/.test(value)) return Number(value);
    const digits = {零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9};
    let amount = 0;
    let digit = 0;
    for (const char of value) {
      if (char === '十' || char === '百') {
        amount += (digit || 1) * (char === '十' ? 10 : 100);
        digit = 0;
      } else {
        digit = digits[char] ?? Number(char);
      }
    }
    return amount + digit;
  }

  function matches(pattern, text) {
    return [...text.matchAll(new RegExp(pattern, 'giu'))];
  }

  function offsetDay(key, days) {
    const date = new Date(key + 'T00:00:00Z');
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function validDay(value) {
    if (typeof value !== 'string' || !/^(?:19[0-9]{2}|[2-9][0-9]{3})-[0-9]{2}-[0-9]{2}$/.test(value)) return false;
    try {
      return offsetDay(value, 0) === value;
    } catch {
      return false;
    }
  }

  function readDate(value, today) {
    if (/^\d{4}-/.test(value)) return validDay(value) ? value : null;
    const days = {昨天: -1, 今天: 0, 明天: 1, 后天: 2, 大后天: 3, today: 0, tomorrow: 1, yesterday: -1};
    if (Object.hasOwn(days, value.toLowerCase())) return offsetDay(today, days[value.toLowerCase()]);
    const week = /^(下|本|这)?\s*(?:周|星期|礼拜)([一二三四五六日天1-7])$/.exec(value);
    if (week) {
      const on = /[日天]/.test(week[2]) ? 6 : numeral(week[2]) - 1;
      const from = (new Date(today + 'T00:00:00Z').getUTCDay() + 6) % 7;
      const offset = on - from;
      return offsetDay(today, offset + (week[1] === '下' || (!week[1] && offset < 0) ? 7 : 0));
    }
    const pieces = new RegExp('^(?:(20[0-9]{2})年\\s*)?(' + number + ')月\\s*(' + number + ')(?:日|号)$').exec(value);
    if (!pieces) return null;
    const [, year, month, day] = pieces;
    const monthDay = '-' + String(numeral(month)).padStart(2, '0') + '-' + String(numeral(day)).padStart(2, '0');
    const sameYear = Number(today.slice(0, 4)) + monthDay;
    const result = year ? year + monthDay : sameYear < today ? String(Number(today.slice(0, 4)) + 1) + monthDay : sameYear;
    return validDay(result) ? result : null;
  }

  function timeValue(match, inheritedPart = '') {
    const [, period, arabicHour, arabicMinute, otherHour, otherMinute, meridiem] = match;
    let hour = arabicHour !== undefined ? Number(arabicHour) : numeral(otherHour);
    const shortMinutes = {半: 30, 一刻: 15, 三刻: 45};
    const minute = arabicMinute !== undefined ? Number(arabicMinute) : otherMinute ? (shortMinutes[otherMinute] ?? numeral(otherMinute.replace(/分$/, ''))) : 0;
    const qualifier = meridiem?.toLowerCase() || period || inheritedPart;
    if (/^(?:下午|傍晚|晚上|夜里|夜间|pm)$/.test(qualifier) && hour < 12) hour += 12;
    if (qualifier === '中午' && hour < 6) hour += 12;
    if (/^(?:凌晨|am)$/.test(qualifier) && hour === 12) hour = 0;
    return hour <= 24 && minute < 60 && hour * 60 + minute <= dayMinutes ? hour * 60 + minute : NaN;
  }

  function duration(value) {
    if (!value) return 60;
    if (/^半/.test(value)) return 30;
    const [quantity, extra] = matches(number, value).map(match => numeral(match[0]));
    if (/小时|hours?/i.test(value)) return quantity * 60 + (/半/.test(value) ? 30 : extra || 0);
    return quantity;
  }

  function clauses(text) {
    return text.normalize('NFKC')
      .split(/[\n,，;；。!?！？、]+|(?:然后|接着|另外|随后|再(?:安排|做|练|写|学|用)|\band then\b)/gi)
      .flatMap(chunk => {
        const times = matches(time, chunk);
        const dates = matches(date, chunk);
        const cuts = new Set([0, chunk.length]);
        for (let i = 1; i < dates.length; i += 1) cuts.add(dates[i].index);
        for (let i = 1; i < times.length; i += 1) {
          const previousEnd = times[i - 1].index + times[i - 1][0].length;
          if (rangeJoin.test(chunk.slice(previousEnd, times[i].index))) continue;
          const followingDate = dates.find(item => item.index >= previousEnd && item.index < times[i].index);
          cuts.add(followingDate?.index ?? times[i].index);
        }
        const indexes = [...cuts].sort((a, b) => a - b);
        return indexes.slice(0, -1).map((start, i) => chunk.slice(start, indexes[i + 1]).trim());
      })
      .filter(Boolean);
  }

  function categoryFor(title, view) {
    let exam = view;
    if (/托福|toefl/i.test(title)) exam = 'toefl';
    else if (/雅思|ielts/i.test(title)) exam = 'ielts';
    else if (/\bgmat\b|数据洞察|\bdata insights\b/i.test(title)) exam = 'gmat';
    else if (/\bgre\b/i.test(title)) exam = 'gre';
    if (exam === 'toefl' || exam === 'ielts') {
      const skills = [
        [/听力|精听|listening/i, 'listening', 'ieltsListening'],
        [/阅读|精读|reading/i, 'reading', 'ieltsReading'],
        [/口语|跟读|speaking/i, 'speaking', 'ieltsSpeaking'],
        [/写作|作文|essay|writing/i, 'writing', 'ieltsWriting']
      ];
      const found = skills.find(([pattern]) => pattern.test(title));
      return found ? found[exam === 'ielts' ? 2 : 1] : 'other';
    }
    if (exam === 'gmat' && /数据|data insights/i.test(title)) return 'gmatData';
    if (exam === 'gre' || exam === 'gmat') {
      if (/数学|定量|\bquant\b/i.test(title)) return exam === 'gmat' ? 'gmatQuant' : 'quant';
      if (/语文|语文推理|阅读|填空|背词|单词|词汇|verbal/i.test(title)) return exam === 'gmat' ? 'gmatVerbal' : 'verbal';
      if (exam === 'gre' && /写作|作文|\bawa\b|issue/i.test(title)) return 'greWriting';
    }
    return 'other';
  }

  function availableStart(day, length, partStart, tasks, context) {
    const booked = [...context.tasksFor(day), ...tasks.filter(task => task.date === day)].sort((a, b) => a.start - b.start);
    const now = day === context.today ? Math.ceil(context.now / 15) * 15 : 0;
    const from = Math.min(dayMinutes - length, Math.max(partStart, now));
    let cursor = from;
    for (const slot of booked) {
      if (slot.end <= cursor) continue;
      if (slot.start >= cursor + length) break;
      cursor = Math.ceil(slot.end / 15) * 15;
    }
    return cursor <= dayMinutes - length ? cursor : from;
  }

  function readExplicitClock(value) {
    if (typeof value !== 'string' || !/^(?:[01]\d|2[0-4]):[0-5]\d$/.test(value)) return NaN;
    const [hour, minute] = value.split(':').map(Number);
    const total = hour * 60 + minute;
    return total <= dayMinutes ? total : NaN;
  }

  function parse(text, context) {
    const drafts = [];
    let day = context.defaultDate;
    let hasDate = false;
    let period = '';
    for (const clause of clauses(text).slice(0, 28)) {
      const [dateMatch] = matches(date, clause);
      const notices = [];
      if (dateMatch) {
        const parsed = readDate(dateMatch[0], context.today);
        if (parsed !== day) period = '';
        hasDate = Boolean(parsed);
        day = parsed ?? context.defaultDate;
        if (!parsed) notices.push('日期待核对');
      }
      const [first, second] = matches(time, clause);
      const [lengthMatch] = matches(span, clause);
      const partMatch = clause.match(new RegExp(part));
      const actualRange = first && second && rangeJoin.test(clause.slice(first.index + first[0].length, second.index));
      const removal = [dateMatch, first, lengthMatch, !first && partMatch].filter(Boolean);
      if (actualRange) removal.push({ index: first.index, 0: clause.slice(first.index, second.index + second[0].length) });
      const holes = Array.from({length: clause.length}, () => false);
      for (const item of removal) holes.fill(true, item.index, item.index + item[0].length);
      const name = clause.split('').filter((_, i) => !holes[i]).join('').trim()
        .replace(/^(?:(?:请|帮我|给我|明后两天|我想|我要|我准备|安排|每天|每日|每周|用|花|从|先|再|做完后|和|并且)\s*)+/, '')
        .replace(/(?:开始|结束|开始做|安排|从|用|花|再|先|到|至|\s|的)+$/, '').trim();
      if (!name || /^(?:在|钟|做|练|写|学)$/.test(name)) continue;
      const title = name.slice(0, 120);
      const rawLength = duration(lengthMatch?.[0]);
      const length = Number.isFinite(rawLength) ? Math.max(15, Math.min(dayMinutes, rawLength)) : 60;
      const nextPeriod = first?.[1] || first?.[6] || partMatch?.[0] || period;
      let start = first ? timeValue(first, first[2] === undefined ? nextPeriod : '') : NaN;
      let end = actualRange ? timeValue(second, nextPeriod) : NaN;
      if (!Number.isFinite(start) || start >= dayMinutes) {
        const periods = {凌晨: 60, 早上: 480, 上午: 540, 早晨: 480, 中午: 720, 下午: 840, 傍晚: 1080, 晚上: 1140};
        start = availableStart(day, length, periods[partMatch?.[0]] ?? 540, drafts, context);
        notices.push('建议时段');
      }
      if (!Number.isFinite(end) || end <= start) {
        end = Math.min(dayMinutes, start + length);
        if (actualRange) notices.push('结束时间待核对');
        else if (!lengthMatch) notices.push('默认 1 小时');
      }
      if (!hasDate) notices.push('采用当前日历日期');
      if (/每天|每日|每周|every day/i.test(clause)) notices.push('本次仅加入这一日期');
      drafts.push({ name: title, date: day, start, end, category: categoryFor(title, context.view), note: notices.join(' · ') });
      period = nextPeriod;
    }
    return drafts.slice(0, 20);
  }

  async function fromModel(text, context, categoryNames, signal) {
    const engine = globalThis.LanguageModel;
    if (!engine) return null;
    const language = /\p{Script=Han}/u.test(text) ? 'zh' : 'en';
    const options = { expectedInputs: [{type: 'text', languages: [language]}], expectedOutputs: [{type: 'text', languages: [language]}] };
    let session;
    try {
      if (await engine.availability(options) !== 'available' || signal.aborted) return null;
      session = await engine.create({ ...options, signal });
      const schema = {
        type: 'object',
        properties: { tasks: { type: 'array', items: {
          type: 'object',
          properties: {
            name: {type: 'string'}, date: {type: 'string'}, start: {type: 'string'}, end: {type: 'string'}, category: {type: 'string'}
          },
          required: ['name', 'date', 'start', 'end', 'category']
        } } },
        required: ['tasks']
      };
      const prompt = [
        'Extract a concise list of study calendar tasks from the text below, keeping the original language and user-specified times.',
        'Time zone is Asia/Shanghai. Today is ' + context.today + ' and the calendar is showing ' + context.defaultDate + '.',
        'Use ISO dates and HH:MM (24-hour). Infer relative dates. If no date is given use the calendar date. An explicit duration should be converted to an end time.',
        'Only return tasks actually mentioned. If you cannot determine a clock time, leave it empty. No recurring events.',
        'Categories: ' + JSON.stringify(categoryNames),
        'Source text: ' + JSON.stringify(text)
      ].join('\n');
      const result = await session.prompt(prompt, {responseConstraint: schema, signal});
      const data = JSON.parse(result);
      const tasks = data.tasks?.slice(0, 20).map(task => ({
        name: typeof task.name === 'string' ? task.name.trim().slice(0, 120) : '',
        date: task.date, start: readExplicitClock(task.start), end: readExplicitClock(task.end),
        category: Object.hasOwn(categoryNames, task.category) ? task.category : 'other', note: '请核对识别结果'
      }));
      return tasks?.length && tasks.every(task => task.name && validDay(task.date) && task.end > task.start) ? tasks : null;
    } catch {
      return null;
    } finally {
      session?.destroy?.();
    }
  }

  return { parse, fromModel, validDay };
})();
