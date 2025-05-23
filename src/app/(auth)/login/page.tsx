import { LoginForm } from '@/components/auth/LoginForm';
import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md space-y-8">
      <Logo className="h-24 w-24" />
      <div className="w-full p-8 space-y-6 rounded-lg shadow-xl bg-card border border-border">
        <h1 className="text-2xl font-bold text-center text-foreground">Welcome Back</h1>
        <LoginForm />
        <div className="flex justify-between text-sm">
          <Link href="/forgot-password" className="font-medium text-primary hover:underline">
            Forgot Password?
          </Link>
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
