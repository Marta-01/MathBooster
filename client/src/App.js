import React from 'react';
import './App.css';
import Navbar from './components/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <div className="App">
        <header className="-Appheader">
           <Navbar></Navbar>
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