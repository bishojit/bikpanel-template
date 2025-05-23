
import React from 'react';
import type { User as UserType } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, FileText } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";


interface UserActionsProps {
  user: UserType;
}

const UserActions: React.FC<UserActionsProps> = ({ user }) => {
  const { toast } = useToast();

  const handleEdit = () => {
    // Actual edit functionality (e.g., opening a modal with user data) would be implemented here.
    console.log(`Edit user (simulated): ${user.username}`);
    toast({ title: "Edit User (Simulated)", description: `Editing user ${user.username}.` });
  };

  const handleDelete = () => {
    // Actual delete functionality (e.g., API call to delete user) would be implemented here.
    console.log(`Delete user (simulated): ${user.username}`);
    toast({ variant: "destructive", title: "Delete User (Simulated)", description: `User ${user.username} would be deleted.` });
  };

  const handleViewLogs = () => {
    // Actual view logs functionality (e.g., opening a drawer/modal with user logs) would be implemented here.
    console.log(`View logs for user (simulated): ${user.username}`);
    toast({ title: "View Logs (Simulated)", description: `Viewing logs for ${user.username}.` });
  };

  return (
    <div className="flex space-x-1">
      <Button variant="ghost" size="icon" onClick={handleEdit} aria-label={`Edit user ${user.username}`}>
        <Pencil className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" aria-label={`Delete user ${user.username}`}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account for {user.username} (simulated).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button variant="ghost" size="icon" onClick={handleViewLogs} aria-label={`View logs for user ${user.username}`}>
        <FileText className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserActions;
