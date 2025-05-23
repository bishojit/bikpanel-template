import { redirect } from 'next/navigation';

export default function HomePage() {
  // Current behavior redirects all users to login.
  // A full auth check (e.g., checking session/token) and redirecting to /dashboard 
  // if logged in would be implemented in a real application, likely using middleware or a layout check.
  redirect('/login');
  return null; // redirect() throws an error, so this won't be reached.
}
