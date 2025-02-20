document.addEventListener("DOMContentLoaded", function () {
    const musicForm = document.getElementById("musicForm");
    const musicGrid = document.getElementById("music-grid");
    const backButton = document.createElement("button");

    if (musicForm) {
        musicForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const title = document.getElementById("title").value;
            const artist = document.getElementById("artist").value;
            const genre = document.getElementById("genre").value;
            const duration = document.getElementById("duration").value;
            const cover = document.getElementById("cover").value;

            const musicData = { title, artist, genre, duration, cover };
            saveMusic(musicData);
            window.location.href = "index.html";
        });

       
        backButton.textContent = "Voltar para a Página Inicial";
        backButton.classList.add("back-button");
        backButton.addEventListener("click", function () {
            window.location.href = "index.html";
        });
        musicForm.appendChild(backButton);
    }

    if (musicGrid) {
        loadMusic();
    }
});

function saveMusic(music) {
    let musicList = JSON.parse(localStorage.getItem("musicList")) || [];
    musicList.push(music);
    localStorage.setItem("musicList", JSON.stringify(musicList));
}

function loadMusic() {
    let musicList = JSON.parse(localStorage.getItem("musicList")) || [];
    const musicGrid = document.getElementById("music-grid");
    musicGrid.innerHTML = "";

    if (musicList.length === 0) {
        musicGrid.innerHTML = "<p>Nenhuma música adicionada ainda.</p>";
        return;
    }

    musicList.forEach(music => {
        const musicCard = document.createElement("div");
        musicCard.classList.add("music-card");
        musicCard.innerHTML = `
            <img src="${music.cover}" alt="Capa do álbum" class="album-cover">
            <div class="music-info">
                <h3 class="music-title">${music.title}</h3>
                <p class="artist-name">${music.artist}</p>
                <span class="genre-tag">${music.genre}</span>
                <p class="duration">${music.duration}</p>
            </div>
        `;
        musicGrid.appendChild(musicCard);
    });
}
