export class RegisterResponseDto {
  message?: string;
  status?: boolean;
  id?: string;
  email?: string;
  category?: string;
}

export class loginResponseDto {
  message?: string
  accessToken?: string;
  user?: {
    id?: string;
    email?: string;
    category?: string;
  }
} 