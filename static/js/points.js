//任務專區 任務類型篩選
function task_class_filter(cls) {
    let cls_len = $("#task_list").find(".task_class").length;
    let cls_arr = $("#task_list").find(".task_class");
    if (cls == "all") {
        $("#task_list")
            .find(".row")
            .each(function (i, obj) {
                $(obj).css("display", "");
            });
    } else {
        cls_arr.each(function (i, obj) {
            let now_cls = $(obj).html();
            switch (now_cls) {
                case "新手任務": {
                    now_cls = "beginner";
                    break;
                }
                case "活動任務": {
                    now_cls = "activity";
                    break;
                }
                case "常態任務": {
                    now_cls = "normal";
                    break;
                }
                default: {
                    break;
                }
            }

            if (cls != now_cls) {
                $(obj).parents(".row").eq(0).css("display", "none");
            } else {
                $(obj).parents(".row").eq(0).css("display", "");
            }
        });
    }
}

//點數轉贈 送出確認彈出視窗
function points_gift() {
    let gift_points = $("#gift_points").val();
    let gift_account = $("#gift_account").val();
    if (gift_points == "" || gift_account == "") {
        Swal.fire({
            title: `填寫有誤`,
            text: "請再檢查欄位是否確實有填寫！",
            confirmButtonColor: "#70c6e3",
        });
    } else {
        Swal.fire({
            title: `贈送${gift_account} ${gift_points}點？`,
            showCancelButton: true,
            confirmButtonText: "贈送",
            cancelButtonText: `取消`,
            confirmButtonColor: "#70c6e3",
            cancelButtonColor: "#808080",
        }).then((result) => {
            if (result.isConfirmed) {
                // 跳轉 point_gift2 頁面
                // Swal.fire({
                //     title: "贈送成功",
                //     icon: "success",
                //     confirmButtonColor: "#70c6e3",
                // });
            }
        });
    }
}
