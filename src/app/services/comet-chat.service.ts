import { Injectable } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CometChatService {
  currentUser = null;

  init(apiKey: string = environment.cometChat.appId) {
    CometChat.init(apiKey).then(
      msg => console.log('Initialized succesfull: ', msg),
      err => {
        console.log('Initialization failed: ', err);
        throw err;
      }
    );
  }

  login(userId: string, apiKey: string = environment.cometChat.apiKey) {
    return CometChat.login(userId, apiKey)
      .then(usr => (this.currentUser = usr), (this.currentUser = null))
      .then(_ => console.log('User logged in'), console.error);
  }

  sendMessage(receiverId: string, text: string) {
    const message = new CometChat.TextMessage(
      receiverId,
      text,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.GROUP
    );

    return CometChat.sendMessage(message);
  }

  listenForMessages(listenerId: string, onMessageReceived: (msg: any) => void) {
    CometChat.addMessageListener(
      listenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: onMessageReceived,
        onMediaMessageReceived: _ => undefined
      })
    );
  }

  removeListener(listenerId: string) {
    CometChat.removeMessageListener(listenerId);
  }

  joinGroup(groupId: string) {
    return CometChat.joinGroup(groupId, CometChat.GROUP_TYPE.PUBLIC, '');
  }

  getPreviousMessages(groupId: string) {
    const messageRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(groupId)
      .setLimit(100)
      .build();

    return messageRequest.fetchPrevious();
  }
}
