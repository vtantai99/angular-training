import { UserSignIn } from '../../models';

export class SignIn {
  static readonly type = '[AUTH] Sign In';
  constructor(public userSignIn: UserSignIn) {}
}

export class SignOut {
  static readonly type = '[AUTH] Sign Out';
}
