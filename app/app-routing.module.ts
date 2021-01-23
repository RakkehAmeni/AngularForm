import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from 'src/app/add-user/add-user.component';
import { EditUserComponent } from 'src/app/edit-user/edit-user.component';
import { DisplayUserComponent } from 'src/app/display-user/display-user.component';

const routes: Routes = [
  {path: '' ,component :AddUserComponent },
  { path: 'registeruser', component: AddUserComponent },
  { path: 'displayusers', component: DisplayUserComponent },
  { path: 'edituser/:id', component: EditUserComponent }
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [CommonModule,RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
