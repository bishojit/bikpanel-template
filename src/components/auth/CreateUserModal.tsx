
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
  const [userType, setUserType] = useState<UserType | ''>(''); // Use UserType from types

  const handleCreateUser = () => {
    // Basic validation (can be enhanced with react-hook-form/zod if needed)
    if (!username || !email || !password || !userType) {
      alert("Please fill all required fields."); // Simple alert, can use toast
      return;
    }
    // Handle user creation logic here (e.g., API call)
    console.log('Creating user (simulated):', { username, email, password, type: userType });
    // onUserCreate({ username, email, password, type: userType }); // Example callback
    onClose(); // Close modal after creation
    // Reset fields
    setUsername('');
    setEmail('');
    setPassword('');
    setUserType('');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New User</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the details for the new user. Username and Email must be unique.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-3 py-4"> {/* Reduced gap */}
          <div className="grid grid-cols-4 items-center gap-3"> {/* Reduced gap */}
            <Label htmlFor="username" className="text-right text-xs"> {/* Smaller label */}
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
          <div className="grid grid-cols-4 items-center gap-3"> {/* Reduced gap */}
            <Label htmlFor="email" className="text-right text-xs"> {/* Smaller label */}
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
          <div className="grid grid-cols-4 items-center gap-3"> {/* Reduced gap */}
            <Label htmlFor="password" className="text-right text-xs"> {/* Smaller label */}
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
          <div className="grid grid-cols-4 items-center gap-3"> {/* Reduced gap */}
            <Label htmlFor="type" className="text-right text-xs"> {/* Smaller label */}
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
          <AlertDialogCancel onClick={() => {
            onClose();
            // Optionally reset fields on cancel too
            setUsername('');
            setEmail('');
            setPassword('');
            setUserType('');
          }}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateUser}>Create User</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateUserModal;
