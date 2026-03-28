import { tesloApi } from "@/api/tesloApi";
import type { RegisterParams } from "../interfaces/auth.params";
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async ({
  email,
  password,
  fullName,
}: RegisterParams): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/register", {
      email,
      password,
      fullName,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
