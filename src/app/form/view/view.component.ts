import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit  {
  data:any;
  showDatas:boolean=false;
  constructor(private http:HttpClient,private spinner: NgxSpinnerService,private router:Router){

  }
  ngOnInit(): void {
    this.getData();
    this.spinner.show();

    setTimeout(()=>{
      this.showDatas=true;
      this.spinner.hide();

    },1000);

    
    
    
  }
  getData(){
    this.http.get('http://localhost:3000/data').subscribe((res)=>{
      if(res){
        console.log(res,'wertyui');
        this.data = res
      }
    })
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
