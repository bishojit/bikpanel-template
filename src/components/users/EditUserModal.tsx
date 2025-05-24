
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User, Role, UserType as AppUserType } from '@/types'; // Renamed UserType to AppUserType to avoid conflict
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
  const [role, setRole] = useState<Role>('user');
  const [status, setStatus] = useState<User['status']>('active');
  const [userType, setUserType] = useState<AppUserType>('Customer');

  useEffect(() => {
    if (userToEdit) {
      setUsername(userToEdit.username);
      setEmail(userToEdit.email);
      setFullName(userToEdit.fullName || '');
      setRole(userToEdit.role);
      setStatus(userToEdit.status);
      setUserType(userToEdit.type);
    }
  }, [userToEdit]);

  const handleSaveChanges = () => {
    if (!userToEdit) return;

    // Basic validation (can be enhanced with react-hook-form/zod if needed)
    if (!email || !fullName) {
      toast({ variant: "destructive", title: "Validation Error", description: "Email and Full Name are required." });
      return;
    }
    const updatedUser: User = {
      ...userToEdit,
      email,
      fullName,
      role,
      status,
      type: userType,
    };
    console.log('Updating user (simulated):', updatedUser);
    onUserUpdate(updatedUser); // Call the callback to update the user list
    toast({ title: "User Updated", description: `Details for ${username} have been updated (simulated).` });
    onClose();
  };
  
  const resetAndClose = () => {
    onClose();
    // Optionally reset local state if needed, though useEffect handles pre-population
  }

  if (!userToEdit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) resetAndClose(); else onClose();}}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit User: {userToEdit.username}</DialogTitle>
          <DialogDescription>
            Modify the details for this user. Username cannot be changed.
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
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="edit-role" className="text-right text-xs">
                Role
              </Label>
              <Select onValueChange={(value) => setRole(value as Role)} value={role}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="edit-status" className="text-right text-xs">
                Status
              </Label>
              <Select onValueChange={(value) => setStatus(value as User['status'])} value={status}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="edit-type" className="text-right text-xs">
                Type
              </Label>
              <Select onValueChange={(value) => setUserType(value as AppUserType)} value={userType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Root">Root</SelectItem>
                  <SelectItem value="Reseller">Reseller</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
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
