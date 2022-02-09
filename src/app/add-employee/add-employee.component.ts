import { Component, OnInit } from '@angular/core';
import{FormGroup, FormControl, Validators} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
alert: boolean=false
  addEmp: FormGroup = new FormGroup({
    name: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required]),
    gender: new FormControl("",[Validators.required]),
    location: new FormControl("",[Validators.required])
  })
  constructor(private emp: EmployeeService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
  }
  msg:boolean=false;
collectEmp(){
  if(this.addEmp.get('name')?.valid && this.addEmp.get('email')?.valid && this.addEmp.get('gender')?.valid 
     && this.addEmp.get('location')?.valid){
    this.emp.saveEmp(this.addEmp.value).subscribe((result)=>{
      this.alert=true;
      this.addEmp.reset({})
    })
  }

  else{
    this.addEmp.get('name')?.markAsDirty();
    this.addEmp.get('name')?.markAsTouched();
    this.addEmp.get('email')?.markAsDirty();
    this.addEmp.get('email')?.markAsTouched();
    this.addEmp.get('gender')?.markAsDirty();
    this.addEmp.get('gender')?.markAsTouched();
    this.addEmp.get('location')?.markAsDirty();
    this.addEmp.get('location')?.markAsTouched();
  }
 
  
}
closeAlert(){
  this.alert=false
}
get name() { return this.addEmp.get('name'); }
get email() { return this.addEmp.get('email'); }
get gender() { return this.addEmp.get('gender'); }
get location() { return this.addEmp.get('location'); }
}
