export interface UserData {
  uid: string,
  displayName: string | null,
  email: string | null,
  phone: number | null,
  fullName: string | null,
  authType: string,
  photoURL?: string
}
