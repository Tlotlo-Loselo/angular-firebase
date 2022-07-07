import { Component, OnInit } from '@angular/core';
import { concatMap, map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/auth';
import { ImageUploadService } from '../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user$ = this.authService.currentUser$;

  profileForm = new FormGroup (
    {
      uid: new FormControl(''),
      email: new FormControl(''),
      displayName: new FormControl(''),
      firstName: new FormControl(''),
      lastNAme: new FormControl(''),
      gender: new FormControl(''),
      //address: new FormControl(''),
      //phone: new FormControl(''),
    }
  );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public authService: AuthService, 
    //private imageUploadService: ImageUploadService,
    private toast: HotToastService) {}

  ngOnInit(): void {
    
  }

/*  uploadImage(event: any, user: User) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe(
        {
          loading: 'Image is being loaded...',
          success: 'Image uploaded successfully',
          error: 'There was an error'
        }
      ),
      //concatMap((photoURL) => this.authService.updateProfileData({photoURL}))
    ).subscribe();
  }     */
}
