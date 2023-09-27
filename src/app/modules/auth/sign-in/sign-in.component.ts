/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor() {
    this.signInForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
        ]),
      }
    );
  }

  getUserNameErrorMessage() {
    if (this.signInForm.get('userName')?.hasError('required')) {
      return 'User name is required';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.signInForm.get('password')?.hasError('required')) {
      return 'Password is required';
    }
    return '';
  }

  checkValidation(input: string) {
    return this.signInForm.get(input)?.invalid;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective) {
    const { value, status } = formData;
    if (status === 'VALID') {
      // formDirective.resetForm();
    }
  }
}
