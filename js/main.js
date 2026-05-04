const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const topButton = document.querySelector("[data-top-button]");
const faqItems = document.querySelectorAll(".faq-item");
const analyticsConfig = {
  namespace: "art-landing-page-nine.vercel.app",
  timezone: "Asia/Seoul"
};

function updateHeader() {
  const isScrolled = window.scrollY > 24;
  header?.classList.toggle("is-scrolled", isScrolled);
  topButton?.classList.toggle("is-visible", window.scrollY > 520);
}

function closeNav() {
  document.body.classList.remove("nav-open");
  header?.classList.remove("is-open");
  nav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", Boolean(isOpen));
  header?.classList.toggle("is-open", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    closeNav();
  });
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question?.addEventListener("click", () => {
    const isOpen = question.getAttribute("aria-expanded") === "true";

    faqItems.forEach((otherItem) => {
      const otherQuestion = otherItem.querySelector(".faq-question");
      const otherAnswer = otherItem.querySelector(".faq-answer");
      otherQuestion?.setAttribute("aria-expanded", "false");
      if (otherAnswer) {
        otherAnswer.hidden = true;
      }
    });

    question.setAttribute("aria-expanded", String(!isOpen));
    if (answer) {
      answer.hidden = isOpen;
    }
  });
});

topButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

async function trackVisit() {
  if (document.body.dataset.analytics !== "public") {
    return;
  }

  const today = getAnalyticsDateKey();
  const pageviewKey = "pageviews-total";
  const visitorsTotalKey = "visitors-total";
  const visitorsTodayKey = `visitors-${today}`;
  const visitMarkerKey = "art-landing-page-last-visit";

  try {
    await hitCounter(pageviewKey);

    if (localStorage.getItem(visitMarkerKey) !== today) {
      localStorage.setItem(visitMarkerKey, today);
      await Promise.all([
        hitCounter(visitorsTotalKey),
        hitCounter(visitorsTodayKey)
      ]);
    }
  } catch (error) {
    console.error("Analytics tracking failed.", error);
  }
}

function getAnalyticsDateKey(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: analyticsConfig.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return formatter.format(date);
}

async function hitCounter(key) {
  const url = `https://countapi.xyz/hit/${encodeURIComponent(analyticsConfig.namespace)}/${encodeURIComponent(key)}`;
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Counter request failed: ${response.status}`);
  }

  return response.json();
}

trackVisit();
