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
    let gift_points = $("#gift_points").val(); //要贈送的點數
    let gift_account = $("#gift_account").val(); //要贈送的對象
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
                //後端處理
                // 跳轉 point_gift2 頁面
            }
        });
    }
}

// 點數兌換頁
const exg_list = {};

//兌換數量調整加減
function add_product(obj, sum_type) {
    let pd_num = parseInt($(obj).parent().find(".pd_num").html());
    if (sum_type == "dash") {
        if (pd_num != 0) {
            $(obj)
                .parent()
                .find(".pd_num")
                .html(pd_num - 1);
        }
    }
    if (sum_type == "plus") {
        $(obj)
            .parent()
            .find(".pd_num")
            .html(pd_num + 1);
    }

    //計算當前點數
    let pd_arr = $("#point_exchange_list").find(".pd-item");
    let total_point = 0;
    $(pd_arr).each(function (i, pd) {
        let pd_title = $(pd).find(".title").html();
        let pd_point = parseInt($(pd).find(".pd_point").html());
        let pd_num = parseInt($(pd).find(".pd_num").html());
        total_point += pd_point * pd_num;
    });
    $("#total_exg_point").html(total_point);
}

//確定要兌換
function exchange() {
    //商品項目list
    let product_list = $("#point_exchange_list .title")
        .map(function () {
            return this.innerHTML;
        })
        .get();

    //商品項目兌換點數list
    let product_point_list = $("#point_exchange_list .pd_point")
        .map(function () {
            return this.innerHTML;
        })
        .get();

    //商品項目要兌換數量list
    let product_num_list = $("#point_exchange_list .pd_num")
        .map(function () {
            return this.innerHTML;
        })
        .get();

    console.log(product_list);
    console.log(product_point_list);
    console.log(product_num_list);
}
