import { Component } from "react";
import "./NavbarStyles.css";

class Navbar extends Component {

    state = { clicked: false };

    handleClick = () =>{
        this.setState({clicked: !this.state.clicked})
    };

    render(){
    return (
      <>
        <nav>
          <img src="/logo_mathbooster_v4.png" alt="Logo Math Booster" />

          <div>
            <ul id="navbar" className={this.state.clicked ? "navbar active" : "#nacbar"}> 
                <li>
                    <a className="active" href="index.html">Home</a>
                </li>    
                <li>
                    <a href="index.html">Quiz</a>
                </li>    
                <li>
                    <a href="index.html">Tutorial</a>
                </li>    
                <li>
                    <a href="index.html">About</a>
                </li>    
            </ul>
          </div>

          <div id="mobile" onClick={this.handleClick}>
            <i id="bar" className= {this.state.clicked ? "fas fa-times" : "fas fa-bars"}>
            </i>
          </div>

        </nav>
      </>
    );
  }
}
  
  export default Navbar;
  