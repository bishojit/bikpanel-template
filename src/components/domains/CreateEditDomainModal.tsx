
"use client";

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Domain } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

const domainSchema = z.object({
  name: z.string().min(3, 'Domain name must be at least 3 characters').refine(val => /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val), {
    message: "Invalid domain name format (e.g., example.com)",
  }),
  primaryDnsRecord: z.object({
    type: z.enum(["A", "CNAME"]),
    value: z.string().min(1, 'DNS record value is required'),
  }),
  autoSsl: z.boolean().default(true),
});

export type DomainFormValues = z.infer<typeof domainSchema>;

interface CreateEditDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainData: Domain | null;
  onSave: (data: Domain) => void;
}

const CreateEditDomainModal: React.FC<CreateEditDomainModalProps> = ({
  isOpen,
  onClose,
  domainData,
  onSave,
}) => {
  const { toast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DomainFormValues>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      name: '',
      primaryDnsRecord: { type: 'A', value: '' },
      autoSsl: true,
    },
  });

  useEffect(() => {
    if (domainData) {
      reset({
        name: domainData.name,
        primaryDnsRecord: {
          type: domainData.primaryDnsRecord.type,
          value: domainData.primaryDnsRecord.value,
        },
        autoSsl: domainData.autoSsl,
      });
    } else {
      reset({
        name: '',
        primaryDnsRecord: { type: 'A', value: '' },
        autoSsl: true,
      });
    }
  }, [domainData, isOpen, reset]);

  const onSubmit = (data: DomainFormValues) => {
    const finalDomainData: Domain = {
      id: domainData?.id || crypto.randomUUID(),
      name: data.name,
      primaryDnsRecord: data.primaryDnsRecord,
      autoSsl: data.autoSsl,
      sslStatus: domainData?.sslStatus || (data.autoSsl ? 'pending' : 'disabled'), // Default status
      lastValidated: new Date(),
    };
    onSave(finalDomainData);
  };

  const handleValidateDns = () => {
    // Simulate DNS validation
    toast({
      title: "DNS Validation (Simulated)",
      description: "DNS validation process would start here. For now, it's just a placeholder.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{domainData ? 'Edit Domain' : 'Add New Domain'}</DialogTitle>
          <DialogDescription>
            {domainData ? 'Update the configuration for your domain.' : 'Fill in the details for your new domain.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6 min-h-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 py-2">
            <div>
              <Label htmlFor="name">Domain Name</Label>
              <Input id="name" {...register('name')} placeholder="e.g., example.com" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label>Primary DNS Record</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Controller
                  name="primaryDnsRecord.type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full sm:w-[100px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="CNAME">CNAME</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input 
                  {...register('primaryDnsRecord.value')} 
                  placeholder="IP Address or Target Domain"
                  className="flex-1" 
                />
              </div>
              {errors.primaryDnsRecord?.type && <p className="text-xs text-destructive mt-1">{errors.primaryDnsRecord.type.message}</p>}
              {errors.primaryDnsRecord?.value && <p className="text-xs text-destructive mt-1">{errors.primaryDnsRecord.value.message}</p>}
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Controller
                name="autoSsl"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="autoSsl"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="autoSsl" className="cursor-pointer">Enable Auto SSL (Let's Encrypt)</Label>
            </div>
             {errors.autoSsl && <p className="text-xs text-destructive mt-1">{errors.autoSsl.message}</p>}

            <Button type="button" variant="outline" size="sm" onClick={handleValidateDns} className="mt-2 w-full sm:w-auto">
              <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> Validate DNS (Simulated)
            </Button>
          </form>
        </ScrollArea>
        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Save Domain</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditDomainModal;
