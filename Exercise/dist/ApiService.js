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
    // REGISTER
    static registerUser(name, email, password, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BASE_URL}/registrieren.php`, {
                method: "POST",
                body: new URLSearchParams({ name, email, password, group_id: groupId })
            });
            return yield res.json();
        });
    }
    // LOGIN
    static loginUser(usernameOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BASE_URL}/login.php`, {
                method: "POST",
                body: new URLSearchParams({
                    username_or_email: usernameOrEmail,
                    password
                })
            });
            const data = yield res.json();
            if (data.token && data.id) {
                this.token = data.token;
                this.userId = data.id;
            }
            return data;
        });
    }
    // USERS
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BASE_URL}/get_users.php?token=${this.token}&id=${this.userId}` //userliste vom server abgerufen
            );
            return yield res.json(); //als json zurückgegeben
        });
    }
    // CONVERSATION (TASK 1)
    static getConversation(user1, user2) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BASE_URL}/get_conversation.php?token=${this.token}&user1_id=${user1}&user2_id=${user2}`); // Lädt den Chatverlauf zwischen zwei Nutzern vom Server, wenn token gültig
            return yield res.json(); //gibt ihn als json array zurück (promise)
        });
    }
    // SEND MESSAGE
    static sendMessage(senderId, receiverId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${BASE_URL}/send_message.php`, {
                method: "POST", //weiterverarbeitung
                body: new URLSearchParams({
                    token: this.token || "",
                    sender_id: senderId,
                    receiver_id: receiverId,
                    message
                })
            });
            return yield res.json();
        });
    }
}
ApiService.token = null;
ApiService.userId = null;
