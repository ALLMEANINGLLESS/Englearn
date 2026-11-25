'use strict';

const icons = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  hourglass: '<path d="M6 3h12M6 21h12M7 3v3a5 5 0 0 0 2 4l3 2-3 2a5 5 0 0 0-2 4v3m10-18v3a5 5 0 0 1-2 4l-3 2 3 2a5 5 0 0 1 2 4v3"/>',
  settings: '<path d="m13 6 5 5m-7 8-6 1 1-6L16.5 3.5a2.1 2.1 0 0 1 3 3Z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  book: '<path d="M12 6v15M3 4c4 0 6 .5 9 2 3-1.5 5-2 9-2v15c-4 0-6 .5-9 2-3-1.5-5-2-9-2Z"/>',
  headphones: '<path d="M3 14v-2a9 9 0 0 1 18 0v2M3 13h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3Zm18 0h-2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2Z"/>',
  microphone: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-3 0h6"/>',
  write: '<path d="M12 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M10 14l1-4 7-7a2 2 0 0 1 3 3l-7 7-4 1Z"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M9 11h.01M15 11h.01M9 15h.01M15 15h.01M9 18h.01M15 18h.01"/>',
  box: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 12h6"/>',
  chart: '<path d="M4 4v15a1 1 0 0 0 1 1h15M9 15v-3m5 3V8m5 7V5"/>',
  notebook: '<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M3 7h4m-4 5h4m-4 5h4m4-9h5m-5 4h5"/>',
  sliders: '<path d="M3 6h6m4 0h8M3 12h12m4 0h2M3 18h3m4 0h11"/><circle cx="11" cy="6" r="2"/><circle cx="17" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>'
};
const categories = {
  reading: { label: '阅读', english: 'Reading', icon: 'book', palette: ['#eeedff', '#4736a1', '#7865e5', '#ded8ff'] },
  listening: { label: '听力', english: 'Listening', icon: 'headphones', palette: ['#e5f7f2', '#176454', '#36a792', '#c0ebdf'] },
  speaking: { label: '口语', english: 'Speaking', icon: 'microphone', palette: ['#fcecff', '#813c96', '#bb6dca', '#f0d3f5'] },
  writing: { label: '写作', english: 'Writing', icon: 'write', palette: ['#fff2df', '#824a16', '#e5a04d', '#f5dfb9'] },
  verbal: { label: 'Verbal', english: '语文推理', icon: 'book', palette: ['#e9f2ff', '#254e96', '#659af1', '#cedfff'] },
  quant: { label: 'Quant', english: '数量推理', icon: 'calculator', palette: ['#e4f7fa', '#17616d', '#42a9b8', '#c0eaf1'] },
  greWriting: { label: '分析性写作', english: 'AWA', icon: 'write', palette: ['#ffede9', '#8b493a', '#e48b77', '#f6d8ce'] },
  ieltsListening: { label: '听力', english: 'Listening', icon: 'headphones', palette: ['#e5f8f5', '#20695c', '#35a896', '#bfeadf'] },
  ieltsReading: { label: '阅读', english: 'Reading', icon: 'book', palette: ['#eaf2ff', '#305a9e', '#608be1', '#cbdcff'] },
  ieltsWriting: { label: '写作', english: 'Writing', icon: 'write', palette: ['#fff1e8', '#914f2b', '#e29665', '#f4dac9'] },
  ieltsSpeaking: { label: '口语', english: 'Speaking', icon: 'microphone', palette: ['#fbeafa', '#883b84', '#c470bd', '#f1d2ef'] },
  gmatQuant: { label: 'Quant', english: '数量推理', icon: 'calculator', palette: ['#eaf3fe', '#295d91', '#5799d8', '#cde3f9'] },
  gmatVerbal: { label: 'Verbal', english: '语言推理', icon: 'book', palette: ['#f1ebff', '#623c9c', '#9c70e1', '#e4d4fa'] },
  gmatData: { label: 'Data Insights', english: '数据洞察', icon: 'chart', palette: ['#e4f6ef', '#21654f', '#45a889', '#c4e9da'] },
  other: { label: '其他', english: '', icon: 'box', palette: ['#eef2fa', '#455673', '#8395b5', '#dee5f0'] }
};
const exams = {
  toefl: { title: 'TOEFL', goal: '托福考试', property: 'deadline', example: '听力讲座精听', subjects: ['reading', 'listening', 'speaking', 'writing'] },
  gre: { title: 'GRE', goal: 'GRE 考试', property: 'greDeadline', example: 'Verbal 填空练习', subjects: ['verbal', 'quant', 'greWriting'] },
  ielts: { title: 'IELTS', goal: '雅思考试', property: 'ieltsDeadline', example: '剑桥雅思听力练习', subjects: ['ieltsListening', 'ieltsReading', 'ieltsWriting', 'ieltsSpeaking'] },
  gmat: { title: 'GMAT', goal: 'GMAT 考试', property: 'gmatDeadline', example: 'Data Insights 图表题', subjects: ['gmatQuant', 'gmatVerbal', 'gmatData'] }
};
const examKeys = Object.keys(exams);
const examBySubject = new Map(examKeys.flatMap(key => exams[key].subjects.map(subject => [subject, key])));
const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const DAY_MINUTES = 1440;
const DAY_MS = 86400000;
const STEP = 15;
const daySeconds = DAY_MINUTES * 60;
const climbSegments = 12;
const svgNamespace = 'http://www.w3.org/2000/svg';
const storageKey = 'dayloom-planner-v1';
const plannerDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit'
});
const plannerClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
});
const byId = id => document.getElementById(id);
const timeline = byId('timeline-scroll');
const track = byId('task-track');
const eventLayer = byId('events');
const timeRange = byId('time-range');
const taskDialog = byId('task-dialog');
const deadlineDialog = byId('deadline-dialog');
const profileDialog = byId('profile-dialog');

function svg(name) {
  return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + icons[name] + '</svg>';
}

function dateKey(date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function fromKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d, 12);
}

function dayNumber(key) {
  const [y, m, d] = key.split('-').map(Number);
  return Date.UTC(y, m - 1, d) / DAY_MS;
}

function dateLabel(key, includeYear = false) {
  const date = fromKey(key);
  const year = includeYear ? date.getFullYear() + '年' : '';
  return year + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}

function todayKey(date = new Date()) {
  const fields = Object.fromEntries(plannerDate.formatToParts(date).map(({ type, value }) => [type, value]));
  return [fields.year, fields.month, fields.day].join('-');
}

function clock(minutes) {
  return String(Math.floor(minutes / 60)).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
}

function parseClock(value) {
  const match = /^(\d{1,2}):([0-5]\d)$/.exec(value.trim());
  if (!match) return NaN;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours * 60 + minutes <= DAY_MINUTES ? hours * 60 + minutes : NaN;
}

function durationText(minutes) {
  if (minutes < 60) return minutes + ' 分钟';
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours + ' 小时' + (rest ? ' ' + rest + ' 分' : '');
}

function uid() {
  return globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
}

function starterState() {
  const tasks = [
    ['学术阅读限时练习', 'reading', 480, 540, true],
    ['听力讲座精听', 'listening', 555, 615, false],
    ['口语采访题与录音复盘', 'speaking', 630, 690, false],
    ['学术讨论写作', 'writing', 720, 780, false]
  ].map(([name, category, start, end, done]) => ({ id: uid(), name, category, start, end, done, note: '', demo: true }));
  return {
    active: 'default',
    profiles: [{ id: 'default', name: '我的计划', deadline: null, days: { [todayKey()]: { tasks, outcome: '', next: '' } } }]
  };
}

function readState() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.profiles?.length && parsed.profiles.some(profile => profile.id === parsed.active)) return parsed;
    }
  } catch {
    // The page stays usable for this session if browser storage is disabled.
  }
  return null;
}

let state = readState() ?? starterState();
let storageWriteFailed = false;
let selected = todayKey();
let month = fromKey(selected);
let categoryFilter = 'all';
let examView = viewFromUrl();
let editingTask = null;
let toastTimer;
let drag = null;
let skipTaskClickUntil = 0;
let scrollFrame;
let rangeTarget = null;
const overviewItems = new Map();
let lastToday = todayKey();
let lastLiveMinute = -1;
let trailLength = 0;
let trailTicks = [];

function activeProfile() {
  return state.profiles.find(profile => profile.id === state.active);
}

function dayFor(profile, create = false) {
  const days = profile.days;
  if (create && !days[selected]) days[selected] = { tasks: [], outcome: '', next: '' };
  return days[selected] ?? { tasks: [], outcome: '', next: '' };
}

function activeDay() {
  return dayFor(activeProfile());
}

function save(change) {
  const active = state.active;
  const latest = storageWriteFailed ? state : readState() ?? state;
  change?.(latest, latest.profiles.find(profile => profile.id === active));
  let ok = false;
  try {
    localStorage.setItem(storageKey, JSON.stringify(latest));
    ok = true;
  } catch {
    // Surface storage failures so changes are not mistaken for saved records.
  }
  storageWriteFailed = !ok;
  state = { ...latest, active };
  const status = byId('review-status');
  status.classList.toggle('failed', !ok);
  status.lastElementChild.textContent = ok ? '自动保存至本浏览器' : '浏览器存储不可用';
  if (!ok) notify('保存失败。当前浏览器无法写入本地存储。');
  return ok;
}

function notify(message) {
  const toast = byId('toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2400);
}

function applyCategory(node, key) {
  const [surface, ink, mark, line] = categories[key].palette;
  const styles = node.style;
  styles.setProperty('--category-surface', surface);
  styles.setProperty('--category-ink', ink);
  styles.setProperty('--category-mark', mark);
  styles.setProperty('--category-line', line);
}

function renderCalendar() {
  const y = month.getFullYear();
  const m = month.getMonth();
  byId('month-label').textContent = y + '年' + (m + 1) + '月';
  const first = new Date(y, m, 1, 12);
  const leading = (first.getDay() + 6) % 7;
  const today = todayKey();
  const days = activeProfile().days;
  const grid = byId('calendar-grid');
  const activeDate = grid.contains(document.activeElement) ? document.activeElement.dataset.date : null;
  const buttons = [];
  for (let i = 0; i < 42; i += 1) {
    const date = new Date(y, m, i + 1 - leading, 12);
    const key = dateKey(date);
    const day = days[key];
    const record = Boolean(day?.tasks.some(task => !task.demo) || day?.outcome.trim() || day?.next.trim());
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'calendar-day';
    button.dataset.date = key;
    button.textContent = date.getDate();
    button.classList.toggle('outside', date.getMonth() !== m);
    button.classList.toggle('selected', key === selected);
    button.classList.toggle('today', key === today);
    button.classList.toggle('record', record);
    button.setAttribute('aria-label', dateLabel(key, true) + (record ? '，已有记录' : ''));
    button.setAttribute('aria-pressed', String(key === selected));
    if (key === today) button.setAttribute('aria-current', 'date');
    buttons.push(button);
  }
  grid.replaceChildren(...buttons);
  if (activeDate) buttons.find(button => button.dataset.date === activeDate)?.focus({ preventScroll: true });
}

function viewFromUrl() {
  const key = location.hash.slice(1);
  return examKeys.includes(key) ? key : 'all';
}

function visibleExams() {
  return examView === 'all' ? examKeys : [examView];
}

function taskInView(task) {
  return examView === 'all' || task.category === 'other' || examBySubject.get(task.category) === examView;
}

function tasksInView() {
  return activeDay().tasks.filter(taskInView);
}

function subjectButton(key) {
  const category = key === 'all' ? { label: '全部任务', english: '', icon: 'layers' } : categories[key];
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'subject-button';
  button.dataset.category = key;
  const labelLanguage = /^[A-Za-z]/.test(category.label) ? 'en' : 'zh-CN';
  const hintLanguage = /^[A-Za-z]/.test(category.english) ? 'en' : 'zh-CN';
  button.innerHTML = '<span class="subject-mark">' + svg(category.icon) + '</span><span lang="' + labelLanguage + '">' + category.label + '</span><span class="english" lang="' + hintLanguage + '">' + category.english + '</span>';
  if (key !== 'all') applyCategory(button, key);
  return button;
}

function buildSubjects() {
  const groups = visibleExams().map(key => {
    const exam = exams[key];
    const items = document.createElement('div');
    items.className = 'subject-group-items';
    items.append(...exam.subjects.map(subjectButton));
    if (examView !== 'all') return items;
    const group = document.createElement('details');
    group.className = 'subject-group';
    const label = document.createElement('summary');
    label.innerHTML = svg('chevronDown') + '<span lang="en">' + exam.title + '</span>';
    group.append(label, items);
    return group;
  });
  const list = byId('subject-list');
  list.replaceChildren(subjectButton('all'), ...groups, subjectButton('other'));
}

function renderSubjects() {
  byId('subject-list').querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.category === categoryFilter));
  });
}

function renderViewControls() {
  document.querySelectorAll('[data-view]').forEach(link => {
    if (link.dataset.view === examView) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  buildSubjects();
  renderSubjects();
}

function deadlineFor(examKey) {
  return activeProfile()[exams[examKey].property];
}

function countdownExam() {
  if (examView !== 'all') return examView;
  const today = todayKey();
  const upcoming = examKeys.filter(key => deadlineFor(key)?.date >= today);
  if (upcoming.length) return upcoming.sort((a, b) => deadlineFor(a).date.localeCompare(deadlineFor(b).date))[0];
  const past = examKeys.filter(key => deadlineFor(key));
  return past.sort((a, b) => deadlineFor(b).date.localeCompare(deadlineFor(a).date))[0] ?? 'toefl';
}

function quoteForDay(day) {
  const offset = dayNumber(day) - dayNumber('2026-11-25');
  const index = ((offset % dailyQuotes.length) + dailyQuotes.length) % dailyQuotes.length;
  return dailyQuotes[index];
}

function renderDailyQuote(day) {
  const quote = quoteForDay(day);
  byId('quote').textContent = quote.text;
  byId('quote-author').textContent = quote.author;
  const source = byId('quote-source');
  source.textContent = quote.work;
  source.href = quote.source;
}

function secondsInBeijing(date = new Date()) {
  const [hours, minutes, seconds] = plannerClock.format(date).split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function svgElement(tag, attrs) {
  const element = document.createElementNS(svgNamespace, tag);
  for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
  return element;
}

function buildSky() {
  let seed = 17;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const stars = Array.from({length: 145}, (_, i) => {
    const x = Math.round(random() * 1200);
    const y = Math.round(random() * 420);
    const opacity = .18 + random() * .63;
    if (i % 19 === 0) {
      return svgElement('path', { d: 'M0 -4L1 -1 4 0 1 1 0 4 -1 1 -4 0 -1 -1Z', transform: 'translate(' + x + ' ' + y + ')', fill: '#ffebc5', opacity });
    }
    return svgElement('circle', {cx: x, cy: y, r: .45 + random() * 1.05, fill: i % 5 === 0 ? '#eecbff' : '#f2f5ff', opacity});
  });
  byId('sky-stars').replaceChildren(...stars);
}

function buildBoulderClock() {
  const hourMarks = Array.from({ length: 12 }, (_, i) => svgElement('line', {
    x1: 0, y1: i % 3 === 0 ? -38 : -37, x2: 0, y2: -35.4,
    transform: 'rotate(' + i * 30 + ' 0 -21)', class: 'boulder-face-tick'
  }));
  byId('boulder-hours').replaceChildren(...hourMarks);
  const trail = byId('trail-shape');
  trailLength = trail.getTotalLength();
  byId('trail-done').style.strokeDasharray = trailLength + ' ' + trailLength;
}

function buildTrailTicks() {
  const trail = byId('trail-shape');
  const labels = [];
  trailTicks = Array.from({ length: climbSegments + 1 }, (_, i) => {
    const { x, y } = trail.getPointAtLength(trailLength * i / climbSegments);
    const summit = i === climbSegments;
    const tick = svgElement('circle', {
      cx: x, cy: y, r: summit ? 5 : 3.6,
      class: summit ? 'trail-tick trail-end' : 'trail-tick'
    });
    if (i % 2 === 0) {
      const label = svgElement('text', {x: x + (summit ? 14 : -6), y: y + (summit ? 7 : 20), class: 'trail-label'});
      label.textContent = (summit ? '山顶 ' : '') + clock(i * DAY_MINUTES / climbSegments);
      labels.push(label);
    }
    return tick;
  });
  byId('trail-ticks').replaceChildren(...trailTicks, ...labels);
}

function applyRunnerMotionPreference() {
  const mountain = byId('climb-mountain');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = () => {
    if (preference.matches) {
      mountain.setCurrentTime?.(0);
      mountain.pauseAnimations?.();
    } else {
      mountain.unpauseAnimations?.();
    }
  };
  update();
  preference.addEventListener('change', update);
}

function liveClock(seconds) {
  return clock(Math.floor(seconds / 60)) + ':' + String(seconds % 60).padStart(2, '0');
}

function renderClimb(now = secondsInBeijing()) {
  const progress = now / daySeconds;
  const elapsedMinutes = Math.floor(now / 60);

  byId('day-elapsed').textContent = liveClock(now);
  byId('day-remaining').textContent = liveClock(daySeconds - now);
  byId('climb-progress').textContent = '正在攀登 · ' + Math.floor(elapsedMinutes / 60) + ' / 24 小时';
  byId('climb-now').textContent = '北京时间 ' + clock(elapsedMinutes);

  trailTicks.forEach((tick, i) => tick.classList.toggle('reached', i / climbSegments <= progress));
  const distance = trailLength * progress;
  const { x, y } = byId('trail-shape').getPointAtLength(distance);
  byId('trail-done').style.strokeDashoffset = trailLength - distance;
  byId('trail-boulder').setAttribute('transform', 'translate(' + x + ' ' + y + ')');
  byId('boulder-hour').setAttribute('transform', 'rotate(' + (now / 120 % 360) + ' 0 -21)');
  byId('boulder-minute').setAttribute('transform', 'rotate(' + (now / 10 % 360) + ' 0 -21)');
}

function renderHero() {
  const today = todayKey();
  byId('hero-date').textContent = dateLabel(today, true) + ' · ' + weekday[fromKey(today).getDay()];
  renderDailyQuote(today);
  const label = byId('deadline-name');
  const value = byId('countdown-value');
  const description = byId('countdown-date');
  const examKey = countdownExam();
  const deadline = deadlineFor(examKey);
  label.textContent = deadline?.name ?? (examView === 'all' ? '考试倒计时' : exams[examKey].goal + '倒计时');
  label.title = label.textContent;
  const days = deadline ? dayNumber(deadline.date) - dayNumber(today) : null;
  const amount = document.createElement('span');
  const unit = document.createElement('small');
  amount.textContent = days === null ? '—' : String(Math.abs(days));
  unit.textContent = days === null ? '天' : (days >= 0 ? '天' : '天前');
  value.replaceChildren(amount, unit);
  description.textContent = deadline ? dateLabel(deadline.date, true) + (days === 0 ? ' · 就是今天' : '') : '选择一个目标日期';
}

function avatarText(name) {
  return Array.from(name)[0]?.toUpperCase() ?? '我';
}

function renderProfile() {
  const profile = activeProfile();
  byId('avatar').textContent = avatarText(profile.name);
  byId('profile-label').textContent = profile.name;
}

function renderResults() {
  const tasks = tasksInView();
  const finished = tasks.filter(task => task.done);
  const totalDuration = tasks => tasks.reduce((total, task) => total + task.end - task.start, 0);
  byId('done-count').textContent = finished.length + ' / ' + tasks.length;
  const percent = tasks.length ? Math.round(finished.length / tasks.length * 100) : 0;
  byId('progress-fill').style.width = percent + '%';
  byId('progress').setAttribute('aria-valuenow', percent);
  byId('planned-time').textContent = durationText(totalDuration(tasks));
  byId('done-time').textContent = durationText(totalDuration(finished));
  const plannedExams = new Set(tasks.map(task => examBySubject.get(task.category)));
  const resultExams = examView === 'all' ? examKeys.filter(key => plannedExams.has(key)) : [examView];
  const groups = resultExams.map(examKey => {
    const exam = exams[examKey];
    const summary = document.createElement('section');
    summary.className = 'subject-summary';
    const title = document.createElement('h3');
    title.textContent = exam.title + ' · 已完成';
    const list = document.createElement('div');
    list.className = 'subject-result-list';
    for (const key of exam.subjects) {
      const row = document.createElement('div');
      row.className = 'subject-result';
      applyCategory(row, key);
      const dot = document.createElement('i');
      const label = document.createElement('span');
      label.textContent = categories[key].label;
      const value = document.createElement('strong');
      value.textContent = durationText(totalDuration(finished.filter(task => task.category === key)));
      row.append(dot, label, value);
      list.append(row);
    }
    summary.append(title, list);
    return summary;
  });
  byId('subject-results').replaceChildren(...groups);
  byId('demo-note').hidden = !tasks.some(task => task.demo);
}

function renderReview() {
  const day = activeDay();
  const outcome = byId('review-outcome');
  const next = byId('review-next');
  if (outcome.value !== day.outcome) outcome.value = day.outcome;
  if (next.value !== day.next) next.value = day.next;
}

function hourHeight() {
  return track.offsetHeight / 24;
}

function buildHours() {
  const rows = [];
  for (let i = 0; i <= 24; i += 1) {
    const row = document.createElement('div');
    row.className = 'time-line';
    row.classList.toggle('period-start', i % 6 === 0);
    row.style.top = 'calc(' + i + ' * var(--hour))';
    const label = document.createElement('span');
    label.textContent = clock(i * 60);
    row.append(label);
    rows.push(row);
  }
  byId('time-rows').replaceChildren(...rows);
}

function timelineLanes(tasks) {
  const sorted = [...tasks].sort((a, b) => a.start - b.start || a.end - b.end);
  const groups = [];
  let group;
  for (const task of sorted) {
    const visualEnd = Math.max(task.end, task.start + 20);
    if (!group || group.end <= task.start) {
      group = { end: task.end, lanes: [], entries: [] };
      groups.push(group);
    }
    let lane = group.lanes.findIndex(end => end <= task.start);
    if (lane === -1) lane = group.lanes.length;
    group.end = Math.max(group.end, visualEnd);
    group.lanes[lane] = visualEnd;
    group.entries.push({ task, lane });
  }
  return groups.flatMap(item => item.entries.map(entry => ({ ...entry, total: item.lanes.length })));
}

function timePercent(minutes) {
  return minutes / DAY_MINUTES * 100 + '%';
}

function positionOverviewBlock(block, start, end) {
  if (!block) return;
  block.style.left = timePercent(start);
  block.style.width = timePercent(end - start);
}

function occupiedMinutes(tasks) {
  let minutes = 0;
  let previousEnd = 0;
  for (const task of [...tasks].sort((a, b) => a.start - b.start)) {
    minutes += Math.max(0, task.end - Math.max(previousEnd, task.start));
    previousEnd = Math.max(previousEnd, task.end);
  }
  return minutes;
}

function renderOverview() {
  const tasks = activeDay().tasks;
  const occupied = occupiedMinutes(tasks);
  byId('overview-totals').textContent = '已排 ' + durationText(occupied) + ' · 未排 ' + durationText(DAY_MINUTES - occupied);
  overviewItems.clear();
  const marks = timelineLanes(tasks).map(({ task, lane, total }) => {
    const mark = document.createElement('div');
    mark.className = 'overview-block';
    mark.classList.toggle('is-muted', !taskInView(task) || (categoryFilter !== 'all' && task.category !== categoryFilter));
    applyCategory(mark, task.category);
    positionOverviewBlock(mark, task.start, task.end);
    mark.style.top = lane / total * 100 + '%';
    mark.style.height = 'calc(' + 100 / total + '% - 1px)';
    overviewItems.set(task.id, mark);
    return mark;
  });
  byId('overview-blocks').replaceChildren(...marks);
}

function renderNow(minutes = Math.floor(secondsInBeijing() / 60)) {
  const isToday = selected === todayKey();
  const button = byId('jump-now');
  const mark = byId('overview-now');
  const line = byId('timeline-now');
  button.hidden = mark.hidden = line.hidden = !isToday;
  if (!isToday) return;
  const offset = timePercent(minutes);
  byId('now-time').textContent = clock(minutes);
  mark.style.left = offset;
  line.style.top = offset;
}

function positionCard(card, start, end) {
  const height = hourHeight();
  card.style.top = (start / 60 * height + 2) + 'px';
  card.style.height = Math.max(20, (end - start) / 60 * height - 4) + 'px';
  card.classList.toggle('compact', end - start < 36);
  const timeLabel = clock(start) + '–' + clock(end);
  const subject = card.dataset.category;
  const exam = exams[examBySubject.get(subject)];
  const prefix = examView === 'all' && exam ? exam.title + ' ' : '';
  card.querySelector('.task-details').textContent = timeLabel + ' · ' + prefix + categories[subject].label;
  card.querySelector('.task-mini-time').textContent = timeLabel;
}

function renderTasks() {
  const tasks = tasksInView();
  const shown = tasks.filter(task => categoryFilter === 'all' || task.category === categoryFilter);
  renderOverview();
  const focus = eventLayer.contains(document.activeElement) ? document.activeElement : null;
  const focusId = focus?.closest('.task-card')?.dataset.id;
  const focusClass = focus?.className;
  const hasExamples = tasks.some(task => task.demo);
  byId('demo-bar').hidden = !hasExamples;
  byId('timeline-empty').hidden = Boolean(shown.length || hasExamples);
  const cards = timelineLanes(shown).map(({ task, lane, total }) => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.classList.toggle('completed', task.done);
    card.dataset.id = task.id;
    card.dataset.category = task.category;
    card.style.left = 'calc(' + (lane / total * 100) + '% + 1px)';
    card.style.width = 'calc(' + (100 / total) + '% - 4px)';
    applyCategory(card, task.category);
    card.innerHTML = '<div class="task-info"><button class="task-open" type="button"><span class="task-title"></span><span class="task-mini-time" aria-hidden="true"></span></button><span class="task-details"></span></div><button class="task-check" type="button">' + svg('check') + '</button><div class="resize-handle" title="拖动调整结束时间" aria-hidden="true"></div>';
    card.querySelector('.task-title').textContent = task.name;
    card.title = task.name + (task.note ? '\n' + task.note : '');
    const open = card.querySelector('.task-open');
    open.setAttribute('aria-label', '编辑 ' + task.name + '，' + clock(task.start) + ' 至 ' + clock(task.end));
    const check = card.querySelector('.task-check');
    check.setAttribute('aria-label', (task.done ? '取消完成：' : '标记为完成：') + task.name);
    check.setAttribute('aria-pressed', String(task.done));
    positionCard(card, task.start, task.end);
    return card;
  });
  eventLayer.replaceChildren(...cards);
  if (focusId && focusClass) {
    const replacement = cards.find(card => card.dataset.id === focusId);
    replacement?.getElementsByClassName(focusClass)[0]?.focus({ preventScroll: true });
  }
}

function syncTimeRange() {
  const maxScroll = timeline.scrollHeight - timeline.clientHeight;
  if (rangeTarget !== null && Math.abs(timeline.scrollTop - Math.min(maxScroll, rangeTarget / 60 * hourHeight())) > 2) {
    rangeTarget = null;
  }
  const top = Math.round(timeline.scrollTop / hourHeight() * 60 / STEP) * STEP;
  const minutes = rangeTarget ?? top;
  const marker = byId('time-marker');
  marker.hidden = rangeTarget === null;
  if (!marker.hidden) marker.style.top = (minutes / 60 * hourHeight()) + 'px';
  timeRange.value = minutes;
  byId('range-time').value = clock(minutes);
  timeRange.setAttribute('aria-valuetext', clock(minutes));
  byId('overview-cursor').style.left = timePercent(minutes);
  const start = Math.min(DAY_MINUTES, timeline.scrollTop / hourHeight() * 60);
  const end = Math.min(DAY_MINUTES, (timeline.scrollTop + timeline.clientHeight) / hourHeight() * 60);
  const windowMark = byId('overview-window');
  windowMark.style.left = timePercent(start);
  windowMark.style.width = timePercent(end - start);
}

function jumpToTime(minutes, fromSlider = false) {
  rangeTarget = fromSlider ? minutes : null;
  timeline.scrollTop = minutes / 60 * hourHeight();
  syncTimeRange();
}

function defaultStart() {
  const tasks = tasksInView();
  if (tasks.length) return Math.max(0, Math.floor(Math.min(...tasks.map(task => task.start)) / 60) * 60);
  return 8 * 60;
}

function renderDay(position = false) {
  byId('timeline-date').textContent = dateLabel(selected) + ' · ' + weekday[fromKey(selected).getDay()];
  renderProfile();
  renderHero();
  renderClimb();
  renderNow();
  renderCalendar();
  renderSubjects();
  renderTasks();
  renderResults();
  renderReview();
  if (position) jumpToTime(defaultStart());
  else syncTimeRange();
}

function selectDay(key) {
  selected = key;
  month = fromKey(key);
  renderDay(true);
}

function refreshAfterTaskChange() {
  renderTasks();
  renderResults();
  renderCalendar();
  syncTimeRange();
}

function findTask(id) {
  return activeDay().tasks.find(task => task.id === id);
}

function setTaskSubject(value) {
  const groups = visibleExams().map(key => {
    const exam = exams[key];
    const group = document.createElement('optgroup');
    group.label = exam.title;
    for (const key of exam.subjects) {
      const category = categories[key];
      group.append(new Option(category.label + ' · ' + category.english, key));
    }
    return group;
  });
  const select = byId('task-subject');
  select.replaceChildren(...groups, new Option(categories.other.label, 'other'));
  select.value = value;
}

function showTaskDialog(task, proposedStart) {
  editingTask = task?.id ?? null;
  const start = task?.start ?? Math.min(DAY_MINUTES - STEP, proposedStart);
  const end = task?.end ?? Math.min(DAY_MINUTES, start + 60);
  byId('task-heading').textContent = task ? '编辑任务' : '添加任务';
  byId('task-date').textContent = dateLabel(selected, true);
  byId('task-name').value = task?.name ?? '';
  byId('task-name').placeholder = '例如：' + (exams[examView] ?? exams.toefl).example;
  const defaultCategory = exams[visibleExams()[0]].subjects[0];
  setTaskSubject(task?.category ?? (categoryFilter === 'all' ? defaultCategory : categoryFilter));
  byId('task-start').value = clock(start);
  byId('task-end').value = clock(end);
  byId('task-note').value = task?.note ?? '';
  byId('task-done').checked = task?.done ?? false;
  byId('task-done-row').hidden = !task;
  byId('delete-task').hidden = !task;
  byId('task-error').textContent = '';
  taskDialog.showModal();
}

function pointerMinutes(clientY) {
  return (clientY - track.getBoundingClientRect().top) / hourHeight() * 60;
}

function changeTaskWithPointer() {
  if (!drag?.moved) return;
  const task = drag.task;
  const delta = Math.round((pointerMinutes(drag.clientY) - drag.originMinute) / STEP) * STEP;
  const duration = task.end - task.start;
  if (drag.resize) {
    drag.start = task.start;
    drag.end = Math.min(DAY_MINUTES, Math.max(task.start + Math.min(duration, STEP), task.end + delta));
  } else {
    drag.start = Math.min(DAY_MINUTES - duration, Math.max(0, task.start + delta));
    drag.end = drag.start + duration;
  }
  positionCard(drag.card, drag.start, drag.end);
  positionOverviewBlock(overviewItems.get(task.id), drag.start, drag.end);
}

function dragScroll() {
  if (!drag?.moved) return;
  const rect = timeline.getBoundingClientRect();
  const edge = 28;
  if (drag.clientY < rect.top + edge) timeline.scrollTop -= 8;
  if (drag.clientY > rect.bottom - edge) timeline.scrollTop += 8;
  changeTaskWithPointer();
  scrollFrame = requestAnimationFrame(dragScroll);
}

track.addEventListener('pointerdown', event => {
  if (event.button !== 0 || !event.isPrimary || event.target.closest('.task-check')) return;
  const card = event.target.closest('.task-card');
  if (!card) return;
  const task = findTask(card.dataset.id);
  if (!task) return;
  drag = {
    card, task, pointer: event.pointerId, resize: Boolean(event.target.closest('.resize-handle')),
    originY: event.clientY, clientY: event.clientY, originMinute: pointerMinutes(event.clientY),
    start: task.start, end: task.end, moved: false
  };
});

window.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.pointer) return;
  drag.clientY = event.clientY;
  if (!drag.moved && Math.abs(event.clientY - drag.originY) >= 5) {
    drag.moved = true;
    drag.card.classList.add('dragging');
    drag.card.setPointerCapture(event.pointerId);
    scrollFrame = requestAnimationFrame(dragScroll);
  }
  changeTaskWithPointer();
});

function finishDrag(event, commit) {
  if (!drag || event.pointerId !== drag.pointer) return;
  const movement = drag;
  drag = null;
  cancelAnimationFrame(scrollFrame);
  if (!movement.moved) return;
  skipTaskClickUntil = performance.now() + 200;
  if (commit && (movement.start !== movement.task.start || movement.end !== movement.task.end)) {
    const saved = save((_, profile) => {
      const task = dayFor(profile).tasks.find(item => item.id === movement.task.id);
      if (task) Object.assign(task, { start: movement.start, end: movement.end, demo: false });
    });
    if (saved) notify('已更新任务时间');
    refreshAfterTaskChange();
  } else {
    movement.card.classList.remove('dragging');
    positionCard(movement.card, movement.task.start, movement.task.end);
    positionOverviewBlock(overviewItems.get(movement.task.id), movement.task.start, movement.task.end);
  }
}

window.addEventListener('pointerup', event => finishDrag(event, true));
window.addEventListener('pointercancel', event => finishDrag(event, false));

track.addEventListener('click', event => {
  if (event.detail && performance.now() < skipTaskClickUntil) return;
  const card = event.target.closest('.task-card');
  if (card) {
    const task = findTask(card.dataset.id);
    if (!task) return;
    if (event.target.closest('.task-check')) {
      save((_, profile) => {
        const current = dayFor(profile).tasks.find(item => item.id === task.id);
        if (current) Object.assign(current, { done: !task.done, demo: false });
      });
      refreshAfterTaskChange();
      return;
    }
    if (!event.target.closest('.resize-handle')) showTaskDialog(task);
    return;
  }
  const start = Math.max(0, Math.min(DAY_MINUTES - STEP, Math.floor(pointerMinutes(event.clientY) / STEP) * STEP));
  showTaskDialog(null, start);
});

byId('add-task').addEventListener('click', () => {
  showTaskDialog(null, Number(timeRange.value));
});
timeline.addEventListener('scroll', syncTimeRange, { passive: true });
timeRange.addEventListener('input', () => jumpToTime(Number(timeRange.value), true));
byId('jump-now').addEventListener('click', () => {
  const minutes = Math.floor(secondsInBeijing() / 60);
  jumpToTime(Math.floor(minutes / STEP) * STEP, true);
});
window.addEventListener('resize', syncTimeRange);

byId('task-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = byId('task-name').value.trim();
  const start = parseClock(byId('task-start').value);
  const end = parseClock(byId('task-end').value);
  const error = byId('task-error');
  if (!name) {
    error.textContent = '请填写任务名称。';
    return;
  }
  if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) {
    error.textContent = '请输入有效时间，并让结束时间晚于开始时间。';
    return;
  }
  const fields = {
    name, start, end, category: byId('task-subject').value, note: byId('task-note').value.trim(),
    done: byId('task-done').checked, demo: false
  };
  const saved = save((_, profile) => {
    const day = dayFor(profile, true);
    if (!editingTask) {
      day.tasks.push({ ...fields, id: uid() });
      return;
    }
    const old = day.tasks.find(task => task.id === editingTask);
    if (old) Object.assign(old, fields);
  });
  if (categoryFilter !== 'all' && categoryFilter !== fields.category) {
    categoryFilter = 'all';
    renderSubjects();
  }
  taskDialog.close();
  if (saved) notify('任务已保存');
  refreshAfterTaskChange();
  if (start / 60 * hourHeight() < timeline.scrollTop || start / 60 * hourHeight() > timeline.scrollTop + timeline.clientHeight - 30) {
    jumpToTime(Math.max(0, start - 30));
  }
});

byId('delete-task').addEventListener('click', () => {
  if (!editingTask) return;
  taskDialog.close();
  const saved = save((_, profile) => {
    const day = dayFor(profile);
    day.tasks = day.tasks.filter(task => task.id !== editingTask);
  });
  if (saved) notify('任务已删除');
  refreshAfterTaskChange();
});

byId('clear-demo').addEventListener('click', () => {
  const saved = save((_, profile) => {
    const day = dayFor(profile);
    day.tasks = day.tasks.filter(task => !task.demo);
  });
  if (saved) notify('已清除示例');
  refreshAfterTaskChange();
});

byId('subject-list').addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  categoryFilter = button.dataset.category;
  renderSubjects();
  renderTasks();
  syncTimeRange();
});

function moveMonth(delta) {
  month = new Date(month.getFullYear(), month.getMonth() + delta, 1, 12);
  renderCalendar();
}

byId('prev-month').addEventListener('click', () => moveMonth(-1));
byId('next-month').addEventListener('click', () => moveMonth(1));
byId('sidebar-today').addEventListener('click', () => selectDay(todayKey()));
byId('calendar-grid').addEventListener('click', event => {
  const button = event.target.closest('[data-date]');
  if (button) selectDay(button.dataset.date);
});

function saveReview(event, key) {
  save((_, profile) => { dayFor(profile, true)[key] = event.target.value; });
  renderCalendar();
}

byId('review-outcome').addEventListener('input', event => saveReview(event, 'outcome'));
byId('review-next').addEventListener('input', event => saveReview(event, 'next'));

const deadlineExam = byId('deadline-exam');
deadlineExam.append(...examKeys.map(key => new Option(exams[key].title, key)));
const deadlineName = byId('deadline-input-name');
const deadlineDate = byId('deadline-input-date');

function fillDeadlineFields() {
  const examKey = deadlineExam.value;
  const deadline = deadlineFor(examKey);
  deadlineName.value = deadline?.name ?? exams[examKey].goal;
  deadlineDate.value = deadline?.date ?? '';
  byId('clear-deadline').hidden = !deadline;
}

byId('deadline-edit').addEventListener('click', () => {
  deadlineExam.value = countdownExam();
  fillDeadlineFields();
  deadlineDialog.showModal();
});
deadlineExam.addEventListener('change', fillDeadlineFields);

byId('deadline-form').addEventListener('submit', event => {
  event.preventDefault();
  const exam = exams[deadlineExam.value];
  const saved = save((_, profile) => {
    profile[exam.property] = { name: deadlineName.value.trim() || exam.goal, date: deadlineDate.value };
  });
  deadlineDialog.close();
  if (saved) notify('倒计时已保存');
  renderHero();
});

byId('clear-deadline').addEventListener('click', () => {
  const property = exams[deadlineExam.value].property;
  const saved = save((_, profile) => { profile[property] = null; });
  deadlineDialog.close();
  if (saved) notify('已清除倒计时');
  renderHero();
});

function switchProfile(id, newProfile) {
  state.active = id;
  categoryFilter = 'all';
  profileDialog.close();
  save(latest => {
    if (newProfile) latest.profiles.push(newProfile);
    latest.active = id;
  });
  renderDay(true);
}

byId('profile-trigger').addEventListener('click', () => {
  const buttons = state.profiles.map(profile => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'profile-row';
    button.setAttribute('aria-pressed', String(profile.id === state.active));
    button.innerHTML = '<span class="avatar"></span><span class="profile-name"></span>' + (profile.id === state.active ? svg('check') : '');
    button.querySelector('.avatar').textContent = avatarText(profile.name);
    button.querySelector('.profile-name').textContent = profile.name;
    button.addEventListener('click', () => switchProfile(profile.id));
    return button;
  });
  byId('profile-list').replaceChildren(...buttons);
  byId('profile-input').value = '';
  byId('profile-error').textContent = '';
  profileDialog.showModal();
});

byId('profile-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = byId('profile-input').value.trim();
  const error = byId('profile-error');
  if (!name) {
    error.textContent = '请填写姓名或昵称。';
    return;
  }
  if (state.profiles.some(profile => profile.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
    error.textContent = '这个名称已存在，请换一个名称。';
    return;
  }
  const id = uid();
  switchProfile(id, { id, name, deadline: null, days: {} });
});

document.querySelectorAll('[data-close]').forEach(button => {
  button.addEventListener('click', () => button.closest('dialog').close());
});
document.querySelectorAll('[data-icon]').forEach(element => {
  element.innerHTML = svg(element.dataset.icon);
});

window.addEventListener('storage', event => {
  if (event.key !== storageKey || drag || storageWriteFailed) return;
  const latest = readState();
  if (!latest) return;
  const active = latest.profiles.some(profile => profile.id === state.active) ? state.active : latest.active;
  state = { ...latest, active };
  renderDay();
});

window.addEventListener('hashchange', () => {
  const requested = viewFromUrl();
  if (requested === examView) return;
  examView = requested;
  categoryFilter = 'all';
  renderViewControls();
  renderDay(true);
});

buildSky();
buildBoulderClock();
buildTrailTicks();
applyRunnerMotionPreference();
buildHours();
renderViewControls();
renderDay(true);
if (!readState()) save();
function refreshLiveTime() {
  const instant = new Date();
  const now = secondsInBeijing(instant);
  const minute = Math.floor(now / 60);
  const today = todayKey(instant);
  if (lastToday !== today) {
    lastToday = today;
    renderHero();
    renderCalendar();
  }
  if (minute !== lastLiveMinute) {
    lastLiveMinute = minute;
    renderNow(minute);
  }
  renderClimb(now);
}

setInterval(refreshLiveTime, 1000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) refreshLiveTime();
});
