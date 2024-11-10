import { Component, OnInit } from '@angular/core';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@app/components';
import { User } from '@app/models';
import { AuthService } from '@app/services';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HlmButtonDirective],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  isEnable: boolean = true;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _firestore: Firestore,
    private _store: Store<AppState>,
  ) {}

  ngOnInit() {
    this._authService.currentUser$.subscribe(async (user) => {
      if (user) {
        onSnapshot(doc(this._firestore, 'users', user.uid), (doc) => {
          const data = doc.data() as User;

          if (data.isEnable) {
            this.isEnable = data.isEnable;
          }
        });
      }
    });

    this._store.pipe(select(selectUser)).subscribe((user) => {
      console.log("===== LAYOUT COMPONENT =====");
      console.log(user);
      console.log("===== LAYOUT COMPONENT =====");
    })
  }

  onLogout(): void {
    this._authService.logout();

    this._router.navigateByUrl('/login');
  }
}
