export interface CreateUserRequestBody {
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profileImage: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface Payload {
  id: number;
  isAdmin: boolean;
}
