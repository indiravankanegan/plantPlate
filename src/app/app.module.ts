import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
// import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginCreateUserComponent } from './login-create-user/login-create-user.component';
import { NewRegistrationComponent } from './new-registration/new-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NewComponent } from './new/new.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { LikedRecipesComponent } from './liked-recipes/liked-recipes.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      // { path: ':recipe/:id', component: ProductDetailsComponent },
      { path: 'login', component: LoginCreateUserComponent},
      { path: 'register', component: NewRegistrationComponent},
      { path: ':username/dashboard', component: DashboardComponent},
      { path: ':username/update', component: UpdateProfileComponent},
      { path: 'recipe/:id', component: RecipeDetailsComponent},
      { path: 'manage', component: ManageUsersComponent},
      { path: ':username/liked-recipes', component: LikedRecipesComponent}
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    // ProductDetailsComponent,
    HomePageComponent,
    LoginCreateUserComponent,
    NewRegistrationComponent,
    DashboardComponent,
    UpdateProfileComponent,
    NewComponent,
    RecipeDetailsComponent,
    ManageUsersComponent,
    LikedRecipesComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/