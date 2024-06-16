import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private _storage: Storage) {}

  async upload(file: File): Promise<string> {
    const path = file.name;
    const storage = ref(this._storage, path);

    await uploadBytes(storage, file);

    return await getDownloadURL(storage);
  }
}
