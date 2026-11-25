'use strict';

(() => {
  const dialog = byId('voice-dialog');
  const form = byId('voice-form');
  const text = byId('voice-text');
  const status = byId('voice-status');
  const output = byId('voice-rows');
  const preview = byId('voice-preview');
  const apply = byId('voice-save');
  const parseButton = byId('voice-parse');
  const record = byId('voice-record');
  const recordLabel = byId('voice-record-label');
  const Speech = globalThis.SpeechRecognition ?? globalThis.webkitSpeechRecognition;
  const categoryNames = Object.fromEntries(Object.entries(categories).map(([key, category]) => {
    const exam = exams[examBySubject.get(key)];
    return [key, (exam ? exam.title + ' ' : '') + category.label];
  }));
  const alternate = '可把整段话直接输入文字。';
  let recorder = null;
  let pending = null;
  let draftNotice = new Map();

  function localTasks(day) {
    return activeProfile().days[day]?.tasks ?? [];
  }

  function context() {
    return {
      today: todayKey(),
      now: Math.floor(secondsInBeijing() / 60),
      defaultDate: selected,
      view: examView,
      tasksFor: localTasks
    };
  }

  function setPreviewVisible() {
    preview.hidden = apply.hidden = !output.children.length;
  }

  function editor(name, type, value, maxLength) {
    const input = document.createElement('input');
    input.type = type;
    input.value = value;
    if (maxLength) input.maxLength = maxLength;
    input.setAttribute('aria-label', name);
    return input;
  }

  function readDraft(card) {
    return {
      name: card.querySelector('.voice-name').value.trim(),
      date: card.querySelector('.voice-date').value,
      start: parseClock(card.querySelector('.voice-start').value),
      end: parseClock(card.querySelector('.voice-end').value),
      category: card.querySelector('select').value
    };
  }

  function isValid(task) {
    return task.name && scheduleInput.validDay(task.date) && task.start >= 0 && task.end > task.start;
  }

  function conflict(task, other) {
    return task.start < other.end && other.start < task.end;
  }

  function same(task, other) {
    return task.start === other.start && task.end === other.end && task.category === other.category &&
      task.name.replace(/\s+/g, '').toLocaleLowerCase() === other.name.replace(/\s+/g, '').toLocaleLowerCase();
  }

  function evaluatePreview() {
    const cards = [...output.children];
    const tasks = cards.map(readDraft);
    for (const [index, task] of tasks.entries()) {
      const hints = [draftNotice.get(cards[index])];
      if (isValid(task)) {
        const existing = localTasks(task.date).filter(item => !item.demo);
        const otherDrafts = tasks.filter((item, i) => i !== index && item.date === task.date);
        if (existing.some(item => same(task, item))) hints.push('已有同样任务，保存时跳过');
        else if ([...existing, ...otherDrafts].some(item => conflict(task, item))) hints.push('与另一项日程时间重叠');
      }
      cards[index].querySelector('.voice-row-note').textContent = hints.filter(Boolean).join(' · ');
    }
  }

  function renderDrafts(tasks) {
    draftNotice = new Map();
    const fragment = new DocumentFragment();
    for (const task of tasks) {
      const card = document.createElement('div');
      card.className = 'voice-row';
      card.innerHTML = '<div class="voice-row-top"></div><div class="voice-row-grid"></div><p class="voice-row-note"></p>';
      const name = editor('任务名称', 'text', task.name, 120);
      name.className = 'voice-name';
      const date = editor('任务日期', 'date', task.date);
      date.className = 'voice-date';
      const start = editor('任务开始时间', 'text', clock(task.start), 5);
      start.className = 'voice-start';
      const end = editor('任务结束时间', 'text', clock(task.end), 5);
      end.className = 'voice-end';
      const category = document.createElement('select');
      category.setAttribute('aria-label', '任务科目');
      category.append(...Object.entries(categoryNames).map(([key, caption]) => new Option(caption, key)));
      category.value = task.category;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'icon-button';
      remove.innerHTML = svg('close');
      remove.setAttribute('aria-label', '移除这条预览');
      remove.addEventListener('click', () => {
        card.remove();
        draftNotice.delete(card);
        evaluatePreview();
        setPreviewVisible();
      });
      card.querySelector('.voice-row-top').append(name, remove);
      const times = document.createElement('div');
      times.className = 'voice-row-times';
      for (const [caption, input] of [['开始', start], ['结束', end]]) {
        const label = document.createElement('label');
        label.append(caption, input);
        times.append(label);
      }
      card.querySelector('.voice-row-grid').append(date, category, times);
      draftNotice.set(card, task.note);
      fragment.append(card);
    }
    output.replaceChildren(fragment);
    evaluatePreview();
    setPreviewVisible();
  }

  function setRecording(on) {
    record.setAttribute('aria-pressed', String(on));
    recordLabel.textContent = on ? '停止说话' : '开始说话';
    parseButton.disabled = on;
    text.readOnly = on;
  }

  async function makeDrafts() {
    const source = text.value.trim();
    if (!source) {
      status.textContent = '请先说一段安排，或在输入框里写下来。';
      return;
    }
    const input = context();
    const request = new AbortController();
    pending?.abort();
    pending = request;
    parseButton.disabled = true;
    renderDrafts([]);
    status.textContent = '正在识别日期、时段和任务。';
    const timeout = setTimeout(() => request.abort(), 8000);
    let model = null;
    try {
      const stopped = new Promise(resolve => request.signal.addEventListener('abort', () => resolve(null), {once: true}));
      model = await Promise.race([scheduleInput.fromModel(source, input, categoryNames, request.signal), stopped]);
    } finally {
      clearTimeout(timeout);
    }
    if (pending !== request || !dialog.open) return;
    pending = null;
    parseButton.disabled = false;
    if (source !== text.value.trim()) {
      status.textContent = '文字已修改，请重新解析。';
      return;
    }
    const tasks = model ?? scheduleInput.parse(source, input);
    renderDrafts(tasks);
    status.textContent = tasks.length
      ? (model ? '设备端 AI 已识别 ' : '已识别 ') + tasks.length + ' 项。请核对日期、时间和科目。'
      : '没有识别到任务。可以试着补充日期、时间和要做的事。';
  }

  function startRecording() {
    if (recorder) {
      try {
        recorder.stop();
      } catch {
        recorder.abort();
      }
      return;
    }
    if (!Speech) return;
    const original = text.value.trim();
    let session;
    try {
      session = new Speech();
    } catch {
      status.textContent = '语音识别无法启动。' + alternate;
      return;
    }
    recorder = session;
    session.lang = 'zh-CN';
    session.continuous = true;
    session.interimResults = true;
    let final = '';
    let failed = false;
    setRecording(true);
    renderDrafts([]);
    status.textContent = '正在听。说完后点「停止说话」。';
    session.onresult = event => {
      final = '';
      let live = '';
      for (let i = 0; i < event.results.length; i += 1) {
        const item = event.results[i];
        if (item.isFinal) final += item[0].transcript + '。';
        else live += item[0].transcript;
      }
      text.value = [original, final + live].filter(Boolean).join('。').slice(0, 3500);
    };
    session.onerror = event => {
      failed = true;
      const messages = {
        'not-allowed': '浏览器没有麦克风权限。',
        'service-not-allowed': '浏览器语音服务当前不可用。',
        'audio-capture': '没有找到可用的麦克风。',
        'no-speech': '这次没有听到内容。',
        'network': '浏览器语音服务连接失败。',
        'language-not-supported': '浏览器暂不支持中文语音识别。'
      };
      if (dialog.open) status.textContent = (messages[event.error] ?? '语音识别中断。') + alternate;
    };
    session.onend = () => {
      if (recorder !== session) return;
      recorder = null;
      setRecording(false);
      if (dialog.open && final && !failed) makeDrafts();
    };
    try {
      session.start();
    } catch {
      recorder = null;
      setRecording(false);
      status.textContent = '语音识别无法启动。' + alternate;
    }
  }

  function saveDrafts() {
    const tasks = [...output.children].map(readDraft);
    if (!tasks.length) return;
    if (!tasks.every(isValid)) {
      status.textContent = '请填写有效的任务名称和日期，时间用 HH:MM，结束须晚于开始。';
      return;
    }
    const entered = [];
    const saved = save((_, profile) => {
      for (const {date, ...task} of tasks) {
        const day = profile.days[date] ??= {tasks: [], outcome: '', next: ''};
        if (day.tasks.some(item => !item.demo && same(task, item))) continue;
        day.tasks.push({...task, id: uid(), done: false, demo: false, note: ''});
        entered.push(date);
      }
    });
    if (!saved) {
      status.textContent = '浏览器没有写入记录，任务仍保留在当前页面。';
      return;
    }
    if (!entered.length) {
      status.textContent = '这些任务已在日历中。';
      return;
    }
    dialog.close();
    categoryFilter = 'all';
    if (examView !== 'all' && tasks.some(task => !taskInView(task))) {
      examView = 'all';
      history.replaceState(null, '', '#all');
      renderViewControls();
    }
    selectDay([...entered].sort()[0]);
    const skipped = tasks.length - entered.length;
    notify('已加入 ' + entered.length + ' 项日程' + (skipped ? '，跳过 ' + skipped + ' 项重复' : ''));
  }

  byId('voice-open').addEventListener('click', () => {
    if (!dialog.open) dialog.showModal();
  });
  record.disabled = !Speech;
  if (!Speech) status.textContent = '当前浏览器不提供语音转写。' + alternate;
  record.addEventListener('click', startRecording);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!recorder) makeDrafts();
  });
  apply.addEventListener('click', saveDrafts);
  text.addEventListener('input', () => {
    if (!output.children.length) return;
    renderDrafts([]);
    status.textContent = '文字已修改，请重新解析。';
  });
  output.addEventListener('input', event => {
    draftNotice.delete(event.target.closest('.voice-row'));
    evaluatePreview();
  });
  dialog.addEventListener('close', () => {
    const activeRecorder = recorder;
    recorder = null;
    activeRecorder?.abort();
    pending?.abort();
    pending = null;
    setRecording(false);
    text.value = '';
    renderDrafts([]);
    status.textContent = Speech ? '' : '当前浏览器不提供语音转写。' + alternate;
  });
})();
