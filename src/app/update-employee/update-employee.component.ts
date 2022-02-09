import { Component, OnInit } from '@angular/core';
import{FormGroup, FormControl} from '@angular/forms';
import{ActivatedRoute} from '@angular/router';
import{EmployeeService} from '../employee.service';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  alert: boolean= false;

  editEmp: FormGroup = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    gender: new FormControl(""),
    location: new FormControl("")
  })
  constructor(private router: ActivatedRoute, private emp: EmployeeService) {
    
    
   }

  ngOnInit(): void {
    this.emp.getCurrentEmp(this.router.snapshot.params['id']).subscribe((result: any)=>{
      console.warn(result);

      let res = result[0];

      this.editEmp = new FormGroup({
        name: new FormControl(res.name),
        email: new FormControl(res.email),
        gender: new FormControl(res.gender),
        location: new FormControl(res.location)
      })
    })
  }
collection(){
  this.emp.updateEmp(this.router.snapshot.params['id'],this.editEmp.value).subscribe((result)=>{
    this.alert=true;
  })
}
closeAlert(){
  this.alert=false;
}
}
