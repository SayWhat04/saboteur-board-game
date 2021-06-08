import {AngularFirestore, QueryFn} from '@angular/fire/firestore';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {firestore} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export abstract class FirestoreService<T> {
  protected abstract basePath: string;

  constructor(@Inject(AngularFirestore) protected angularFirestore: AngularFirestore) {
  }

  doc$(id: string): Observable<T> {
    return this.angularFirestore.doc<T>(`${this.basePath}/${id}`).valueChanges();
  }

  collection$(queryFn?: QueryFn): Observable<T[]> {
    return this.angularFirestore.collection<T>(`${this.basePath}`, queryFn).valueChanges({idField: 'id'});
  }

  create(value: T) {
    return this.collection.add(Object.assign({}, value));
  }

  delete(id: string) {
    return this.collection.doc(id).delete();
  }

  modifyArrayValue<K extends keyof T>(id: string, fieldName: K, fieldValue: any) {
    return this.collection.doc(id).update({
      [fieldName]: firestore.FieldValue.arrayUnion(fieldValue)
    });
  }

  patchNonArrayValue(id: string, partialData: Partial<T>) {
    return this.collection.doc(id).update(partialData);
  }

  private get collection() {
    return this.angularFirestore.collection(`${this.basePath}`);
  }
}
