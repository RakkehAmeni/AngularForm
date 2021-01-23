import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/service/crud.service'; 
import { User} from 'src/app/user';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {

    User: User[];                
    hideWhenNouser: boolean = false; 
    noData: boolean = false;           
    
  
    constructor(
      public crudApi: CrudService, 
      public toastr: ToastrService 
      ){ }
  
  
    ngOnInit() {
      this.dataState(); 
      let u = this.crudApi.DisplayUsersList(); 
      u.snapshotChanges().subscribe(data => {
        this.User = [];
        data.forEach(item => {
          let a = item.payload.toJSON(); 
          a['id'] = item.key;
          this.User.push(a as User);
        })
      })
    }

    dataState() {     
      this.crudApi.DisplayUsersList().valueChanges().subscribe(data => {
        if(data.length <= 0){
          this.hideWhenNouser = false;
          this.noData = true;
        } else {
          this.hideWhenNouser = true;
          this.noData = false;
        }
      })
    }
 
    deleteuser(user) {
      if (window.confirm('Are sure you want to delete '+ user.firstName + ' ' + user.lastName+'?')) { 
        this.crudApi.DeleteUser(user.id) 
        this.toastr.success(user.email + ' successfully deleted!'); 
      }
    }
  


}
