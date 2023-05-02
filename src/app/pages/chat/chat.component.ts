import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AcessToken } from 'src/app/models/AuthModels';
import { MessageDto } from 'src/app/models/Message';
import { MessageService } from 'src/app/services/message.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  periodicCaller!: Subscription ;


  messages :Array<MessageDto> = [];
  message: MessageDto ={

    content: '',
    sender: {
      userName: ''
    },
    receiver: {
      userName: ''
    }
  }

  name: string =''
  chatWithName: string =''
  constructor(private userService: UsersService, private router: Router, private routeSnapshot: ActivatedRoute, private messageService: MessageService){
    this.chatWithName = routeSnapshot.snapshot.paramMap.get('userName')|| 'N/A';
    let token = JSON.parse( localStorage.getItem("session")|| '')  as AcessToken;
      this.name = token.user.userName

      this.message.sender.userName = this.name;
      this.message.receiver.userName = this.chatWithName;
 }
  getMessages(): void {
     this.messageService.getConversation(this.name,this.chatWithName).subscribe({
      next: res=> this.messages = res
     })
  }

  ngOnDestroy(): void {
    this.periodicCaller.unsubscribe()
  }
  ngOnInit(): void {
   this.periodicCaller = interval(500).subscribe(x=>{
    this.getMessages()
   })
  }
 sendMessage() {
   this.messageService.sendMessage(this.message).subscribe({
    next: (m:MessageDto)=>{ this.message.content=''},
    error: (e) => alert(e.message),
    complete: () => console.info('complete')
   })
  }
  goBack() {
    this.router.navigate(['dashboard'])
    }
}
