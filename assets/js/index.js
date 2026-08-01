// hide and show the settings sidebar
let settingSidebar = document.getElementById("settings-sidebar");
let settingsToggle = document.getElementById("settings-toggle");
let closeSettings = document.getElementById("close-settings");

settingsToggle.addEventListener("click", function () {
  settingSidebar.classList.toggle("translate-x-full");
  const isClosed = settingSidebar.classList.contains("translate-x-full");

  settingsToggle.style.right = isClosed ? "0px" : "20rem";
  settingsToggle.setAttribute("aria-expanded", isClosed ? "false" : "true");
  settingSidebar.setAttribute("aria-hidden", isClosed ? "true" : "false");
});

// close button in side bar
closeSettings.addEventListener("click", function () {
  settingSidebar.classList.add("translate-x-full");
  settingsToggle.style.right = "0px";
  settingsToggle.setAttribute("aria-expanded", "false");
  settingSidebar.setAttribute("aria-hidden", "true");
});

// close the sidebar by clicking anywhere except the sidebar
document.addEventListener("click", function (e) {
  const clickedInsideSidebar = settingSidebar.contains(e.target);
  const clickedToggleButton = settingsToggle.contains(e.target);

  if (!clickedInsideSidebar && !clickedToggleButton) {
    settingSidebar.classList.add("translate-x-full");
    settingsToggle.style.right = "0px";
  }
});

// change fonts
let fontButtons = document.querySelectorAll(".font-option");

function applyFont(fontName, buttonToActivate) {
  for (let i = 0; i < fontButtons.length; i++) {
    fontButtons[i].classList.remove("active");
    fontButtons[i].classList.remove("bg-primary/10");
    fontButtons[i].style.borderColor = "";
    fontButtons[i].setAttribute("aria-checked", "false");
  }

  buttonToActivate.classList.add("active");
  buttonToActivate.classList.add("bg-primary/10");
  buttonToActivate.style.borderColor = "var(--color-primary)";
  buttonToActivate.setAttribute("aria-checked", "true");

  document.body.className = document.body.className
    .replace(/font-\S+/g, "")
    .trim();
  document.body.classList.add(`font-${fontName}`);
}

for (let i = 0; i < fontButtons.length; i++) {
  let button = fontButtons[i];
  button.addEventListener("click", function () {
    const fontName = button.dataset.font;
    applyFont(fontName, button);
    localStorage.setItem("selectedFont", fontName);
  });
}

const savedFont = localStorage.getItem("selectedFont");
if (savedFont) {
  const savedButton = document.querySelector(`[data-font="${savedFont}"]`);
  if (savedButton) {
    applyFont(savedFont, savedButton);
  }
} else {
  applyFont("tajawal", fontButtons[1]);
  localStorage.setItem("selectedFont", "tajawal");
}

// colors
const themes = [
  { primary: "#6366f1", secondary: "#8b5cf6", accent: "#a855f7" },
  { primary: "#ec4899", secondary: "#f97316", accent: "#fb923c" },
  { primary: "#10b981", secondary: "#059669", accent: "#34d399" },
  { primary: "#3b82f6", secondary: "#06b6d4", accent: "#22d3ee" },
  { primary: "#ef4444", secondary: "#f43f5e", accent: "#fb7185" },
  { primary: "#f59e0b", secondary: "#ea580c", accent: "#fbbf24" },
];
let themeGrid = document.getElementById("theme-colors-grid");
let themeSwatches = [];

function applyTheme(themeEl) {
  document.documentElement.style.setProperty(
    "--color-primary",
    themeEl.primary,
  );
  document.documentElement.style.setProperty(
    "--color-secondary",
    themeEl.secondary,
  );
  document.documentElement.style.setProperty("--color-accent", themeEl.accent);
}

function setActiveSwatch(activeSwatch) {
  for (let i = 0; i < themeSwatches.length; i++) {
    themeSwatches[i].classList.remove(
      "ring-2",
      "ring-offset-2",
      "ring-primary",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
  }
  activeSwatch.classList.add(
    "ring-2",
    "ring-offset-2",
    "ring-primary",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
  );
}

(function () {
  for (let index = 0; index < themes.length; index++) {
    const themeEl = themes[index];
    let swatch = document.createElement("button");
    swatch.style.background = `linear-gradient(135deg, ${themeEl.primary}, ${themeEl.secondary})`;
    swatch.classList.add(
      "w-12",
      "h-12",
      "rounded-full",
      "border-2",
      "border-slate-200",
      "dark:border-slate-700",
      "hover:scale-110",
      "hover:border-primary",
      "transition-all",
      "shadow-sm",
      "duration-300",
      "cursor-pointer",
    );
    swatch.setAttribute("type", "button");
    swatch.dataset.themeIndex = index;
    swatch.addEventListener("click", function () {
      applyTheme(themeEl);
      setActiveSwatch(swatch);
      localStorage.setItem("selectedTheme", JSON.stringify(themeEl));
    });
    themeSwatches.push(swatch);
    themeGrid.appendChild(swatch);
  }

  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    const parsedTheme = JSON.parse(savedTheme);
    applyTheme(parsedTheme);

    for (let i = 0; i < themes.length; i++) {
      if (themes[i].primary === parsedTheme.primary) {
        setActiveSwatch(themeSwatches[i]);
        break;
      }
    }
  } else {
    applyTheme(themes[0]);
    setActiveSwatch(themeSwatches[0]);
    localStorage.setItem("selectedTheme", JSON.stringify(themes[0]));
  }
})();

// rests settings button
let resetSettings = document.getElementById("reset-settings");

resetSettings.addEventListener("click", function () {
  applyTheme(themes[0]);
  setActiveSwatch(themeSwatches[0]);
  localStorage.setItem("selectedTheme", JSON.stringify(themes[0]));
  applyFont("tajawal", fontButtons[1]);
  localStorage.setItem("selectedFont", "tajawal");
  settingSidebar.classList.add("translate-x-full");
  settingsToggle.style.right = "0px";
});

// theme
let themeToggleButton = document.getElementById("theme-toggle-button");

themeToggleButton.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");

  themeToggleButton.setAttribute("aria-pressed", isDark ? "true" : "false");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const savedThemeMode = localStorage.getItem("theme");
if (savedThemeMode === "dark") {
  document.documentElement.classList.add("dark");
  themeToggleButton.setAttribute("aria-pressed", "true");
} else if (savedThemeMode === "light") {
  document.documentElement.classList.remove("dark");
  themeToggleButton.setAttribute("aria-pressed", "false");
} else {
  document.documentElement.classList.add("dark");
  themeToggleButton.setAttribute("aria-pressed", "true");
  localStorage.setItem("theme", "dark");
}


// scroll spy active links
let sections = document.querySelectorAll("section[id]");
let navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
let isClickScrolling = false;
let targetSectionId = "";

function updateActiveLinkByScroll() {
  let currentSectionId = "";
  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom > 100) {
      currentSectionId = sections[i].id;
    }
  }

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
    if (navLinks[i].getAttribute("href") === "#" + currentSectionId) {
      navLinks[i].classList.add("active");
    }
  }
}

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    isClickScrolling = true;
    targetSectionId = this.getAttribute("href").replace("#", "");
  });
}

window.addEventListener("scroll", function () {
  if (isClickScrolling) {
    const targetSection = document.getElementById(targetSectionId);
    const rect = targetSection.getBoundingClientRect();

    if (rect.top <= 100 && rect.bottom > 100) {
      isClickScrolling = false;
    } else {
      return;
    }
  }

  updateActiveLinkByScroll();
});

updateActiveLinkByScroll();

// scroll up button
let scrollToTop = document.getElementById("scroll-to-top");
const heroSection = document.getElementById("hero-section");

window.addEventListener("scroll", function () {
  const rect = heroSection.getBoundingClientRect();

  if (rect.bottom <= 400) {
    scrollToTop.classList.remove("opacity-0", "invisible");
  } else {
    scrollToTop.classList.add("opacity-0", "invisible");
  }
});

scrollToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
  });
});

// mobile menu
const mobileMenuBtn = document.getElementById("mobile-menu-toggle");
const navLinksContainer = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", function () {
  navLinksContainer.classList.toggle("active");
  const isOpen = navLinksContainer.classList.contains("active");
  mobileMenuBtn.setAttribute("aria-expanded", isOpen);
});

// nav and tabs

const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

const activeFilterClasses = [
  "active",
  "bg-linear-to-r",
  "from-primary",
  "to-secondary",
  "text-white",
  "hover:shadow-lg",
  "hover:shadow-primary/50",
];
const inactiveFilterClasses = [
  "bg-white",
  "dark:bg-slate-800",
  "text-slate-600",
  "dark:text-slate-300",
  "hover:bg-slate-100",
  "dark:hover:bg-slate-700",
  "border",
  "border-slate-300",
  "dark:border-slate-700",
];

for (let i = 0; i < portfolioFilters.length; i++) {
  portfolioFilters[i].addEventListener("click", function () {
    const selectedFilter = portfolioFilters[i].dataset.filter;

    for (let j = 0; j < portfolioFilters.length; j++) {
      portfolioFilters[j].classList.remove(...activeFilterClasses);
      portfolioFilters[j].classList.add(...inactiveFilterClasses);

      portfolioFilters[j].setAttribute("aria-pressed", "false");
    }

    portfolioFilters[i].classList.remove(...inactiveFilterClasses);
    portfolioFilters[i].classList.add(...activeFilterClasses);

    portfolioFilters[i].setAttribute("aria-pressed", "true");

    for (let j = 0; j < portfolioItems.length; j++) {
      portfolioItems[j].classList.remove("opacity-100");
      portfolioItems[j].classList.add("opacity-0");
      portfolioItems[j].style.transform = "scale(0.8)";
    }

    setTimeout(function () {
      for (let j = 0; j < portfolioItems.length; j++) {
        const category = portfolioItems[j].dataset.category;

        if (selectedFilter === "all" || selectedFilter === category) {
          portfolioItems[j].classList.remove("hidden");

          setTimeout(function () {
            portfolioItems[j].classList.remove("opacity-0");
            portfolioItems[j].classList.add("opacity-100");
            portfolioItems[j].style.transform = "scale(1)";
          }, 20);
        } else {
          portfolioItems[j].classList.add("hidden");
        }
      }
    }, 300);
  });
}

// testimonials carousel
const carouselTrack = document.getElementById("testimonials-carousel");
const cards = carouselTrack.querySelectorAll(".testimonial-card");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
const indicators = document.querySelectorAll(".carousel-indicator");

let currentIndex = 0;
const maxIndex = indicators.length - 1;

function getVisibleCount() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function updateCarousel() {
  const percentPerCard = 100 / getVisibleCount();
  carouselTrack.style.transform = `translateX(${currentIndex * percentPerCard}%)`;

  for (let i = 0; i < indicators.length; i++) {
    const isActive = i === currentIndex;
    indicators[i].classList.toggle("bg-accent", isActive);
    indicators[i].classList.toggle("bg-slate-400", !isActive);
    indicators[i].classList.toggle("dark:bg-slate-600", !isActive);
    indicators[i].setAttribute("aria-selected", isActive ? "true" : "false");
  }
}

for (let i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", function () {
    currentIndex = i;
    updateCarousel();
  });
}

nextBtn.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % (maxIndex + 1);
  updateCarousel();
});

prevBtn.addEventListener("click", function () {
  currentIndex = (currentIndex - 1 + maxIndex + 1) % (maxIndex + 1);
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);

updateCarousel();

// custom select dropdowns
const customSelects = document.querySelectorAll(".custom-select");

for (let i = 0; i < customSelects.length; i++) {
  const select = customSelects[i];
  const optionsPanel = select.nextElementSibling;
  const selectedTextEl = select.querySelector(".selected-text");
  const options = optionsPanel.querySelectorAll(".custom-option");

  select.addEventListener("click", function () {
    optionsPanel.classList.toggle("hidden");
    const isOpen = !optionsPanel.classList.contains("hidden");
    select.setAttribute("aria-expanded", isOpen ? "true" : "false");

    const chevron = select.querySelector(".fa-chevron-down");
    chevron.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
  });

  for (let j = 0; j < options.length; j++) {
    options[j].addEventListener("click", function () {
      const value = options[j].dataset.value;
      selectedTextEl.textContent = value;
      selectedTextEl.classList.remove("text-slate-500", "dark:text-slate-400");
      select.dataset.value = value;
      optionsPanel.classList.add("hidden");
      select.setAttribute("aria-expanded", "false");
      select.querySelector(".fa-chevron-down").style.transform = "rotate(0deg)";
    });
  }
}

document.addEventListener("click", function (e) {
  for (let i = 0; i < customSelects.length; i++) {
    const select = customSelects[i];
    const optionsPanel = select.nextElementSibling;
    if (!select.contains(e.target) && !optionsPanel.contains(e.target)) {
      optionsPanel.classList.add("hidden");
      select.setAttribute("aria-expanded", "false");
      select.querySelector(".fa-chevron-down").style.transform = "rotate(0deg)";
    }
  }
});

// form validation
const contactForm = document.querySelector('form[aria-label="نموذج التواصل"]');
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const projectDetailsInput = document.getElementById("project-details");
const projectTypeSelect = document.querySelector('[data-name="project-type"]');
const budgetSelect = document.querySelector('[data-name="budget"]');

function showError(inputEl, message) {
  clearError(inputEl);
  const errorEl = document.createElement("p");
  errorEl.classList.add("error-message", "text-red-500", "text-sm", "mt-2");
  errorEl.textContent = message;
  inputEl.parentElement.appendChild(errorEl);
  inputEl.classList.add("border-red-500");
}

function clearError(inputEl) {
  inputEl.classList.remove("border-red-500");
  const existingError = inputEl.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidEgyptianPhone(phone) {
  return /^((\+?20)0?|0)(10|11|12|15)\d{8}$/.test(phone);
}

let showSuccessPopup = () => {
  const popup = document.createElement("div");
  popup.className =
    "fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm";
  popup.innerHTML = `
      <div class="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fa-solid fa-check text-4xl text-white"></i>
        </div>
        <h3 class="text-2xl font-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
        <p class="text-slate-400 mb-6">شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.</p>
        <button class="success-popup-close bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
          حسناً
        </button>
      </div>
    `;
  document.body.appendChild(popup);

  popup.querySelector(".success-popup-close").addEventListener("click", () => {
    popup.remove();
  });

  setTimeout(() => {
    if (popup.parentNode) {
      popup.remove();
    }
  }, 5000);
};

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let isFormValid = true;

  if (fullNameInput.value.trim() === "") {
    showError(fullNameInput, "يرجى إدخال الاسم الكامل");
    isFormValid = false;
  } else {
    clearError(fullNameInput);
  }

  if (emailInput.value.trim() === "") {
    showError(emailInput, "يرجى إدخال البريد الإلكتروني");
    isFormValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, "البريد الإلكتروني غير صحيح");
    isFormValid = false;
  } else {
    clearError(emailInput);
  }

  const phone = phoneInput.value.trim();

  if (phone !== "" && !isValidEgyptianPhone(phone)) {
    showError(phoneInput, "يرجى إدخال رقم هاتف صحيح");
    isFormValid = false;
  } else {
    clearError(phoneInput);
  }

  const projectDetails = projectDetailsInput.value.trim();

  if (projectDetails === "") {
    showError(projectDetailsInput, "يرجى إدخال تفاصيل المشروع");
    isFormValid = false;
  } else if (projectDetails.length <= 10) {
    showError(
      projectDetailsInput,
      "تفاصيل المشروع يجب أن تكون أكثر من 10 أحرف",
    );
    isFormValid = false;
  } else {
    clearError(projectDetailsInput);
  }

  if (isFormValid) {
    showSuccessPopup();

    contactForm.reset();
    projectTypeSelect.dataset.value = "";
    budgetSelect.dataset.value = "";
    projectTypeSelect.querySelector(".selected-text").textContent =
      "اختر نوع المشروع";
    budgetSelect.querySelector(".selected-text").textContent = "اختر الميزانية";
  }
});

fullNameInput.addEventListener("input", function () {
  if (fullNameInput.value.trim() !== "") {
    clearError(fullNameInput);
  }
});

emailInput.addEventListener("input", function () {
  if (isValidEmail(emailInput.value.trim())) {
    clearError(emailInput);
  }
});

phoneInput.addEventListener("input", function () {
  if (isValidEgyptianPhone(phoneInput.value.trim())) {
    clearError(phoneInput);
  }
});

projectDetailsInput.addEventListener("input", function () {
  const value = projectDetailsInput.value.trim();
  if (value.length > 0) {
    clearError(projectDetailsInput);
  }
  if (value.length > 10) {
    clearError(projectDetailsInput);
  }
});
