import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AcessToken, UserMin } from 'src/app/models/AuthModels';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{


  name: string =''
  listofUsers: Array<UserMin> = [];

  constructor(private userService: UsersService, private router: Router){
     let token = JSON.parse( localStorage.getItem("session")|| '')  as AcessToken;
       this.name = token.user.userName
  }
  ngOnInit(): void {
    this.userService.getAllUsers().pipe().subscribe({
      next: (res:Array<UserMin>)=> this.listofUsers = res.filter(e=>  e.userName != this.name)
    })
  }


  logout() {
 localStorage.clear()
 this.router.navigate(['login'])
    }




    chat(user: string) {
       this.router.navigate(['chat',user])
      }

}
