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
       شاشة الافتتاح
    ================================================= */

    setTimeout(() => {

        intro.classList.add("hide");

        setTimeout(() => {

            site.classList.add("show");

            document.body.style.overflow =
                "auto";

        }, 900);

    }, 4000);


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


            /* =============================================
               عنوان آخر فصل تمت قراءته
            ============================================== */

            if (
                data.title &&
                lastChapterTitle
            ) {

                lastChapterTitle.textContent =
                    data.title;

            }


            /* =============================================
               نسبة التقدم
            ============================================== */

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


            /* =============================================
               إظهار بطاقة المتابعة
            ============================================== */

            if (continueCard) {

                continueCard.classList.add(
                    "has-progress"
                );

            }


            /* =============================================
               رابط متابعة القراءة
            ============================================== */

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


            /* =============================================
               تحديث آخر فصل
            ============================================== */

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
       
       سيتم استخدامها لاحقًا داخل صفحات الفصول.
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
       منع الأزرار غير الجاهزة
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


});
