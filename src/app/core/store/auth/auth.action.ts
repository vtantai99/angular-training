import { UserSignIn, UserSignUp } from '../../models';

export class SignIn {
  static readonly type = '[AUTH] Sign in';
  constructor(public userSignIn: UserSignIn) {}
}

export class Signup {
  static readonly type = '[AUTH] Sign up';
  constructor(public userSignup: UserSignUp) {}
}

export class SignOut {
  static readonly type = '[AUTH] Sign out';
}
