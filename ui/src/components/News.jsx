import React, { Component } from 'react';
import Cookies from "universal-cookie";
import { Trans } from 'react-i18next';

const cookies = new Cookies();

const STATIC_ROOT = process.env.NODE_ENV === "development" ? "http://localhost:1337" : "https://sppd.feinwaru.com";
const API_ROOT = `${STATIC_ROOT}/api/v1`;

class News extends Component {

  constructor(props) {
    super(props);
    this.news = React.createRef();
    this.state = {
      error: null,
      isLoaded: false,
      news: {}
    };
  }

  componentDidMount() {
    fetch(`${API_ROOT}/updates?sort=date&order=-1&limit=1`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.data.length !== 0) {
            let recent = cookies.get("news");

            if (recent == undefined || recent !== result.data.updates[0]._id) {
              this.setState({
                news: result.data.updates[0]
              });
              this.news.current.style.display = "block";
            }
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  newsLink = () => {
    window.location.href = this.state.news.link
  }

  closeNews = () => {
    cookies.set("news", this.state.news._id, { maxAge: 31622400 });
    this.news.current.style.display = "none";
  }

  newsDate = () => {
    let date = new Date(this.state.news.date);

    console.log(date.toLocaleDateString())

    return date.toLocaleDateString()

  }

  render() {
    return (
      <div id="news" ref={this.news} className="row mb-5">
        <div className="col-12 py-4 px-4">
          <h2 className="font-weight-bold"><Trans>Latest News</Trans></h2>
          <div className="divider"></div>
          <h3 className="mb-0">{this.state.news.title}</h3>
          <p className="font-italic">{new Date(this.state.news.date).toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>{this.state.news.message}</p>
          {this.state.news.link === null ? "" : <button onClick={() => { this.newsLink() }} className="mr-2 px-4 btn btn-sm btn-sppd"><Trans>View More</Trans></button>}
          <button onClick={() => { this.closeNews() }} className="px-4 btn btn-sm btn-sppd"><Trans>Close</Trans></button>
        </div>
      </div>
    );
  }
}

export default News;