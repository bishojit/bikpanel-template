
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package as PackageIcon, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project, EnvironmentVariable } from "@/types";
import ProjectActions from "@/components/projects/ProjectActions";
import CreateEditProjectModal from "@/components/projects/CreateEditProjectModal";
import { useToast } from "@/hooks/use-toast";

const generateDemoProjects = (count: number): Project[] => {
  const projects: Project[] = [];
  const statuses: Project["status"][] = ["development", "live", "archived", "error", "paused"];
  for (let i = 1; i <= count; i++) {
    const envVarsCount = Math.floor(Math.random() * 4);
    const envVars: EnvironmentVariable[] = [];
    for (let j = 0; j < envVarsCount; j++) {
      envVars.push({
        id: `env-${i}-${j}-${crypto.randomUUID().slice(0,4)}`,
        key: `KEY_${j}_${crypto.randomUUID().slice(0,3)}`.toUpperCase(),
        value: `value_${crypto.randomUUID().slice(0,6)}`
      });
    }
    projects.push({
      id: `project-${i}-${crypto.randomUUID().slice(0,6)}`,
      name: `Cool Project ${i} - ${crypto.randomUUID().slice(0,4)}`,
      description: `This is a demo description for project ${i}. It aims to achieve great things.`,
      status: statuses[i % statuses.length],
      users: [`user-${(i%5)+1}` , `user-${(i%5)+6}`],
      services: [`service-worker-${i}`, `service-api-${i}`],
      envVars: envVars,
    });
  }
  return projects;
};

const ITEMS_PER_PAGE = 10;

export default function ProjectsPage() {
  const { toast } = useToast();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setAllProjects(generateDemoProjects(25)); // Generate 25 demo projects
  }, []);

  const filteredProjects = useMemo(() => {
    if (!allProjects) return [];
    return allProjects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProjects, searchTerm]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  const handleCreateNewProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setAllProjects(prev => prev.filter(p => p.id !== projectId));
    toast({ title: "Project Deleted", description: "The project has been removed (simulated)." });
  };

  const handleSaveProject = (projectData: Project) => {
    setAllProjects(prev => {
      const existingIndex = prev.findIndex(p => p.id === projectData.id);
      if (existingIndex > -1) {
        const updatedProjects = [...prev];
        updatedProjects[existingIndex] = projectData;
        return updatedProjects;
      }
      return [projectData, ...prev];
    });
    toast({ title: projectData.id && editingProject ? "Project Updated" : "Project Created", description: `Project "${projectData.name}" saved successfully.` });
    setIsModalOpen(false);
    setEditingProject(null);
  };
  
  const getStatusBadgeClass = (status: Project['status']) => {
    switch (status) {
      case 'live':
        return 'bg-green-500/20 text-green-700 dark:text-green-400';
      case 'development':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400'; 
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400'; 
      case 'error':
        return 'bg-red-500/20 text-red-700 dark:text-red-400'; 
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const getShowingText = () => {
    if (filteredProjects.length === 0 && allProjects.length > 0 && searchTerm) return "No projects match your search.";
    if (allProjects.length === 0) return "Loading projects...";
     if (filteredProjects.length === 0) return "No projects yet.";
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredProjects.length);
    return `Showing ${startItem}-${endItem} of ${filteredProjects.length} projects.`;
  }


  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <PackageIcon className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Project Management</h1>
        </div>
        <Button onClick={handleCreateNewProject} size="sm" className="w-full sm:w-auto">
          <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Create Project
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
          <CardDescription>
             Manage all your projects. {getShowingText()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
              placeholder="Search projects by name or description..."
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
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Name</TableHead>
                  <TableHead className="w-[20%]">Status</TableHead>
                  <TableHead className="w-[30%]">Description</TableHead>
                  <TableHead className="text-right w-[10%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground truncate max-w-xs">{project.description}</TableCell>
                    <TableCell className="text-right">
                      <ProjectActions
                        project={project}
                        onEdit={() => handleEditProject(project)}
                        onDelete={() => handleDeleteProject(project.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedProjects.length === 0 && allProjects.length > 0 && searchTerm && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No projects match your search criteria.
                    </TableCell>
                  </TableRow>
                )}
                {allProjects.length === 0 && !searchTerm && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                     Loading demo projects...
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
      <CreateEditProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        projectData={editingProject}
        onSave={handleSaveProject}
      />
    </div>
  );
}
