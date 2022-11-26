import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onClickSubmit(data:any) {
   
    this.userService.login({"username":data.username,"password":data.password}).subscribe({
      next: data => {
        window.sessionStorage.setItem('user', data['accessToken']);
        window.sessionStorage.setItem('role', data['role']);
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        }); // To refresh navigation
       },
       error: err => {
         alert("Username or password is incorrect!")
       }})
      
 }

}
