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

$("#card-date").html(now_date);
$("#card-yearmon").html(`${now_year}.${now_month}`);
switch (now_day.toString()) {
    case "1":
        $("#card-day").html("星期一");
        break;
    case "2":
        $("#card-day").html("星期二");
        break;
    case "3":
        $("#card-day").html("星期三");
        break;
    case "4":
        $("#card-day").html("星期四");
        break;
    case "5":
        $("#card-day").html("星期五");
        break;
    case "6":
        $("#card-day").html("星期六");
        break;
    case "0":
        $("#card-day").html("星期日");
        break;
}

const goTop = document.getElementById("goTopButton");
const article_class = document.getElementById("article_class");
goTop.style.display = "none";
window.onscroll = function () {
    let nowheight = document.documentElement.scrollTop || document.body.scrollTop;
    //滾動條位置
    if (nowheight >= 300) {
        $(goTop).fadeIn(); //顯示按钮
        $(article_class).scrollTop(nowheight * 1.2);
    } else {
        $(goTop).fadeOut(); //隐藏按钮
    }
};

goTop.onclick = function () {
    $("html, body").animate({ scrollTop: 0 }, "fast");
};
