import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthStateModel, User } from '../../models';
import { AuthService } from '../../services';
import { SignIn, SignOut } from './auth.action';

const authStateDefault: AuthStateModel = {
  accessToken: '',
  userLoggedIn: {
    isLoading: false,
    data: {},
    error: null,
  },
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: authStateDefault,
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}
  @Selector()
  static userLoggedIn(state: AuthStateModel) {
    return state.userLoggedIn;
  }

  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return Boolean(state.accessToken);
  }

  // Sign in
  @Action(SignIn)
  signIn(
    { patchState, getState }: StateContext<AuthStateModel>,
    { userSignIn }: SignIn
  ) {
    const getPreviousState = (): AuthStateModel['userLoggedIn'] => getState().userLoggedIn
    patchState({
      userLoggedIn: { ...getPreviousState(), isLoading: true },
    });
    return this.authService.signIn(userSignIn).pipe(
      tap({
        next: (user: User) => {
          patchState({
            accessToken: user.accessToken,
            userLoggedIn: {
              ...getPreviousState(),
              data: user,
              isLoading: false,
            },
          });
        },
        error: (error) => {
          patchState({
            userLoggedIn: {
              ...getPreviousState(),
              error,
              isLoading: false,
            },
          });
        },
      })
    );
  }

  // Sign Out
  @Action(SignOut)
  signOut(
    { setState }: StateContext<AuthStateModel>
  ) {
    setState(authStateDefault);
  }
}
