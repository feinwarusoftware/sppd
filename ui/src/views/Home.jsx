import React, { Component } from "react";
import { Navbar, Footer, Search } from "../components";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth };
  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {

    let images = [
      {
        image:
          "https://cdn.discordapp.com/attachments/508629797421973504/557583753048883210/unknown.png",
        artist: "Phinbella Flynn"
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/508629797421973504/557583946972659713/unknown.png",
        artist: "Phinbella Flynn"
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/508629797421973504/557584096780615684/unknown.png",
        artist: "Phinbella Flynn"
      },
      {
        image:
          "https://cdn.discordapp.com/attachments/508629797421973504/557583867305918475/unknown.png",
        artist: "Phinbella Flynn and FoxReed"
      }
    ];

    let randomImage = images[Math.floor(Math.random() * images.length)]

    return (
      <div>
        <Navbar />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-100 banner"
            viewBox={`${this.state.width > 1920 ? "0" : (1920 - this.state.width) / 2} 0 ${this.state.width > 1920 ? "1920" : this.state.width} 491.125`}
            filter="brightness(.5)"
          >
            <defs>
              <clipPath id="banner">
                <path
                  d="M-1,325.3s370.314,177.1,930.267,91.215S1919,502.764,1919,502.764V11.639L-.991,11.684Z"
                  transform="translate(1 -11.639)"
                />
              </clipPath>
            </defs>
            <image
              xlinkHref={randomImage.image}
              clipPath="url(#banner)"
              width="1920"
              height="500"
            />
          </svg>
          <div className="container d-flex justify-content-center align-items-center">
            <div
              style={{ position: "absolute", top: 30 }}
              className="row pt-5 mt-3 justify-content-center w-100"
            >
              <div
                className="col-12 col-md-9 col-lg-6 mb-3"
                style={{ paddingLeft: 100, paddingRight: 100 }}
              >
                <img
                  className="img-fluid"
                  src={require("../static/img/sppd_white.svg")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container my-5">
          <Search />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Index;
