import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private _firestore: Firestore) {}

  async getDocumentById<T>(
    collection: string,
    documentId: string
  ): Promise<T | null> {
    const docRef = doc(this._firestore, collection, documentId);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as T) : null;
  }

  async getAllDocument<T>(collectionName: string): Promise<T[]> {
    const document: T[] = [];
    const collRef = collection(this._firestore, collectionName);
    const querySnapshot = await getDocs(collRef);

    querySnapshot.forEach((doc) => {
      document.push(doc.data() as T);
    });

    return document;
  }

  async addDocument(collectionName: string, data: any): Promise<void> {
    const collRef = collection(this._firestore, collectionName);

    await addDoc(collRef, data);
  }

  async addDocumentWithCustomId(
    collectionName: string,
    customId: string,
    data: any
  ): Promise<void> {
    const docRef = doc(this._firestore, collectionName, customId);

    await setDoc(docRef, data);
  }

  async updateDocumentById(
    collectionName: string,
    documentId: string,
    documentData: any
  ): Promise<void> {
    const docRef = doc(this._firestore, collectionName, documentId);

    await updateDoc(docRef, documentData);
  }

  async deleteDocumentById(
    collectionName: string,
    documentId: string
  ): Promise<void> {
    const docRef = doc(this._firestore, collectionName, documentId);

    await deleteDoc(docRef);
  }

  async getDoctorBySpecialty(specialty: string): Promise<any> {
    const document: DocumentData[] = [];

    const docRef = collection(this._firestore, 'users');

    const collRef = query(docRef, where('specialist', '==', specialty));

    const querySnapshot = await getDocs(collRef);

    querySnapshot.forEach((doc) => {
      document.push(doc.data());
    });

    return document;
  }
}
