// 使用 Day.js
// const now_today = dayjs().format("YYYY-MM-DD");
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

// 按讚
function like(obj) {
    const obj_node = obj.parentNode; //tr
    const has_like = $(obj_node).parent().find("i.fa-heart").hasClass("ct-txt-2");
    let like_count = parseInt($(obj_node).parent().find(".like_count").html());

    if (has_like) {
        $(obj_node).parent().find("i.fa-heart").removeClass("ct-txt-2");
        $(obj_node).parent().find("i.fa-heart").addClass("ct-sub-1");
        $(obj_node)
            .parent()
            .find("span.like_count")
            .html(like_count - 1);
        //後端處理 更新按讚數
    } else {
        $(obj_node).parent().find("i.fa-heart").removeClass("ct-sub-1");
        $(obj_node).parent().find("i.fa-heart").addClass("ct-txt-2");
        $(obj_node)
            .parent()
            .find("span.like_count")
            .html(like_count + 1);
        //後端處理 更新按讚數
    }
}

// 收藏文章
function collect(obj) {
    const obj_node = obj.parentNode; //tr
    const no_collect = $(obj_node).parent().find("i.fa-bookmark").hasClass("far");
    //前端顯示已收藏/未收藏按紐
    if (no_collect) {
        $(obj_node).parent().find("i.fa-bookmark").removeClass("far ct-sub-1");
        $(obj_node).parent().find("i.fa-bookmark").addClass("fas ct-txt-2");
    } else {
        $(obj_node).parent().find("i.fa-bookmark").removeClass("fas ct-txt-2");
        $(obj_node).parent().find("i.fa-bookmark").addClass("far ct-sub-1");
    }
    //後端處理 回傳本篇文章id?
    let article_id = $(".article_content").attr("id");
    console.log(article_id);
}

// 追蹤按鈕
function follow(obj, type) {
    if (type == "author") {
        //追蹤作者
        let follow_author = $("#article_author").html();
        console.log(follow_author);
        //後端處理
    }
}

//編輯留言按鈕
let edit_cmt_obj = "";
function edit_comment(obj) {
    edit_cmt_obj = $(obj).parents().eq(3).find(".comment_content").eq(0);
    $(edit_cmt_obj).attr("contenteditable", "true"); //開啟可編輯
    $(edit_cmt_obj).focus(); //亮起可編輯區域
}

//當編輯留言離開焦點時，儲存更新當前文字內容
$(document).on("blur", ".comment_content", function () {
    $(edit_cmt_obj).html($(this).html()); //更新留言內容
    $(edit_cmt_obj).attr("contenteditable", "false"); //取消可編輯

    //後端回傳資料 更新留言內容
    let cmt_id = $(edit_cmt_obj).parent().attr("id"); //留言id
    let cmt_content = $(this).html(); //留言內容
    console.log(cmt_id, cmt_content); //該留言id & 內容
});

//刪除留言
function del_comment(obj) {
    Swal.fire({
        title: `確定刪除留言？`,
        text: "選擇「刪除」確定後留言就刪除囉！",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "刪除",
        cancelButtonText: `取消`,
        confirmButtonColor: "#f24726",
        cancelButtonColor: "#808080",
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("刪除成功");
            let cmt_content = $(obj).parents().eq(5).find(".comment_content").eq(0);
            $(obj).parents().eq(4).find(".cmt_author").eq(0).html("此則留言已被本人刪除");
            $(cmt_content).html("--- 此則留言已被本人刪除，刪除留言無法再被查看 ---");
            $(cmt_content).addClass("fst-italic text-muted");
            $(cmt_content).removeClass("ct-title-1");

            //後端處理
            let cmt_id = $(cmt_content).parent().attr("id"); //留言id
            console.log(cmt_id);
        }
    });
}

//檢舉留言
function report_comment(obj) {
    Swal.fire({
        title: "檢舉此則留言?",
        icon: "warning",
        input: "select",
        inputOptions: {
            惡意言論: "中傷、歧視、挑釁或謾罵他人",
            惡意洗版: "惡意洗版、重複張貼",
            不舒服內容: "發表內容包含色情、性騷擾、恐怖血腥等讓人不舒服之內容",
            其他: "其他",
        },
        inputPlaceholder: "不喜歡的原因",
        showCancelButton: true,
        confirmButtonColor: "#f24726",
        confirmButtonText: "回報",
        cancelButtonText: "取消",
        inputValidator: (value) => {
            if (!value) {
                return "請選擇不喜歡的原因";
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            $(obj).hide(); //檢舉後，按鈕即不見(不可重複按、檢舉)
            let cmt_content = $(obj).parents().eq(5).find(".comment_content").eq(0);

            Swal.fire({
                title: `謝謝您的反饋`,
                html: "感謝你的意見告知<br/>這將協助我們維護良好的社群規範與安全！",
                icon: "success",
                showConfirmButton: false,
                timer: 2500,
            });

            //後端資料處理
            let cmt_id = $(cmt_content).parent().attr("id"); //留言id
            let report_item = result.value; //檢舉選項: 惡意言論/垃圾訊息/不實訊息/不喜歡
            console.log(cmt_id, report_item);
        }
    });
}

//療心室-票選活動 投票
function vote(obj) {
    let select_item = $('input[name="vote_item"]:checked')
        .map(function () {
            return this.value;
        })
        .get()
        .join(",");
    console.log(select_item);
}

// //療心室-票選活動 倒數計時
// $(".countdown")._countTime("2023-08-03 12:30:00", {
//     isActive: true,
//     str: {
//         title: "活動截止：",
//         day: "日",
//     },
// });
