import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit  {
  data:any;
  filterTerm!: string;
  showDatas:boolean=false;
  public dataSource!: MatTableDataSource<User>;
  users :any;
  
  constructor(private http:HttpClient, private router:Router,private toastr:ToastrService, private service:AuthService,private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.getData();
    this.spinner.show();

    setTimeout(()=>{
      this.showDatas=true;
      this.spinner.hide();
    },1000)
    
     }

  getData(){
    this.http.get('http://localhost:3000/data').subscribe((res)=>{
      if(res){
        console.log(res);
        this.data = res;
        this.users = res;
      }else{
        console.log('error')
      }
    })
  }

  sendData(id:any){
    console.log(id);
    this.router.navigate(['/view'], { queryParams: { id: id } });
    
  }
  edit(id:number){
    this.router.navigate(['/edit'], { queryParams: { id: id } });

  }
  private apiUrl = 'http://localhost:3000/data';

  delete(id:any){
    if(confirm('Are you sure want to delete?'))
    this.http.delete(`${this.apiUrl}/${id}`).subscribe((res)=>{
      if(res){
        console.log('Data deleted successfully');
        this.getData();
        this.toastr.success('Data Deleted successfully');
        
      }
    })
  }
  toggleStatus(user: any) {
    user.enable = !user.enable;
    this.service.updateUserStatus(user.id, user.enable).subscribe();
    console.log(user.enable)
  }
  logout(){
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/'])
  }
  

  
}

