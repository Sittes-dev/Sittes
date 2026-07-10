import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
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
const db = getFirestore(app);
const listaAvaliacoes = document.getElementById("lista-avaliacoes");// Protege a página
onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }
    carregarAvaliacoes();

    console.log("UID:", user.uid);
});
// Botão sair
const sair = document.getElementById("sair");

if (sair) {
    sair.addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "login.html";
    });
}
async function carregarAvaliacoes() {

    listaAvaliacoes.innerHTML = "";

    const snapshot = await getDocs(collection(db, "avaliacoes"));

    snapshot.forEach((avaliacao) => {

        const dados = avaliacao.data();

        listaAvaliacoes.innerHTML += `
            <div class="painel-card">

                <h3>${dados.nome}</h3>

                <p>${"⭐".repeat(Number(dados.estrelas))}</p>

                <p>${dados.comentario}</p>

                <button
                    class="btn-excluir"
                    onclick="excluir('${avaliacao.id}')">

                    🗑️ Excluir

                </button>

            </div>
        `;

    });

}
window.excluir = async function(id) {

    if (!confirm("Deseja realmente excluir esta avaliação?")) return;

    console.log("Usuário:", auth.currentUser);

    if (auth.currentUser) {
        console.log("UID:", auth.currentUser.uid);
    }

    try {

        await deleteDoc(doc(db, "avaliacoes", id));

        alert("Avaliação excluída!");

        carregarAvaliacoes();

    } catch (erro) {

        console.error(erro);

        alert(erro.message);

    }

};