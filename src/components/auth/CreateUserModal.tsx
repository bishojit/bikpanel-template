
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import type { UserType } from '@/types'; // Assuming UserType is 'Root' | 'Reseller' | 'Customer'

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onUserCreate: (userData: any) => void; // Callback for actual creation
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<UserType | ''>('Customer'); // Pre-select 'Customer'

  const handleCreateUser = () => {
    // Basic validation (can be enhanced with react-hook-form/zod if needed)
    if (!username || !email || !password || !userType) {
      alert("Please fill all required fields (Username, Email, Password, Type)."); // Simple alert, can use toast
      return;
    }
    // Handle user creation logic here (e.g., API call)
    console.log('Creating user (simulated):', { username, email, password, fullName, type: userType });
    // onUserCreate({ username, email, password, type: userType }); // Example callback
    onClose(); // Close modal after creation
    // Reset fields
    setUsername('');
    setEmail('');
    setPassword('');
    setFullName('');
    setUserType('Customer'); // Reset to Customer on close/create
  };

  const resetFieldsAndClose = () => {
    onClose();
    setUsername('');
    setEmail('');
    setPassword('');
    setFullName('');
    setUserType('Customer'); // Reset to Customer on cancel
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => { if (!open) resetFieldsAndClose(); else onClose();}}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New User</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the details for the new user. Username and Email must be unique.
          </AlertDialogDescription>
        </AlertDialogHeader>
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
            <Select onValueChange={(value) => setUserType(value as UserType)} value={userType}>
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
        <AlertDialogFooter>
          <AlertDialogCancel onClick={resetFieldsAndClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateUser}>Create User</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateUserModal;
