export interface ApiResponse {
  success?: boolean;
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

const BASE_URL = "http://webp-ilv-backend.cs.technikum-wien.at/messenger";

export class ApiService {
  private static token: string | null = null;
  private static userId: string | null = null;

  static getUserId(): string | null {
    return this.userId;
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network error ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<T>;
  }

  static async registerUser(
    name: string,
    email: string,
    password: string,
    groupId: string
  ): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/registrieren.php`, {
      method: "POST",
      body: new URLSearchParams({ name, email, password, group_id: groupId }),
    });

    return this.handleResponse<ApiResponse>(response);
  }

  static async loginUser(usernameOrEmail: string, password: string): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/login.php`, {
      method: "POST",
      body: new URLSearchParams({
        username_or_email: usernameOrEmail,
        password,
      }),
    });

    const data = await this.handleResponse<ApiResponse>(response);

    if (data.token && data.id) {
      this.token = data.token;
      this.userId = data.id;
    }

    return data;
  }

  static async getUsers(): Promise<User[]> {
    if (!this.token || !this.userId) {
      throw new Error("User is not logged in.");
    }

    const response = await fetch(
      `${BASE_URL}/get_users.php?token=${encodeURIComponent(this.token)}&id=${encodeURIComponent(
        this.userId
      )}`
    );

    return this.handleResponse<User[]>(response);
  }

  static async getConversation(user1: string, user2: string): Promise<ChatMessage[]> {
    if (!this.token) {
      throw new Error("User is not logged in.");
    }

    const response = await fetch(
      `${BASE_URL}/get_conversation.php?token=${encodeURIComponent(this.token)}&user1_id=${encodeURIComponent(
        user1
      )}&user2_id=${encodeURIComponent(user2)}`
    );

    return this.handleResponse<ChatMessage[]>(response);
  }

  static async sendMessage(
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<ApiResponse> {
    if (!this.token) {
      throw new Error("User is not logged in.");
    }

    const response = await fetch(`${BASE_URL}/send_message.php`, {
      method: "POST",
      body: new URLSearchParams({
        token: this.token,
        sender_id: senderId,
        receiver_id: receiverId,
        message,
      }),
    });

    return this.handleResponse<ApiResponse>(response);
  }
}
