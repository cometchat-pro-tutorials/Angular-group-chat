import { Component, OnInit } from '@angular/core';
import { CometChatService } from 'src/app/services/comet-chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  messages = [];

  get currentUser() {
    return this.chatService.currentUser;
  }

  constructor(private chatService: CometChatService) {}

  ngOnInit() {
    // Users are already members of the group
    // this.chatService.joinGroup(this.groupId);

    this.getMessages();
    this.listenForMessages();
  }

  sendMessage(message: string) {
    this.chatService.sendMessage(environment.cometChat.groupId, message);
  }

  getMessages() {
    this.chatService
      .getPreviousMessages(environment.cometChat.groupId)
      .then(messages => (this.messages = messages))
      .then(console.log);
  }

  listenForMessages() {
    this.chatService.listenForMessages(
      'Web_App_Listener_Group' + Math.random(),
      msg => this.messages.push(msg)
    );
  }
}
