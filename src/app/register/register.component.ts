import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import{FormGroup, FormControl, Validators} from '@angular/forms';
import{AuthServiceService} from '../auth-service.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private auth:AuthServiceService) { }
  ngOnInit(): void {
  }

  alert: boolean = false;
  errorMessage:string = '';
  regEmp: FormGroup = new FormGroup(
    {
      name: new FormControl("",Validators.required),
      email: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required),


    }
    
  )

  registerEmp(){
    if(this.regEmp.get('email')?.valid && this.regEmp.get('password')?.valid && this.regEmp.get('name')?.valid)
    {
    this.auth.regUser(this.regEmp.value).subscribe({
      next: (response)=>{
    },
    error : (error)=>{
      if(error){
        this.errorMessage = error;
      }
    }
  }
      
    )
    
  }
  else{
    this.regEmp.get('name')?.markAsDirty();
    this.regEmp.get('name')?.markAsTouched();
    this.regEmp.get('email')?.markAsDirty();
    this.regEmp.get('email')?.markAsTouched();
    this.regEmp.get('password')?.markAsDirty();
    this.regEmp.get('password')?.markAsTouched();
  }
  }

  closeAlert(){
    this.alert = false;
    this.router.navigate([""]);
  }
  get name(){return this.regEmp.get('name');}
  get email(){return this.regEmp.get('email');}
  get password(){return this.regEmp.get('password');}
}
