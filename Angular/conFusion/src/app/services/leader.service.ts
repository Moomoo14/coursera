import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';
import { resolve } from 'url';
import { delay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class LeaderService {
  constructor() {}

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter(dish => dish.featured)[0]).pipe(delay(2000));
  }
}
