// 使用 Day.js
const now_today = dayjs().format("YYYY-MM-DD");
$("#article_date").html(now_today);

$("#content_tabs > li > a").click(function () {
    var target = $(this).attr("href");
    $("html, body").animate(
        {
            scrollTop: $(target).offset().top - 100,
        },
        300
    );
    return false;
});

function like(obj) {
    const obj_node = obj.parentNode; //tr
    const has_like = $(obj_node).parent().find("i.fa-heart").hasClass("ct-txt-2");
    let like_count = parseInt($(obj_node).parent().find("span").html());

    if (has_like) {
        $(obj_node).parent().find("i.fa-heart").removeClass("ct-txt-2");
        $(obj_node).parent().find("i.fa-heart").addClass("ct-sub-1");
        $(obj_node)
            .parent()
            .find("span.like_count")
            .html(like_count - 1);
    } else {
        $(obj_node).parent().find("i.fa-heart").removeClass("ct-sub-1");
        $(obj_node).parent().find("i.fa-heart").addClass("ct-txt-2");
        $(obj_node)
            .parent()
            .find("span.like_count")
            .html(like_count + 1);
    }
}

function collect(obj) {
    const obj_node = obj.parentNode; //tr
    const no_collect = $(obj_node).parent().find("i.fa-bookmark").hasClass("far");
    if (no_collect) {
        $(obj_node).parent().find("i.fa-bookmark").removeClass("far ct-sub-1");
        $(obj_node).parent().find("i.fa-bookmark").addClass("fas ct-txt-2");
    } else {
        $(obj_node).parent().find("i.fa-bookmark").removeClass("fas ct-txt-2");
        $(obj_node).parent().find("i.fa-bookmark").addClass("far ct-sub-1");
    }
}

//療心室-票選活動 倒數計時
$(".countdown")._countTime("2023-08-03 12:30:00", {
    isActive: true,
    str: {
        title: "活動截止：",
        day: "日",
    },
});
