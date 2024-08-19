const socket = io("http://127.0.0.1:3500");

const getImageButton = document.querySelector(".getImage");
const urlInput = document.querySelector(".url");
const imgDisplay = document.querySelector(".image");
const loadingBar = document.getElementById("loadingBar");
const header = document.querySelector(".header"); // Fix selector to match HTML

function showLoading() {
    loadingBar.style.display = 'block';
}

function hideLoading() {
    loadingBar.style.display = 'none';
}

// Listen for the server response
socket.on("message", ({ imageSource, imageHeader }) => {
    hideLoading();
    if (imageSource) {
        imgDisplay.setAttribute("src", imageSource);
        imgDisplay.setAttribute("alt", "Image from URL"); // Updated alt text for better UX
        console.log(`Received image source from server: ${imageSource}`);
        header.innerText = imageHeader
        console.log(imageHeader)
    } else {
        imgDisplay.setAttribute("src", "");
        imgDisplay.setAttribute("alt", "No image source found or an error occurred.");
        console.log("No image source found or an error occurred.");
    }
});

function sendUrl(e) {
    e.preventDefault();

    imgDisplay.setAttribute("src", ""); // Clear the previous image
    imgDisplay.setAttribute("alt", ""); // Clear previous alt text

    const urlValue = urlInput.value.trim(); // Trim whitespace

    if (urlValue) {
        showLoading();
        socket.emit("message", { url: urlValue });
        console.log(`Sent URL: ${urlValue}`);

        urlInput.value = ""; // Clear the input after sending
        header.innerText = ""
    } else {
        console.log("URL input is empty. Please enter a URL.");
    }
}

getImageButton.addEventListener("click", sendUrl);
