import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/service/crud.service'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 public userForm: FormGroup;
  constructor(public toastr: ToastrService,public crudApi: CrudService,  
    public fb: FormBuilder,) { }
  ngOnInit() {
    this.crudApi.DisplayUsersList();  
    this.useForm();
    
  }
  useForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['',[Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z]+.[a-zA-Z0-9-.]+$')]],
    })  
  }
  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }  

  get email() {
    return this.userForm.get('email');
  }

  ResetForm() {
    this.userForm.reset();
  }  
 
  submitUserData() {
    this.crudApi.AddUser(this.userForm.value);
    this.toastr.success(this.userForm.controls['email'].value + ' successfully added!');
    this.ResetForm();  
   };

}
 
