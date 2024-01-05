import React from 'react';
import "./HomeStyles.css";

function Home() {
  return (
    <>
      <div className="home">
        <h1>React Navbar</h1>
        <h3>Difficulty Level: 0;</h3>
        <video controls>
          <source src="http://res.cloudinary.com/math-tutorials/video/upload/c_scale,h_720,w_1280/v1695820891/podzielosc_liczb_iwsrgt.mp4" type="video/mp4" />
          Przeglądarka nie obsługuje odtwarzania wideo.
        </video>
      </div>
    </>
  );
}

export default Home;
