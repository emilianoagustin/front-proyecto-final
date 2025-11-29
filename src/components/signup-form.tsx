"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/lib/FormSchema";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SignupForm() {
  const { register, registerPending } = useUser();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ ...values }: z.infer<typeof authSchema>) => {
    register({ ...values });
    form.reset();
    toast.success("Registered user successfully!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="******"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={registerPending}>
          {registerPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
        <FormDescription className="px-6 text-center">
          Already have an account? <Link href="/login">Sign in</Link>
        </FormDescription>
      </form>
    </Form>
  );
}
