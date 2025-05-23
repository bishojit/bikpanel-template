
import { redirect } from 'next/navigation';

export default function DockerCleanupRedirectPage() {
  // Redirect to the consolidated Docker settings page
  redirect('/settings/docker');
  
  // This part will not be reached because redirect() throws an error.
  // It's here to satisfy the function signature if redirect were conditional.
  return null; 
}
