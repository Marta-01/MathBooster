const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Konfiguracja Cloudinary
cloudinary.config({
  cloud_name: 'math-tutorials',
  api_key: '338281388755611',
  api_secret: '6BNa0Jo5bMtwjBVG1IZdEDf8SzI',
  secure: true,
});

// Endpoint do pobierania plików wideo
router.get('/podzielnosc_liczb', async (req, res) => {
  try {
    // Zastąp 'podzielosc_liczb_iwsrgt' odpowiednim identyfikatorem pliku wideo z Cloudinary
    const publicId = 'podzielosc_liczb_iwsrgt'; // Poprawny identyfikator pliku wideo na Cloudinary

    // Wykorzystaj bibliotekę Cloudinary do pobrania pliku wideo
    const result = await cloudinary.api.resource(publicId, { resource_type: 'video' });

    if (!result.secure_url) {
      res.status(404).send('Plik wideo nie został znaleziony.');
      return;
    }

    // Ustaw odpowiednie nagłówki dla pliku wideo
    res.setHeader('Content-Type', 'video/mp4');
    
    // Przekieruj strumień pliku wideo jako odpowiedź HTTP
    const stream = cloudinary.uploader.download(publicId, { resource_type: 'video' });
    stream.pipe(res);
  } catch (error) {
    console.error('Błąd pobierania pliku:', error);
    res.status(500).send('Wystąpił błąd podczas pobierania pliku wideo.');
  }
});

module.exports = router;
