
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
    // Placeholder for edit action
    // TODO: Implement actual edit functionality, perhaps open a modal
    console.log(`Edit user: ${user.username}`);
    toast({ title: "Edit User", description: `Editing user ${user.username}. (Not implemented)` });
  };

  const handleDelete = () => {
    // Placeholder for delete action
    // TODO: Implement actual delete functionality
    console.log(`Delete user: ${user.username}`);
    toast({ variant: "destructive", title: "Delete User", description: `User ${user.username} would be deleted. (Not implemented)` });
  };

  const handleViewLogs = () => {
    // Placeholder for view logs action
    // TODO: Implement actual view logs functionality, perhaps open a drawer/modal
    console.log(`View logs for user: ${user.username}`);
    toast({ title: "View Logs", description: `Viewing logs for ${user.username}. (Not implemented)` });
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
              This action cannot be undone. This will permanently delete the user account for {user.username}.
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
