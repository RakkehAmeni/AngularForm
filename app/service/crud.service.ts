import { Injectable } from '@angular/core';
import { User} from 'src/app/user';
import {AngularFireDatabase,AngularFireList,AngularFireObject} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  usersref: AngularFireList<any>;
  userref: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }
 
  AddUser (user :User) {
    this.usersref.push({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })   
  
  }

  DisplayUser (id:string){
    this.userref = this.db.object('displayusers/' + id);
    return this.userref;
  }

  DisplayUsersList() {
    this.usersref = this.db.list('displayusers');
    return this.usersref;
  } 

  UpdateUser(user: User) {
    this.userref.update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  }  

  DeleteUser(id: string) { 
    this.userref = this.db.object('displayusers/'+id);
    this.userref.remove();
  }

}
