import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _message = new Subject<any>();

  get message(): Observable<any> {
    return this._message.asObservable();
  }

  add(message: any) {
    this._message.next(message);
  }
}
