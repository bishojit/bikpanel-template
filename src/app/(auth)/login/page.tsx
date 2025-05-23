
import { LoginForm } from '@/components/auth/LoginForm';
import { Logo } from '@/components/shared/Logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md space-y-6"> {/* space-y-8 to space-y-6 */}
      <Logo className="h-20 w-20" /> {/* h-24 w-24 to h-20 w-20 */}
      <div className="w-full p-6 space-y-4 rounded-lg shadow-xl bg-card border border-border"> {/* p-8 space-y-6 to p-6 space-y-4 */}
        <h1 className="text-xl font-bold text-center text-foreground">Welcome Back</h1> {/* text-2xl to text-xl */}
        <LoginForm />
        <div className="flex justify-between text-xs"> {/* text-sm to text-xs */}
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
