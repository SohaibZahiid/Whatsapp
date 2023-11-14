import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { faFilter, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/user';
import {of, switchMap} from 'rxjs';
import { ChatService } from '../services/chat.service';
import { Message } from '../interfaces/message';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewChecked {

  @ViewChild('messageArea') messageArea!: ElementRef

  filterIcon = faFilter
  planeIcon = faPaperPlane

  messageValue = ''

  user: User = JSON.parse(localStorage.getItem('user')!).user || null

  currentUser: User | null = null
  currentConversation: any = null

  messages: any = []

  arrivalMessage: any


  constructor(private chatService: ChatService, private socketService: SocketService) { }

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }


  scrollToBottom() {
    if(this.messageArea) {
      this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
    }
  }

  ngOnInit(): void {
    this.socketService.emit("addUser", this.user._id)

    /*this.socketService.listen("getUsers").subscribe(res => {
      console.log(res)
    })*/

    this.socketService.listen("getMessage").subscribe(res => {
      this.arrivalMessage = {
        conversationId: this.currentConversation?._id,
        sender: res.senderId,
        receiver: res.receiverId,
        message: res.message
      }

      if (
        this.arrivalMessage &&
        this.currentConversation.members.includes(this.arrivalMessage.sender)
      ) {
        this.messages = [...this.messages, this.arrivalMessage];
      }
    })


  }

  onCurrentUserChange(userEvent: User) {
    // Update chat box area user
    this.currentUser = userEvent

    this.chatService.getConversation(this.user._id!, this.currentUser._id!).pipe(
      switchMap((conversation: any) => {
        if(conversation) {
          this.currentConversation = conversation
          return this.chatService.getMessages(conversation._id)
        } else {
          return of([]);
        }
      })
    ).subscribe(res => {
      this.messages = res
    })
  }


  sendMessage() {
    

    const message: Message = {
      conversationId: this.currentConversation?._id ?? "",
      sender: this.user._id!,
      receiver: this.currentUser?._id!,
      message: this.messageValue
    }

    this.socketService.emit("sendMessage", {
      senderId: this.user._id!,
      receiverId: this.currentUser?._id!,
      message: this.messageValue
    })

    this.chatService.sendMessage(message).subscribe(res => {
      this.messages = [...this.messages, res]
      this.messageValue = ''
    })

  }
}
