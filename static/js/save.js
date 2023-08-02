//文章收藏列表頁

//修改分類名稱
$("#rename_saved_btn").click(function (e) {
    let saved_name = $(e.target).parents().find(".class-title").html();
    saved_name = saved_name.replace(`<i class="fab fa-gratipay me-1 ct-txt-1"></i>`, "");

    Swal.fire({
        title: "重新命名收藏",
        input: "text",
        inputLabel: "輸入收藏分類",
        inputPlaceholder: "輸入收藏分類",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        confirmButtonColor: "#70c6e3",
        inputValidator: (value) => {
            if (!value) {
                return "請勿填空，務必確實填寫！";
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            let new_saved_name = `<i class="fab fa-gratipay me-1 ct-txt-1"></i>` + result.value;
            $(e.target).parents().find(".class-title").html(new_saved_name);
            Swal.fire("修改成功!", "", "success");

            //後端資料處理
        }
    });
});

//刪除文章分類
$("#del_saved_btn").click(function (e) {
    let saved_name = $(e.target).parents().find(".class-title").html();
    saved_name = saved_name.replace(`<i class="fab fa-gratipay me-1 ct-txt-1"></i>`, "");

    Swal.fire({
        title: "刪除收藏",
        text: `確認刪除「${saved_name}」收藏分類?`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "刪除",
        cancelButtonText: "取消",
        confirmButtonColor: "#f24726",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("刪除成功!", "", "success");
            //後端資料處理
        }
    });
});

//新增文章分類
$("#add_saved_btn").click(function (e) {
    Swal.fire({
        title: "新增收藏分類",
        input: "text",
        inputPlaceholder: "輸入新的收藏分類名稱",
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        confirmButtonColor: "#70c6e3",
        inputValidator: (value) => {
            if (!value) {
                return "請勿填空，務必確實填寫！";
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("新增成功!", "", "success");
            //後端資料處理
            //重新整理頁面
        }
    });
});

//作者、話題追蹤頁
//通知按鈕
function notfiy_saved_btn(obj) {
    let notfiy_enable = $(obj).parent().find("i").attr("class").includes("slash");
    if (notfiy_enable) {
        $(obj).parent().find("i").removeClass("fa-bell-slash");
        $(obj).parent().find("i").addClass("fa-bell");
        //後端處理
    } else {
        $(obj).parent().find("i").removeClass("fa-bell");
        $(obj).parent().find("i").addClass("fa-bell-slash");
        //後端處理
    }
}

//追蹤按鈕
function follow_saved_btn(obj) {
    let follow_enable = $(obj).html().includes("追蹤中");
    if (follow_enable) {
        //後端處理
    } else {
        //後端處理
    }
}
