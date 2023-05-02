import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcessToken } from '../models/AuthModels';
import { MessageDto } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  constructor(private http: HttpClient) { }


  sendMessage(value: MessageDto):Observable<MessageDto> {

  return this.http.post<MessageDto>('api/messages',value)
  }

  getConversation(sender:string,receiver:string):Observable<Array<MessageDto>> {
    let params = new HttpParams();
    params = params.set("sender",sender);
    params = params.set("receiver",receiver);
    return this.http.get<Array<MessageDto>>('api/messages/conversation',{params:params})
  }
}
