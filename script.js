
const topButton = document.getElementById("topButton");

// Mostrar botão quando a página for rolada
window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }

});

// Voltar ao início
topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// Rolagem suave nos links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// Incorporar vídeos do YouTube automaticamente
document.querySelectorAll(".youtube-video").forEach(container => {
    const link = container.dataset.youtube;
    const titulo = container.dataset.title || "Vídeo do projeto";

    if (!link) return;

    try {
        const url = new URL(link);
        let videoId = "";

        if (url.hostname.includes("youtu.be")) {
            videoId = url.pathname.split("/").filter(Boolean)[0];
        } else if (url.searchParams.get("v")) {
            videoId = url.searchParams.get("v");
        } else if (
            url.pathname.includes("/shorts/") ||
            url.pathname.includes("/embed/")
        ) {
            videoId = url.pathname.split("/").filter(Boolean)[1];
        }

        if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
            container.textContent = "Link do YouTube inválido.";
            return;
        }

        const iframe = document.createElement("iframe");

        iframe.src = `https://www.youtube.com/embed/${videoId}?origin=${encodeURIComponent(window.location.origin)}`;

        iframe.title = titulo;
        iframe.width = "100%";
        iframe.height = "100%";

        // Importante para evitar o erro 153
        iframe.referrerPolicy = "strict-origin-when-cross-origin";

        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

        iframe.allowFullscreen = true;
        iframe.loading = "lazy";

        container.appendChild(iframe);

    } catch (erro) {
        container.textContent = "Não foi possível carregar este vídeo.";
        console.error("Erro ao incorporar vídeo:", erro);
    }
});
