/* =====================================================
   VOID — النظام الرئيسي
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           إعدادات عامة
        ================================================= */

        const MAX_CHAPTERS = 50;


        /*
           آخر فصل منشور حاليًا.

           حاليًا يوجد الفصل 1 فقط.
           عندما تضيف الفصل 2 لاحقًا،
           نغيّر الرقم إلى 2 فقط.
        */

        const LATEST_PUBLISHED_CHAPTER = 1;


        /* =================================================
           خريطة أسماء الفصول
        ================================================= */

        const chapterNames = {

            1: "الفصل الأول",
            2: "الفصل الثاني",
            3: "الفصل الثالث",
            4: "الفصل الرابع",
            5: "الفصل الخامس",
            6: "الفصل السادس",
            7: "الفصل السابع",
            8: "الفصل الثامن",
            9: "الفصل التاسع",
            10: "الفصل العاشر",
            11: "الفصل الحادي عشر",
            12: "الفصل الثاني عشر",
            13: "الفصل الثالث عشر",
            14: "الفصل الرابع عشر",
            15: "الفصل الخامس عشر",
            16: "الفصل السادس عشر",
            17: "الفصل السابع عشر",
            18: "الفصل الثامن عشر",
            19: "الفصل التاسع عشر",
            20: "الفصل العشرون",
            21: "الفصل الحادي والعشرون",
            22: "الفصل الثاني والعشرون",
            23: "الفصل الثالث والعشرون",
            24: "الفصل الرابع والعشرون",
            25: "الفصل الخامس والعشرون",
            26: "الفصل السادس والعشرون",
            27: "الفصل السابع والعشرون",
            28: "الفصل الثامن والعشرون",
            29: "الفصل التاسع والعشرون",
            30: "الفصل الثلاثون",
            31: "الفصل الحادي والثلاثون",
            32: "الفصل الثاني والثلاثون",
            33: "الفصل الثالث والثلاثون",
            34: "الفصل الرابع والثلاثون",
            35: "الفصل الخامس والثلاثون",
            36: "الفصل السادس والثلاثون",
            37: "الفصل السابع والثلاثون",
            38: "الفصل الثامن والثلاثون",
            39: "الفصل التاسع والثلاثون",
            40: "الفصل الأربعون",
            41: "الفصل الحادي والأربعون",
            42: "الفصل الثاني والأربعون",
            43: "الفصل الثالث والأربعون",
            44: "الفصل الرابع والأربعون",
            45: "الفصل الخامس والأربعون",
            46: "الفصل السادس والأربعون",
            47: "الفصل السابع والأربعون",
            48: "الفصل الثامن والأربعون",
            49: "الفصل التاسع والأربعون",
            50: "الفصل الخمسون"

        };


        /* =================================================
           إعدادات الموقع
        ================================================= */

        const savedTheme =
            localStorage.getItem(
                "voidSiteTheme"
            ) || "dark";


        const savedFont =
            localStorage.getItem(
                "voidSettingsFont"
            ) || "segoe";


        const fontMap = {

            segoe:
                '"Segoe UI", Tahoma, Arial, sans-serif',

            tahoma:
                'Tahoma, Arial, sans-serif',

            arial:
                'Arial, sans-serif',

            serif:
                'Georgia, "Times New Roman", serif',

            amiri:
                '"Amiri", serif'

        };


        document.body.classList.toggle(
            "light-mode",
            savedTheme === "light"
        );


        document.body.style.fontFamily =
            fontMap[savedFont] ||
            fontMap.segoe;


        document.body.classList.toggle(
            "site-font-amiri",
            savedFont === "amiri"
        );


        /* =================================================
           العناصر
        ================================================= */

        const intro =
            document.getElementById("intro");


        const site =
            document.getElementById("site");


        const navItems =
            document.querySelectorAll(".nav-item");


        const continueCard =
            document.getElementById("continue-card");


        const continueButton =
            document.getElementById("continue-button");


        const lastChapterTitle =
            document.getElementById("last-chapter-title");


        const progressPercent =
            document.getElementById("progress-percent");


        const progressFill =
            document.getElementById("progress-fill");


        const latestChapterTitle =
            document.getElementById(
                "latest-chapter-title"
            );


        const latestButton =
            document.getElementById(
                "latest-button"
            );


        /* =================================================
           شاشة الافتتاح
        ================================================= */

        if (
            intro &&
            site
        ) {

            document.body.style.overflow =
                "hidden";


            setTimeout(
                () => {

                    intro.classList.add(
                        "hide"
                    );


                    setTimeout(
                        () => {

                            site.classList.add(
                                "show"
                            );

                            document.body.style.overflow =
                                "auto";

                        },
                        900
                    );

                },
                4000
            );

        }


        /* =================================================
           التنقل
        ================================================= */

        navItems.forEach(
            (item) => {

                item.addEventListener(
                    "click",
                    () => {

                        navItems.forEach(
                            (nav) => {

                                nav.classList.remove(
                                    "active"
                                );

                            }
                        );


                        item.classList.add(
                            "active"
                        );

                    }
                );

            }
        );


        /* =================================================
           أدوات تقدم القراءة
        ================================================= */

        function getAllReadingProgress() {

            try {

                const saved =
                    localStorage.getItem(
                        "voidReadingProgress"
                    );


                if (!saved) {

                    return {};

                }


                const data =
                    JSON.parse(
                        saved
                    );


                if (
                    typeof data !== "object" ||
                    data === null ||
                    Array.isArray(data)
                ) {

                    return {};

                }


                return data;

            } catch (error) {

                console.error(
                    "تعذر تحميل تقدم القراءة:",
                    error
                );


                return {};

            }

        }


        function saveAllReadingProgress(
            data
        ) {

            localStorage.setItem(
                "voidReadingProgress",
                JSON.stringify(data)
            );

        }


        function getChapterProgress(
            chapter
        ) {

            const allProgress =
                getAllReadingProgress();


            return (
                allProgress[chapter] ||
                {
                    chapter:
                        chapter,

                    title:
                        chapterNames[chapter] ||
                        `الفصل ${chapter}`,

                    progress:
                        0,

                    completed:
                        false,

                    url:
                        `chapters/chapter-${chapter}.html`

                }
            );

        }


        window.saveReadingProgress =
            function(
                chapter,
                title,
                progress,
                url
            ) {

                const allProgress =
                    getAllReadingProgress();


                let cleanProgress =
                    Number(progress) || 0;


                cleanProgress =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            cleanProgress
                        )
                    );


                const previous =
                    allProgress[chapter] ||
                    {};


                const completed =
                    cleanProgress >= 100;


                allProgress[chapter] = {

                    chapter:
                        chapter,

                    title:
                        title ||
                        chapterNames[chapter] ||
                        `الفصل ${chapter}`,

                    progress:
                        cleanProgress,

                    completed:
                        completed,

                    url:
                        url ||
                        previous.url ||
                        `chapters/chapter-${chapter}.html`

                };


                saveAllReadingProgress(
                    allProgress
                );

            };


        /* =================================================
           آخر فصل تمت قراءته
        ================================================= */

        function getLatestReadChapter() {

            const allProgress =
                getAllReadingProgress();


            const chapters =
                Object.keys(
                    allProgress
                )
                .map(
                    Number
                )
                .filter(
                    (number) =>
                        Number.isInteger(number) &&
                        number >= 1 &&
                        number <= MAX_CHAPTERS
                );


            if (
                chapters.length === 0
            ) {

                return null;

            }


            chapters.sort(
                (a, b) =>
                    b - a
            );


            return chapters[0];

        }


        const latestReadChapter =
            getLatestReadChapter();


        if (
            latestReadChapter &&
            continueCard
        ) {

            const data =
                getChapterProgress(
                    latestReadChapter
                );


            if (lastChapterTitle) {

                lastChapterTitle.textContent =
                    data.title;

            }


            if (progressPercent) {

                progressPercent.textContent =
                    `${Math.round(data.progress)}%`;

            }


            if (progressFill) {

                progressFill.style.width =
                    `${data.progress}%`;

            }


            continueCard.classList.add(
                "has-progress"
            );


            if (
                continueButton &&
                data.url
            ) {

                continueButton.href =
                    data.url;

                continueButton.classList.remove(
                    "disabled"
                );

                continueButton.removeAttribute(
                    "aria-disabled"
                );

            }

        }


        /* =================================================
           آخر فصل منشور
        ================================================= */

        if (
            latestChapterTitle &&
            latestButton &&
            LATEST_PUBLISHED_CHAPTER > 0
        ) {

            const latestTitle =
                chapterNames[
                    LATEST_PUBLISHED_CHAPTER
                ] ||
                `الفصل ${LATEST_PUBLISHED_CHAPTER}`;


            latestChapterTitle.textContent =
                latestTitle;


            latestButton.href =
                `chapters/chapter-${LATEST_PUBLISHED_CHAPTER}.html`;


            latestButton.classList.remove(
                "disabled"
            );


            latestButton.removeAttribute(
                "aria-disabled"
            );

        }


        /* =================================================
           الروابط غير الجاهزة
        ================================================= */

        document
            .querySelectorAll(
                'a[href="#"]'
            )
            .forEach(
                (link) => {

                    link.addEventListener(
                        "click",
                        (event) => {

                            event.preventDefault();

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                ".empty-link"
            )
            .forEach(
                (link) => {

                    link.addEventListener(
                        "click",
                        (event) => {

                            event.preventDefault();

                        }
                    );

                }
            );


    }
);
