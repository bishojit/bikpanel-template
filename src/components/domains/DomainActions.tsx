
"use client";

import React from 'react';
import type { Domain } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from 'lucide-react';
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

interface DomainActionsProps {
  domain: Domain;
  onEdit: () => void;
  onDelete: () => void;
}

const DomainActions: React.FC<DomainActionsProps> = ({ domain, onEdit, onDelete }) => {
  return (
    <div className="flex space-x-1">
      <Button variant="ghost" size="icon" onClick={onEdit} aria-label={`Edit domain ${domain.name}`}>
        <Pencil className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" aria-label={`Delete domain ${domain.name}`}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the domain "{domain.name}" and its configuration (simulated).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Domain
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DomainActions;
