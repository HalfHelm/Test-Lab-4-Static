var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiService } from "./ApiService.js"; //es module
let selectedUser = null; //user auf null gesetzt
document.getElementById("register-btn").addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const group = document.getElementById("reg-group").value;
    const res = yield ApiService.registerUser(name, email, password, group);
    alert(res.success ? "Registered!" : res.error);
}));
document.getElementById("login-btn").addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = document.getElementById("login-user").value;
    const pass = document.getElementById("login-password").value;
    const res = yield ApiService.loginUser(user, pass);
    if (!res.token) {
        alert("Login failed");
        return;
    }
    alert("Login success!");
    loadUsers();
}));
function loadUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield ApiService.getUsers();
        const list = document.getElementById("user-list");
        list.innerHTML = ""; //zuerst geleert
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.name;
            li.onclick = () => {
                //REMOVE active from all
                document.querySelectorAll("#user-list li")
                    .forEach(el => el.classList.remove("active"));
                //SET active, nur der geklickte user
                li.classList.add("active");
                selectedUser = user.id;
                loadConversation(user.id);
            };
            list.appendChild(li);
        });
    });
}
function loadConversation(otherUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        const myId = ApiService.getUserId();
        if (!myId)
            return; //wenn kein user eingeloggt, abbrechen
        const messages = yield ApiService.getConversation(myId, otherUserId);
        const chat = document.getElementById("chat-messages");
        chat.innerHTML = ""; //zuerst geleert
        messages.forEach(msg => {
            const div = document.createElement("div");
            div.className = msg.sender_id === myId ? "sent" : "received"; //unterscheidung ob gesendet oder empfangen
            div.textContent = msg.message;
            chat.appendChild(div);
        });
        chat.scrollTop = chat.scrollHeight; //nach unten gescrollt
    });
}
window.addEventListener("DOMContentLoaded", () => {
    console.log("APP READY");
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    if (!form || !input) {
        console.error("CHAT UI NOT FOUND");
        return;
    }
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        console.log("SEND CLICKED");
        const message = input.value.trim();
        if (!message) {
            console.log("EMPTY MESSAGE");
            return;
        }
        if (!selectedUser) {
            alert("Select a user first!");
            return;
        }
        const myId = ApiService.getUserId();
        if (!myId) {
            alert("Login first!");
            return;
        }
        // IMMEDIATE VISUAL FEEDBACK
        const chat = document.getElementById("chat-messages");
        const div = document.createElement("div");
        div.className = "sent";
        div.textContent = message;
        chat.appendChild(div);
        input.value = "";
        // API CALL
        try {
            const res = yield ApiService.sendMessage(myId, selectedUser, message);
            console.log("API RESPONSE:", res);
        }
        catch (err) {
            console.error(err);
        }
    }));
});
