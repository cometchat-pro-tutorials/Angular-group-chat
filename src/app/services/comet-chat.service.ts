import { Injectable } from '@angular/core';
import { CometChat, User } from '@cometchat-pro/chat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CometChatService {
  currentUser: User | null = null;

  constructor() {
    this.init();
  }

  private init(appId: string = environment.cometChat.apiKey) {
    CometChat.init(appId).then(
      msg => console.log('Initialized succesfull: ', msg),
      err => {
        console.log('Initialization failed: ', err);
        throw err;
      }
    );
  }

  login(userId: string, appId: string = environment.cometChat.apiKey) {
    return CometChat.login(userId, appId).then(
      usr => (this.currentUser = usr),
      (this.currentUser = null)
    );
  }
}
