import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import IGotItButton from './components/IGotItButton';

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
            <source src="http://res.cloudinary.com/math-tutorials/video/upload/c_scale,h_720,w_1280/v1695820891/podzielosc_liczb_iwsrgt.mp4" type="video/mp4" />
            Przeglądarka nie obsługuje odtwarzania wideo.
          </video>
        </header>
        <IGotItButton></IGotItButton>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;