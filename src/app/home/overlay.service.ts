import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OverlayService {
  private overlayStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public overlayStatus$: Observable<boolean> = this.overlayStatusSubject.asObservable();

  setOverlayStatus(status: boolean) {
    this.overlayStatusSubject.next(status);
  }
}