const videoUrl = 'https://res.cloudinary.com/math-tutorials/video/upload/v1695814969/podzielosc_liczb_zoyisd.mp4';

const videoElement = document.createElement('video');
videoElement.src = videoUrl;
videoElement.controls = true;

// Dodaj element wideo do dokumentu HTML
document.body.appendChild(videoElement);
