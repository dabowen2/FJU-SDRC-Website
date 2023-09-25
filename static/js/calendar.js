let event_dot_colors = {
    生理期: "yellow",
    小產期: "red",
    懷孕期: "pink",
    產後期: "blue",
    更年期: "gray",
    // 生理期: "#ffc64c",
    // 小產期: "#53d2dc",
    // 懷孕期: "#a07be5",
    // 產後期: "#fe72a9",
    // 更年期: "#808080",
}; //明黃色,湖水藍,紫色,粉色,灰色

//月曆初始化 載入資料
let calendar = jsCalendar.new("#calendar", "now", {
    monthFormat: "YYYY年 ##月",
    language: "zh",
});

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

//今日按鈕 月曆快速點到當天日期
$("#today_btn").click(function () {
    let today = dayjs().format("DD/MM/YYYY");
    calendar.set(today);
});

//當未點擊月曆區塊、選擇日期 即顯示提醒事項而非日期事件
$("#calendar").focusout(function () {
    $("#event-title").html(reminder_title);
});

// Get elements
var elements = {
    // Input element
    events: document.getElementById("events"),
    subtitle: document.getElementsByClassName("subtitle"),
    list: document.getElementById("event-content"),
};

// var events = {};
/* 頁面初始 從後端要取初次使用設定、提醒事件、日期事件資料 */
let reminder_title = "生理期再三天就要報到啦！";
let setting_json = {};
/* 日期事件json格式如下： */
/* key為日期且date格式必須為 DD/MM/YYYY (*月曆套件才能建立事件) */
/* 以下資料皆可先由前端完成記錄儲存得到該資料內容後 返回儲存至後端中 */
let events = {
    "07/09/2023": {
        name: "type：懷孕期<br/>出血：有<br/>出血量：量少<br/>出血顏色：粉紅色<br/>症狀：腰痠背痛",
        json_data: {
            type: "懷孕期",
            出血: "有",
            出血量: "量少",
            出血顏色: "粉紅色",
            症狀: "腰痠背痛",
        },
    },
    "30/09/2023": {
        name: "type：產後期<br/>惡露：有<br/>惡露量：量適中<br/>惡露顏色：鮮紅色<br/>症狀：消化不良",
        json_data: {
            type: "產後期",
            惡露: "有",
            惡露量: "量適中",
            惡露顏色: "鮮紅色",
            症狀: "消化不良",
        },
    },
};

var date_format = "DD/MM/YYYY";
var current = null;

// 前端顯示日期事件
var showEvents = function (date) {
    var date = jsCalendar.tools.stringToDate(date);
    // Date string 日期格式轉換處理
    var id = jsCalendar.tools.dateToString(date, date_format, "zh");
    var title = jsCalendar.tools.dateToString(date, "YYYY年MM月DD日 DAY", "zh");
    // Set date
    current = new Date(date.getTime());
    // Set title 前端返回日期標題
    $("#event-title").html(title);
    // Clear old events 清除舊有事件
    elements.list.innerHTML = "";
    $("#event-content").html("");

    // Add events on list
    // if (events.hasOwnProperty(id) && events[id].length) {
    if (events.hasOwnProperty(id)) {
        $(".subtitle").html("1 event"); // 前端badge標籤 顯示事件數量
        $("#event-content").html(events[id].name); // 前端事件內文 顯示內容

        /* 原先事件為list格式 已改成單事件(先保留原始code) */
        // Number of events
        // elements.subtitle.textContent = events[id].length + " " + (events[id].length > 1 ? "events" : "event");

        // var div;
        // var close;
        // For each event
        // for (var i = 0; i < events[id].length; i++) {
        // div = document.createElement("div");
        // div.className = "event-item";
        // div.textContent = i + 1 + ". " + events[id][i].name;
        // elements.list.appendChild(div);
        // close = document.createElement("div");
        // close.className = "close";
        // close.textContent = "×";
        // div.appendChild(close);
        // close.addEventListener(
        //     "click",
        //     (function (date, index) {
        //         return function () {
        //             removeEvent(date, index);
        //         };
        //     })(date, i),
        //     false
        // );
        // }
    } else {
        // elements.subtitle.textContent = "No events";
        $(".subtitle").html("No events"); // 若無日期事件資料，則前端badge標籤 顯示事件數量
    }
};

//更新載入月曆事件
function refreshEvents(events_data) {
    jQuery.each(events_data, function (date, val) {
        // Date string
        date = jsCalendar.tools.stringToDate(date);
        calendar.select(date, event_dot_colors[val.json_data.type]);
    });

    showEvents(new Date());
}

$(function () {
    //頁面載入後 先更新事件資料
    refreshEvents(events);
});

// 當點擊日期 即觸發顯示該日期事件
calendar.onDateClick(function (event, date) {
    // Update calendar date
    calendar.set(date);
    // Show events
    showEvents(date);
});

// 當點擊上or下一月按鈕都須refresh events data
$(".jsCalendar-nav-right").click(function () {
    // Go to the perious month
    refreshEvents(events);
});
$(".jsCalendar-nav-left").click(function () {
    // Go to the next month
    refreshEvents(events);
});

let daily_id = null; //記錄事件狀態 (ex:生理期=daily_type_1;小產期=daily_type_2...)

// 新增日期事件 addCalendarEvent
$("#add_daily_btn").click(function () {
    // let daily_id = $(".daily_type").not(".d-none").attr("id");
    let daily_json = {};

    //根據不同生理狀態TYPE，取得 #daily_modal內的 input value 並存於 daily_json變數
    switch (daily_id) {
        //生理期
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
        //小產期
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

    current = jsCalendar.tools.stringToDate(daily_json.date);
    // Date string
    var id = jsCalendar.tools.dateToString(current, date_format, "zh");

    // If no events, create list
    if (!events.hasOwnProperty(id)) {
        // Create list
        events[id] = [];
    }

    // If where were no events
    // if (events[id].length === 0) {
    //     // Select date
    // }

    // Add event
    calendar.unselect(current); //先清除舊有日期事件
    calendar.select(current, event_dot_colors[daily_json.type]); //建立事件

    // events[id].push({ name: cal_description });
    events[id] = { name: cal_description, json_data: cal_json }; //日期事件json資料
    /* 後端處理 儲存events資料 */

    // Refresh events
    showEvents(current);
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

// var removeEvent = function (date, index) {
//     // Date string
//     var id = jsCalendar.tools.dateToString(date, date_format, "en");

//     // If no events return
//     if (!events.hasOwnProperty(id)) {
//         return;
//     }
//     // If not found
//     if (events[id].length <= index) {
//         return;
//     }

//     // Remove event
//     events[id].splice(index, 1);

//     // Refresh events
//     showEvents(current);

//     // If no events uncheck date
//     if (events[id].length === 0) {
//         calendar.unselect(date);
//     }
// };
