import { Component } from '@angular/core';
import { CometChatService } from 'src/app/services/comet-chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hasError = false;

  constructor(private cometChat: CometChatService, private router: Router) {}

  login(userId: string) {
    this.hasError = false;

    this.cometChat
      .login(userId)
      .then(_ => this.router.navigateByUrl('chat'))
      .catch(err => {
        this.hasError = true;
        console.log(err);
      });
  }
}
