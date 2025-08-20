import { Component, OnInit } from '@angular/core';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Router, RouterOutlet } from '@angular/router';
import {
  HeaderComponent,
  NavbarComponent,
  SidebarComponent,
} from '@app/components';
import { User } from '@app/models';
import { AuthService } from '@app/services';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    HlmButtonDirective,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  isEnable: boolean = true;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _firestore: Firestore,
    private _store: Store<AppState>
  ) {}

  ngOnInit() {
    this._store.select(selectUser).subscribe((user) => {
      if (user) {
        const docRef = doc(this._firestore, 'users', user.uid);

        onSnapshot(docRef, (doc) => {
          const data = doc.data() as User;

          if (data.isEnable !== null) {
            this.isEnable = data.isEnable;
          }
        });
      }
    });
  }

  onLogout(): void {
    this._authService.logout();

    this._router.navigateByUrl('/login');
  }
}
