import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; 
import { Location } from '@angular/common';  
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;  
  
  constructor(
    private crudApi: CrudService,       
    private fb: FormBuilder,           
    private location: Location,        
    private actRoute: ActivatedRoute,  
    private router: Router,             
    private toastr: ToastrService       
  ){ }

  ngOnInit() {
    this.updateUserData();   
    const id = this.actRoute.snapshot.paramMap.get('id');  
    this.crudApi.DisplayUser(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data);
    })
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get email() {
    return this.editForm.get('email');
  }  

  updateUserData() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['',[Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z]+.[a-zA-Z0-9-.]+$')]],
    })
  }


  goBack() {
    this.location.back();
  }
  ResetForm() {
    this.editForm.reset();
  } 

  updateForm(){
    this.crudApi.UpdateUser(this.editForm.value);      
    this.toastr.success(this.editForm.controls['email'].value + ' updated successfully');   
    this.router.navigate(['displayusers']);    
    this.ResetForm();          
  }


}
