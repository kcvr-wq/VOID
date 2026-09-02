/* =====================================================
   VOID — نظام شاشة الافتتاح
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const site = document.getElementById("site");

    // نتأكد أن الموقع مخفي في البداية
    site.classList.remove("show");

    // ننتظر حتى تنتهي شاشة الافتتاح
    setTimeout(() => {

        // إخفاء شاشة VOID
        intro.classList.add("hide");

        // بعد بدء اختفاء شاشة الافتتاح
        setTimeout(() => {

            // إظهار الموقع
            site.classList.add("show");

            // السماح بالتمرير
            document.body.style.overflow = "auto";

        }, 900);

    }, 4000);

});
