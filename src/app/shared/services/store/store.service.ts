import {BehaviorSubject, Observable} from 'rxjs';

export abstract class StoreService<T> {
  protected bs: BehaviorSubject<T>;
  state$: Observable<T>;
  state: T;
  previous: T;

  protected abstract store: string;

  protected constructor(initialValue: Partial<T>) {
    this.bs = new BehaviorSubject<T>(initialValue as T);
    this.state$ = this.bs.asObservable();
    this.state = initialValue as T;
    this.state$.subscribe(s => {
      this.state = s;
    });
  }

  patch(newValue: Partial<T>) {
    this.previous = this.state;
    const newState = Object.assign({}, this.state, newValue);
    this.bs.next(newState);
  }

  set(newValue: Partial<T>) {
    this.previous = this.state;
    const newState = Object.assign({}, newValue) as T;
    this.bs.next(newState);
  }
}
