const socket = io("https://pinterest-image-server.onrender.com");

const getImageButton = document.querySelector(".getImage");
const urlInput = document.querySelector(".url");
const imgDisplay = document.querySelector(".image")
const loadingBar = document.getElementById("loadingBar");

function showLoading() {
    loadingBar.style.display = 'block';
}

function hideLoading() {
    loadingBar.style.display = 'none';
}

// Listen for the server response
socket.on("message", ({ imageSource }) => {
    hideLoading()
    if (imageSource) {
        imgDisplay.setAttribute("src", imageSource)
        console.log(`Received image source from server: ${imageSource}`);
    } else {
        console.log("No image source found or an error occurred.");
        imgDisplay.setAttribute("alt", "No image source found or an error occurred.")
    }
});

function sendUrl(e) {
    e.preventDefault();

    imgDisplay.setAttribute("src", "")

    const urlValue = urlInput.value;

    if (urlValue) {
        showLoading()
        socket.emit("message", { url: urlValue });
        console.log(`Sent URL: ${urlValue}`);

        urlInput.value = "";
    } else {
        console.log("URL input is empty. Please enter a URL.");
    }
}

getImageButton.addEventListener("click", sendUrl);
