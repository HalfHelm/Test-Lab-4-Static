var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiService } from "./ApiService.js";
let selectedUser = null;
const getElementById = (id) => {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found.`);
    }
    return element;
};
const getInputValue = (id) => {
    return getElementById(id).value.trim();
};
const showError = (message) => {
    console.error(message);
    alert(message);
};
const loadUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield ApiService.getUsers();
        const list = getElementById("user-list");
        list.innerHTML = "";
        users.forEach((user) => {
            const li = document.createElement("li");
            li.textContent = user.name;
            li.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
                list.querySelectorAll("li").forEach((item) => item.classList.remove("active"));
                li.classList.add("active");
                selectedUser = user.id;
                yield loadConversation(user.id);
            }));
            list.appendChild(li);
        });
    }
    catch (error) {
        showError(error instanceof Error ? error.message : "Unable to load users.");
    }
});
const loadConversation = (otherUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const myId = ApiService.getUserId();
    if (!myId) {
        return;
    }
    try {
        const messages = yield ApiService.getConversation(myId, otherUserId);
        const chat = getElementById("chat-messages");
        chat.innerHTML = "";
        messages.forEach((msg) => {
            const div = document.createElement("div");
            div.className = msg.sender_id === myId ? "sent" : "received";
            div.textContent = msg.message;
            chat.appendChild(div);
        });
        chat.scrollTop = chat.scrollHeight;
    }
    catch (error) {
        showError(error instanceof Error ? error.message : "Unable to load conversation.");
    }
});
window.addEventListener("DOMContentLoaded", () => {
    console.log("APP READY");
    const registerButton = getElementById("register-btn");
    const loginButton = getElementById("login-btn");
    const form = getElementById("chat-form");
    const input = getElementById("chat-input");
    registerButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const name = getInputValue("reg-name");
        const email = getInputValue("reg-email");
        const password = getInputValue("reg-password");
        const group = getInputValue("reg-group");
        try {
            const res = yield ApiService.registerUser(name, email, password, group);
            if (res.success) {
                alert("Registered!");
                return;
            }
            showError((_a = res.error) !== null && _a !== void 0 ? _a : "Registration failed.");
        }
        catch (error) {
            showError(error instanceof Error ? error.message : "Registration failed.");
        }
    }));
    loginButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = getInputValue("login-user");
        const pass = getInputValue("login-password");
        try {
            const res = yield ApiService.loginUser(user, pass);
            if (!res.token) {
                showError("Login failed");
                return;
            }
            alert("Login success!");
            yield loadUsers();
        }
        catch (error) {
            showError(error instanceof Error ? error.message : "Login failed");
        }
    }));
    form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const message = input.value.trim();
        if (!message) {
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
        const chat = getElementById("chat-messages");
        const div = document.createElement("div");
        div.className = "sent";
        div.textContent = message;
        chat.appendChild(div);
        input.value = "";
        try {
            yield ApiService.sendMessage(myId, selectedUser, message);
        }
        catch (error) {
            showError(error instanceof Error ? error.message : "Unable to send message.");
        }
    }));
});
