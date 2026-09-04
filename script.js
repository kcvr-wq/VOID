/* =====================================================
   VOID — النظام الرئيسي
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


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
       إعدادات الموقع
       
       يجب أن تعمل في جميع الصفحات التي تستدعي هذا الملف.
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


    /* =================================================
       تطبيق إعدادات الموقع
    ================================================= */

    document.body.classList.toggle(
        "light-mode",
        savedTheme === "light"
    );


    document.body.style.fontFamily =
        fontMap[savedFont] ||
        fontMap.segoe;


    /* =================================================
       شاشة الافتتاح
    ================================================= */

    if (
        intro &&
        site
    ) {

        setTimeout(() => {

            intro.classList.add("hide");

            setTimeout(() => {

                site.classList.add("show");

                document.body.style.overflow =
                    "auto";

            }, 900);

        }, 4000);

    }


    /* =================================================
       التنقل بالقائمة
    ================================================= */

    navItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                navItems.forEach((nav) => {

                    nav.classList.remove(
                        "active"
                    );

                });

                item.classList.add(
                    "active"
                );

            }
        );

    });


    /* =================================================
       تحميل تقدم القراءة
    ================================================= */

    const savedProgress =
        localStorage.getItem(
            "voidReadingProgress"
        );


    if (savedProgress) {

        try {

            const data =
                JSON.parse(
                    savedProgress
                );


            if (
                data.title &&
                lastChapterTitle
            ) {

                lastChapterTitle.textContent =
                    data.title;

            }


            let progress =
                Number(data.progress) || 0;


            progress =
                Math.max(
                    0,
                    Math.min(
                        100,
                        progress
                    )
                );


            if (progressPercent) {

                progressPercent.textContent =
                    `${progress}%`;

            }


            if (progressFill) {

                progressFill.style.width =
                    `${progress}%`;

            }


            if (continueCard) {

                continueCard.classList.add(
                    "has-progress"
                );

            }


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


            if (
                latestChapterTitle &&
                data.title
            ) {

                latestChapterTitle.textContent =
                    data.title;

            }


            if (
                latestButton &&
                data.url
            ) {

                latestButton.href =
                    data.url;

                latestButton.classList.remove(
                    "disabled"
                );

                latestButton.removeAttribute(
                    "aria-disabled"
                );

            }

        } catch (error) {

            console.error(
                "تعذر قراءة بيانات التقدم:",
                error
            );

        }

    }


    /* =================================================
       دالة حفظ تقدم القراءة
    ================================================= */

    window.saveReadingProgress =
        function (
            chapter,
            title,
            progress,
            url
        ) {

            const cleanProgress =
                Math.max(
                    0,
                    Math.min(
                        100,
                        Number(progress) || 0
                    )
                );


            const data = {

                chapter:
                    chapter,

                title:
                    title,

                progress:
                    cleanProgress,

                url:
                    url || "#"

            };


            localStorage.setItem(
                "voidReadingProgress",
                JSON.stringify(data)
            );

        };


    /* =================================================
       منع الروابط غير الجاهزة
       
       لا نمنع روابط الملفات الحقيقية.
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


    /* =================================================
       الروابط غير الجاهزة
    ================================================= */

    document
        .querySelectorAll(".empty-link")
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


});
