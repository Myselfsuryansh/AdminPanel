import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit  {
  myForm!: FormGroup;
  showDatas:boolean=false
  submitted:boolean=false;
  selectedFile: any;
  private apiUrl = 'http://localhost:3000/data';
  public userIdToUpdate:any;
  public isUpdateActive: boolean=false;
  id: any;
  isAddMode!: boolean;
  addressform!:FormGroup
  nextpage:boolean=false;
  nextpage1:boolean=false;
  nextpage2:boolean=false
  dropdownList : any;
  selectedItems :any;
  dropdownSettings = {};
  websiteList:any=['Javatpoint.com', 'HDTuto.com', 'Tutorialandexample.com'] 
  constructor(private fb: FormBuilder,private http: HttpClient,private api:AuthService,private toastr: ToastrService, private activatedRouter: ActivatedRoute, private router:Router,private spinner: NgxSpinnerService){

  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      myCheckbox: [true],
      myRadio: ['option1'],
      textarea:[''],
      website:[''],
      multiselect:[''],
      firstName:[''],
      lastName:[''],
      phone:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      email:[''],
      fullname:[''],
      company:[''],
      employement:[''],
      startdate:[''],
      enddate:[''],
      designation:[''],
      image:['']
    });
    
   
    this.dropdownList= [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
   
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    // this.activatedRouter.params.subscribe(val=>{
    //   this.userIdToUpdate = val;
    //   this.isAddMode = !this.userIdToUpdate;
    //   // this.http.put(`${this.apiUrl}/${this.userIdToUpdate}`).subscribe((res)=>{
    //   //   if(res){
    //   //     console.log('Data deleted successfully')
    //   //   }
    //   // })
    // })

    this.id = this.activatedRouter.snapshot.params['id'];
    this.isAddMode = !this.id;
    if (this.id) {
      this.api.getUser(this.id).subscribe(user => {
        this.myForm.patchValue(user);
      });
    }
    this.spinner.show();

    setTimeout(()=>{
      this.showDatas=true;
      this.spinner.hide();

    },1000)
    
  }
  
  onSubmit() {
    console.log(this.myForm.value);
        if (this.myForm.invalid) {
            return;
        }else{
    const userData = { ...this.myForm.value, id: this.id };
    this.api.saveUser(userData).subscribe(response => {
      console.log('User saved successfully!', response);
      this.toastr.success('Data Saved Successfully');
      this.router.navigate(['/list'])
    
    });
}
    
  }

  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onClick(){
  
    this.nextpage=true
  }
  onClick1(){
    if(this.myForm.invalid){
      return;
    }
    this.nextpage1=true
  }
  onClick2(){
    if(this.myForm.invalid){
      return
    }
    this.nextpage2=true
  }
  onAdreessSubmit(){
  //   console.log(this.myForm.value);
  //   this.http.post('http://localhost:3000/data',this.addressform.value).subscribe(response => {
  //   console.log('Data submitted successfully', response);
   
  // });
  }
  fillFormToUpdate(user:User){
    this.myForm.patchValue({
      firstName:user.firstName,
      lastName: user.lastName,
      email:user.email,
      phone:user.phone,
      textarea: user.textarea,
      website:user.website,
      startdate : user.startdate,
      enddate: user.enddate,
      myRadio: user.myRadio,
      employement: user.employement,
      multiselect: user.multiselect,
      company:user.company,
      designation:user.designation

    })
  }
  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  get f() { return this.myForm.controls; }
  validateNumber(event: KeyboardEvent) {
    let charCode = (event.which) ? event.which : event.keyCode;
    // charCode 48-57 corresponds to numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Block non-numeric characters
    }
  }
  logout(){
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/'])
  }
  


}

