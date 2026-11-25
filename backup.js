'use strict';

(() => {
  const type = 'one-day-backup';
  const maxBytes = 12 * 1024 * 1024;
  const picker = byId('backup-file');
  const status = byId('backup-status');
  const deadlineFields = examKeys.map(key => exams[key].property);
  let importing = false;

  function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function text(value, limit) {
    return typeof value === 'string' ? value.slice(0, limit) : '';
  }

  function taskFromBackup(task) {
    if (!isRecord(task) || !Number.isInteger(task.start) || !Number.isInteger(task.end) ||
        task.start < 0 || task.end > DAY_MINUTES || task.start >= task.end) {
      throw new Error('备份里有无效的时间块。');
    }
    const name = text(task.name, 120).trim();
    if (!name) throw new Error('备份里有任务缺少名称。');
    return {
      id: uid(), name, start: task.start, end: task.end,
      category: Object.hasOwn(categories, task.category) ? task.category : 'other',
      done: task.done === true, note: text(task.note, 1000), demo: task.demo === true
    };
  }

  function profileFromBackup(profile) {
    if (!isRecord(profile) || !isRecord(profile.days) || !text(profile.name, 28).trim()) {
      throw new Error('备份里有无效的使用者。');
    }
    const days = {};
    for (const [date, day] of Object.entries(profile.days)) {
      if (!scheduleInput.validDay(date) || !isRecord(day) || !Array.isArray(day.tasks)) {
        throw new Error('备份里有无效的日程日期。');
      }
      days[date] = {
        tasks: day.tasks.map(taskFromBackup), outcome: text(day.outcome, 4000), next: text(day.next, 4000)
      };
    }
    const copy = { id: uid(), name: text(profile.name, 28).trim(), days };
    for (const key of deadlineFields) {
      const deadline = profile[key];
      if (deadline && scheduleInput.validDay(deadline.date)) {
        copy[key] = {name: text(deadline.name, 44), date: deadline.date};
      }
    }
    return copy;
  }

  function readBackup(payload) {
    if (payload?.format !== type || payload.version !== 1 || !Array.isArray(payload.profiles) || !payload.profiles.length) {
      throw new Error('请选择由 One day 导出的 JSON 备份。');
    }
    return payload.profiles.map(profileFromBackup);
  }

  function importedName(name, names) {
    let candidate = name;
    for (let count = 1; names.has(candidate.toLocaleLowerCase()); count += 1) {
      const suffix = count === 1 ? '（导入）' : '（导入 ' + count + '）';
      candidate = name.slice(0, 28 - suffix.length) + suffix;
    }
    names.add(candidate.toLocaleLowerCase());
    return candidate;
  }

  function downloadBackup() {
    const profiles = storageWriteFailed ? state.profiles : (readState() ?? state).profiles;
    const data = JSON.stringify({format: type, version: 1, profiles}, null, 2);
    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob([data], {type: 'application/json'}));
    link.href = url;
    link.download = 'One-day-backup-' + todayKey() + '.json';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = '';
  }

  async function uploadBackup(file) {
    if (!file || importing) return;
    importing = true;
    status.textContent = '';
    try {
      if (file.size > maxBytes) throw new Error('备份超过 12 MB，无法导入。');
      let payload;
      try {
        payload = JSON.parse(await file.text());
      } catch {
        throw new Error('无法读取这个 JSON 备份。');
      }
      const profiles = readBackup(payload);
      const saved = save(latest => {
        const names = new Set(latest.profiles.map(profile => profile.name.toLocaleLowerCase()));
        for (const profile of profiles) {
          profile.name = importedName(profile.name, names);
          latest.profiles.push(profile);
        }
        latest.active = profiles[0].id;
      });
      state.active = profiles[0].id;
      selectDay(todayKey());
      profileDialog.close();
      notify(saved ? '已导入 ' + profiles.length + ' 位使用者的记录' : '已在当前页面载入记录，请导出备份保留');
    } catch (error) {
      status.textContent = error.message;
    } finally {
      importing = false;
      picker.value = '';
    }
  }

  byId('backup-export').addEventListener('click', downloadBackup);
  byId('backup-import').addEventListener('click', () => picker.click());
  picker.addEventListener('change', () => uploadBackup(picker.files[0]));
  profileDialog.addEventListener('close', () => { status.textContent = ''; });
})();
