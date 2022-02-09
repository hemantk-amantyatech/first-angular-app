import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
//url = "http://localhost:3000/employee"
url = "https://localhost:5001/employee";
  constructor(private http:HttpClient) { }
  getList(){
    
    return this.http.get(this.url);
    
  }

  saveEmp(data: any){
    console.warn(data);
    return this.http.post(this.url,data);
  }

  deleteEmp(id: any){
    return this.http.delete(`${this.url}/${id}`)
  }

  getCurrentEmp(id: any){
    return this.http.get (`${this.url}/${id}`)
  }

  updateEmp(id: any,data: any){
    return this.http.put(`${this.url}/${id}`,data)
}
}