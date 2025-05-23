
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Globe, PlusCircle, ChevronLeft, ChevronRight, Link2Off } from "lucide-react";
import type { Domain, SslStatusType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import CreateEditDomainModal from "@/components/domains/CreateEditDomainModal";
import DomainActions from "@/components/domains/DomainActions";

const generateDemoDomains = (count: number): Domain[] => {
  const domains: Domain[] = [];
  const sslStatuses: SslStatusType[] = ["valid", "expiring_soon", "expired", "pending", "error", "disabled"];
  const dnsTypes: Array<"A" | "CNAME"> = ["A", "CNAME"];

  for (let i = 1; i <= count; i++) {
    const randomName = Math.random().toString(36).substring(2, 8);
    const randomTld = ["com", "net", "org", "io", "dev"][Math.floor(Math.random() * 5)];
    const domainType = dnsTypes[i % dnsTypes.length];
    domains.push({
      id: `domain-${i}-${crypto.randomUUID().slice(0,6)}`,
      name: `${randomName}.${randomTld}`,
      sslStatus: sslStatuses[i % sslStatuses.length],
      autoSsl: sslStatuses[i % sslStatuses.length] !== 'disabled',
      primaryDnsRecord: {
        type: domainType,
        value: domainType === 'A' 
          ? `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}` 
          : `target-${randomName}.hosting-provider.com`,
      },
      lastValidated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    });
  }
  return domains;
};

const ITEMS_PER_PAGE = 10;

export default function DomainsPage() {
  const { toast } = useToast();
  const [allDomains, setAllDomains] = useState<Domain[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setAllDomains(generateDemoDomains(22)); 
  }, []);

  const filteredDomains = useMemo(() => {
    if (!allDomains) return [];
    return allDomains.filter(domain =>
      domain.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allDomains, searchTerm]);

  const totalPages = Math.ceil(filteredDomains.length / ITEMS_PER_PAGE);

  const paginatedDomains = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredDomains.slice(startIndex, endIndex);
  }, [filteredDomains, currentPage]);

  const handleCreateNewDomain = () => {
    setEditingDomain(null);
    setIsModalOpen(true);
  };

  const handleEditDomain = (domain: Domain) => {
    setEditingDomain(domain);
    setIsModalOpen(true);
  };

  const handleDeleteDomain = (domainId: string) => {
    setAllDomains(prev => prev.filter(d => d.id !== domainId));
    toast({ title: "Domain Deleted", description: "The domain has been removed (simulated)." });
  };

  const handleSaveDomain = (domainData: Domain) => {
    setAllDomains(prev => {
      const existingIndex = prev.findIndex(d => d.id === domainData.id);
      if (existingIndex > -1) {
        const updatedDomains = [...prev];
        updatedDomains[existingIndex] = domainData;
        return updatedDomains;
      }
      return [domainData, ...prev]; // Add new domain to the beginning
    });
    toast({ title: domainData.id && editingDomain ? "Domain Updated" : "Domain Added", description: `Domain "${domainData.name}" saved successfully.` });
    setIsModalOpen(false);
    setEditingDomain(null);
  };
  
  const getSslBadgeClass = (status: SslStatusType) => {
    switch (status) {
      case 'valid': return 'bg-green-500/20 text-green-700 dark:text-green-400';
      case 'expiring_soon': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      case 'expired':
      case 'error':
        return 'bg-red-500/20 text-red-700 dark:text-red-400';
      case 'pending': return 'bg-blue-500/20 text-blue-700 dark:text-blue-400';
      case 'disabled':
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
    }
  };

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  
  const getShowingText = () => {
    if (filteredDomains.length === 0 && allDomains.length > 0 && searchTerm) return "No domains match your search.";
    if (allDomains.length === 0) return "Loading domains...";
    if (filteredDomains.length === 0) return "No domains yet.";
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredDomains.length);
    return `Showing ${startItem}-${endItem} of ${filteredDomains.length} domains.`;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Globe className="w-7 h-7 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Domain Management</h1>
        </div>
        <Button onClick={handleCreateNewDomain} size="sm" className="w-full sm:w-auto">
          <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Add Domain
        </Button>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Domains List</CardTitle>
          <CardDescription>
             Manage all your domains, SSL, and DNS settings. {getShowingText()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
              placeholder="Search domains by name..."
              className="w-full sm:max-w-xs"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Domain Name</TableHead>
                  <TableHead className="w-[15%]">SSL Status</TableHead>
                  <TableHead className="w-[10%]">DNS Type</TableHead>
                  <TableHead className="w-[25%]">DNS Value</TableHead>
                  <TableHead className="text-right w-[10%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDomains.map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell className="font-medium">{domain.name}</TableCell>
                    <TableCell>
                      <Badge className={getSslBadgeClass(domain.sslStatus)}>
                        {domain.sslStatus.replace("_", " ").charAt(0).toUpperCase() + domain.sslStatus.replace("_", " ").slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">{domain.primaryDnsRecord.type}</TableCell>
                    <TableCell className="text-xs text-muted-foreground truncate max-w-xs">{domain.primaryDnsRecord.value}</TableCell>
                    <TableCell className="text-right">
                      <DomainActions
                        domain={domain}
                        onEdit={() => handleEditDomain(domain)}
                        onDelete={() => handleDeleteDomain(domain.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedDomains.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      {allDomains.length > 0 && searchTerm ? "No domains match your search criteria." : "Loading demo domains or no domains yet."}
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

      <CreateEditDomainModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDomain(null);
        }}
        domainData={editingDomain}
        onSave={handleSaveDomain}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Link2Off className="w-4 h-4" /> Redirection Management</CardTitle>
          <CardDescription>Manage URL redirections for your domains.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The interface for managing domain redirections (e.g., setting up 301 or 302 redirects from a source path to a target URL) will be implemented here in a future update.
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
