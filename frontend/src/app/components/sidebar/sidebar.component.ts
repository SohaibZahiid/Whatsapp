import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { faFilter, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { forkJoin, switchMap } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // Pass current user clicked to profile component
  @Output() currentUser: EventEmitter<User> = new EventEmitter<User>()
  // Icons
  filterIcon = faFilter
  exitIcon = faRightFromBracket
  // Get logged in user
  user: User = JSON.parse(localStorage.getItem('user')!).user || null
  // Get recent users that you have chatted
  conversations: User[] = []
  // Search users
  searchValue: string = ""
  // Matching users on serach
  matchingUsers: User[] = [];

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.getConversation()
  }

  onSearchChange() {
    if (this.searchValue) {
      this.authService.getUsersByUsername(this.searchValue).subscribe((res: any) => {
        this.matchingUsers = res.filter((u: any) => u._id !== this.user._id) // remove current logged in user
      }, err => {
        console.log(err.error)
      })
    } else {
      this.matchingUsers = []
    }
  }


  selectUser(user: User) {
    // Emit current user to parent component (profile)
    this.currentUser.emit(user)
  }

  getConversation() {
    this.chatService.getConversations(this.user?._id!)
      .pipe(
        switchMap((chats: any) => {
          const user = chats.map((chat: any) => {
            const userId = chat.members.find((id: string) => id != this.user._id)
            return this.authService.getUser(userId);
          })
          return forkJoin(user)
        })
      ).subscribe(
        (res: any) => {
          this.conversations = res
        }, err => {
          console.log(err.error)
        })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
