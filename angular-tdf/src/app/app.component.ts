import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  topics = ['Angular', 'React', 'Vue'];

  userModel = new User(
    'John Doe',
    'johndoe@email.com',
    1234567890,
    'default',
    'morning',
    true
  );

  topicHasError!: boolean;
  submitted!: boolean;
  errorMsg: string = '';

  constructor(private _enrollmentService: EnrollmentService) {}

  public ngOnInit() {
    this.submitted = false;
    this.validateTopic(this.userModel.topic);
  }

  validateTopic(value: string) {
    this.topicHasError = value === 'default';
  }

  onSubmit(userForm: any) {
    // console.log(userForm);

    this.submitted = true;
    this._enrollmentService.enroll(this.userModel).subscribe({
      next: (data: any) => console.log('Success!', data),
      error: (error: any) => {
        this.submitted = false;
        console.log(error);
        this.errorMsg = error.statusText;
      },
    });
  }
}
