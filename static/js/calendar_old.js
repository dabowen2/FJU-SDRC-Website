let event_dot_colors = {
    生理期: "#ffc64c",
    小產期: "#53d2dc",
    懷孕期: "#a07be5",
    產後期: "#fe72a9",
    更年期: "#808080",
}; //明黃色,湖水藍,紫色,粉色,灰色

let event_type = {
    生理期: "mc",
    小產期: "pl",
    懷孕期: "pg",
    產後期: "pm",
    更年期: "mp",
};

//月曆初始化 載入資料
$("#calendar").evoCalendar({
    theme: "Orange Coral",
    titleFormat: "yyyy年 mm月",
    // eventHeaderFormat: "yyyy, MM-dd",
    todayHighlight: true,
    sidebarDisplayDefault: false,
    calendarEvents: [
        {
            id: "asdpl",
            name: "生理期",
            // badge: "02/13 - 02/15", // Event badge (optional)
            date: ["2023/07/02", "2023/07/04"], // Date range
            description: "Vacation leave for 3 days.", // Event description (optional)
            type: "event",
            color: event_dot_colors["生理期"],
        },
    ],
});

$(".datepicker").datepicker({
    format: "yyyy/mm/dd",
    autoclose: true,
    todayHighlight: true,
    language: "zh-TW",
});

let datepick_pos_top = null;
// $(".datepicker").focus(function () {
//     var datepk_display = $(".datepicker-dropdown").css("display");
//     if (datepk_display == "block") {
//         let top = parseFloat($(".datepicker-dropdown").css("top")) + 70;
//         if (datepick_pos_top == null || datepick_pos_top != top) {
//             datepick_pos_top = top;
//         }
//         $(".datepicker-dropdown").css("top", `${datepick_pos_top}px`);
//     }
// });

$("#today_btn").click(function () {
    $("#calendar").evoCalendar("selectDate", now_today);
});

// addCalendarEvent
$("#add_daily_btn").click(function () {
    let daily_id = $(".daily_type").not(".d-none").attr("id");
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
            daily_json["date"] = $("#d_type4_q1").val();
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
    console.log(daily_json);
    let cal_id = (Math.random() + new Date().getTime()).toString(32).slice(0, 8);
    let cal_json = JSON.parse(JSON.stringify(daily_json));
    delete cal_json.type;
    delete cal_json.date;
    let cal_description = JSON.stringify(cal_json).slice(2, -2).replaceAll(`:`, "：").replaceAll(`"`, "").replaceAll(",", "<br/>");

    $("#calendar").evoCalendar("addCalendarEvent", [
        {
            id: cal_id,
            name: daily_json.type,
            description: cal_description,
            date: daily_json.date,
            type: event_type[daily_json.type],
        },
        // {
        //     id: "asDf87L",
        //     name: "Graduation Day!",
        //     description: "我是內文, 我是內文, 我是內文, 我是內文, 我是內文, 我是內文, 我是內文, ",
        //     date: "2023/07/30",
        //     type: "event",
        // },
        // {
        //     id: "dddwee2",
        //     name: "Happy Day!",
        //     description: "我是內文, 我是內文, 我是內文, 我是內文, 我是內文, 我是內文, 我是內文, ",
        //     date: "2023/07/30",
        //     type: "holiday",
        //     color: event_dot_colors[0],
        // },
    ]);
    $("#daily_modal").modal("hide");
});

//初次紀錄 生理狀態選擇
function daily_select_type(selectOS) {
    let selected_item = $(selectOS).find(":selected").val();
    $(".health_type").addClass("d-none");
    $(".daily_type").addClass("d-none");
    switch (selected_item) {
        case "生理期": {
            $("#health_type_1").removeClass("d-none");
            $("#daily_type_1").removeClass("d-none");
            break;
        }
        case "小產期": {
            $("#health_type_2").removeClass("d-none");
            $("#daily_type_2").removeClass("d-none");
            break;
        }
        case "懷孕期": {
            $("#health_type_3").removeClass("d-none");
            $("#daily_type_3").removeClass("d-none");
            break;
        }
        case "產後期": {
            $("#health_type_4").removeClass("d-none");
            $("#daily_type_4").removeClass("d-none");
            break;
        }
        case "更年期": {
            $("#health_type_5").removeClass("d-none");
            $("#daily_type_5").removeClass("d-none");
            break;
        }
        default: {
            break;
        }
    }
}
