import { ApiService } from "./ApiService.js"; //es module

let selectedUser: string | null = null; //user auf null gesetzt


document.getElementById("register-btn")!.addEventListener("click", async () => {
  const name = (document.getElementById("reg-name") as HTMLInputElement).value;
  const email = (document.getElementById("reg-email") as HTMLInputElement).value;
  const password = (document.getElementById("reg-password") as HTMLInputElement).value;
  const group = (document.getElementById("reg-group") as HTMLInputElement).value;

  const res = await ApiService.registerUser(name, email, password, group);

  alert(res.success ? "Registered!" : res.error);
});


document.getElementById("login-btn")!.addEventListener("click", async () => {
  const user = (document.getElementById("login-user") as HTMLInputElement).value;
  const pass = (document.getElementById("login-password") as HTMLInputElement).value;

  const res = await ApiService.loginUser(user, pass);

  if (!res.token) {
    alert("Login failed");
    return;
  }

  alert("Login success!");
  loadUsers();
});


async function loadUsers() {
  const users = await ApiService.getUsers();

  const list = document.getElementById("user-list")!;
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
}

async function loadConversation(otherUserId: string) {
  const myId = ApiService.getUserId();
  if (!myId) return; //wenn kein user eingeloggt, abbrechen

  const messages = await ApiService.getConversation(myId, otherUserId);

  const chat = document.getElementById("chat-messages")!;
  chat.innerHTML = ""; //zuerst geleert

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = msg.sender_id === myId ? "sent" : "received"; //unterscheidung ob gesendet oder empfangen
    div.textContent = msg.message;
    chat.appendChild(div);
  });

  chat.scrollTop = chat.scrollHeight; //nach unten gescrollt
}

window.addEventListener("DOMContentLoaded", () => {

  console.log("APP READY");

  const form = document.getElementById("chat-form") as HTMLFormElement;
  const input = document.getElementById("chat-input") as HTMLInputElement;

  if (!form || !input) {
    console.error("CHAT UI NOT FOUND");
    return;
  }

  form.addEventListener("submit", async (e) => {
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
    const chat = document.getElementById("chat-messages")!;
    const div = document.createElement("div");
    div.className = "sent";
    div.textContent = message;
    chat.appendChild(div);

    input.value = "";

    // API CALL
    try {
      const res = await ApiService.sendMessage(myId, selectedUser, message);
      console.log("API RESPONSE:", res);
    } catch (err) {
      console.error(err);
    }
  });

});