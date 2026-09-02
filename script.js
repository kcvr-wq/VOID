```javascript
/* =====================================================
   VOID — شاشة الافتتاح
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");

    /*
        مدة شاشة الافتتاح:
        3.5 ثوانٍ
    */

    setTimeout(() => {
        intro.classList.add("hide");
    }, 3500);

});
```
