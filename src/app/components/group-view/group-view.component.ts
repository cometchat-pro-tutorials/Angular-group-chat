import { Component, OnInit, OnDestroy } from '@angular/core';
import { CometChatService } from 'src/app/services/comet-chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit, OnDestroy {
  messages = [];
  listenerId = 'Web_App_Listener_Group_ID';

  get currentUser() {
    return this.chatService.currentUser;
  }

  constructor(private chatService: CometChatService) {}

  ngOnInit() {
    // Users are already members of the group
    // this.chatService.joinGroup(this.groupId);

    this.getMessages().then(_ => this.listenForMessages());
  }

  sendMessage(message: string) {
    this.messages.push({
      text: message,
      sender: { uid: this.currentUser.uid }
    });
    this.chatService.sendMessage(environment.cometChat.groupId, message);
  }

  getMessages() {
    return this.chatService
      .getPreviousMessages(environment.cometChat.groupId)
      .then(messages => (this.messages = messages))
      .then(console.log, console.error);
  }

  listenForMessages() {
    console.log('registering messages listner');
    this.chatService.listenForMessages(this.listenerId, msg => {
      console.log('new message received: ', msg);
      this.messages.push(msg);
    });
  }

  ngOnDestroy(): void {
    this.chatService.removeListener(this.listenerId);
  }
}
