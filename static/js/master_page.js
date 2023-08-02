const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

// 使用 Day.js
const now_year = dayjs().year();
const now_month = dayjs().format("MM");
const now_date = dayjs().date();
const now_day = dayjs().day();
const now_today = dayjs().format("YYYY-MM-DD");

document.addEventListener("click", function (e) {
    let checkNotifyShow = $(e.target).parents(".notfiy_bell,.notifications");
    if (checkNotifyShow.length == 0) {
        $("#notifications_box").removeClass("show");
        notify_dropdown = false;
    }
});

//點選通知 打開選單
let notify_dropdown = false;
$(".notfiy_bell").click(function (e) {
    if (notify_dropdown) {
        $("#notifications_box").removeClass("show");
        notify_dropdown = false;
    } else {
        $("#notifications_box").addClass("show");
        notify_dropdown = true;
    }
});

//頂端欄 滑動顯示下拉選單
$("#topbar-nav-tabs > li:not(.dropstart)").mouseover(function () {
    $(this).find(".dropdown-menu").addClass("show");
});
$("#topbar-nav-tabs > li:not(.dropstart)").mouseout(function () {
    $(this).find(".dropdown-menu").removeClass("show");
});
