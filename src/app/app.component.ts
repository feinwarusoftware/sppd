import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { SearchComponent } from "./search/search.component";

let bannerImage = () => {
  let images = [
    {
      image: "https://cdn.discordapp.com/attachments/508629797421973504/557583753048883210/unknown.png",
      artist: "Phinbella Flynn"
    },
    {
      image: "https://cdn.discordapp.com/attachments/508629797421973504/557583946972659713/unknown.png",
      artist: "Phinbella Flynn"
    },
    {
      image: "https://cdn.discordapp.com/attachments/508629797421973504/557584096780615684/unknown.png",
      artist: "Phinbella Flynn"
    },
    {
      image: "https://cdn.discordapp.com/attachments/508629797421973504/557583867305918475/unknown.png",
      artist: "Phinbella Flynn and FoxReed"
    },
  ]

  let random = images[Math.floor(Math.random() * images.length)]

  return random;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'Feinwaru // Phone Destroyer Cards';
  bannerImg = bannerImage();
}
