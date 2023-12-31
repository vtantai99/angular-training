import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthStateModel } from 'src/app/core/models';
import { AuthState, Signup } from 'src/app/core/store';
import { matchPassword } from './match-password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signInForm: FormGroup;
  @Select(AuthState.signup) signup$!: Observable<AuthStateModel['signup']>

  constructor(private store: Store) {
    this.signInForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{6,64}$'
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        fullName: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})'
          ),
        ]),
      },
      { validators: matchPassword }
    );
  }

  getEmailErrorMessage() {
    if (this.signInForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }
    if (this.signInForm.get('email')?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
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
    if (this.signInForm.get('password')?.hasError('pattern')) {
      return 'Password must contain at least one number, one uppercase and a lowercase letter and at least 8 characters. Also cannot contain whitespace characters';
    }
    return '';
  }

  get confirmPassword() {
    return this.signInForm.get('confirmPassword');
  }

  getFullNameErrorMessage() {
    if (this.signInForm.get('fullName')?.hasError('required')) {
      return 'Full name is required';
    }
    return '';
  }

  getPhoneNumberErrorMessage() {
    if (this.signInForm.get('phoneNumber')?.hasError('required')) {
      return 'Phone number is required';
    }
    if (this.signInForm.get('phoneNumber')?.hasError('pattern')) {
      return 'Phone is not valid';
    }
    return '';
  }

  onPasswordInput() {
    if (this.signInForm.hasError('notMatch'))
      this.signInForm.get('confirmPassword')?.setErrors([{ notMatch: true }]);
    else this.signInForm.get('confirmPassword')?.setErrors(null);
  }

  checkValidation(input: string) {
    return this.signInForm.get(input)?.invalid;
  }

  onSubmit(formData: FormGroup) {
    const { value, status } = formData;
    if (status === 'VALID') {
      this.store.dispatch(new Signup({
        taiKhoan: value.userName,
        matKhau: value.password,
        email: value.email,
        soDt: value.phoneNumber,
        maNhom: 'GP09',
        maLoaiNguoiDung: 'KhachHang',
        hoTen: value.fullName
      }))
    }
  }
}
