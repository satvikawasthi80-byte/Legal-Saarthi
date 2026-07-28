const API_URL = "https://legal-saarthi.onrender.com";

const chatArea = document.getElementById("chat-area");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(message, sender) {
    const div = document.createElement("div");

    div.style.margin = "10px 0";
    div.style.padding = "12px";
    div.style.borderRadius = "10px";
    div.style.whiteSpace = "pre-wrap";

    if (sender === "user") {
        div.style.background = "#2563eb";
        div.style.textAlign = "right";
        div.innerHTML = `<strong>You:</strong><br>${message}`;
    } else {
        div.style.background = "#334155";
        div.innerHTML = `<strong>Legal Saarthi:</strong><br>${message}`;
    }

    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
}

async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    addMessage("Typing...", "bot");

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message
            })

        });

        const data = await response.json();

        chatArea.lastChild.remove();

        addMessage(data.reply, "bot");

    } catch (error) {

        chatArea.lastChild.remove();

        addMessage(
            "❌ Unable to connect to the Legal Saarthi server.",
            "bot"
        );

        console.error(error);

    }

}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        sendMessage();
    }

});