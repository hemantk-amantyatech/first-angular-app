import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { DataSource } from '@angular/cdk/collections';
import * as XLSX from 'xlsx';
import { DataTablesModule } from 'angular-datatables';



@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  collection: any =[]
  datatodisplay:any = []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>(); 
  constructor(private router:Router, private emp:EmployeeService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    
  this.emp.getList().subscribe((result)=>{
  this.collection=result;
  this.datatodisplay=result;
  this.dtTrigger.next("");
  //console.warn(result);
  })
  
}

deleteEmp(item: any){
  this.collection.splice(item-1,1)
  this.emp.deleteEmp(item).subscribe((result: any)=>{
    
  })
}
isUserAuthenticated(){
  const token = localStorage.getItem("jwt");
  if((token) && !this.jwtHelper.isTokenExpired(token)){
    return true;
  }
  else{
    return false;
  }
}

fileName= 'ExcelSheet.xlsx'

exportexcel(): void 
    {
      debugger;
       /* table id is passed over here */   
       let element = document.getElementById("excel-table"); 
       
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

applyFilter(filterValue:any) {
  debugger;
  let filterValueLower = filterValue.toLowerCase();
  if(filterValue === '' ) {
      this.datatodisplay=this.collection;
  } else {
     this.datatodisplay = this.collection.filter((item: any) => 
                      item.id.toString().includes(filterValueLower) || 
                      item.name.toLowerCase().includes(filterValueLower) || 
                      item.email.toLowerCase().includes(filterValueLower) || 
                      item.gender.toLowerCase().includes(filterValueLower) ||
                      item.location.toLowerCase().includes(filterValueLower));
}
}
}
