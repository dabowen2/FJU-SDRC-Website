$("#article_class_list > li").mouseover(function () {
    $(this).find(".collapse").addClass("show");
});
$("#article_class_list > li").mouseout(function () {
    $(this).find(".collapse").removeClass("show");
});

function like(obj) {
    const obj_node = obj.parentNode; //tr
    const has_like = $(obj_node).parent().find("i.fa-heart").hasClass("ct-txt-1");
    let like_count = parseInt($(obj_node).parent().find("span").html());

    if (has_like) {
        $(obj_node).parent().find("i.fa-heart").removeClass("ct-txt-1");
        $(obj_node).parent().find("i.fa-heart").addClass("ct-sub-1");
        $(obj_node)
            .parent()
            .find("span.like_count")
            .html(like_count - 1);
    } else {
        $(obj_node).parent().find("i.fa-heart").removeClass("ct-sub-1");
        $(obj_node).parent().find("i.fa-heart").addClass("ct-txt-1");
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
        $(obj_node).parent().find("i.fa-bookmark").addClass("fas ct-txt-1");
    } else {
        $(obj_node).parent().find("i.fa-bookmark").removeClass("fas ct-txt-1");
        $(obj_node).parent().find("i.fa-bookmark").addClass("far ct-sub-1");
    }
}
