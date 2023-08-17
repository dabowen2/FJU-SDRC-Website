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

/* 會員資料 上傳圖片 */
var input = document.getElementById("image_uploads");
var preview = document.querySelector(".preview");
if (input != null && preview != null) {
    input.style.opacity = 0;
    input.addEventListener("change", updateImageDisplay);
}

function updateImageDisplay() {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    if (input.files.length === 0) {
        var para = document.createElement("p");
        para.innerHTML = `<span class="d-none d-lg-block">上傳檔案 </span><span><i class="fas fa-camera"></i></span>`;
        preview.style = "background: #cccccc;";
        para.classList.add("my-0");
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

// 會員資料前端 有無按鈕 */
$(".button-radio > button").click(function () {
    $(this).css("background", "var(--ct-color-2)");
    $(this).css("color", "white");
    $(this).addClass("active");
    $(this).parent().find("button").not(this).css("background", "none");
    $(this).parent().find("button").not(this).css("color", "black");
});

/* 修改會員資料 */
function info_setting() {
    let diease = "";
    let drug = "";
    let order = "";
    let allergy = "";
    //病史
    if ($("input#disease_other").val() != "") {
        //有填其他
        diease = $("#disease_history").val() + "," + $("input#disease_other").val();
    } else {
        diease = $("#disease_history").val();
    }
    //用藥狀況
    if ($("input#drug_other").val() != "") {
        //有填其他
        drug = $("#user_drug").children("button.active").html() + "," + $("input#drug_other").val();
    } else {
        drug = $("#user_drug").children("button.active").html();
    }
    //醫囑
    if ($("input#order_other").val() != "") {
        //有填其他
        order = $("#user_order").children("button.active").html() + "," + $("input#order_other").val();
    } else {
        order = $("#user_order").children("button.active").html();
    }
    //過敏情況
    if ($("input#allergy_other").val() != "") {
        //有填其他
        allergy = $("#user_allergy").children("button.active").html() + "," + $("input#allergy_other").val();
    } else {
        allergy = $("#user_allergy").children("button.active").html();
    }
    let user_info = {
        user_name: $("input#user_name").val(),
        user_nickname: $("input#user_nickname").val(),
        user_email: $("input#user_email").val(),
        user_sex: $("#user_sex").val(),
        user_birthday: $("input#datepicker").val(),
        user_phone: $("input#user_phone").val(),
        user_address: $("input#user_address").val(),
        user_height: $("input#user_height").val(),
        user_weight: $("input#user_weight").val(),
        user_birth_plan: $("#birth_plan").val(), //生育計畫
        user_pregnant: $("#pregnant_state").val(), //懷孕狀態
        user_disease: diease, //疾病病史
        user_drug: drug, //用藥狀況
        user_order: order,
        user_allergy: allergy,
        user_married: $("#married_state").val(),
    };
    console.log(user_info);
}

/* 重設密碼 */
function reset_password() {
    let pwd_rule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    let old_pwd = $("input#old_password").val();
    let new_pwd = $("input#new_password").val();
    let check_password = $("input#check_password").val();
    let pwd_error = false;
    let og_pwd = ""; //原密碼 須從後端要取
    if (old_pwd != og_pwd) {
        //原密碼比對
        $("#old_pwd_alert").removeClass("d-none");
        pwd_error = true;
    } else {
        $("#old_pwd_alert").addClass("d-none");
    }

    //新密碼有無符合規則
    if (!new_pwd.match(pwd_rule)) {
        $("#new_pwd_alert").removeClass("d-none");
        pwd_error = true;
    } else {
        $("#new_pwd_alert").addClass("d-none");
    }

    //新密碼與再次輸入密碼有無一致
    if (new_pwd != check_password) {
        $("#check_pwd_alert").removeClass("d-none");
        pwd_error = true;
    } else {
        $("#check_pwd_alert").addClass("d-none");
    }

    /*後端處理*/
    if (pwd_error == false) {
        Swal.fire({
            title: `修改密碼成功！`,
            text: "已重新設定密碼",
            icon: "success",
            confirmButtonColor: "#70c6e3",
            timer: 2000,
        });
    }
}

/*註冊步驟按鈕*/
const step_confirm_btn = document.querySelectorAll(".step-confirm");
const register_info = {};
let img_path = "static/img/register/vc/";
let bg_path = "static/img/register/bg/";
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
        let is_write = false;
        let input_obj_arr = $(this).parent().find("input");
        let step_id = 0;
        let pwd_rule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

        console.log("Now step:" + step_index);

        if (step_index == 3) {
            $(this).next().find(".step-next-btn").attr("disabled", false);
            $(this).next().find(".step-next-btn").click();
            step_id = $(this).next().find(".step-next-btn").data("bs-target").substring(6);
            $("body").css("background-image", `url('${bg_path + step_id}.png')`);
        }
        if (input_obj_arr.length > 0) {
            let obj_key = $(input_obj_arr).eq(0).get(0).name;
            let obj_value = $(input_obj_arr)
                .map(function () {
                    if (this.value != "") return this.value;
                })
                .get()
                .join(",");

            if ([0, 1, 4, 5].includes(step_index) == true) {
                if (step_index == 5) {
                    obj_values = obj_value.split(",");
                }
                if (obj_value == "" || (step_index == 5 && obj_values.length < 2)) {
                    Swal.fire({
                        title: `請勿填空`,
                        text: "請再檢查必要欄位是否確實有填寫！",
                        confirmButtonColor: "#70c6e3",
                    });
                } else if (step_index == 0 && !obj_value.match(pwd_rule)) {
                    Swal.fire({
                        title: `密碼須符合規則`,
                        text: "請再檢查必要欄位是否確實有填寫！",
                        confirmButtonColor: "#70c6e3",
                        icon: "warning",
                    });
                } else is_write = true;
            } else if ([2, 6, 7, 8, 9, 10, 11, 12, 13].includes(step_index) == true) {
                // let input_val_arr = obj_value.split(",");

                if (step_index == 13) {
                    if ($(`input[name='user_name']`).val() == "") {
                        //步驟13完成 檢查姓名有無填寫
                        Swal.fire({
                            title: `請勿填空`,
                            text: "請再檢查必要欄位是否確實有填寫！",
                            confirmButtonColor: "#70c6e3",
                        });
                    } else is_write = true;
                } else {
                    //2, 6, 7, 8, 9, 10, 11, 12 選項題型(含單複選)
                    obj_value = $(`input[name='${obj_key}']:checked`)
                        .map(function () {
                            if (this.value != "") return this.value;
                        })
                        .get()
                        .join(",");

                    if (obj_value == "") {
                        Swal.fire({
                            title: `請勿填空`,
                            text: "請再檢查必要欄位是否確實有填寫！",
                            confirmButtonColor: "#70c6e3",
                        });
                    } else {
                        if (obj_value.includes("1") == true) {
                            //第9-12題 答"有"的話，需要檢查有無填寫備註
                            other_text = $(`input[name='${obj_key}'][id$='other']`).val();
                            if (other_text == "") {
                                Swal.fire({
                                    title: `請勿填空`,
                                    text: "選「有」的話，請記得填寫描述！",
                                    confirmButtonColor: "#70c6e3",
                                });
                            } else {
                                if (step_index == 11) {
                                    obj_value = obj_value.replace("1", other_text);
                                } else {
                                    obj_value += `, ${other_text}`;
                                }
                                is_write = true;
                            }
                        } else {
                            is_write = true;
                        }
                    }
                }
            }

            if (is_write == true) {
                $(this).next().find(".step-next-btn").attr("disabled", false);
                sessionStorage.setItem(obj_key, obj_value);
                register_info[obj_key] = obj_value;

                if (step_index == 5) {
                    //身高體重
                    obj_value = obj_value.split(",");
                    register_info["user_height"] = obj_value[0];
                    register_info["user_weight"] = obj_value[1];
                }
                if (step_index == 13) {
                    //姓名電話地址
                    register_info["user_name"] = $(`input[name='user_name']`).val();
                    register_info["user_phone"] = $(`input[name='user_phone']`).val();
                    register_info["user_address"] = $(`input[name='user_address']`).val();
                }
                if (obj_key == "user_nickname") {
                    //已填寫會員暱稱，返回前端顯示
                    $("#nickname").html(obj_value);
                }
                if (obj_key == "user_birthday") {
                    //已填寫會員生日，(年紀)返回前端顯示
                    let age = now_year - parseInt(obj_value.substring(0, 4));
                    $("#age").html(age);
                    sessionStorage.setItem("user_age", age);
                    register_info["user_age"] = age;
                }

                if (step_index == 6) {
                    //步驟6完成 檢查性別跳過問題
                    if (register_info.user_sex == "male") {
                        $(".step-btn").each(function (i, btn) {
                            let step_id = parseInt($(btn).data("bs-target").substring(6));
                            if (step_id == 7) {
                                $(btn).attr("data-bs-target", "#step_9");
                            }
                            if (i == 18) {
                                $(btn).attr("data-bs-target", "#step_6");
                            }
                            if (step_id == 9) {
                                $(btn).attr("disabled", false);
                                $(btn).click();
                            }
                        });
                    } else {
                        $(".step-btn").each(function (i, btn) {
                            let step_id = parseInt($(btn).data("bs-target").substring(6));
                            if (i == 13) {
                                $(btn).attr("data-bs-target", "#step_7");
                            }
                            if (i == 18) {
                                $(btn).attr("data-bs-target", "#step_8");
                            }
                        });
                        step_id = $(this).next().find(".step-next-btn").data("bs-target").substring(6);
                        $("body").css("background-image", `url('${bg_path + step_id}.png')`);

                        $(this).next().find(".step-next-btn").click();
                    }
                } else if (step_index == 13) {
                    //已填寫所有資料，最後統整成步驟14的信件內容
                    $("#today").html(now_today);
                    $("#nickname2").html(register_info.user_nickname);
                    $("#age2").html(register_info.user_age);
                    $("#birthday").html(register_info.user_birthday);
                    $("#height").html(register_info.user_height);
                    $("#weight").html(register_info.user_weight);
                    if (register_info.user_sex == "male") {
                        $(".onyly-show-famele").hide();
                    }
                    if (register_info.user_married_state != "0") $("#married_state").html(register_info.user_married_state);
                    if (register_info.user_pregnant_state != "0") $("#pregnant_state").html(register_info.user_pregnant_state);
                    if (register_info.user_birth_plan != "0") $("#birth_plan").html(register_info.user_birth_plan);
                    if (register_info.user_disease_state != "0") $("#disease").html("有" + register_info.user_disease_state);
                    if (register_info.user_allergy_state != "0") $("#allergy_state").html("，對" + register_info.user_allergy_state.replace("1,", "") + "過敏");
                    if (register_info.user_order_state != "0") $("#order").html("，醫生有特別說" + register_info.user_order_state.replace("1,", ""));
                    if (register_info.user_drug_state != "0") $("#drug").html("， 需要吃" + register_info.user_drug_state.replace("1,", ""));

                    $("#username").html(register_info.user_name);
                    step_id = $(this).next().find(".step-next-btn").data("bs-target").substring(6);
                    $("body").css("background-image", `url('${bg_path + step_id}.png')`);
                    $(this).next().find(".step-next-btn").click();
                } else {
                    step_id = $(this).next().find(".step-next-btn").data("bs-target").substring(6);
                    $("body").css("background-image", `url('${bg_path + step_id}.png')`);
                    $(this).next().find(".step-next-btn").click();
                }
            }
        }
        console.log("Now step id:" + step_id);
    });
});

function register_step(obj, step_num) {
    let step_id = 0;
    if (step_num != null) {
        $(".step-btn").each(function (i, btn) {
            step_id = parseInt($(btn).attr("data-bs-target").substring(6));
            $("body").css("background-image", `url('${bg_path + step_id}.png')`);
            if (step_id == step_num) {
                $(btn).click();
            }
        });
    }
    if ($(obj).attr("data-bs-target")) {
        step_id = parseInt($(obj).attr("data-bs-target").substring(6));
        $("body").css("background-image", `url('${bg_path + step_id}.png')`);
    }

    setTimeout(() => {
        $(obj).eq(0).removeClass("active");
    }, "1000");
}

/* 會員登入頁 */
function facebook_login() {
    //api串接
}
function line_login() {
    //api串接
}
