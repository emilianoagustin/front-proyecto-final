"use client";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/hooks/useUser";
import { authSchema } from "@/lib/FormSchema";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type FormValues = z.infer<typeof authSchema>;
type UseFormProps = { isLoginForm?: boolean };

export function UserForm({ isLoginForm }: UseFormProps) {
  const {
    login,
    register,
    loginPending,
    registerPending,
    loginError,
    registerError,
  } = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (isLoginForm) login({ ...data });
    else register({ ...data });
    form.reset();
    if (!loginError) toast.error("Wrong credentials!!");
    if (!registerError) toast.error("Something went wrong!!");
    else toast.success("Registered user successfully!!");
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldSet>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">
              {isLoginForm ? "Login to your account" : "Create an account"}
            </h1>
            <p className="text-muted-foreground text-sm text-balance">
              {isLoginForm
                ? "Enter your email below to login to your account"
                : "Enter your information below to create your account"}
            </p>
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="price">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={loginPending || registerPending}
          className="w-full"
        >
          {((loginPending || registerPending) && (
            <Loader2 className="size-4 animate-spin" />
          )) ||
            (isLoginForm ? "Login" : "Create Account")}
        </Button>
        <FieldDescription className="text-center">
          {isLoginForm
            ? `Don't have an account?  `
            : `Already have an account?  `}
          {isLoginForm ? (
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          ) : (
            <Link href="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          )}
        </FieldDescription>
      </FieldSet>
    </form>
  );
}
