export interface User {
  fullName: string | null;
  age: number | null;
  dni: number | null;
  email: string | null;
  profilePicture: string | null;
  role: string | null;
  specialist?: string;
  healthInsurance?: string;
}
