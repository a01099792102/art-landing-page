const ADMIN_STORAGE_KEYS = {
  password: "art-admin-password",
  session: "art-admin-authenticated"
};

const ADMIN_DEFAULT_PASSWORD = "1234";
const ADMIN_ANALYTICS = {
  namespace: "art-landing-page-nine.vercel.app",
  timezone: "Asia/Seoul"
};

let fallbackPassword = ADMIN_DEFAULT_PASSWORD;
let inMemorySession = false;

const loginPanel = document.querySelector("[data-login-panel]");
const dashboard = document.querySelector("[data-dashboard]");
const loginForm = document.querySelector("[data-login-form]");
const loginInput = loginForm?.querySelector('input[name="password"]');
const loginMessage = document.querySelector("[data-login-message]");
const resetButton = document.querySelector("[data-reset-button]");
const passwordForm = document.querySelector("[data-password-form]");
const passwordMessage = document.querySelector("[data-password-message]");
const logoutButton = document.querySelector("[data-logout-button]");
const refreshButton = document.querySelector("[data-refresh-button]");
const chartElement = document.querySelector("[data-chart]");
const chartEmpty = document.querySelector("[data-chart-empty]");

bootstrapAdmin();

function bootstrapAdmin() {
  initializeAdminPassword();
  bindAdminEvents();
  restoreAdminSession();
}

function initializeAdminPassword() {
  const storedPassword = safeLocalStorageGet(ADMIN_STORAGE_KEYS.password);
  if (storedPassword) {
    fallbackPassword = storedPassword;
    return;
  }

  safeLocalStorageSet(ADMIN_STORAGE_KEYS.password, ADMIN_DEFAULT_PASSWORD);
  fallbackPassword = ADMIN_DEFAULT_PASSWORD;
}

function bindAdminEvents() {
  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    handleLogin();
  });

  loginInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  });

  resetButton?.addEventListener("click", () => {
    fallbackPassword = ADMIN_DEFAULT_PASSWORD;
    safeLocalStorageSet(ADMIN_STORAGE_KEYS.password, ADMIN_DEFAULT_PASSWORD);
    safeSessionStorageRemove(ADMIN_STORAGE_KEYS.session);
    inMemorySession = false;
    loginForm?.reset();
    setMessage(loginMessage, "이 브라우저의 관리자 비밀번호를 1234로 초기화했습니다.", true);
    loginInput?.focus();
  });

  passwordForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(passwordMessage);

    const formData = new FormData(passwordForm);
    const currentPassword = String(formData.get("currentPassword") || "").trim();
    const newPassword = String(formData.get("newPassword") || "").trim();
    const confirmPassword = String(formData.get("confirmPassword") || "").trim();

    if (!isValidAdminPassword(currentPassword)) {
      setMessage(passwordMessage, "현재 비밀번호가 맞지 않습니다.");
      return;
    }

    if (newPassword.length < 4) {
      setMessage(passwordMessage, "새 비밀번호는 4자 이상이어야 합니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(passwordMessage, "새 비밀번호 확인 값이 일치하지 않습니다.");
      return;
    }

    fallbackPassword = newPassword;
    safeLocalStorageSet(ADMIN_STORAGE_KEYS.password, newPassword);
    passwordForm.reset();
    setMessage(passwordMessage, "비밀번호가 변경되었습니다.", true);
  });

  logoutButton?.addEventListener("click", () => {
    safeSessionStorageRemove(ADMIN_STORAGE_KEYS.session);
    inMemorySession = false;
    showLoginPanel();
  });

  refreshButton?.addEventListener("click", () => {
    loadDashboardData();
  });
}

function handleLogin() {
  clearMessage(loginMessage);
  const password = String(loginInput?.value || "").trim();

  if (!isValidAdminPassword(password)) {
    setMessage(loginMessage, "비밀번호가 올바르지 않습니다.");
    return;
  }

  safeSessionStorageSet(ADMIN_STORAGE_KEYS.session, "true");
  inMemorySession = true;
  loginForm?.reset();
  showDashboard();
  loadDashboardData();
}

function restoreAdminSession() {
  if (safeSessionStorageGet(ADMIN_STORAGE_KEYS.session) === "true" || inMemorySession) {
    showDashboard();
    loadDashboardData();
    return;
  }

  showLoginPanel();
}

function showDashboard() {
  if (loginPanel) {
    loginPanel.hidden = true;
  }
  if (dashboard) {
    dashboard.hidden = false;
  }
  clearMessage(loginMessage);
}

function showLoginPanel() {
  if (dashboard) {
    dashboard.hidden = true;
  }
  if (loginPanel) {
    loginPanel.hidden = false;
  }
  clearMessage(passwordMessage);
  loginInput?.focus();
}

async function loadDashboardData() {
  const recentDays = getRecentDateKeys(7);
  const todayKey = recentDays[recentDays.length - 1];

  try {
    const [pageviewsTotal, visitorsTotal, todayVisitors, recentVisitors] = await Promise.all([
      getCounterValue("pageviews-total"),
      getCounterValue("visitors-total"),
      getCounterValue(`visitors-${todayKey}`),
      Promise.all(recentDays.map((dateKey) => getCounterValue(`visitors-${dateKey}`)))
    ]);

    const chartData = recentDays.map((dateKey, index) => ({
      dateKey,
      value: recentVisitors[index]
    }));

    setStatValue("pageviewsTotal", pageviewsTotal);
    setStatValue("visitorsTotal", visitorsTotal);
    setStatValue("todayVisitors", todayVisitors);
    setStatValue("last7Visitors", recentVisitors.reduce((sum, value) => sum + value, 0));
    renderChart(chartData);
  } catch (error) {
    console.error("Failed to load dashboard analytics.", error);
    setStatValue("pageviewsTotal", 0);
    setStatValue("visitorsTotal", 0);
    setStatValue("todayVisitors", 0);
    setStatValue("last7Visitors", 0);
    renderChart([]);
    setMessage(passwordMessage, "통계 데이터를 불러오지 못했습니다. 로그인은 되었지만 수치는 잠시 후 다시 시도해 주세요.");
  }
}

function setStatValue(name, value) {
  const target = document.querySelector(`[data-stat="${name}"]`);
  if (target) {
    target.textContent = Number(value || 0).toLocaleString("ko-KR");
  }
}

function renderChart(data) {
  if (!chartElement || !chartEmpty) {
    return;
  }

  chartElement.innerHTML = "";
  const maxValue = Math.max(...data.map((item) => item.value), 0);
  const hasData = maxValue > 0;

  chartEmpty.hidden = hasData;

  if (!hasData) {
    return;
  }

  data.forEach((item) => {
    const barGroup = document.createElement("div");
    barGroup.className = "chart-bar-group";

    const value = document.createElement("div");
    value.className = "chart-value";
    value.textContent = item.value.toLocaleString("ko-KR");

    const barWrap = document.createElement("div");
    barWrap.className = "chart-bar-wrap";

    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.height = `${Math.max((item.value / maxValue) * 100, 6)}%`;
    bar.title = `${item.dateKey}: ${item.value}`;
    barWrap.append(bar);

    const label = document.createElement("div");
    label.className = "chart-label";
    label.textContent = formatShortDateLabel(item.dateKey);

    barGroup.append(value, barWrap, label);
    chartElement.append(barGroup);
  });
}

function getStoredPassword() {
  return safeLocalStorageGet(ADMIN_STORAGE_KEYS.password) || fallbackPassword || ADMIN_DEFAULT_PASSWORD;
}

function isValidAdminPassword(password) {
  return password === ADMIN_DEFAULT_PASSWORD || password === getStoredPassword();
}

function setMessage(target, text, isSuccess = false) {
  if (!target) {
    return;
  }

  target.textContent = text;
  target.classList.toggle("is-success", isSuccess);
}

function clearMessage(target) {
  if (!target) {
    return;
  }

  target.textContent = "";
  target.classList.remove("is-success");
}

function getRecentDateKeys(days) {
  const result = [];
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: ADMIN_ANALYTICS.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const now = new Date();

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(now);
    date.setDate(now.getDate() - offset);
    result.push(formatter.format(date));
  }

  return result;
}

function formatShortDateLabel(dateKey) {
  const [, month, day] = dateKey.split("-");
  return `${month}.${day}`;
}

async function getCounterValue(key) {
  const url = `https://countapi.xyz/get/${encodeURIComponent(ADMIN_ANALYTICS.namespace)}/${encodeURIComponent(key)}`;
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-store"
  });

  if (response.status === 404) {
    return 0;
  }

  if (!response.ok) {
    throw new Error(`Counter lookup failed: ${response.status}`);
  }

  const payload = await response.json();
  return Number(payload.value || 0);
}

function safeLocalStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    fallbackPassword = value;
  }
}

function safeSessionStorageGet(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeSessionStorageSet(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch (error) {
    inMemorySession = value === "true";
  }
}

function safeSessionStorageRemove(key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    inMemorySession = false;
  }
}
