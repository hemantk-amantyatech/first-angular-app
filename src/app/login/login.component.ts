import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../auth-service.service';
import{FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authser: AuthServiceService) { }

  ngOnInit(): void {
  }

  closeAlert(){
    this.alert=false;

  }
  alert: boolean = false;

  public errorMessage:string = '';
  logEmp: FormGroup = new FormGroup({
    email : new FormControl("",Validators.required),
    password : new FormControl("",Validators.required)
  })

  loginEmp(){
    if(this.logEmp.get('email')?.valid && this.logEmp.get('password')?.valid){
      this.authser.loginUser(this.logEmp.value).subscribe({
        next: (response)=>{
        const token = (<any>response).Token;
        localStorage.setItem("jwt",token); 
      this.router.navigate(["list"]);
      },
      error : (error)=>{
        this.errorMessage = error;
      }
    }
        
      )
    }

    else{
      this.logEmp.get('email')?.markAsDirty();
      this.logEmp.get('email')?.markAsTouched();
      this.logEmp.get('password')?.markAsDirty();
      this.logEmp.get('password')?.markAsTouched();
    }
    

    

  }
  get email(){return this.logEmp.get('email');}
  get password(){return this.logEmp.get('password');}
}
