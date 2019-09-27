import { Injectable } from '@angular/core';
import { Model, data } from './models';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class DataService {
  get() : Observable<Model[]> {
    return new Observable((observer : Subscriber<Model[]>) => {
      observer.next(data);
      observer.complete();
    });
  }
}