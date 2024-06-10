// 建立 WebSocket 連線
var socket = new WebSocket("ws://localhost:8765");

// 當 WebSocket 連線建立時執行以下函數
socket.onopen = function(event) {
    console.log("WebSocket connection established."); // 顯示訊息表示 WebSocket 連線已建立
};

// 當從後端收到訊息時執行以下函數
socket.onmessage = function(event) {
    var receivedMessage = event.data; // 從事件中取得收到的訊息
    // 在這裡處理從後端收到的消息
    // 這個例子中只是將消息顯示在聊天窗口中
    var chatWindow = document.getElementById("chat-window"); // 取得聊天窗口的 DOM 元素
    var newMessage = document.createElement("div"); // 建立一個新的 <div> 元素來顯示訊息
    newMessage.innerHTML = receivedMessage.replace(/\n/g, "<br>"); // 將換行符替換為 <br> 換行標記
    newMessage.classList.add("message", "other-message"); // 添加 CSS class 以區分收到的訊息和自己發送的訊息
    chatWindow.appendChild(newMessage); // 將新建的 <div> 元素加入到聊天窗口中
    chatWindow.scrollTop = chatWindow.scrollHeight; // 捲動聊天窗口至最底部，顯示最新的訊息
};


// 發送訊息的函數
function sendMessage() {
    var messageInput = document.getElementById("message-input"); // 取得輸入訊息的輸入框
    var message = messageInput.value.trim(); // 取得輸入的訊息並移除首尾的空白
    if (message !== "") { // 確保訊息不為空
        if (message.slice(0, 1) === "+") {
            socket.send(message); // 透過 WebSocket 連線發送訊息到後端
        }
        var chatWindow = document.getElementById("chat-window"); // 取得聊天窗口的 DOM 元素
        var newMessage = document.createElement("div"); // 建立一個新的 <div> 元素來顯示發送的訊息
        newMessage.textContent = message; // 將發送的訊息放入新建的 <div> 元素中
        newMessage.classList.add("message", "my-message"); // 添加 CSS class 以區分收到的訊息和自己發送的訊息
        chatWindow.appendChild(newMessage); // 將新建的 <div> 元素加入到聊天窗口中
        messageInput.value = ""; // 清空輸入框
        chatWindow.scrollTop = chatWindow.scrollHeight; // 捲動聊天窗口至最底部，顯示最新的訊息
    }
}

// 監聽輸入框的按鍵事件，當按下 Enter 鍵時呼叫 sendMessage 函數發送訊息
document.getElementById("message-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
