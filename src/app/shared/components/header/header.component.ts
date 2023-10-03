import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthStateModel } from 'src/app/core/models';
import { AuthState, SignOut } from 'src/app/core/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Select(AuthState.isLoggedIn) isLoggedIn$!: Observable<boolean>;
  @Select(AuthState.userLoggedIn) userLoggedIn$!: Observable<AuthStateModel['userLoggedIn']>;
  constructor(private router: Router, private store: Store) {}

  goPlaces(path: string) {
    this.router.navigate([`/${path}`]);
  }

  signOut() {
    this.store.dispatch(new SignOut())
  }
}
