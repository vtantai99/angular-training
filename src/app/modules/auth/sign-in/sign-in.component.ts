import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthStateModel } from 'src/app/core/models';
import { AuthState, SignIn } from 'src/app/core/store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm: FormGroup;
  @Select(AuthState.userLoggedIn) userLoggedIn$!: Observable<AuthStateModel['userLoggedIn']>;


  constructor(private store: Store) {
    this.signInForm = new FormGroup({
      taiKhoan: new FormControl('', [Validators.required]),
      matKhau: new FormControl('', [Validators.required]),
    });
  }

  getUserNameErrorMessage() {
    if (this.signInForm.get('taiKhoan')?.hasError('required')) {
      return 'User name is required';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.signInForm.get('matKhau')?.hasError('required')) {
      return 'Password is required';
    }
    return '';
  }

  checkValidation(input: string) {
    return this.signInForm.get(input)?.invalid;
  }

  onSubmit(formData: FormGroup,) {
    const { value: user, status } = formData;
    if (status === 'VALID') {
      this.store.dispatch(new SignIn(user));
    }
  }
}
