import { ApiService } from "./ApiService.js";

let selectedUser: string | null = null;

const getElementById = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Element with id "${id}" not found.`);
  }

  return element as T;
};

const getInputValue = (id: string): string => {
  return getElementById<HTMLInputElement>(id).value.trim();
};

const showError = (message: string): void => {
  console.error(message);
  alert(message);
};

const loadUsers = async (): Promise<void> => {
  try {
    const users = await ApiService.getUsers();
    const list = getElementById<HTMLUListElement>("user-list");

    list.innerHTML = "";

    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.name;

      li.addEventListener("click", async () => {
        list.querySelectorAll("li").forEach((item) => item.classList.remove("active"));
        li.classList.add("active");

        selectedUser = user.id;
        await loadConversation(user.id);
      });

      list.appendChild(li);
    });
  } catch (error) {
    showError(error instanceof Error ? error.message : "Unable to load users.");
  }
};

const loadConversation = async (otherUserId: string): Promise<void> => {
  const myId = ApiService.getUserId();

  if (!myId) {
    return;
  }

  try {
    const messages = await ApiService.getConversation(myId, otherUserId);
    const chat = getElementById<HTMLDivElement>("chat-messages");

    chat.innerHTML = "";

    messages.forEach((msg) => {
      const div = document.createElement("div");
      div.className = msg.sender_id === myId ? "sent" : "received";
      div.textContent = msg.message;
      chat.appendChild(div);
    });

    chat.scrollTop = chat.scrollHeight;
  } catch (error) {
    showError(error instanceof Error ? error.message : "Unable to load conversation.");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  console.log("APP READY");

  const registerButton = getElementById<HTMLButtonElement>("register-btn");
  const loginButton = getElementById<HTMLButtonElement>("login-btn");
  const form = getElementById<HTMLFormElement>("chat-form");
  const input = getElementById<HTMLInputElement>("chat-input");

  registerButton.addEventListener("click", async () => {
    const name = getInputValue("reg-name");
    const email = getInputValue("reg-email");
    const password = getInputValue("reg-password");
    const group = getInputValue("reg-group");

    try {
      const res = await ApiService.registerUser(name, email, password, group);

      if (res.success) {
        alert("Registered!");
        return;
      }

      showError(res.error ?? "Registration failed.");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Registration failed.");
    }
  });

  loginButton.addEventListener("click", async () => {
    const user = getInputValue("login-user");
    const pass = getInputValue("login-password");

    try {
      const res = await ApiService.loginUser(user, pass);

      if (!res.token) {
        showError("Login failed");
        return;
      }

      alert("Login success!");
      await loadUsers();
    } catch (error) {
      showError(error instanceof Error ? error.message : "Login failed");
    }
  });

  form.addEventListener("submit", async (event) => {
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

    const chat = getElementById<HTMLDivElement>("chat-messages");
    const div = document.createElement("div");
    div.className = "sent";
    div.textContent = message;
    chat.appendChild(div);

    input.value = "";

    try {
      await ApiService.sendMessage(myId, selectedUser, message);
    } catch (error) {
      showError(error instanceof Error ? error.message : "Unable to send message.");
    }
  });
});
