import { Component, OnInit } from '@angular/core';
import { CometChatService } from 'src/app/services/comet-chat.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  private groupId = 'supergroup';

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
    this.chatService.sendMessage(this.groupId, message);
  }

  getMessages() {
    this.chatService
      .getPreviousMessages(this.groupId)
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
