import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { passwordValidator } from './shared/password.validator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  registrationForm!: FormGroup;
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            forbiddenNameValidator(/admin/),
          ],
        ],
        email: ['', Validators.email],
        subscribe: [false],
        password: [''],
        confirmPassword: [''],
        address: this.formBuilder.group({
          city: [''],
          state: [''],
          postalCode: [''],
        }),
        alternativeEmails: this.formBuilder.array([]),
      },
      { validators: passwordValidator }
    );

    this.registrationForm
      .get('subscribe')
      ?.valueChanges.subscribe((checkedValue) => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators([Validators.required, Validators.email]);
        } else {
          email?.clearValidators();
        }
        // Update state of email form control
        email?.updateValueAndValidity();
      });
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternativeEmails() {
    return this.registrationForm.get('alternativeEmails') as FormArray;
  }

  addAlternativeEmails() {
    this.alternativeEmails.push(this.formBuilder.control('', Validators.email));
  }

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'John Doe',
      password: '1234!',
      confirmPassword: '1234!',
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value).subscribe({
      next: (data: any) => console.log('Success!', data),
      error: (error: any) => {
        console.log(error);
        this.errorMsg = error.statusText;
      },
    });
  }

  // == Angular Form reference == //
  // registrationForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl(''),
  //   }),
  // });
}
