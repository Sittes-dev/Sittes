import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4_7GJi-e5tGNsP-5avd9qdxlhUoeumyw",
  authDomain: "sittes-14ad0.firebaseapp.com",
  projectId: "sittes-14ad0",
  storageBucket: "sittes-14ad0.firebasestorage.app",
  messagingSenderId: "476348237693",
  appId: "1:476348237693:web:28787b2b888348c4046e14"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const nome = document.getElementById("nome");
const estrelas = document.getElementById("estrelas");
const comentario = document.getElementById("comentario");
const enviar = document.getElementById("enviar");
console.log("Firestore conectado!");
enviar.addEventListener("click", async () => {

    if (nome.value === "" || comentario.value === "") {
        alert("Preencha seu nome e a avaliação.");
        return;
    }

    try {

        await addDoc(collection(db, "avaliacoes"), {
            nome: nome.value,
            estrelas: estrelas.value,
            comentario: comentario.value
        });

        alert("Avaliação enviada com sucesso!");

        nome.value = "";
        comentario.value = "";
        estrelas.value = "5";
        carregarAvaliacoes();

    } catch (erro) {

        console.log(erro);
        alert("Erro ao enviar a avaliação.");

    }

});
const lista = document.getElementById("lista-avaliacoes");

async function carregarAvaliacoes() {

    lista.innerHTML = "";

    const snapshot = await getDocs(collection(db, "avaliacoes"));

    snapshot.forEach((doc) => {

        const dados = doc.data();

        lista.innerHTML += `
            <div class="card-avaliacao">
                <h3>${dados.nome}</h3>
                <p>${"⭐".repeat(Number(dados.estrelas))}</p>
                <p>${dados.comentario}</p>
            </div>
        `;

    });

}

carregarAvaliacoes();

document.getElementById("botaoSecreto").addEventListener("click", () => {
  window.location.href = "login.html";
});