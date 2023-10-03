import { User } from "./auth.model";

export interface AuthStateModel {
  accessToken: string;
  userLoggedIn: {
    isLoading: boolean;
    data: User | Record<string, never>;
    error: unknown;
  }
}
