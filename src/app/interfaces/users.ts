export interface User{
  _id?:string;
  tokenExpiration?:Date;
  active: boolean;
  username: string;       // required
  email: string;          // required
  password?:string;
  passwordChangedAt?:Date;
  role?: string;
  resetToken?:string;
  resetTokenExpiration?:string;
  photo:string;           // required
  favProblems: string[];  // required
  favSolutions: string[]; // required
  token:string|null|undefined; //
}
