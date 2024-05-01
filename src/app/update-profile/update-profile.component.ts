import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, VeganExperience, CookingFrequency, MealTypes, CookingExperience } from '../profile-model'; // Adjust the path based on your file structure
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
  veganExperienceOptions = Object.values(VeganExperience);
  cookingFrequencyOptions = Object.values(CookingFrequency);
  mealTypesOptions = Object.values(MealTypes);
  cookingExperienceOptions = Object.values(CookingExperience);

  public profile: Profile | undefined;
  public updatedUserForm: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.profile = history.state.profile;
    this.updatedUserForm = this.formBuilder.group({
      first_name: [this.profile?.first_name, Validators.required],
      last_name: [this.profile?.last_name, Validators.required],
      username: [this.profile?.username, Validators.required],
      password: [this.profile?.password, Validators.required],
      vegan_experience: [this.profile?.vegan_experience, Validators.required],
      cooking_frequency: [this.profile?.cooking_frequency, Validators.required],
      meal_types: [this.profile?.meal_types, Validators.required],
      experimental: [this.profile?.experimental ? 'Yes' : 'No', Validators.required],
      cooking_experience: [this.profile?.cooking_experience, Validators.required],
      dietary_restrictions: [this.profile?.dietary_restrictions],
      food_preferences: [this.profile?.food_preferences],
    });
  }

  onSubmit() {
    if (this.updatedUserForm.invalid) {
      return;
    }

    const username = this.updatedUserForm.value.username;

    // Check if the username is already taken
    this.profileService.isUsernameTakenOther(username!, this.profile!.id).subscribe({
      next: (isTaken) => {
        if (isTaken) {
          window.alert("This username is already taken. Please choose a different one.");
        } else {
          console.log('this is the original profile:', this.profile)
          // Proceed with updating the profile
          const profile_temp = this.constructProfileObject();
          console.log('this is the profile_temp profile:', profile_temp)

          this.profileService.updateProfile(profile_temp).subscribe({
            next: (response) => {
              console.log('Profile updated successfully');
              const profile = this.profileService.mapToProfile(response); // Assuming the server responds with the updated profile
              this.profileService.getNewList();
              this.router.navigateByUrl(`/${profile.username}/dashboard`, { state: { profile } });


            },
            error: (error) => {
              console.error('Error updating profile:', error);
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
      id: this.profile!.id, // Assuming the profile ID is available
      first_name: this.updatedUserForm.value.first_name,
      last_name: this.updatedUserForm.value.last_name,
      username: this.updatedUserForm.value.username,
      password: this.updatedUserForm.value.password,
      vegan_experience: this.updatedUserForm.value.vegan_experience as VeganExperience,
      cooking_frequency: this.updatedUserForm.value.cooking_frequency as CookingFrequency,
      meal_types: this.updatedUserForm.value.meal_types as MealTypes[],
      experimental: this.updatedUserForm.value.experimental === 'Yes',
      cooking_experience: this.updatedUserForm.value.cooking_experience as CookingExperience,
      dietary_restrictions: this.updatedUserForm.value.dietary_restrictions,
      food_preferences: this.updatedUserForm.value.food_preferences,
    };
  }
}