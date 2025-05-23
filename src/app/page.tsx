import { redirect } from 'next/navigation';

export default function HomePage() {
  // For now, redirect to login. Later, this could check auth status.
  // TODO: Implement auth check and redirect to /dashboard if logged in.
  redirect('/login');
  return null; // redirect() throws an error, so this won't be reached.
}
