
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Server as ServerIcon, PlusCircle, ChevronLeft, ChevronRight, Play, StopCircle, RotateCcw, Trash2 } from "lucide-react";
import type { Service } from "@/types";
import { useToast } from "@/hooks/use-toast";
import CreateServiceModal from "@/components/services/CreateServiceModal";
import ServiceActions from "@/components/services/ServiceActions";

const generateDemoServices = (count: number): Service[] => {
  const services: Service[] = [];
  const statuses: Service["status"][] = ["running", "stopped", "error", "deploying", "paused", "starting", "stopping"];
  const templates: Service["template"][] = ["Node.js", "PHP", "MySQL", "Redis", "PostgreSQL", "Custom"];
  for (let i = 1; i <= count; i++) {
    services.push({
      id: `service-${i}-${crypto.randomUUID().slice(0,6)}`,
      name: `${templates[i % templates.length]} App ${i}`,
      template: templates[i % templates.length],
      status: statuses[i % statuses.length],
      uptime: statuses[i % statuses.length] === 'running' ? `${Math.floor(Math.random() * 30) + 1} days` : 'N/A',
      lastDeployed: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      cpuUsage: statuses[i % statuses.length] === 'running' ? Math.floor(Math.random() * 80) + 5 : 0,
      ramUsage: statuses[i % statuses.length] === 'running' ? Math.floor(Math.random() * 1000) + 100 : 0,
      diskUsage: Math.floor(Math.random() * 50) + 1,
      linkedProject: `project-${(i % 5) + 1}`,
      notes: `This is a demo service instance ${i}. It is currently ${statuses[i % statuses.length]}.`
    });
  }
  return services;
};

const ITEMS_PER_PAGE = 10;

export default function ServicesPage() {
  const { toast } = useToast();
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingService, setEditingService] = useState<Service | null>(null); // For future edit functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setAllServices(generateDemoServices(35)); // Generate 35 demo services
  }, []);

  const filteredServices = useMemo(() => {
    if (!allServices) return [];
    return allServices.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.template.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allServices, searchTerm]);

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredServices.slice(startIndex, endIndex);
  }, [filteredServices, currentPage]);

  const handleCreateNewService = () => {
    // setEditingService(null);
    setIsModalOpen(true);
  };

  const handleSaveService = (serviceData: Omit<Service, 'id' | 'uptime' | 'lastDeployed' | 'cpuUsage' | 'ramUsage' | 'diskUsage'>) => {
    const newService: Service = {
      ...serviceData,
      id: `service-new-${crypto.randomUUID().slice(0,6)}`,
      status: 'stopped', // Default status for new service
      uptime: 'N/A',
      lastDeployed: new Date(),
      cpuUsage: 0,
      ramUsage: 0,
      diskUsage: Math.floor(Math.random() * 5) + 1, // Minimal disk usage
    };
    setAllServices(prev => [newService, ...prev]);
    toast({ title: "Service Created", description: `Service "${newService.name}" created successfully (simulated).` });
    setIsModalOpen(false);
  };

  const handleDeleteService = (serviceId: string) => {
    setAllServices(prev => prev.filter(s => s.id !== serviceId));
    toast({ title: "Service Deleted", description: "The service has been removed (simulated)." });
  };
  
  const getStatusBadgeClass = (status: Service['status']) => {
    switch (status) {
      case 'running': return 'bg-green-500/20 text-green-700 dark:text-green-400';
      case 'stopped': return 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
      case 'error': return 'bg-red-500/20 text-red-700 dark:text-red-400';
      case 'deploying':
      case 'starting':
      case 'stopping':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'paused': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
    }
  };

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  
  const getShowingText = () => {
    if (filteredServices.length === 0 && allServices.length > 0 && searchTerm) return "No services match your search.";
    if (allServices.length === 0) return "Loading services...";
    if (filteredServices.length === 0) return "No services yet.";
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredServices.length);
    return `Showing ${startItem}-${endItem} of ${filteredServices.length} services.`;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <ServerIcon className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Service Management</h1>
        </div>
        <Button onClick={handleCreateNewService} size="sm" className="w-full sm:w-auto">
          <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Create Service
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Services List</CardTitle>
          <CardDescription>
             Manage all deployed services. {getShowingText()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
              placeholder="Search services by name or template..."
              className="w-full sm:max-w-xs"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Name</TableHead>
                  <TableHead className="w-[15%]">Template</TableHead>
                  <TableHead className="w-[15%]">Status</TableHead>
                  <TableHead className="w-[10%]">CPU</TableHead>
                  <TableHead className="w-[10%]">RAM</TableHead>
                  <TableHead className="w-[10%]">Disk</TableHead>
                  <TableHead className="text-right w-[15%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.template}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(service.status)}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{service.cpuUsage}%</TableCell>
                    <TableCell className="text-xs">{service.ramUsage} MB</TableCell>
                    <TableCell className="text-xs">{service.diskUsage} GB</TableCell>
                    <TableCell className="text-right">
                      <ServiceActions
                        service={service}
                        onDelete={() => handleDeleteService(service.id)}
                        // onEdit={() => { /* TODO: Implement edit service */ }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedServices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      {allServices.length > 0 && searchTerm ? "No services match your search criteria." : "Loading demo services or no services yet."}
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
                <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Previous
              </Button>
              <span className="text-xs text-muted-foreground">Page {currentPage} of {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto"
              >
                Next <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <CreateServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
      />
      <Card className="mt-6">
        <CardHeader>
            <CardTitle className="text-base">Service Details & Advanced Management</CardTitle>
            <CardDescription className="text-xs">
                A full-featured detail view for each service (with tabs for overview, logs, actions, environment variables, resource limits, deployment history, maintenance mode, backup/restore, terminal, domain management, etc.) will be implemented in a future update.
                For now, basic actions are available in the list above.
            </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
