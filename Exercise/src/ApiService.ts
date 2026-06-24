export interface ApiResponse { //es modules
  success?: boolean; //optionale vars
  error?: string;
  token?: string;
  id?: string;
}

export interface User {
  id: string;
  name: string;
  group_id: string;
}

export interface ChatMessage {
  sender_id: string;
  receiver_id: string;
  message: string;
  timestamp?: number;
}

const BASE_URL =
  "http://webp-ilv-backend.cs.technikum-wien.at/messenger";

export class ApiService {
  private static token: string | null = null;
  private static userId: string | null = null;

  static getUserId() {
    return this.userId;
  }

  // REGISTER
  static async registerUser(name: string, email: string, password: string, groupId: string) {
    const res = await fetch(`${BASE_URL}/registrieren.php`, { 
      method: "POST",
      body: new URLSearchParams({ name, email, password, group_id: groupId })
    });

    return await res.json();
  }

  // LOGIN
  static async loginUser(usernameOrEmail: string, password: string) {
    const res = await fetch(`${BASE_URL}/login.php`, {
      method: "POST",
      body: new URLSearchParams({
        username_or_email: usernameOrEmail,
        password
      })
    });

    const data = await res.json();

    if (data.token && data.id) {
      this.token = data.token;
      this.userId = data.id;
    }

    return data;
  }

  // USERS
  static async getUsers(): Promise<User[]> {
    const res = await fetch(
      `${BASE_URL}/get_users.php?token=${this.token}&id=${this.userId}` //userliste vom server abgerufen
    );

    return await res.json(); //als json zurückgegeben
  }

  // CONVERSATION (TASK 1)
  static async getConversation(user1: string, user2: string): Promise<ChatMessage[]> {
    const res = await fetch(
      `${BASE_URL}/get_conversation.php?token=${this.token}&user1_id=${user1}&user2_id=${user2}`
    ); // Lädt den Chatverlauf zwischen zwei Nutzern vom Server, wenn token gültig

    return await res.json(); //gibt ihn als json array zurück (promise)
  }

  // SEND MESSAGE
  static async sendMessage(senderId: string, receiverId: string, message: string) {
    const res = await fetch(`${BASE_URL}/send_message.php`, { //daten an server geschickt
      method: "POST", //weiterverarbeitung
      body: new URLSearchParams({
        token: this.token || "",
        sender_id: senderId,
        receiver_id: receiverId,
        message
      })
    });

    return await res.json();
  }
}