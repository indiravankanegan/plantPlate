import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileServiceService } from '../profile-service.service';
import { Profile } from '../profile-model';
@Component({
  selector: 'app-login-create-user',
  templateUrl: './login-create-user.component.html',
  styleUrls: ['./login-create-user.component.css']
})
export class LoginCreateUserComponent {

    constructor(private formBuilder: FormBuilder,
      private profileService: ProfileServiceService,
      private route: ActivatedRoute,
      private router: Router) {
  
      const form = this.loginForm;
      form.get('username')?.addValidators(Validators.required);
      form.get('password')?.addValidators(Validators.required);
    }
  
    public loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  
    ngOnInit(): void {
      this.loginForm.setValue({
        // username: profile.username,
        // password: profile.password
        username: '',
        password: ''
      });
    }
  
    public profile: Profile | undefined = undefined;
  
    onSubmit() {
      if (this.loginForm.invalid) {
        return;
      }
      // Retrieve form values
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
    
      this.profileService.getProfileByUserAndPassword(username!, password!).subscribe({
        next: (profile) => {
          if (profile) {
            console.log('Logging in with username:', username, 'and password:', password);
            this.router.navigateByUrl(`/${profile.username}/dashboard`, { state: { profile } });
          } else {
            window.alert("Wrong credentials, please try again or create an account.")
          }
        },
        error: (error) => {
          console.error('Error logging in:', error);
          // Handle error, if needed
        }
      });
    }
    
  
    goToRegistration() {
      // Navigate to the registration page
      this.router.navigateByUrl('/register');
    }
}
