var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "http://webp-ilv-backend.cs.technikum-wien.at/messenger";
export class ApiService {
    static getUserId() {
        return this.userId;
    }
    static handleResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Network error ${response.status}: ${errorText}`);
            }
            return response.json();
        });
    }
    static registerUser(name, email, password, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/registrieren.php`, {
                method: "POST",
                body: new URLSearchParams({ name, email, password, group_id: groupId }),
            });
            return this.handleResponse(response);
        });
    }
    static loginUser(usernameOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${BASE_URL}/login.php`, {
                method: "POST",
                body: new URLSearchParams({
                    username_or_email: usernameOrEmail,
                    password,
                }),
            });
            const data = yield this.handleResponse(response);
            if (data.token && data.id) {
                this.token = data.token;
                this.userId = data.id;
            }
            return data;
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.token || !this.userId) {
                throw new Error("User is not logged in.");
            }
            const response = yield fetch(`${BASE_URL}/get_users.php?token=${encodeURIComponent(this.token)}&id=${encodeURIComponent(this.userId)}`);
            return this.handleResponse(response);
        });
    }
    static getConversation(user1, user2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.token) {
                throw new Error("User is not logged in.");
            }
            const response = yield fetch(`${BASE_URL}/get_conversation.php?token=${encodeURIComponent(this.token)}&user1_id=${encodeURIComponent(user1)}&user2_id=${encodeURIComponent(user2)}`);
            return this.handleResponse(response);
        });
    }
    static sendMessage(senderId, receiverId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.token) {
                throw new Error("User is not logged in.");
            }
            const response = yield fetch(`${BASE_URL}/send_message.php`, {
                method: "POST",
                body: new URLSearchParams({
                    token: this.token,
                    sender_id: senderId,
                    receiver_id: receiverId,
                    message,
                }),
            });
            return this.handleResponse(response);
        });
    }
}
ApiService.token = null;
ApiService.userId = null;
