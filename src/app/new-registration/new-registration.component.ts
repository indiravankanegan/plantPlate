import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, VeganExperience, CookingFrequency, MealTypes, CookingExperience } from '../profile-model'; // Adjust the path based on your file structure
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileServiceService } from '../profile-service.service';
@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})
export class NewRegistrationComponent implements OnInit {

  veganExperienceOptions = Object.values(VeganExperience);
  cookingFrequencyOptions = Object.values(CookingFrequency);
  mealTypesOptions = Object.values(MealTypes);
  cookingExperienceOptions = Object.values(CookingExperience);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileServiceService,
    private formBuilder: FormBuilder
  ) { }

  newUserForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    vegan_experience: ['', Validators.required],
    cooking_frequency: ['', Validators.required],
    meal_types: [[''], Validators.required],
    experimental: ['', Validators.required],
    cooking_experience: ['', Validators.required],
    dietary_restrictions: [[]],
    food_preferences: [[]],
  });

  ngOnInit(): void {}
  
  onSubmit() {
    if (this.newUserForm.invalid) {
      return;
    }
    
    const username = this.newUserForm.value.username;
    
    // Check if the username is already taken
    this.profileService.isUsernameTaken(username!).subscribe({
      next: (isTaken) => {
        if (isTaken) {
          window.alert("This username is already taken. Please choose a different one.");
        } else {
          // Proceed with adding the profile
          const profile_temp = this.constructProfileObject();
          this.profileService.addProfile(profile_temp).subscribe({
            next: (response) => {
              console.log('Profile added successfully');
              const profile = this.profileService.mapToProfile(response); // Assuming the server responds with the newly added profile's ID
              this.router.navigateByUrl(`/${profile.username}/dashboard`, { state: { profile } });
            },
            error: (error) => {
              console.error('Error adding profile:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error checking username availability:', error);
      }
    });
  }
  
  constructProfileObject(): Profile {
    return {
      id: -1, // Assuming you don't have an ID at this point
      first_name: this.newUserForm.value.first_name!,
      last_name: this.newUserForm.value.last_name!,
      username: this.newUserForm.value.username!,
      password: this.newUserForm.value.password!,
      vegan_experience: this.newUserForm.value.vegan_experience as VeganExperience,
      cooking_frequency: this.newUserForm.value.cooking_frequency as CookingFrequency,
      meal_types: this.newUserForm.value.meal_types as MealTypes[],
      experimental: this.newUserForm.value.experimental === 'Yes',
      cooking_experience: this.newUserForm.value.cooking_experience as CookingExperience,
      dietary_restrictions: this.newUserForm.value.dietary_restrictions!,
      food_preferences: this.newUserForm.value.food_preferences!,
    };
  }
}
