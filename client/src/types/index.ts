export interface User {
  id: number;
  email: string;
}

export interface Post {
  id: number;
  content: string;
  user: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user?: User;
}

export interface RegisterResponse {
  id: number;
  email: string;
}

export interface CreatePostData {
  content: string;
}

