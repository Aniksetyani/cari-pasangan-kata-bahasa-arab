// script.js

const cards = [
    { word: "تفاحة", translation: "Apel" },
    { word: "مدرسة", translation: "Sekolah" },
    { word: "كتاب", translation: "Buku" },
    { word: "قلم", translation: "Pulpen" }
];

let gameCards = [];
let firstCard = null;
let secondCard = null;
let canFlip = true;

function startGame() {
    gameCards = [];
    firstCard = null;
    secondCard = null;
    document.getElementById("feedback").innerText = "";

    // Buat duplikat kartu (kata dan terjemahan) dan acak posisi mereka
    cards.forEach(card => {
        gameCards.push({ text: card.word, type: "word" });
        gameCards.push({ text: card.translation, type: "translation" });
    });
    gameCards = gameCards.sort(() => Math.random() - 0.5);

    // Tampilkan kartu di layar
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.index = index;
        cardElement.dataset.type = card.type;
        cardElement.dataset.text = card.text;
        cardElement.addEventListener("click", () => flipCard(cardElement));
        gameContainer.appendChild(cardElement);
    });
}

// Fungsi untuk membalik kartu
function flipCard(cardElement) {
    if (!canFlip || cardElement.classList.contains("flipped")) return;

    cardElement.classList.add("flipped");
    cardElement.innerText = cardElement.dataset.text;

    if (!firstCard) {
        firstCard = cardElement;
    } else if (!secondCard) {
        secondCard = cardElement;
        checkMatch();
    }
}

// Fungsi untuk memeriksa apakah dua kartu cocok
function checkMatch() {
    canFlip = false;

    const isMatch = (firstCard.dataset.type !== secondCard.dataset.type) &&
                    (firstCard.dataset.text === getTranslation(secondCard.dataset.text));

    setTimeout(() => {
        if (isMatch) {
            document.getElementById("feedback").innerText = "Cocok!";
            firstCard = null;
            secondCard = null;
        } else {
            document.getElementById("feedback").innerText = "Tidak cocok, coba lagi.";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerText = "";
            secondCard.innerText = "";
            firstCard = null;
            secondCard = null;
        }
        canFlip = true;
    }, 1000);
}

// Fungsi untuk mendapatkan terjemahan yang cocok
function getTranslation(text) {
    const found = cards.find(card => card.word === text || card.translation === text);
    return found ? (found.word === text ? found.translation : found.word) : null;
}

// Mulai permainan saat halaman dimuat
document.addEventListener("DOMContentLoaded", startGame);
