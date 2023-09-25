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

$(".datepicker").datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    todayHighlight: true,
    language: "zh-TW",
});

//單選 連點兩下可取消選取
$("input:radio").click(function () {
    var $radio = $(this);
    if ($radio.data("checked")) {
        $radio.prop("checked", false);
        $radio.data("checked", false);
    } else {
        $radio.prop("checked", true);
        $radio.data("checked", true);
    }
});

/* 日記記錄 */
let daily_id = null; //記錄事件狀態 (ex:生理期=daily_type_1;小產期=daily_type_2...)
let current = dayjs().format("DD/MM/YYYY");

/* 頁面初始 從後端要取初次使用設定、日期事件資料*/
let setting_json = {};
let events = {};
// 新增日期事件 addCalendarEvent
$("#add_daily_btn").click(function () {
    // let daily_id = $(".daily_type").not(".d-none").attr("id");
    let daily_json = {};
    switch (daily_id) {
        case "daily_type_1": {
            daily_json["type"] = "生理期";
            daily_json["date"] = $("#d_type1_q1").val();
            daily_json["月經"] = $("input[name='has_mc_type']:checked").val();
            daily_json["月經量"] = $("input[name='mc_amount']:checked").val();
            daily_json["經痛程度"] = $("input[name='mc_pain']:checked").val();
            daily_json["症狀"] = $(`input[name='d_type1_q3']:checked`)
                .map(function () {
                    return this.value;
                })
                .get()
                .join("、");
            if ($(`input#type1_q3_other`).val()) {
                daily_json["症狀"] = daily_json["症狀"].replace("其他", "其他 - ") + `${$(`input#type1_q3_other`).val()}`;
            }
            daily_json["同房"] = $("input[name='d_type1_q4']:checked").val();
            break;
        }
        case "daily_type_2": {
            daily_json["type"] = "小產期";
            daily_json["date"] = $("#d_type2_q1").val();
            daily_json["惡露"] = $("input[name='has_loc_type']:checked").val();
            daily_json["惡露量"] = $("input[name='loc_amount']:checked").val();
            daily_json["惡露顏色"] = $("input[name='loc_color']:checked").val();
            daily_json["症狀"] = $(`input[name='d_type2_q3']:checked`)
                .map(function () {
                    return this.value;
                })
                .get()
                .join("、");
            if ($(`input#type2_q3_other`).val()) {
                daily_json["症狀"] = daily_json["症狀"].replace("其他", "其他 - ") + `${$(`input#type2_q3_other`).val()}`;
            }

            break;
        }
        case "daily_type_3": {
            daily_json["type"] = "懷孕期";
            daily_json["date"] = $("#d_type3_q1").val();
            daily_json["出血"] = $("input[name='has_blood_type']:checked").val();
            daily_json["出血量"] = $("input[name='blood_amount']:checked").val();
            daily_json["出血顏色"] = $("input[name='blood_color']:checked").val();
            daily_json["症狀"] = $(`input[name='d_type3_q3']:checked`)
                .map(function () {
                    return this.value;
                })
                .get()
                .join("、");
            if ($(`input#type3_q3_other`).val()) {
                daily_json["症狀"] = daily_json["症狀"].replace("其他", "其他 - ") + `${$(`input#type3_q3_other`).val()}`;
            }

            break;
        }
        case "daily_type_4": {
            daily_json["type"] = "產後期";
            daily_json["date"] = $("#d_type4_q1").val();
            daily_json["惡露"] = $("input[name='has_loc_type1']:checked").val();
            daily_json["惡露量"] = $("input[name='loc_amount4']:checked").val();
            daily_json["惡露顏色"] = $("input[name='loc_color4']:checked").val();
            daily_json["症狀"] = $(`input[name='d_type4_q3']:checked`)
                .map(function () {
                    return this.value;
                })
                .get()
                .join("、");
            if ($(`input#type4_q3_other`).val()) {
                daily_json["症狀"] = daily_json["症狀"].replace("其他", "其他 - ") + `${$(`input#type4_q3_other`).val()}`;
            }

            break;
        }
        case "daily_type_5": {
            daily_json["type"] = "更年期";
            daily_json["date"] = $("#d_type5_q1").val();
            daily_json["症狀"] = $(`input[name='d_type5_q3']:checked`)
                .map(function () {
                    return this.value;
                })
                .get()
                .join("、");
            if ($(`input#type5_q3_other`).val()) {
                daily_json["症狀"] = daily_json["症狀"].replace("其他", "其他 - ") + `${$(`input#type5_q3_other`).val()}`;
            }

            break;
        }
        default: {
            break;
        }
    }
    let cal_id = (Math.random() + new Date().getTime()).toString(32).slice(0, 8);
    let cal_json = JSON.parse(JSON.stringify(daily_json));
    // delete cal_json.type;
    delete cal_json.date;
    let cal_description = JSON.stringify(cal_json).slice(2, -2).replaceAll(`:`, "：").replaceAll(`"`, "").replaceAll(",", "<br/>");
    console.log(daily_json, cal_description);

    let id = daily_json.date;
    // If no events, create list
    if (!events.hasOwnProperty(id)) {
        // Create list
        events[id] = [];
    }

    // Add event
    events[id] = { name: cal_description, json_data: cal_json }; //日期事件json資料
    /* 後端處理 儲存events資料 */

    $("#daily_modal").modal("hide");
    // modal 恢復初始表單內容設置&清除已填資料
    $("#first_daily_form").trigger("reset");
    $("#daily_form").trigger("reset");
});

function open_modal() {
    if (typeof setting_json.type == "undefined") {
        // 如果後端未有月曆初始狀態資料 開啟初次記錄modal
        $("#first_daily_modal").modal("show");
    } else {
        // 有的話 開啟平時日誌記錄modal
        switch (setting_json.type) {
            case "生理期": {
                $("#d_type1_q1").datepicker("setDate", current);
                break;
            }
            case "小產期": {
                $("#d_type2_q1").datepicker("setDate", current);
                break;
            }
            case "懷孕期": {
                $("#d_type3_q1").datepicker("setDate", current);
                break;
            }
            case "產後期": {
                $("#d_type4_q1").datepicker("setDate", current);
                break;
            }
            case "更年期": {
                $("#d_type5_q1").datepicker("setDate", current);
                break;
            }
            default: {
                break;
            }
        }
        $("#daily_modal").modal("show");
    }
}

//初次紀錄modal 生理狀態select change 前端切換成相對應表單
function daily_select_type(selectOS) {
    let selected_item = $(selectOS).find(":selected").val();
    $(".health_type").addClass("d-none");
    $(".daily_type").addClass("d-none");
    switch (selected_item) {
        case "生理期": {
            $("#health_type_1").removeClass("d-none");
            $("#daily_type_1").removeClass("d-none");
            $("#d_type1_q1").datepicker("setDate", current);
            daily_id = "daily_type_1";
            break;
        }
        case "小產期": {
            $("#health_type_2").removeClass("d-none");
            $("#daily_type_2").removeClass("d-none");
            $("#d_type2_q1").datepicker("setDate", current);
            daily_id = "daily_type_2";
            break;
        }
        case "懷孕期": {
            $("#health_type_3").removeClass("d-none");
            $("#daily_type_3").removeClass("d-none");
            $("#d_type3_q1").datepicker("setDate", current);
            daily_id = "daily_type_3";
            break;
        }
        case "產後期": {
            $("#health_type_4").removeClass("d-none");
            $("#daily_type_4").removeClass("d-none");
            $("#d_type4_q1").datepicker("setDate", current);
            daily_id = "daily_type_4";
            break;
        }
        case "更年期": {
            $("#health_type_5").removeClass("d-none");
            $("#daily_type_5").removeClass("d-none");
            $("#d_type5_q1").datepicker("setDate", current);
            daily_id = "daily_type_5";
            break;
        }
        default: {
            break;
        }
    }
}

//初次使用月曆記錄
function first_daily_set() {
    let selected_item = $("#health_type").find(":selected").val();
    setting_json = {
        type: selected_item,
    };
    switch (selected_item) {
        case "生理期": {
            setting_json["生理期週期"] = $("#type1_q1").val();
            setting_json["上次生理期開始日"] = $("#type1_q2").val();
            setting_json["每次月經來多少天"] = $("#type1_q3").val();
            $("#d_type1_q1").datepicker("setDate", current);
            break;
        }
        case "小產期": {
            setting_json["小產日期"] = $("#type2_q1").val();
            $("#d_type1_q2").datepicker("setDate", current);
            break;
        }
        case "懷孕期": {
            setting_json["懷孕期週期"] = $("#type3_q1").val();
            setting_json["預產日期"] = $("#type3_q2").val();
            $("#d_type1_q3").datepicker("setDate", current);
            break;
        }
        case "產後期": {
            setting_json["生產日期"] = $("#type4_q1").val();
            $("#d_type1_q4").datepicker("setDate", current);
            break;
        }
        case "更年期": {
            $("#d_type1_q5").datepicker("setDate", current);
            break;
        }
        default: {
            break;
        }
    }
    console.log(setting_json); //用戶初次使用設定資料

    //後端處理 儲存setting_json資料
}
