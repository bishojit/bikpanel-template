
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
import { Loader2, CheckCircle, XCircle, HelpCircle, Trash2 } from "lucide-react";
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
    console.log(`User confirmed cleanup for ${type}: ${item} (Simulated)`);
    toast({
      title: "Cleanup Action (Simulated)",
      description: `${item} (${type}) would be removed. This is a simulation.`,
    });
  };

  return (
    <div className="space-y-4"> {/* space-y-6 to space-y-4 */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3"> {/* space-y-4 to space-y-3 */}
          <FormField
            control={form.control}
            name="dockerImages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Docker Images</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter each image name on a new line..." rows={4} {...field} /> {/* rows 5 to 4 */}
                </FormControl>
                <FormDescription className="text-xs">List all Docker images currently on your system.</FormDescription> {/* Added text-xs */}
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
                  <Textarea placeholder="Enter each container name on a new line..." rows={4} {...field} /> {/* rows 5 to 4 */}
                </FormControl>
                <FormDescription className="text-xs">List all Docker containers (running and stopped).</FormDescription> {/* Added text-xs */}
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
                  <Textarea placeholder="Enter each volume name on a new line..." rows={4} {...field} /> {/* rows 5 to 4 */}
                </FormControl>
                <FormDescription className="text-xs">List all Docker volumes.</FormDescription> {/* Added text-xs */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto" size="sm"> {/* Added size="sm" */}
            {isPending && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />} {/* Icon size adjusted */}
            Analyze Docker Environment
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="text-xs"> {/* Added text-xs */}
          <XCircle className="h-3.5 w-3.5" /> {/* h-4 w-4 to h-3.5 w-3.5 */}
          <AlertTitle className="text-sm">Error</AlertTitle> {/* Added text-sm */}
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions && (
        <Card>
          <CardHeader>
            <CardTitle>Cleanup Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4"> {/* space-y-6 to space-y-4 */}
            <div>
              <h3 className="font-semibold text-base mb-1.5">Reasoning:</h3> {/* text-lg mb-2 to text-base mb-1.5 */}
              <p className="text-xs text-muted-foreground bg-muted p-2 rounded-md">{suggestions.reasoning}</p> {/* text-sm p-3 to text-xs p-2 */}
            </div>
            <Separator />
            
            {suggestions.obsoleteImages.length > 0 && (
              <div>
                <h3 className="font-semibold text-base mb-1.5">Obsolete Images ({suggestions.obsoleteImages.length})</h3> {/* text-lg mb-2 to text-base mb-1.5 */}
                <ul className="space-y-1.5"> {/* space-y-2 to space-y-1.5 */}
                  {suggestions.obsoleteImages.map((image) => (
                    <li key={image} className="flex items-center justify-between p-2 border rounded-md text-xs"> {/* p-3 to p-2, added text-xs */}
                      <span className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-yellow-500"/> {image}</span> {/* gap-2 w-4 h-4 to gap-1.5 w-3.5 h-3.5 */}
                      <Button size="sm" variant="outline" onClick={() => handleConfirmCleanup('image', image)}>
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Confirm Prune {/* Icon size adjusted */}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.obsoleteContainers.length > 0 && (
               <div>
                <h3 className="font-semibold text-base mb-1.5">Obsolete Containers ({suggestions.obsoleteContainers.length})</h3> {/* text-lg mb-2 to text-base mb-1.5 */}
                <ul className="space-y-1.5"> {/* space-y-2 to space-y-1.5 */}
                  {suggestions.obsoleteContainers.map((container) => (
                    <li key={container} className="flex items-center justify-between p-2 border rounded-md text-xs"> {/* p-3 to p-2, added text-xs */}
                      <span className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-yellow-500"/> {container}</span> {/* gap-2 w-4 h-4 to gap-1.5 w-3.5 h-3.5 */}
                      <Button size="sm" variant="outline" onClick={() => handleConfirmCleanup('container', container)}>
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Confirm Remove {/* Icon size adjusted */}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.obsoleteVolumes.length > 0 && (
              <div>
                <h3 className="font-semibold text-base mb-1.5">Obsolete Volumes ({suggestions.obsoleteVolumes.length})</h3> {/* text-lg mb-2 to text-base mb-1.5 */}
                <ul className="space-y-1.5"> {/* space-y-2 to space-y-1.5 */}
                  {suggestions.obsoleteVolumes.map((volume) => (
                    <li key={volume} className="flex items-center justify-between p-2 border rounded-md text-xs"> {/* p-3 to p-2, added text-xs */}
                      <span className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-yellow-500"/> {volume}</span> {/* gap-2 w-4 h-4 to gap-1.5 w-3.5 h-3.5 */}
                      <Button size="sm" variant="outline" onClick={() => handleConfirmCleanup('volume', volume)}>
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Confirm Prune {/* Icon size adjusted */}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
             {(suggestions.obsoleteImages.length === 0 && suggestions.obsoleteContainers.length === 0 && suggestions.obsoleteVolumes.length === 0) && (
                <Alert className="text-xs"> {/* Added text-xs */}
                    <CheckCircle className="h-3.5 w-3.5" /> {/* h-4 w-4 to h-3.5 w-3.5 */}
                    <AlertTitle className="text-sm">All Clear!</AlertTitle> {/* Added text-sm */}
                    <AlertDescription>No obsolete items found based on the provided lists and current analysis.</AlertDescription>
                </Alert>
             )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
