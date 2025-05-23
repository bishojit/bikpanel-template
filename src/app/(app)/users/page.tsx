
"use client"; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserActions from "@/components/users/UserActions";
import type { User as UserType } from "@/types"; 
import React, { useState, useEffect } from "react"; 
import CreateUserModal from '@/components/auth/CreateUserModal'; 


const generateDemoUsers = (count: number): UserType[] => {
  const users: UserType[] = [];
  const roles: UserType["role"][] = ["admin", "user", "operator"];
  const statuses: UserType["status"][] = ["active", "inactive", "suspended"];

  for (let i = 1; i <= count; i++) {
    users.push({
      id: `user-${i}`,
      username: `user${i}_${Math.random().toString(36).substring(7)}`,
      email: `user${i}@example.com`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleString(),
    });
  }
  return users;
};


export default function UsersPage() {
  // RBAC checks would be implemented here in a real application.
  // Actual data fetching, search, filter, pagination are future enhancements beyond demo data.
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [demoUsers, setDemoUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Basic search state

  useEffect(() => {
    setDemoUsers(generateDemoUsers(205));
  }, []);

  const filteredUsers = demoUsers.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create User
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>Manage all users in the system. {filteredUsers.length > 0 ? `Showing ${filteredUsers.length} users.` : 'Loading users or no matches found...'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters and Search */}
          <div className="flex items-center gap-4">
            <Input 
              placeholder="Search users by username or email..." 
              className="max-w-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Add filter dropdowns here later */}
          </div>

          {/* User Table */}
          <div>
            <Table>
              <TableHeader className="sticky top-16 bg-card z-10"><TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow></TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</TableCell>
                    <TableCell>
                       <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'active' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                        user.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                        'bg-red-500/20 text-red-700 dark:text-red-400'
                       }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                       </span>
                    </TableCell>
                    <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <UserActions user={user} />
                    </TableCell>
                  </TableRow>
                ))}
                 {filteredUsers.length === 0 && demoUsers.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No users match your search criteria.
                    </TableCell>
                  </TableRow>
                )}
                 {demoUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Loading demo users...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
