import React from 'react';
import logo from './logo.svg';
import './App.css';
import './showTutorial'; // Jeśli jest to potrzebne

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* Dodaj element <video> do wyświetlenia pliku wideo */}
          <video controls>
            <source src="https://res.cloudinary.com/math-tutorials/video/upload/c_scale,h_1080,vc_auto,w_1920/v1695820891/podzielosc_liczb_iwsrgt.mp4" type="video/mp4" />
            Przeglądarka nie obsługuje odtwarzania wideo.
          </video>
        </header>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
