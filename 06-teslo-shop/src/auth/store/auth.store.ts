import { loginAction } from "@/auth/actions/login.action";
import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.action";
import type { RegisterParams } from "../interfaces/auth.params";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Getters
  isAdmin: () => boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (params: RegisterParams) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Properties
  user: null,
  token: null,
  authStatus: "checking",

  // Getters
  isAdmin: () => {
    const roles = get().user?.roles ?? [];

    return roles.includes("admin");
  },

  // Actions
  login: async (email: string, password: string) => {
    console.log({ email });
    try {
      const data = await loginAction(email, password);
      const { token, user } = data;
      localStorage.setItem("token", token);
      set({ user: user, token: token, authStatus: "authenticated" });

      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });

      return false;
    }
  },

  register: async ({ fullName, email, password }: RegisterParams) => {
    console.log({ email });
    try {
      const data = await registerAction({
        email,
        fullName,
        password,
      });
      const { token, user } = data;
      localStorage.setItem("token", token);
      set({ user: user, token: token, authStatus: "authenticated" });

      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });

      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user: user, token: token, authStatus: "authenticated" });

      return true;
    } catch (error) {
      set({ user: null, token: null, authStatus: "not-authenticated" });

      return false;
    }
  },
}));
