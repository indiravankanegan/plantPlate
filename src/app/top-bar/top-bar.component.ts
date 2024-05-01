import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileServiceService } from '../profile-service.service';
import { Profile } from '../profile-model';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  username: string | undefined;
  profile: Profile | undefined
  constructor(private router: Router, private route: ActivatedRoute, private profileService: ProfileServiceService) {}

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    console.log(this.username);
  } 

  isLoggedIn(): boolean {

    return (this.router.url.endsWith('/dashboard') || 
    this.router.url.endsWith('/update') || 
    this.router.url.startsWith('/recipe') ||
    this.router.url.startsWith('/manage') ||
    this.router.url.endsWith('/liked-recipes')

  );
  }
  backToHome() {
    // Navigate to the home page
    this.router.navigateByUrl(``);

  }

  backToDashboard() {

    this.profileService.getByUsername(this.username!).subscribe({
      
      next: (profile) => {
        console.log(this.username);

        if (profile) {

          console.log('Logging in with username:', this.username);
          this.router.navigateByUrl(`${profile.username}/dashboard`, { state: { profile } });
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



  onSubmit() {
    this.profileService.getByUsername(this.username!).subscribe({
      next: (profile) => {
        if (profile) {
          console.log('Logging in with username:', this.username);
          this.router.navigateByUrl(`/update/${profile.username}`, { state: { profile } });
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
}
