import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  limit,
  orderBy,
  QueryConstraint,
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
} from '@angular/fire/firestore';
import {
  collection,
  doc,
  FieldPath,
  getDoc,
  getDocs,
  query,
  Query,
  where,
  WhereFilterOp,
} from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class Repository<T> {
  private _wheres: QueryFieldFilterConstraint[] = [];
  private _collRef!: CollectionReference;
  private _query!: Query;
  private _limit!: QueryLimitConstraint;
  private _orderBy!: QueryOrderByConstraint;

  constructor(private _firestore: Firestore) {}

  collection(path: string): this {
    this._collRef = collection(this._firestore, path);

    return this;
  }

  where(
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: unknown
  ): this {
    this._wheres.push(where(fieldPath, opStr, value));

    return this;
  }

  async create(data: any) {
    const querySnapshot = await getDocs(this._query);
    let result: any[] = [];

    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  }

  limit(value: number) {
    this._limit = limit(value);

    return this;
  }

  orderBy(fieldPath: string | FieldPath) {
    this._orderBy = orderBy(fieldPath);

    return this;
  }

  async get() {
    const q = query(this._collRef, ...this._wheres, this._orderBy, this._limit);

    console.log(q);

    const querySnapshot = q ? await getDocs(q) : await getDocs(this._collRef);
    let result: T[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as T;

      result.push(data);
    });

    return result;
  }

  async first() {
    const querySnapshot = await getDocs(this._query);
    let result;

    querySnapshot.forEach((doc) => {
      result = doc.data();
    });

    return result as T;
  }
}
