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

    const continueEmpty =
        document.getElementById("continue-empty");

    const lastChapterTitle =
        document.getElementById("last-chapter-title");

    const progressPercent =
        document.getElementById("progress-percent");

    const progressFill =
        document.getElementById("progress-fill");

    const primaryButton =
        document.querySelector(".primary-button");


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
       زر ابدأ القراءة
       
       حاليًا يفتح الفصل الأول.
       لاحقًا سنربطه بنظام الفصول الحقيقي.
    ================================================= */

    if (primaryButton) {

        primaryButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                window.location.href =
                    "chapters/chapter-1/";

            }
        );

    }


    /* =================================================
       التنقل بالقائمة
    ================================================= */

    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            navItems.forEach((nav) => {

                nav.classList.remove("active");

            });

            item.classList.add("active");

        });

    });


    /* =================================================
       نظام متابعة القراءة

       البيانات المحفوظة ستكون بالشكل:

       {
           chapter: "chapter-1",
           title: "الفصل الأول",
           progress: 72,
           url: "chapters/chapter-1/"
       }
    ================================================= */

    const savedProgress =
        localStorage.getItem(
            "voidReadingProgress"
        );


    if (savedProgress) {

        try {

            const data =
                JSON.parse(savedProgress);


            /* =============================================
               عرض آخر فصل
            ============================================= */

            if (data.title) {

                lastChapterTitle.textContent =
                    data.title;

            }


            /* =============================================
               نسبة التقدم
            ============================================= */

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


            progressPercent.textContent =
                `${progress}%`;

            progressFill.style.width =
                `${progress}%`;


            /* =============================================
               إظهار بطاقة المتابعة
            ============================================= */

            continueCard.classList.add(
                "has-progress"
            );


            /* =============================================
               زر المتابعة
            ============================================= */

            if (data.url) {

                continueButton.href =
                    data.url;

            }


            continueButton.addEventListener(
                "click",
                (event) => {

                    if (!data.url) {

                        event.preventDefault();

                        return;

                    }

                }
            );

        } catch (error) {

            console.error(
                "تعذر قراءة بيانات التقدم:",
                error
            );

        }

    }


    /* =================================================
       دالة حفظ تقدم القراءة

       سنستخدمها داخل صفحات الفصول لاحقًا.

       مثال:

       saveReadingProgress(
           "chapter-1",
           "الفصل الأول",
           72,
           "chapters/chapter-1/"
       );
    ================================================= */

    window.saveReadingProgress =
        function (
            chapter,
            title,
            progress,
            url
        ) {

            const data = {

                chapter:
                    chapter,

                title:
                    title,

                progress:
                    Math.max(
                        0,
                        Math.min(
                            100,
                            Number(progress) || 0
                        )
                    ),

                url:
                    url || "#"

            };


            localStorage.setItem(
                "voidReadingProgress",
                JSON.stringify(data)
            );

        };


    /* =================================================
       منع أزرار الصفحات غير الموجودة حاليًا

       عندما نبني الفصول سنضع الروابط الحقيقية.
    ================================================= */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    });

});
