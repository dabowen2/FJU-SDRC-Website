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
    });
});

var input = document.getElementById("image_uploads");
var preview = document.querySelector(".preview");

input.style.opacity = 0;
input.addEventListener("change", updateImageDisplay);
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

$("#datepicker").mouseup(function () {
    var datepk_display = $(".datepicker-dropdown").css("display");
    if (datepk_display == "block") {
        let top = parseFloat($(".datepicker-dropdown").css("top")) * 1.2;
        $(".datepicker-dropdown").css("top", `${top}px`);
    }
});


/* 有無按鈕 */
$(".button-radio > button").click(function () {
    $(this).css("background", "var(--ct-color-2)");
    $(this).css("color", "white");
    $(this).parent().find("button").not(this).css("background", "none");
    $(this).parent().find("button").not(this).css("color", "black");
});
