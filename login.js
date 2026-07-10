import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4_7GJi-e5tGNsP-5avd9qdxlhUoeumyw",
  authDomain: "sittes-14ad0.firebaseapp.com",
  projectId: "sittes-14ad0",
  storageBucket: "sittes-14ad0.firebasestorage.app",
  messagingSenderId: "476348237693",
  appId: "1:476348237693:web:28787b2b888348c4046e14"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = document.getElementById("email");
const senha = document.getElementById("senha");
const entrar = document.getElementById("entrar");
const erro = document.getElementById("erro");

entrar.addEventListener("click", async () => {

    erro.textContent = "";

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value,
            senha.value
        );

        alert("Login realizado com sucesso!");

        window.location.href = "admin.html";

    } catch (e) {

        erro.textContent = "E-mail ou senha incorretos.";

    }

});