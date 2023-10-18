// 使用 Day.js
// const now_today = dayjs().format("YYYY-MM-DD");
// $("#article_date").html(now_today);

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
    const obj_node = obj.parentNode; //取得前端組件
    const has_like = $(obj_node).parent().find("i.fa-heart").hasClass("ct-txt-2"); //取得目前狀態有無按讚
    let like_count = parseInt($(obj_node).parent().find(".like_count").html()); //取得當前按讚數

    if (has_like) {
        // 按讚取消 讚數-1
        $(obj_node).parent().find("i.fa-heart").removeClass("ct-txt-2");
        $(obj_node).parent().find("i.fa-heart").addClass("ct-sub-1");
        $(obj_node)
            .parent()
            .find("span.like_count")
            .html(like_count - 1);
        //後端處理 更新按讚數
    } else {
        // 按讚 讚數+1
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
    const obj_node = obj.parentNode; //取得前端組件
    let article_id = $(".article_content").attr("id"); //文章ID
    const no_collect = $(obj_node).parent().find("i.fa-bookmark").hasClass("far"); //取得目前狀態有無收藏
    //前端顯示已收藏/未收藏按紐
    if (no_collect) {
        // 收藏文章
        $(obj_node).parent().find("i.fa-bookmark").removeClass("far ct-sub-1");
        $(obj_node).parent().find("i.fa-bookmark").addClass("fas ct-txt-2");

        //後端處理 回傳本篇文章id?
    } else {
        //取消收藏
        $(obj_node).parent().find("i.fa-bookmark").removeClass("fas ct-txt-2");
        $(obj_node).parent().find("i.fa-bookmark").addClass("far ct-sub-1");

        //後端處理 回傳本篇文章id?
    }
    console.log(article_id);
}

// 追蹤按鈕
function follow(obj, type) {
    if (type == "author") {
        //追蹤作者
        let follow_author = $("#article_author").html(); //取得發文者名稱
        console.log(follow_author);
        //後端處理
    }
}

//編輯留言按鈕
let edit_cmt_obj = "";
function edit_comment(obj) {
    edit_cmt_obj = $(obj).parents().eq(3).find(".comment_content").eq(0); //取得前端組件 編輯區塊
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
    //跳出確認視窗
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
            //確定刪除
            console.log("刪除成功");
            let cmt_content = $(obj).parents().eq(5).find(".comment_content").eq(0); //取得要刪除的留言內容物件
            $(obj).parents().eq(4).find(".cmt_author").eq(0).html("此則留言已被本人刪除"); //更改發文者名稱
            $(cmt_content).html("--- 此則留言已被本人刪除，刪除留言無法再被查看 ---"); //刪除後不可見，更改留言內容
            $(cmt_content).addClass("fst-italic text-muted");
            $(cmt_content).removeClass("ct-title-1");

            //後端處理
            let cmt_id = $(cmt_content).parent().attr("id"); //該則留言id
            console.log(cmt_id);
        }
    });
}

//點檢舉留言 賦予傳值給視窗對應的留言ID
$("#reportModal").on("show.bs.modal", function (e) {
    //get data-id attribute of the clicked element
    var cmtId = $(e.relatedTarget).data("cmt-id"); //取得點選的留言ID
    console.log(cmtId);
    //給開啟的modal中確認按鈕添加data-cmt-id 屬性並賦值，以對應之後送出檢舉後可取得要檢舉的留言id
    $("#report_confirm_btn").attr("data-cmt-id", cmtId);
});

//檢舉留言
function report_comment(obj) {
    let cmt_id = $(obj).attr("data-cmt-id"); //取得要檢舉的留言id
    let report_item = $("input[name='report_radio']:checked").val(); //檢舉選項: 惡意言論/重複洗版/不舒服內容

    //如需取用詳細檢舉描述內容 請依 report_item 對照下表
    let report_detail = {
        惡意言論: "中傷、歧視、挑釁或謾罵他人",
        重複洗版: "惡意洗版、重複張貼",
        不舒服內容: "發表內容包含色情、性騷擾、恐怖血腥等讓人不舒服之內容",
    };

    if (report_item == "其他") {
        let report_other = $("#report_other").val(); //如選其他，取得描述文字
        report_item += `,${report_other}`;
    }

    //後端資料處理

    //檢舉成功後之動作
    $("#reportModal").modal("hide"); //關閉視窗
    $("input[name='report_radio']:checked").prop("checked", false); //移除殘留選項
    Swal.fire({
        title: `謝謝您的反饋`,
        html: "感謝你的意見告知<br/>這將協助我們維護良好的社群規範與安全！",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
    });
    console.log(cmt_id, report_item);
}

//療心室-票選活動 投票
function vote(obj) {
    //取得選取的投票選項
    let select_item = $('input[name="vote_item"]:checked')
        .map(function () {
            return this.value;
        })
        .get()
        .join(",");
    console.log(select_item);
}

//點擊分享 將當前網址填入shareModal內
$("#shareModal").on("show.bs.modal", function (e) {
    $("#input_link").val(location.href);
});

//分享文章 複製連結
const select = (DOM) => document.querySelector(DOM);
select("#copylink_btn").addEventListener("click", () => {
    select("#input_link").select(); //選取連結文字
    navigator.clipboard.writeText(select("#input_link").value).then(() => {
        //當複製時，顯示'已複製'文字
        $("#copylink_btn").html("Copied");
        setTimeout(() => {
            window.getSelection().removeAllRanges(); //remove selection from page
            $("#copylink_btn").html("複製連結");
        }, 3000);
    });
});
