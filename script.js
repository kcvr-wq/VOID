```javascript
/* =====================================================
   VOID — نظام شاشة الافتتاح
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const site = document.getElementById("site");

    // نخفي الموقع في البداية
    site.style.opacity = "0";
    site.style.visibility = "hidden";

    // مدة شاشة الافتتاح
    setTimeout(() => {

        // بدء اختفاء شاشة الافتتاح
        intro.classList.add("hide");

        // إظهار الموقع بعد بداية الانتقال
        setTimeout(() => {

            site.style.visibility = "visible";
            site.style.opacity = "1";

        }, 700);

    }, 3500);

});
```
