import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private API: string = "http://localhost:3000"
  private requestOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`
    })
  }

  constructor(private http: HttpClient) { }

  getConversations(userId: string) {
    return this.http.get(`${this.API}/conversation/${userId}`, this.requestOptions)
  }

  getConversation(firstUserId: string, secondUserId: string) {
    return this.http.get(`${this.API}/conversation/${firstUserId}/${secondUserId}`, this.requestOptions)
  }

  getMessages(conversationId: string) {
    return this.http.get(`${this.API}/message/${conversationId}`, this.requestOptions)
  }

  sendMessage(message: Message) {
    return this.http.post(`${this.API}/message/`, message)
  }

}
