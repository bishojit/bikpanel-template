
"use client";

import React from 'react';
import type { Service } from "@/types";
import { Button } from "@/components/ui/button";
import { Play, StopCircle, RotateCcw, Trash2, Eye } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";


interface ServiceActionsProps {
  service: Service;
  onDelete: () => void;
  // onEdit: () => void; // Future: for editing service details
}

const ServiceActions: React.FC<ServiceActionsProps> = ({ service, onDelete }) => {
  const { toast } = useToast();

  const handleAction = (action: "start" | "stop" | "restart") => {
    toast({
      title: `Service Action (Simulated)`,
      description: `Attempting to ${action} service "${service.name}".`,
    });
    // In a real app, you'd call an API here and update service state based on response
  };

  const handleViewDetails = () => {
     toast({
      title: `View Details (Simulated)`,
      description: `Opening details for service "${service.name}". A full page/modal would show here.`,
    });
  };

  return (
    <div className="flex items-center justify-end gap-0.5">
      <Button variant="ghost" size="icon" onClick={() => handleAction('start')} aria-label={`Start service ${service.name}`} title="Start">
        <Play className="h-4 w-4 text-green-600" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => handleAction('stop')} aria-label={`Stop service ${service.name}`} title="Stop">
        <StopCircle className="h-4 w-4 text-yellow-600" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => handleAction('restart')} aria-label={`Restart service ${service.name}`} title="Restart">
        <RotateCcw className="h-4 w-4 text-blue-600" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={`More actions for ${service.name}`} title="More actions">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleViewDetails}>
            <Eye className="mr-2 h-3.5 w-3.5" />
            View Details
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={onEdit}> // Future edit
            <Pencil className="mr-2 h-3.5 w-3.5" />
            Edit Service
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete Service
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the service
                  "{service.name}" and all its associated data (simulated).
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, delete service
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServiceActions;
