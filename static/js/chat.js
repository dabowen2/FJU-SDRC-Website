let current_chat_tab = "";
let previous_chat_tab = "";
$(document).ready(function () {
    // 取得使用者目前點選的聊天室分類
    $(".chats-nav-tab a").on("shown.bs.tab", function (e) {
        current_chat_tab = e.target;
        previous_chat_tab = e.relatedTarget;
    });

    // 監聽聊天室輸入框的 keydown 事件
    $(".publisher-input").keydown(function (e) {
        // 如果按下的是 Enter 鍵 (key code 13)
        if (e.keyCode == 13) {
            let chat_room = "";
            // 判斷當前的聊天室分類
            if (current_chat_tab != "") {
                chat_room = $(current_chat_tab).attr("href").replace("#", "");
            } else {
                chat_room = "chats-room1";
            }

            user_send_msg(chat_room); //發送訊息
        }
    });
});

function offical_send_msg() {
    // 前端對話框模板
    var chatMedia = document.createElement("div");
    chatMedia.className = "media media-chat";

    var avatarImg = document.createElement("img");
    avatarImg.className = "avatar";
    avatarImg.src = "https://img.icons8.com/color/48/person-female.png";
    avatarImg.alt = "...";

    var mediaBody = document.createElement("div");
    mediaBody.className = "media-body";

    // 將 後端發出的打字訊息填入, 如有分開發送訊息 請用loop生成
    var paragraphElement = document.createElement("p");
    paragraphElement.innerHTML = "1233333333333111";
    mediaBody.appendChild(paragraphElement);

    chatMedia.appendChild(avatarImg);
    chatMedia.appendChild(mediaBody);

    // 將 chatMedia 元素添加到 .chat_content 的 div 內
    // 目前預設為營養師諮詢(chat-room1)，如果是其他聊天室 將chats-room1 改成 2 or 3
    var container = $(`#chats-room1 .ps-container`).eq(0);
    container.append(chatMedia);
    container.scrollTop(container.prop("scrollHeight"));
}

function user_send_msg(chat_room) {
    // 前端對話框模板
    var chatMedia = document.createElement("div");
    chatMedia.className = "media media-chat media-chat-reverse";

    var mediaBody = document.createElement("div");
    mediaBody.className = "media-body";

    var paragraphElement = document.createElement("p");
    paragraphElement.innerHTML = $(`#${chat_room} .publisher-input`).val();
    mediaBody.appendChild(paragraphElement);

    chatMedia.appendChild(mediaBody);

    // 將 chatMedia 元素添加到 .chat_content 的 div 內
    // 會依據使用者點選"發送訊息按鈕"傳值變數chat_room，判斷是哪類聊天室
    var container = $(`#${chat_room} .ps-container`).eq(0);
    container.append(chatMedia);
    container.scrollTop(container.prop("scrollHeight"));

    //輸入框文字清空
    $(`#${chat_room} .publisher-input`).val("");
}

function user_upload_file() {
    //todo:不確定邏輯
}