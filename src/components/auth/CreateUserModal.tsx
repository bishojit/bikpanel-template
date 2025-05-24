
"use client";

import React, { useState } from 'react';
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
import type { UserType as AppUserType, User as UserDataType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '../ui/scroll-area';


// Define the shape of data passed to onUserCreate more precisely
type UserCreationData = Omit<UserDataType, 'id' | 'lastLogin' | 'timeCreated' | 'status' | 'role'>;


interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreate: (userData: UserCreationData) => void; 
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onUserCreate }) => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<AppUserType>('Customer'); 

  const handleCreate = () => {
    if (!username || !email || !password || !userType) {
      toast({ variant: "destructive", title: "Validation Error", description: "Username, Email, Password, and Type are required." });
      return;
    }
    onUserCreate({ username, email, password, fullName, type: userType });
    // No need to call onClose here as parent will handle it after onUserCreate
    // Reset fields for next time
    setUsername('');
    setEmail('');
    setPassword('');
    setFullName('');
    setUserType('Customer');
  };

  const resetFieldsAndClose = () => {
    onClose();
    setUsername('');
    setEmail('');
    setPassword('');
    setFullName('');
    setUserType('Customer'); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) resetFieldsAndClose(); else onClose();}}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Enter the details for the new user. Username and Email must be unique.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6 min-h-0">
          <div className="grid gap-3 py-4">
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="username" className="text-right text-xs">
                Username
              </Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="col-span-3" 
                placeholder="e.g., newuser123" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="email" className="text-right text-xs">
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="col-span-3" 
                placeholder="e.g., user@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="password" className="text-right text-xs">
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="col-span-3" 
                placeholder="••••••••"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="fullName" className="text-right text-xs">
                Full Name
              </Label>
              <Input 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                className="col-span-3" 
                placeholder="e.g., John Doe"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="type" className="text-right text-xs">
                Type
              </Label>
              <Select onValueChange={(value) => setUserType(value as AppUserType)} value={userType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reseller">Reseller</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="pt-2">
           <DialogClose asChild>
            <Button type="button" variant="outline" onClick={resetFieldsAndClose}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate}>Create User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
