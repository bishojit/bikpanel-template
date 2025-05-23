"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getDockerCleanupSuggestions, type DockerCleanupSuggestionsOutput } from "@/ai/flows/docker-cleanup-suggestions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  dockerImages: z.string().min(1, "Please provide a list of Docker images."),
  dockerContainers: z.string().min(1, "Please provide a list of Docker containers."),
  dockerVolumes: z.string().min(1, "Please provide a list of Docker volumes."),
});

type FormData = z.infer<typeof schema>;

export function DockerCleanupClient() {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<DockerCleanupSuggestionsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      dockerImages: "ubuntu:latest\nnginx:stable\nmy-app:1.0\nold-project:0.1\ndangling-image-abc",
      dockerContainers: "web-server-prod\ndb-backup-task\nmy-app-instance-1\ntest-container-xyz\nstopped-container-123",
      dockerVolumes: "app-data-volume\npostgres-data\nold-backup-volume\ncache-volume-temp\nunnamed-volume-qwerty",
    },
  });

  const onSubmit = (data: FormData) => {
    setError(null);
    setSuggestions(null);
    startTransition(async () => {
      try {
        const result = await getDockerCleanupSuggestions({
          dockerImages: data.dockerImages.split('\n').map(s => s.trim()).filter(Boolean),
          dockerContainers: data.dockerContainers.split('\n').map(s => s.trim()).filter(Boolean),
          dockerVolumes: data.dockerVolumes.split('\n').map(s => s.trim()).filter(Boolean),
        });
        setSuggestions(result);
        toast({ title: "Analysis Complete", description: "Suggestions generated successfully." });
      } catch (e) {
        console.error("Error getting Docker cleanup suggestions:", e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(errorMessage);
        toast({ variant: "destructive", title: "Analysis Failed", description: errorMessage });
      }
    });
  };

  const handleConfirmCleanup = (type: string, item: string) => {
    // TODO: Implement actual cleanup operation logic
    console.log(`User confirmed cleanup for ${type}: ${item}`);
    toast({
      title: "Cleanup Action (Simulated)",
      description: `${item} (${type}) would be removed. This is a simulation.`,
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dockerImages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Docker Images</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter each image name on a new line..." rows={5} {...field} />
                </FormControl>
                <FormDescription>List all Docker images currently on your system.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dockerContainers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Docker Containers</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter each container name on a new line..." rows={5} {...field} />
                </FormControl>
                <FormDescription>List all Docker containers (running and stopped).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dockerVolumes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Docker Volumes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter each volume name on a new line..." rows={5} {...field} />
                </FormControl>
                <FormDescription>List all Docker volumes.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Docker Environment
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions && (
        <Card>
          <CardHeader>
            <CardTitle>Cleanup Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Reasoning:</h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{suggestions.reasoning}</p>
            </div>
            <Separator />
            
            {suggestions.obsoleteImages.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Obsolete Images ({suggestions.obsoleteImages.length})</h3>
                <ul className="space-y-2">
                  {suggestions.obsoleteImages.map((image) => (
                    <li key={image} className="flex items-center justify-between p-3 border rounded-md">
                      <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-yellow-500"/> {image}</span>
                      <Button size="sm" variant="outline" onClick={() => handleConfirmCleanup('image', image)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Confirm Prune
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.obsoleteContainers.length > 0 && (
               <div>
                <h3 className="font-semibold text-lg mb-2">Obsolete Containers ({suggestions.obsoleteContainers.length})</h3>
                <ul className="space-y-2">
                  {suggestions.obsoleteContainers.map((container) => (
                    <li key={container} className="flex items-center justify-between p-3 border rounded-md">
                      <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-yellow-500"/> {container}</span>
                      <Button size="sm" variant="outline" onClick={() => handleConfirmCleanup('container', container)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Confirm Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.obsoleteVolumes.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Obsolete Volumes ({suggestions.obsoleteVolumes.length})</h3>
                <ul className="space-y-2">
                  {suggestions.obsoleteVolumes.map((volume) => (
                    <li key={volume} className="flex items-center justify-between p-3 border rounded-md">
                      <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-yellow-500"/> {volume}</span>
                      <Button size="sm" variant="outline" onClick={() => handleConfirmCleanup('volume', volume)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Confirm Prune
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
             {(suggestions.obsoleteImages.length === 0 && suggestions.obsoleteContainers.length === 0 && suggestions.obsoleteVolumes.length === 0) && (
                <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>All Clear!</AlertTitle>
                    <AlertDescription>No obsolete items found based on the provided lists and current analysis.</AlertDescription>
                </Alert>
             )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
