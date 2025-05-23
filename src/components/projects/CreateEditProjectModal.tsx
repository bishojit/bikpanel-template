
"use client";

import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Project, EnvironmentVariable } from '@/types';
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
import { PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  status: z.enum(["development", "live", "archived", "error", "paused"]),
  users: z.string().optional(), // Comma-separated user IDs
  services: z.string().optional(), // Comma-separated service IDs
  envVars: z.array(
    z.object({
      id: z.string(), // Keep original ID for updates if needed
      key: z.string().min(1, 'Key is required'),
      value: z.string(),
    })
  ),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface CreateEditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectData: Project | null; // Null for create, Project object for edit
  onSave: (data: Project) => void;
}

const CreateEditProjectModal: React.FC<CreateEditProjectModalProps> = ({
  isOpen,
  onClose,
  projectData,
  onSave,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'development',
      users: '',
      services: '',
      envVars: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'envVars',
  });

  useEffect(() => {
    if (projectData) {
      reset({
        name: projectData.name,
        description: projectData.description || '',
        status: projectData.status,
        users: projectData.users.join(', '),
        services: projectData.services.join(', '),
        envVars: projectData.envVars.map(ev => ({ id: ev.id, key: ev.key, value: ev.value })),
      });
    } else {
      reset({
        name: '',
        description: '',
        status: 'development',
        users: '',
        services: '',
        envVars: [{ id: crypto.randomUUID(), key: '', value: '' }],
      });
    }
  }, [projectData, isOpen, reset]);

  const onSubmit = (data: ProjectFormValues) => {
    const finalProjectData: Project = {
      id: projectData?.id || crypto.randomUUID(), // Keep existing ID or generate new one
      name: data.name,
      description: data.description,
      status: data.status,
      users: data.users?.split(',').map(u => u.trim()).filter(u => u) || [],
      services: data.services?.split(',').map(s => s.trim()).filter(s => s) || [],
      envVars: data.envVars.map(ev => ({ ...ev, id: ev.id || crypto.randomUUID() })), // Ensure IDs exist
    };
    onSave(finalProjectData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{projectData ? 'Edit Project' : 'Create New Project'}</DialogTitle>
          <DialogDescription>
            {projectData ? 'Update the details of your project.' : 'Fill in the details for your new project.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 py-2">
            <div>
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} rows={2} />
              {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                       <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-xs text-destructive mt-1">{errors.status.message}</p>}
            </div>

            <div>
              <Label htmlFor="users">Assign Users (comma-separated IDs)</Label>
              <Textarea id="users" {...register('users')} placeholder="e.g., user-1, user-2" rows={1} />
              <p className="text-xs text-muted-foreground mt-1">Full user selection UI coming soon.</p>
            </div>

            <div>
              <Label htmlFor="services">Link Services (comma-separated IDs)</Label>
              <Textarea id="services" {...register('services')} placeholder="e.g., service-abc, service-xyz" rows={1} />
               <p className="text-xs text-muted-foreground mt-1">Full service linking UI coming soon.</p>
            </div>

            <div>
              <Label>Environment Variables</Label>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col sm:flex-row items-center gap-2">
                    <Input
                      {...register(`envVars.${index}.key`)}
                      placeholder="KEY"
                      className="w-full sm:flex-1"
                    />
                    <Input
                      {...register(`envVars.${index}.value`)}
                      placeholder="VALUE"
                      className="w-full sm:flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => remove(index)} 
                      className="text-destructive hover:text-destructive self-center sm:self-auto"
                      aria-label="Remove environment variable"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                 {errors.envVars && errors.envVars.map((error, index) => (
                  <div key={index} className="text-xs text-destructive">
                    {error?.key && <p>Key {index + 1}: {error.key.message}</p>}
                    {error?.value && <p>Value {index + 1}: {error.value.message}</p>}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ id: crypto.randomUUID(), key: '', value: '' })}
                  className="mt-1"
                >
                  <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Add Variable
                </Button>
              </div>
            </div>
          </form>
        </ScrollArea>
        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Save Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditProjectModal;
