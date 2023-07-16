const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

$("#topbar-nav-tabs > li:not(.dropstart)").mouseover(function () {
    $(this).find(".dropdown-menu").addClass("show");
});
$("#topbar-nav-tabs > li:not(.dropstart)").mouseout(function () {
    $(this).find(".dropdown-menu").removeClass("show");
});

// 使用 Day.js
const now_year = dayjs().year();
const now_month = dayjs().format("MM");
const now_date = dayjs().date();
const now_day = dayjs().day();
const now_today = dayjs().format("YYYY-MM-DD");
