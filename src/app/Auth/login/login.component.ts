import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  submitted = false;
  constructor(private fb:FormBuilder, private http:HttpClient,private router: Router,private toastr:ToastrService){

  }
  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    }),
    setTimeout(()=>{
      localStorage.setItem("formData", JSON.stringify(this.loginForm.value))
    },1000)
    localStorage.setItem("formData", JSON.stringify(this.loginForm.value));
    
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.loginForm.value);
    if(this.loginForm.invalid){
      return
    }
      const newUser = this.loginForm.value;
      localStorage.setItem('user', JSON.stringify(newUser));
      console.log( localStorage.setItem('user', JSON.stringify(newUser)))
      let data ={
        ...this.loginForm.value
      }
      this.http.post('http://localhost:3000/data',data).subscribe((res)=>{
        if(res){
          console.log(res);
          console.log('Hello, I am loggedIn');
          this.toastr.success('You are successfully logged In')
          this.router.navigate(['/list'])
        }else{
          this.toastr.error('Something went wrong....')
        }
      })

    }

    validateNumber(event: KeyboardEvent) {
      let charCode = (event.which) ? event.which : event.keyCode;
      // charCode 48-57 corresponds to numbers 0-9
      if (charCode < 48 || charCode > 57) {
        event.preventDefault(); // Block non-numeric characters
      }
    }

  

}
