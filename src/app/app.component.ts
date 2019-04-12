import { Component, OnInit } from '@angular/core';
import { CometChatService } from './services/comet-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Angular Chat';

  constructor(private cometChat: CometChatService) {}

  ngOnInit() {
    this.cometChat.init();
  }
}
