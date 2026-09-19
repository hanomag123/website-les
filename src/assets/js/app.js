document.addEventListener("DOMContentLoaded", () => {
  const xl = matchMedia("(max-width: 1024px)");

  const headersearch = document.querySelector(".header-search");
  const menusearch = document.querySelector(".menu-search-copy");

  if (menusearch && headersearch) {
    menusearch.appendChild(headersearch.cloneNode(true));
  }

  const headerblock = document.querySelector(".header-right");
  const menublock = document.querySelector(".menu-bot-copy");

  if (headerblock && menublock) {
    menublock.appendChild(headerblock.cloneNode(true));
  }

  const speccopytext = document.querySelector(".spec-copytext");
  const speccopy = document.querySelector(".spec-copy");

  if (speccopytext && speccopy) {
    speccopy.appendChild(speccopytext.cloneNode(true));
  }

  const phonesbtn = document.querySelector("[data-phonetoggle]");

  if (phonesbtn) {
    phonesbtn.addEventListener("click", function () {
      this.classList.toggle("opened");
      const mobilecolumn =
        this.closest(".header-top").querySelector(".header-column");

      if (mobilecolumn) {
        mobilecolumn.classList.toggle("opened");
      }
    });
  }

  const columnslink = document.querySelectorAll(".header-top .header-column a");

  if (columnslink.length) {
    columnslink.forEach((link) => {
      link.addEventListener("click", function () {
        const closest = this.closest(".header-column.opened");
        const boxes = document.querySelectorAll(".header-box.opened");
        if (boxes.length) {
          boxes.forEach((el) => el.classList.remove("opened"));
        }
        if (closest) {
          closest.classList.remove("opened");
        }
      });
    });
  }

  class Menu {
    constructor(menuElement, buttonElement) {
      this.menu =
        typeof menuElement === "string"
          ? document.querySelector(menuElement)
          : menuElement;
      this.button =
        typeof buttonElement === "string"
          ? document.querySelector(buttonElement)
          : buttonElement;
      this.overlay = document.createElement("div");
      this.overlay.hidden = true;

      this.searchtoggle = document
        .querySelector(".header")
        .querySelector("[data-searchtoggle]");
      this.search = this.menu.querySelector(".header-search input");
      this._init();
    }

    _init() {
      document.querySelector(".header").appendChild(this.overlay);
      this.overlay.classList.add("overlay");

      this.overlay.addEventListener("click", this.toggleMenu.bind(this));
      this.button.addEventListener("click", this.toggleMenu.bind(this));
      this.searchtoggle.addEventListener(
        "click",
        this.toggleMenuWithSearchFocus.bind(this),
      );
    }

    toggleMenuWithSearchFocus() {
      this.toggleMenu();

      this.search.focus();
    }

    toggleMenu() {
      this.menu.classList.toggle("menu--open");
      this.button.classList.toggle("menu-button--active");
      this.overlay.hidden = !this.overlay.hidden;

      if (this.isMenuOpen()) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    }

    closeMenu() {
      this.menu.classList.remove("header__nav--active");
      this.button.classList.remove("header__menu-button--active");
      this.overlay.hidden = true;

      this.enableScroll();
    }

    isMenuOpen() {
      return this.menu.classList.contains("menu--open");
    }

    disableScroll() {
      // Get the current page scroll position;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    enableScroll() {
      window.onscroll = function () {};
    }
  }

  const menu = document.querySelector(".menu");
  const menuButton = document.querySelector(".menu-button");

  if (menu && menuButton) {
    new Menu(menu, menuButton);
  }

  const header = document.querySelector("header");

  let handler;

  function scrollAdd() {
    /* ... */
    handler = throttle(function (event) {
      scrollHeader();
    }, 500);
    document.addEventListener("scroll", handler, false);
  }

  function scrollRemove() {
    /* ... */
    document.removeEventListener("scroll", handler, false);
  }

  if (xl.matches) {
    scrollAdd();
    document.removeEventListener("scroll", scrollHeader);
  } else {
    document.addEventListener("scroll", scrollHeader);
    scrollRemove();
  }

  xl.addEventListener("change", () => {
    if (xl.matches) {
      document.removeEventListener("scroll", scrollHeader);
      scrollAdd();
    } else {
      document.addEventListener("scroll", scrollHeader);
      scrollRemove();
    }
  });

  function disableScroll() {
    // Get the current page scroll position;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty("scroll-behavior", "auto");

    // if any scroll is attempted, set this to the previous value;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.style.setProperty("scroll-behavior", null);
    window.onscroll = function () {};
  }

  var prevScrollpos =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  function scrollHeader() {
    var currentScrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (currentScrollPos < 0) {
      currentScrollPos = 0;
      prevScrollpos = 0;
    }
    if (prevScrollpos < 0) {
      prevScrollpos = 0;
      currentScrollPos = 0;
    }
    const num = xl.matches ? 50 : 100;
    if (currentScrollPos > num) {
      header.classList.add("header--active");
    } else {
      header.classList.remove("header--active");
    }
    if (prevScrollpos >= currentScrollPos) {
      header.classList.remove("out");
    } else {
      header.classList.add("out");
    }
    prevScrollpos = currentScrollPos;
  }

  function initHeader() {
    var currentScrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    const num = xl.matches ? 50 : 150;
    if (currentScrollPos > num) {
      header.classList.add("header--active");
    } else {
      header.classList.remove("header--active");
    }
  }

  initHeader();

  function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {
      if (isThrottled) {
        // (2);
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); // (1);

      isThrottled = true;

      setTimeout(function () {
        isThrottled = false; // (3);
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

  const heroswipers = document.querySelectorAll(".hero-swiper");
  if (heroswipers.length) {
    heroswipers.forEach((swiper) => {
      const prevEl = swiper.querySelector(".prev");
      const nextEl = swiper.querySelector(".next");
      const el = swiper.querySelector(".swiper-pagination");

      const CIRCUMFERENCE = 2 * Math.PI * 20; // ≈ 125.66

      new Swiper(swiper, {
        grabCursor: true,
        parallax: xl.matches === false,
        speed: 500,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: { prevEl, nextEl },
        pagination: {
          el,
          clickable: true,
          renderBullet: function (i, className) {
            return `
            <button type="button" class="${className}" aria-label="go to slide ${i}">
              <svg class="progress" viewBox="0 0 41 41">
                <circle class="circle-progress" r="15" cx="20.5" cy="20.5"
                  style="stroke-dasharray: ${CIRCUMFERENCE}; stroke-dashoffset: ${CIRCUMFERENCE};"></circle>
              </svg>
            </button>
          `;
          },
        },
        on: {
          init: function () {
            updateProgress(this);
          },
          slideChange: function () {
            resetProgress(this);
            updateProgress(this);
          },
          init: function () {
            const swiperInstance = this;
            let progressInterval;

            // Fallback progress tracker
            function startProgressTracker() {
              clearInterval(progressInterval);
              const delay = swiperInstance.params.autoplay.delay;
              const startTime = Date.now();

              progressInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / delay, 1);
                const offset = CIRCUMFERENCE * (1 - progress);

                const activeBullet = el.querySelector(
                  ".swiper-pagination-bullet-active",
                );
                const progressCircle =
                  activeBullet?.querySelector(".circle-progress");

                if (progressCircle) {
                  progressCircle.style.strokeDashoffset = offset;
                }
              }, 50);
            }

            startProgressTracker();

            swiperInstance.on("slideChange", () => {
              startProgressTracker();
            });

            swiperInstance.on("destroy", () => {
              clearInterval(progressInterval);
            });
          },
        },
      });

      function resetProgress(swiper) {
        const bullets = el.querySelectorAll(".swiper-pagination-bullet");
        bullets.forEach((bullet) => {
          const circle = bullet.querySelector(".circle-progress");
          if (circle) circle.style.strokeDashoffset = CIRCUMFERENCE;
        });
      }

      function updateProgress(swiper) {
        const activeBullet = el.querySelector(
          ".swiper-pagination-bullet-active",
        );
        if (activeBullet) {
          const circle = activeBullet.querySelector(".circle-progress");
          if (circle) circle.style.strokeDashoffset = CIRCUMFERENCE;
        }
      }
    });
  }

  const catalogsliders = document.querySelectorAll(".mcatalog-swiper");

  if (catalogsliders.length && xl.matches) {
    catalogsliders.forEach((swiper) => {
      new Swiper(swiper, {
        slidesPerView: 1.16,
        grabCursor: true,
        grid: {
          rows: 2,
        },
      });
    });
  }

  // const popularswipers = document.querySelectorAll('.popular-swiper')
  // if (popularswipers.length) {
  //   popularswipers.forEach(swiper => {
  //     new Swiper(swiper, {
  //       slidesPerView: 'auto',
  //       grabCursor: true,
  //     })
  //   })
  // }

  const menulinks = document.querySelectorAll(".menu-withsublist");

  if (menulinks.length) {
    menulinks.forEach((link) => {
      let hoverTimeout = null;

      if (xl.matches) {
        link.addEventListener("click", function () {
          this.classList.toggle("hover");
        });
      } else {
        link.addEventListener("mouseenter", () => {
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
          }
          menulinks.forEach((el) => el.classList.remove("hover"));
          link.classList.add("hover");
          document.documentElement.classList.add("desktop-menu-opened");
        });

        link.addEventListener("mouseleave", () => {
          hoverTimeout = setTimeout(() => {
            link.classList.remove("hover");
            if (!document.querySelector(".menu-withsublist.hover")) {
              document.documentElement.classList.remove("desktop-menu-opened");
            }
            hoverTimeout = null;
          }, 300);
        });
      }
    });
  }

  const menulinks2 = document.querySelectorAll(".header-phoneswrap");

  if (menulinks2.length) {
    menulinks2.forEach((link) => {
      let hoverTimeout = null;

      link.addEventListener("mouseenter", () => {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          hoverTimeout = null;
        }
        menulinks2.forEach((el) => el.classList.remove("hover"));
        link.classList.add("hover");
      });

      link.addEventListener("mouseleave", () => {
        hoverTimeout = setTimeout(() => {
          link.classList.remove("hover");
          hoverTimeout = null;
        }, 300);
      });
    });
  }

  const tabs = document.querySelectorAll(".tabs");
  if (tabs.length) {
    tabs.forEach((tab) => {
      const btns = tab.querySelectorAll(".tabs-btn");
      const content = tab.querySelector(".tabs-content");
      if (btns.length && content) {
        btns.forEach((btn, i) => {
          btn.dataset.tab = i;
          btn.addEventListener("click", function () {
            const copy = content.querySelector(".tabs-copy");
            if (copy && tab?.dataset?.activetab) {
              const activeItem = tab.querySelector(
                `[data-tab="${tab.dataset.activetab}"]`,
              );
              if (activeItem) {
                activeItem.after(copy);

                if (copy.classList.contains("popular-swiper")) {
                  copy.swiper.destroy();
                }
              }
            }

            btns.forEach((el) => el.classList.remove("active"));
            tab.dataset.activetab = btn.dataset.tab;
            this.classList.add("active");
            const next = this.nextElementSibling;

            if (next && next.classList.contains("tabs-copy")) {
              if (next.classList.contains("popular-swiper")) {
                const nextEl = tab.querySelector(".next");
                const prevEl = tab.querySelector(".prev");
                new Swiper(next, {
                  slidesPerView: "auto",
                  grabCursor: true,
                  navigation: {
                    nextEl,
                    prevEl,
                  },
                });
              }

              if (next.classList.contains("admits-swiper")) {
                const nextEl = tab.querySelector(".next");
                const prevEl = tab.querySelector(".prev");
                new Swiper(next, {
                  slidesPerView: "auto",
                  grabCursor: true,
                  navigation: {
                    nextEl,
                    prevEl,
                  },
                });
              }
              content.appendChild(next);
            }
          });
        });
        btns[0].click();
      }
    });
  }

  function addMask() {
    [].forEach.call(
      document.querySelectorAll('input[type="tel"]'),
      function (input) {
        let keyCode;
        function mask(event) {
          event.keyCode && (keyCode = event.keyCode);
          let pos = this.selectionStart;
          if (pos < 3) event.preventDefault();
          let matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
          i = new_value.indexOf("_");
          if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i);
          }
          let reg = matrix
            .substr(0, this.value.length)
            .replace(/_+/g, function (a) {
              return "\\d{1," + a.length + "}";
            })
            .replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (
            !reg.test(this.value) ||
            this.value.length < 5 ||
            (keyCode > 47 && keyCode < 58)
          )
            this.value = new_value;
          if (event.type == "blur" && this.value.length < 5) {
            this.value = "";
            this.classList.remove("havetext");
          }
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
        input.value
          ? input.classList.add("havetext")
          : input.classList.remove("havetext");
      },
    );
  }
  addMask();

  const inputElement = document.querySelector('input[type="file"].filepond');

  FilePond.registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
  );

  FilePond.create(inputElement, {
    storeAsFile: true,

    server: null,
    instantUpload: false,
    allowProcess: false,

    acceptedFileTypes: ["image/jpeg", "image/png", "video/mp4"],
    maxFileSize: "10MB",
    maxFiles: 5,
    allowMultiple: true,
    allowFileTypeValidation: true,

    labelIdle:
      '<svg class="filepond-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.92554 15.1891L15.75 9.2251" stroke="#99A1AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M11.9999 4.50009L5.68939 10.9396C5.40819 11.2209 5.25021 11.6023 5.25021 12.0001C5.25021 12.3978 5.40819 12.7793 5.68939 13.0606C5.97068 13.3418 6.35215 13.4998 6.74989 13.4998C7.14764 13.4998 7.5291 13.3418 7.81039 13.0606L14.1209 6.62109C14.6833 6.05851 14.9993 5.29558 14.9993 4.50009C14.9993 3.7046 14.6833 2.94167 14.1209 2.37909C13.5583 1.81668 12.7954 1.50073 11.9999 1.50073C11.2044 1.50073 10.4415 1.81668 9.87889 2.37909L3.56764 8.81784C2.72366 9.66183 2.24951 10.8065 2.24951 12.0001C2.24951 13.1937 2.72366 14.3384 3.56764 15.1823C4.41163 16.0263 5.55632 16.5005 6.74989 16.5005C7.94347 16.5005 9.08816 16.0263 9.93214 15.1823" stroke="#99A1AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg> <span class="filepond-text">Нажмите, чтобы прикрепить файлы</span> <span class="filepond-small">JPG, PNG, MP4 · до 10 МБ каждый</span>',
    labelFileTypeNotAllowed: "Недопустимый тип файла",
    fileValidateTypeLabelExpectedTypes:
      "Ожидается {allButLastType} или {lastType}",
    labelMaxFileSizeExceeded: "Файл слишком большой",
    labelMaxFileSize: "Максимальный размер: {filesize}",
  });

  const jsvalidate = document.querySelector(".js-validate form");

  if (jsvalidate) {
    const validate = new window.JustValidate(jsvalidate, {
      errorLabelStyle: { color: null },
    });

    const required = document.querySelectorAll(
      '.js-validate form input[type="text"][required], .js-validate form input[type="tel"][required], .js-validate input[type="checkbox"][required]',
    );

    if (required.length) {
      required.forEach((el) => {
        const arr = [
          {
            rule: "required",
            errorMessage: "Это поле обязательно для заполнения",
          },
          {
            rule: "minLength",
            value: 2,
            errorMessage: "Минимальное количество символов: 2",
          },
        ];

        if (el.type === "tel") {
          arr.push({
            rule: "customRegexp",
            value: /^\+7\s?\(?[0-9]{3}\)?\s?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/,
            errorMessage: "Введите номер в формате: +7 (XXX) XXX-XX-XX",
          });
        }

        validate.addField(el, arr);

        if (el.type === "checkbox") {
          validate.addField(
            el,
            [
              {
                rule: "required",
                errorMessage: "Это поле обязательно для заполнения",
              },
            ],
            {
              errorsContainer: ".js-validate .error-container",
            },
          );
        }
      });
    }

    validate.onSuccess((event) => {
      const customEvent = new CustomEvent("validated-submit");
      event.currentTarget.dispatchEvent(customEvent);
    });
  }
});
