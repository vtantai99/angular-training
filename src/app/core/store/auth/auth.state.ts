import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel, User } from '../../models';
import { AuthService } from '../../services';
import { SignIn, SignOut, Signup } from './auth.action';
import { Router } from '@angular/router';

const authStateDefault: AuthStateModel = {
  accessToken: '',
  userLoggedIn: {
    isLoading: false,
    data: {},
    error: {},
  },
  signup: {
    isLoading: false,
    error: {},
  },
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: authStateDefault,
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private router: Router) {}
  @Selector()
  static userLoggedIn(state: AuthStateModel) {
    return state.userLoggedIn;
  }

  @Selector()
  static signup(state: AuthStateModel) {
    return state.signup;
  }

  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return Boolean(state.accessToken);
  }

  @Selector()
  static accessToken(state: AuthStateModel) {
    return state.accessToken;
  }

  // Sign In
  @Action(SignIn)
  signIn(
    { patchState, getState }: StateContext<AuthStateModel>,
    { userSignIn }: SignIn
  ) {
    const getCurrentState = (): AuthStateModel['userLoggedIn'] =>
      getState().userLoggedIn;
    patchState({
      userLoggedIn: { ...getCurrentState(), isLoading: true },
    });
    return this.authService.signIn(userSignIn).subscribe({
      next: (user: User) => {
        patchState({
          accessToken: user.accessToken,
          userLoggedIn: {
            ...getCurrentState(),
            data: user,
            isLoading: false,
          },
        });
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        patchState({
          userLoggedIn: {
            ...getCurrentState(),
            error,
            isLoading: false,
          },
        });
      },
    });
  }

  // Sign up
  @Action(Signup)
  signup(
    { patchState, getState }: StateContext<AuthStateModel>,
    { userSignup }: Signup
  ) {
    patchState({ signup: { ...getState().signup, isLoading: true } });
    return this.authService.signUp(userSignup).subscribe({
      next: () => {
        patchState({ signup: { ...getState().signup, isLoading: false } });
        alert('Signup successfully!')
        this.router.navigateByUrl('/auth');
      },
      error: (error) => {
        patchState({
          signup: { ...getState().signup, error, isLoading: false },
        });
      },
    });
  }

  // Sign Out
  @Action(SignOut)
  signOut({ setState }: StateContext<AuthStateModel>) {
    setState(authStateDefault);
  }
}
