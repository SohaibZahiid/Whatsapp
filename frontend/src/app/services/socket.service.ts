import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: Socket
  url = 'ws://localhost:8900'
  constructor() {
    this.socket = io(this.url)
  }


  listen(eventName: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(eventName, data => {
        observer.next(data)
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }

  disconnect() {
    this.socket.disconnect()
  }
}
