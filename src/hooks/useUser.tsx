import { useMutation } from "@tanstack/react-query";
import { IUserCredentialsProps } from "@/types/Product.types";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function useUser() {
  const router = useRouter();

  const register = useMutation({
    mutationFn: ({ email, password }: IUserCredentialsProps) =>
      api.register({ email, password }),
    onSuccess: () => {
      router.push("/login");
    },
  });

  const login = useMutation({
    mutationFn: ({ email, password }: IUserCredentialsProps) =>
      api.login({ email, password }),
    onSuccess: () => {
      router.push("/admin");
    },
  });

  const logout = useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      router.push("/login");
    },
  });

  return {
    register: register.mutate,
    login: login.mutate,
    logout: logout.mutate,
    loginPending: login.isPending,
    loginError: login.isError,
    registerPending: register.isPending,
    registerError: register.isError,
  };
}
