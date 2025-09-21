document.addEventListener("DOMContentLoaded", function() {
    // -------------------- AUDIO --------------------
    const music = document.getElementById("background-music");
    const btn = document.getElementById("music-toggle");

    if (music && btn) {
        const playMusic = () => {
            music.play().catch(() => { btn.textContent = "▶️"; });
        };
        playMusic();

        btn.addEventListener("click", () => {
            if (music.paused) {
                music.play().catch(() => console.log("Reproducción bloqueada"));
                btn.textContent = "⏸️";
            } else {
                music.pause();
                btn.textContent = "▶️";
            }
        });
    }
    // -------------------- MODAL (solo index.html) --------------------
    const modal = document.getElementById("welcome-modal");
    if (modal) {
        document.body.classList.add("modal-open");

        modal.addEventListener("click", function() {
            modal.classList.add("hidden");
            document.body.classList.remove("modal-open");

            // Solo reproducir música si está pausada
            if (music && music.paused) {
                music.play().catch(() => console.log("Reproducción bloqueada"));
            }

            if (btn) btn.textContent = "⏸️";
        });
    }

    // -------------------- ROTACIÓN DE DISCOS (solo discografia.html) --------------------
    const discos = document.querySelectorAll('.rotating-disco');
    if (discos.length > 0) {
        discos.forEach(disco => {
            let speed = 0, maxSpeed = 25, acceleration = 0.4, deceleration = 0.2, angle = 0, hovering = false;
            disco.addEventListener('mouseenter', () => hovering = true);
            disco.addEventListener('mouseleave', () => hovering = false);
            function rotate() {
                if (hovering && speed < maxSpeed) speed += acceleration;
                else if (!hovering && speed > 0) speed -= deceleration;
                angle += speed;
                disco.style.transform = `rotate(${angle}deg)`;
                requestAnimationFrame(rotate);
            }
            rotate();
        });
    }

    // -------------------- LIKE BUTTON (solo index.html) --------------------
const likeButton = document.getElementById("like-button");
const likeCount = document.getElementById("like-count");

// Carga el valor guardado en localStorage, o 0 si no existe
let count = parseInt(localStorage.getItem("likeCount")) || 0;
if (likeCount) likeCount.textContent = count;

if (likeButton && likeCount) {
    likeButton.addEventListener("click", () => {
        count++;
        likeCount.textContent = count;
        // Guardamos en localStorage
        localStorage.setItem("likeCount", count);
    });
}


    // -------------------- HOVER IMÁGENES (solo galeria.html) --------------------
    const overlay = document.getElementById('hover-overlay');
    const overlayImg = document.getElementById('hover-img');
    if (overlay && overlayImg) {
        document.querySelectorAll('.hover-zoom').forEach(img => {
            img.addEventListener('mouseenter', () => {
                overlayImg.src = img.src;
                overlay.style.opacity = '1';
            });
            img.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        });
    }
});
