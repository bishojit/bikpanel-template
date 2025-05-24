
"use client";

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '../ui/scroll-area';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToEdit: User | null;
  onUserUpdate: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, userToEdit, onUserUpdate }) => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (userToEdit) {
      setUsername(userToEdit.username);
      setEmail(userToEdit.email);
      setFullName(userToEdit.fullName || '');
    }
  }, [userToEdit]);

  const handleSaveChanges = () => {
    if (!userToEdit) return;

    if (!email || !fullName) {
      toast({ variant: "destructive", title: "Validation Error", description: "Email and Full Name are required." });
      return;
    }
    const updatedUser: User = {
      ...userToEdit, // Preserve all original fields like role, status, type, id, etc.
      email,
      fullName,
    };
    console.log('Updating user (simulated):', updatedUser);
    onUserUpdate(updatedUser);
    toast({ title: "User Updated", description: `Details for ${username} have been updated (simulated).` });
    onClose();
  };

  const resetAndClose = () => {
    onClose();
  }

  if (!userToEdit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) resetAndClose(); else onClose();}}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit User: {userToEdit.username}</DialogTitle>
          <DialogDescription>
            Modify the user's Full Name and Email. Username cannot be changed.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6 min-h-0">
          <div className="grid gap-3 py-4">
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="edit-username" className="text-right text-xs">
                Username
              </Label>
              <Input
                id="edit-username"
                value={username}
                readOnly
                className="col-span-3 bg-muted/50 cursor-not-allowed"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="edit-fullName" className="text-right text-xs">
                Full Name
              </Label>
              <Input
                id="edit-fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., John Doe"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="edit-email" className="text-right text-xs">
                Email
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="e.g., user@example.com"
              />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={resetAndClose}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
