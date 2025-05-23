
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

const ITEMS_PER_PAGE = 50;

export default function UsersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [allDemoUsers, setAllDemoUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Generate users only on client-side to avoid hydration issues with Math.random()
    setAllDemoUsers(generateDemoUsers(205));
  }, []);

  const filteredUsers = useMemo(() => {
    if (!allDemoUsers) return [];
    return allDemoUsers.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getShowingText = () => {
    if (filteredUsers.length === 0) return "No users found.";
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length);
    return `Showing ${startItem}-${endItem} of ${filteredUsers.length} users.`;
  }

  return (
    <div className="container mx-auto py-6"> {/* py-8 to py-6 */}
      <div className="flex items-center justify-between mb-6"> {/* mb-8 to mb-6 */}
        <div className="flex items-center gap-2"> {/* gap-3 to gap-2 */}
          <Users className="w-7 h-7 text-primary" /> {/* w-8 h-8 to w-7 h-7 */}
          <h1 className="text-2xl font-bold text-foreground">User Management</h1> {/* text-3xl to text-2xl */}
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} size="sm"> {/* Added size="sm" */}
          <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Create User {/* Icon size adjusted */}
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>
            Manage all users in the system. {getShowingText()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3"> {/* space-y-4 to space-y-3 */}
          <div className="flex items-center gap-2"> {/* gap-4 to gap-2 */}
            <Input 
              placeholder="Search users by username or email..." 
              className="max-w-xs"  // max-w-sm to max-w-xs
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>

          <div>
            <Table>
              <TableHeader className="sticky top-14 bg-card z-10"> {/* top-16 to top-14 (due to header height change) */}
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</TableCell>
                    <TableCell>
                       <span className={`px-1.5 py-0.5 text-xs rounded-full ${ // px-2 py-1 to px-1.5 py-0.5
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
                 {paginatedUsers.length === 0 && allDemoUsers.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No users match your search criteria.
                    </TableCell>
                  </TableRow>
                )}
                 {allDemoUsers.length === 0 && (
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
            <div className="flex items-center justify-end space-x-1 pt-3"> {/* space-x-2 pt-4 to space-x-1 pt-3 */}
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="mr-1 h-3.5 w-3.5" /> {/* mr-2 h-4 w-4 to mr-1 h-3.5 w-3.5 */}
                Previous
              </Button>
              <span className="text-xs text-muted-foreground"> {/* text-sm to text-xs */}
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="ml-1 h-3.5 w-3.5" /> {/* ml-2 h-4 w-4 to ml-1 h-3.5 w-3.5 */}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
