import { Injectable } from '@angular/core';
import { CookingExperience, CookingFrequency, MealTypes, Profile, VeganExperience } from './profile-model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  getByUsername(username: string): Observable<Profile | undefined> {
    return this.profileList$.pipe(
      map(profiles => profiles.find(profile => profile.username === username))
    );
  }

  private profileListSubject: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);
  public profileList$: Observable<Profile[]> = this.profileListSubject.asObservable();
  private selectedProfileSubject: BehaviorSubject<Profile | undefined> = new BehaviorSubject<Profile | undefined>(undefined);
  public selectedProfile$: Observable<Profile | undefined> = this.selectedProfileSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getUpdatedProfileList(); // Fetch initial profile list
  }

  public getNewList(): void {
    this.getUpdatedProfileList();
  }


  private getUpdatedProfileList(): void {
    this.http.get<any[]>('http://localhost:3000/ingredients').pipe(
      map(profileData => profileData.map(data => this.mapToProfile(data)))
    ).subscribe(profiles => {
      this.profileListSubject.next(profiles);
    });
  }

  public deleteProfile(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/ingredients/${id}`);
  }

  
  mapToProfile(data: any): Profile {
    return new Profile(
      data.id,
      data.name,
      data.last_name,
      data.username,
      data.password,
      data.vegan_experience,
      data.cooking_experience,
      data.cooking_frequency,
      data.experimental as boolean,
      data.dietary_restrictions,
      data.food_preferences,
      data.meal_types
    );
  }

  public addProfile(profile: Profile): Observable<any> {
    return this.http.post(`http://localhost:3000/ingredients`, this.mapProfileToRequest(profile));
  }

  private mapProfileToRequest(profile: Profile): any {
    return {
      name: profile.first_name,
      last_name: profile.last_name,
      username: profile.username,
      password: profile.password,
      vegan_experience: profile.vegan_experience as string,
      cooking_experience: profile.cooking_experience as string,
      cooking_frequency: profile.cooking_frequency as string,
      experimental: profile.experimental,
      dietary_restrictions: profile.dietary_restrictions,
      food_preferences: profile.food_preferences,
      meal_types: [profile.meal_types]
    };
  }

  public updateProfile(profile: Profile): Observable<any> {
    return this.http.put(`http://localhost:3000/ingredients/${profile.id}`, this.mapProfileToRequest(profile));
  }

  public isUsernameTaken(username: string): Observable<boolean> {
    return this.profileList$.pipe(
      map(profiles => profiles.some(profile => profile.username === username))
    );
  }


  isProfile(profile: Profile): Observable<boolean> {
    return this.profileList$.pipe(
      map(profiles => profiles.includes(profile))
    );
  }


  getProfileByUserAndPassword(username: string, password: string): Observable<Profile | undefined> {
    return this.profileList$.pipe(
      map(profiles => profiles.find(profile => profile.username === username && profile.password === password))
    );
  }

  getProfileByID(id: number): Observable<Profile | undefined> {
    return this.profileList$.pipe(
      map(profiles => profiles.find(profile => profile.id === id))
    );
  }

  public isUsernameTakenOther(username: string, id: number): Observable<boolean> {
    return this.profileList$.pipe(
      map(profiles => profiles.some(profile => profile.username === username && profile.id !== id))
    );
  }
  public setSelectedProfile(profile: Profile | undefined): void {
    this.selectedProfileSubject.next(profile);
  }

  public getSelectedProfile(): Observable<Profile | undefined> {
    return this.selectedProfile$;
  }


}
