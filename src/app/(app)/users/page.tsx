
"use client"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserActions from "@/components/users/UserActions";
import type { User as UserType } from "@/types"; 
import React, { useState, useEffect, useMemo } from "react"; 
import CreateUserModal from '@/components/auth/CreateUserModal'; 
import EditUserModal from '@/components/users/EditUserModal';
import { useToast } from "@/hooks/use-toast";


const generateDemoUsers = (count: number): UserType[] => {
  const users: UserType[] = [];
  const roles: UserType["role"][] = ["admin", "user", "operator"];
  const statuses: UserType["status"][] = ["active", "inactive", "suspended"];
  const userTypes: UserType["type"][] = ["Root", "Reseller", "Customer"];

  for (let i = 1; i <= count; i++) {
    const randomUsername = `user${i}_${crypto.randomUUID().slice(0,6)}`;
    users.push({
      id: `user-${i}-${crypto.randomUUID().slice(0,6)}`,
      username: randomUsername,
      fullName: `Demo User ${i}`,
      email: `${randomUsername}@example.com`,
      role: roles[i % roles.length],
      type: userTypes[i % userTypes.length],
      status: statuses[i % statuses.length],
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      timeCreated: new Date(Date.now() - Math.floor(Math.random() * 20000000000)),
    });
  }
  return users;
};

const ITEMS_PER_PAGE = 50;

export default function UsersPage() {
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [allDemoUsers, setAllDemoUsers] = useState<UserType[]>([]);
  const [currentUserToEdit, setCurrentUserToEdit] = useState<UserType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Generate users only on the client side
    setAllDemoUsers(generateDemoUsers(205));
  }, []);

  const filteredUsers = useMemo(() => {
    if (!allDemoUsers) return [];
    return allDemoUsers.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [allDemoUsers, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleCreateUser = (userData: Omit<UserType, 'id' | 'lastLogin' | 'timeCreated' | 'status' | 'role'>) => {
    const newUser: UserType = {
      id: `user-new-${crypto.randomUUID().slice(0,6)}`,
      ...userData,
      status: 'active', 
      role: 'user', 
      lastLogin: new Date(),
      timeCreated: new Date(),
    };
    setAllDemoUsers(prev => [newUser, ...prev]);
    toast({ title: "User Created (Simulated)", description: `User "${newUser.username}" has been created.` });
    setIsCreateModalOpen(false);
  };

  const handleEditUser = (user: UserType) => {
    setCurrentUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: UserType) => {
    setAllDemoUsers(prevUsers => 
      prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user)
    );
    setIsEditModalOpen(false);
    setCurrentUserToEdit(null);
  };

  const handleDeleteUser = (userId: string) => {
    setAllDemoUsers(prev => prev.filter(u => u.id !== userId));
    const deletedUser = allDemoUsers.find(u => u.id === userId);
    toast({ variant: "destructive", title: "User Deleted (Simulated)", description: `User ${deletedUser?.username} would be deleted.` });
  };


  const getShowingText = () => {
    if (filteredUsers.length === 0 && allDemoUsers.length > 0 && searchTerm) return "No users match your search criteria.";
    if (allDemoUsers.length === 0 && !searchTerm ) return "Loading users..."; 
    if (filteredUsers.length === 0) return "No users yet.";
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length);
    return `Showing ${startItem}-${endItem} of ${filteredUsers.length} users.`;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-7 h-7 text-primary" />
          <h1 className="text-xl font-bold text-foreground">User Management</h1>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} size="sm" className="w-full sm:w-auto">
          <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Create User
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>
            Manage all users in the system. {getShowingText()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input 
              placeholder="Search by username, email, or name..." 
              className="w-full sm:max-w-xs"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); 
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow></TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>
                      <div className="font-medium">{user.fullName || <span className="text-muted-foreground italic">N/A</span>}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell>{user.type.charAt(0).toUpperCase() + user.type.slice(1)}</TableCell>
                    <TableCell>
                       <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                        user.status === 'active' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                        user.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                        'bg-red-500/20 text-red-700 dark:text-red-400'
                       }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                       </span>
                    </TableCell>
                    <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <UserActions 
                        user={user} 
                        onEdit={() => handleEditUser(user)} 
                        onDelete={() => handleDeleteUser(user.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                 {paginatedUsers.length === 0 && allDemoUsers.length > 0 && searchTerm && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No users match your search criteria.
                    </TableCell>
                  </TableRow>
                )}
                 {allDemoUsers.length === 0 && !searchTerm && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                     Loading demo users...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-2 sm:space-x-1 pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="mr-1 h-3.5 w-3.5" />
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto"
              >
                Next
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <CreateUserModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onUserCreate={handleCreateUser}
      />
      <EditUserModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCurrentUserToEdit(null);
        }}
        userToEdit={currentUserToEdit}
        onUserUpdate={handleUpdateUser}
      />
    </div>
  );
}

    