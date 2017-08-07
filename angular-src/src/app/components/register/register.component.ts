import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	name: String;
	username: String;
	email: String;
	password: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessagesService: FlashMessagesService, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
  	const user = {
  		name: this.name,
  		username: this.username,
  		email: this.email,
	  	password: this.password
  	}

  	// required fields
  	if (!this.validateService.validateRegister(user)) {
  		this.flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 5000});
  		return false;
  	}

  	// validate email address
  	if(!this.validateService.validateEmail(user.email)){
  		this.flashMessagesService.show('Please consider your email is valid', {cssClass: 'alert-danger', timeout: 5000});
  		return false;
  	}

    // register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessagesService.show('You are now registered and can login', {cssClass: 'alert-success'})
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger'})
        this.router.navigate(['/register']);
      }
    });
  }
}
