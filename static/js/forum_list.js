// $("#article_class_list > li").mouseover(function () {
//     $(this).find(".collapse").addClass("show");
// });
// $("#article_class_list > li").mouseout(function () {
//     $(this).find(".collapse").removeClass("show");
// });

// $("#info_class_list > li").mouseover(function () {
//     $(this).find(".collapse").addClass("show");
// });
// $("#info_class_list > li").mouseout(function () {
//     $(this).find(".collapse").removeClass("show");
// });

// 按讚
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

function collect(obj, article_id) {
    const obj_node = obj.parentNode; //tr
    const no_collect = $(obj_node).parent().find("i.fa-bookmark").hasClass("far");
    if (no_collect) {
        $(obj_node).parent().find("i.fa-bookmark").removeClass("far ct-sub-1");
        $(obj_node).parent().find("i.fa-bookmark").addClass("fas ct-txt-2");
    } else {
        $(obj_node).parent().find("i.fa-bookmark").removeClass("fas ct-txt-2");
        $(obj_node).parent().find("i.fa-bookmark").addClass("far ct-sub-1");
    }

    //後端處理 回傳本篇文章id?
    console.log(article_id);
}

// 療心事 建立聊療>發文
function post() {
    let title = $("#input_new_title").val(); //標題
    let id_type = $("#id_type").val(); //身分類別
    let treat_class = $("#treat_class").val(); //聊療類別
    let topics = $("#input_topic").val(); //用戶自定義hashtag話題

    //如有插入圖片，幫圖片加class 設定width:100%
    tinymce.activeEditor.dom.addClass(tinymce.activeEditor.dom.select("img"), "w-100");
    let editor_content = tinymce.get("editor").getContent();
    console.log(editor_content);

    //後端處理
}

// 療心事 建立聊療>暫存草稿
function draft() {
    let title = $("#input_new_title").val(); //標題
    let id_type = $("#id_type").val(); //身分類別
    let treat_class = $("#treat_class").val(); //聊療類別
    let topics = $("#input_topic").val(); //用戶自定義hashtag話題

    //如有插入圖片，幫圖片加class 設定width:100%
    tinymce.activeEditor.dom.addClass(tinymce.activeEditor.dom.select("img"), "w-100");
    let editor_content = tinymce.get("editor").getContent();
    console.log(editor_content);

    //後端處理
}

// 知識圖書館 > 營養師發文選項觸發
$("input[name='post-options']").click(function () {
    //若選「排程發佈」，需出現日期及時間選擇
    if ($("#post-option2").prop("checked") == true) {
        $(".post-datetime-pick").removeClass("d-none");
    } else {
        $(".post-datetime-pick").addClass("d-none");
    }
});


$("#add_voteitem_btn").click(function(){
    let id = parseInt($("#vote_item_list").find('input:last').attr('id').replace("vote_item","")) + 1;
    let newItem = `<input type="text" class="form-control my-1" id="vote_item${id}" placeholder="選項${id}" />`;
    $("#vote_item_list").append(newItem);
})

// 當選擇「排程時間」時
$('#post_settime').click(function(){
    // 解除對應輸入框的禁用
    $('#input_post_time').prop('disabled', false);
});

// 當選擇「立即發布」時
$('#post_now').click(function(){
    // 將輸入框禁用
    $('#input_post_time').prop('disabled', true);
});