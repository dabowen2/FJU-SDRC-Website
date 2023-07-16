$(document).ready(function () {
    $("#disease_history").multiselect({
        includeSelectAllOption: true,
        maxHeight: 250,
        allSelectedText: "全選",
        buttonWidth: "100%",
        numberDisplayed: 4,
    });

    $("#datepicker").datepicker({
        format: "yyyy/mm/dd",
        autoclose: true,
        language: "zh-TW",
    });
});

var input = document.getElementById("image_uploads");
var preview = document.querySelector(".preview");
if (input != null && preview != null) {
    input.style.opacity = 0;
    input.addEventListener("change", updateImageDisplay);
}

/* 會員資料 上傳圖片 */
function updateImageDisplay() {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    if (input.files.length === 0) {
        var para = document.createElement("p");
        para.textContent = "未選擇任何檔案";
        preview.style = "background: #cccccc;";
        para.style = "line-height: 10vw;";
        preview.appendChild(para);
    } else {
        var para = document.createElement("p");
        var image = document.createElement("img");
        preview.style = "background: none;";
        image.src = window.URL.createObjectURL(input.files[0]);
        preview.appendChild(image);
        preview.appendChild(para);
    }
}

let datepick_pos_top = null;
$("#datepicker").mouseup(function () {
    var datepk_display = $(".datepicker-dropdown").css("display");
    if (datepk_display == "block") {
        let top = parseFloat($(".datepicker-dropdown").css("top")) * 1.2;
        if (datepick_pos_top == null) {
            datepick_pos_top = top;
        }
        $(".datepicker-dropdown").css("top", `${datepick_pos_top}px`);
    }
});

/* 有無按鈕 */
$(".button-radio > button").click(function () {
    $(this).css("background", "var(--ct-color-2)");
    $(this).css("color", "white");
    $(this).parent().find("button").not(this).css("background", "none");
    $(this).parent().find("button").not(this).css("color", "black");
});

/*註冊步驟按鈕*/
const step_confirm_btn = document.querySelectorAll(".step-confirm");
const register_info = {};

$(`input[id='ds_item_1']`).click(function () {
    if ($(`input[id='ds_item_1']`).is(":checked") == true) {
        $(`input[name*="user_disease_state"]:not("#ds_item_1")`).attr("disabled", true);
        $(`input[name*="user_disease_state"]:not("#ds_item_1"):checked`).prop("checked", false);
    } else {
        $(`input[name*="user_disease_state"]:disabled`).attr("disabled", false);
    }
});

step_confirm_btn.forEach((item, step_index) => {
    item.addEventListener("click", function () {
        let input_obj_arr = $(this).parent().find("input");
        console.log("Now step:" + step_index);

        if (input_obj_arr.length > 0) {
            let obj_key = $(input_obj_arr).eq(0).get(0).name;
            let obj_value = $(input_obj_arr)
                .map(function () {
                    return this.value;
                })
                .get()
                .join(",");

            if ([2, 6, 7, 8, 9, 10, 11, 12].includes(step_index) == true) {
                //選項題型(含單複選)
                obj_value = $(`input[name='${obj_key}']:checked`)
                    .map(function () {
                        if (this.value == "") return null;
                        else return this.value;
                    })
                    .get()
                    .join(",");

                if (obj_value.includes("1") == true) {
                    //第9-12題 答"有"的話，需要檢查有無填寫備註
                    other_text = $(`input[name='${obj_key}'][id$='other']`).val();
                    if (step_index == 11) {
                        obj_value = obj_value.replace("1", other_text);
                    } else {
                        obj_value += `, ${other_text}`;
                    }
                }
            }

            if (obj_value == "" || (obj_value.split(",").length >= 2 && [5, 11].includes(step_index) == false)) {
                Swal.fire({
                    title: `請勿填空`,
                    text: "請再檢查欄位是否確實有填寫！",
                    confirmButtonColor: "#70c6e3",
                });
            } else {
                if (obj_key == "user_nickname") {
                    //已填寫會員暱稱，返回前端顯示
                    $("#nickname").html(obj_value);
                }
                if (obj_key == "user_birthday") {
                    //已填寫會員暱稱，返回前端顯示
                    let age = now_year - parseInt(obj_value.substring(0, 4));
                    $("#age").html(age);
                    sessionStorage.setItem("user_age", age);
                    register_info["user_age"] = age;
                }

                sessionStorage.setItem(obj_key, obj_value);
                register_info[obj_key] = obj_value;

                if (step_index == 6) {
                    //步驟6完成 檢查性別跳過問題
                    if (register_info.user_sex == "male") {
                        $(".step-btn").each(function (i, btn) {
                            let step_id = parseInt($(btn).data("bs-target").substring(6));
                            if (step_id == 9) {
                                $(btn).click();
                            }
                        });
                    }
                } else if (step_index == 13) {
                    //已填寫所有資料，最後統整成步驟14的信件內容
                    $("#nickname2").html(register_info.user_nickname);
                    $("#age").html(register_info.user_age);
                    $("#birthday").html(register_info.user_birthday);
                    $("#height").html(register_info.user_height);
                    $("#weight").html(register_info.user_weight);

                    if (register_info.user_married_state != "0") $("#married_state").html(register_info.user_married_state);
                    if (register_info.user_pregnant_state != "0") $("#pregnant_state").html(register_info.user_pregnant_state);
                    if (register_info.user_birth_plan != "0") $("#birth_plan").html(register_info.user_birth_plan);
                    if (register_info.user_disease_state != "0") $("#disease").html(register_info.user_disease_state);
                    if (register_info.user_allergy_state != "0") $("#allergy_state").html(register_info.user_allergy_state);
                    if (register_info.user_order_state != "0") $("#order").html(register_info.user_order_state);
                    if (register_info.user_drug_state != "0") $("#drug").html(register_info.user_drug_state);

                    $("#username").html(register_info.user_name);
                    $("#today").html(now_today);
                }
                $(this).next().find(".step-next-btn").click();
            }
        } else {
            $(this).next().find(".step-next-btn").click();
        }
    });
});

function register_step(obj, step_num) {
    if (step_num != null) {
        $(".step-btn").each(function (i, btn) {
            let step_id = parseInt($(btn).data("bs-target").substring(6));
            if (step_id == step_num) {
                $(btn).click();
            }
        });
    }

    setTimeout(() => {
        $(obj).eq(0).removeClass("active");
    }, "1000");
}
