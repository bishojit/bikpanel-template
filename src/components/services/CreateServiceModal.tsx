
"use client";

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Service } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';

const serviceTemplates: Service["template"][] = ["PHP", "Node.js", "MySQL", "Redis", "PostgreSQL", "Custom"];

const serviceSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(50, 'Service name too long'),
  template: z.enum(serviceTemplates),
  linkedProject: z.string().optional(),
  notes: z.string().max(200, 'Notes too long').optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  // serviceData: Service | null; // For editing, not implemented yet
  onSave: (data: ServiceFormValues) => void;
}

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  isOpen,
  onClose,
  // serviceData,
  onSave,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      template: 'Node.js',
      linkedProject: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ // Reset to default values when modal opens for creation
        name: '',
        template: 'Node.js',
        linkedProject: '',
        notes: '',
      });
    }
    // if (serviceData) {
    //   reset({
    //     name: serviceData.name,
    //     template: serviceData.template,
    //     linkedProject: serviceData.linkedProject || '',
    //     notes: serviceData.notes || '',
    //   });
    // } else {
    //   reset({
    //     name: '',
    //     template: 'Node.js',
    //     linkedProject: '',
    //     notes: '',
    //   });
    // }
  }, [isOpen, reset]); // Removed serviceData from dependencies for now

  const onSubmit = (data: ServiceFormValues) => {
    onSave(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Service</DialogTitle>
          <DialogDescription>
            Fill in the details for your new service.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 py-2">
            <div>
              <Label htmlFor="name">Service Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="template">Template</Label>
              <Controller
                name="template"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTemplates.map(template => (
                        <SelectItem key={template} value={template}>{template}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.template && <p className="text-xs text-destructive mt-1">{errors.template.message}</p>}
            </div>

            <div>
              <Label htmlFor="linkedProject">Link Project (Optional ID)</Label>
              <Input id="linkedProject" {...register('linkedProject')} placeholder="e.g., project-123" />
              {errors.linkedProject && <p className="text-xs text-destructive mt-1">{errors.linkedProject.message}</p>}
              <p className="text-xs text-muted-foreground mt-1">Full project selection UI coming soon.</p>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea id="notes" {...register('notes')} rows={2} />
              {errors.notes && <p className="text-xs text-destructive mt-1">{errors.notes.message}</p>}
            </div>
          </form>
        </ScrollArea>
        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Create Service</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceModal;
