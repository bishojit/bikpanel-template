"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const resetPasswordFormSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  otp: z.string().min(6, { message: "OTP must be 6 digits." }).max(6, { message: "OTP must be 6 digits."}),
  token: z.string().optional(), // Token might be part of the form if not handled globally
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

interface ResetPasswordFormProps {
  token: string | null;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      otp: "",
      token: token || "",
    },
  });

  useEffect(() => {
    if (token) {
      form.setValue("token", token);
    }
  }, [token, form]);

  async function onSubmit(values: ResetPasswordFormValues) {
    setIsLoading(true);
    // Actual reset password logic, including token validation and OTP, would be implemented here.
    console.log("Reset password form submitted (simulated):", values);
    // The 'token' is available in `values.token` or directly via the `token` prop.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    toast({
      title: "Password Reset Successful",
      description: "Your password has been changed. You can now log in.",
    });
    router.push("/login");
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden field for the token if you prefer to submit it with the form */}
        {/* <FormField control={form.control} name="token" render={({ field }) => <Input type="hidden" {...field} />} /> */}
        
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Two-Factor Authentication (OTP)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
