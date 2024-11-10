import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '@environments/environment';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AuthEffects } from './store/auth/auth.effects';
import { authReducer } from './store/auth/auth.reducers';
import { ROOT_REDUCERS } from './store/app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideEffects([AuthEffects]),
    provideStore(ROOT_REDUCERS)
  ],
};
