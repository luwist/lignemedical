export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  age: number | null;
  dni: number | null;
  email: string | null;
  role: string | null;
  isEnable: boolean | null;
  emailVerified: boolean | null;

  specialist?: string[];
  insurance?: string;
}
