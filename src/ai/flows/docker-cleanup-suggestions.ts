// src/ai/flows/docker-cleanup-suggestions.ts
'use server';

/**
 * @fileOverview Provides intelligent Docker cleanup suggestions.
 *
 * - getDockerCleanupSuggestions - A function that analyzes the Docker environment and suggests obsolete items for removal.
 * - DockerCleanupSuggestionsInput - The input type for the getDockerCleanupSuggestions function.
 * - DockerCleanupSuggestionsOutput - The return type for the getDockerCleanupSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DockerCleanupSuggestionsInputSchema = z.object({
  dockerImages: z
    .array(z.string())
    .describe('A list of docker image names currently on the system.'),
  dockerContainers: z
    .array(z.string())
    .describe('A list of docker container names currently on the system.'),
  dockerVolumes: z
    .array(z.string())
    .describe('A list of docker volume names currently on the system.'),
});
export type DockerCleanupSuggestionsInput = z.infer<
  typeof DockerCleanupSuggestionsInputSchema
>;

const DockerCleanupSuggestionsOutputSchema = z.object({
  obsoleteImages: z
    .array(z.string())
    .describe('A list of docker image names that are considered obsolete.'),
  obsoleteContainers: z
    .array(z.string())
    .describe('A list of docker container names that are considered obsolete.'),
  obsoleteVolumes: z
    .array(z.string())
    .describe('A list of docker volume names that are considered obsolete.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the suggestions, explaining why each item is considered obsolete.'
    ),
});
export type DockerCleanupSuggestionsOutput = z.infer<
  typeof DockerCleanupSuggestionsOutputSchema
>;

export async function getDockerCleanupSuggestions(
  input: DockerCleanupSuggestionsInput
): Promise<DockerCleanupSuggestionsOutput> {
  return dockerCleanupSuggestionsFlow(input);
}

const dockerCleanupSuggestionsPrompt = ai.definePrompt({
  name: 'dockerCleanupSuggestionsPrompt',
  input: {schema: DockerCleanupSuggestionsInputSchema},
  output: {schema: DockerCleanupSuggestionsOutputSchema},
  prompt: `You are an expert Docker administrator. Analyze the Docker environment and suggest obsolete images, containers, and volumes for removal to free up resources and improve system performance. Provide a detailed reasoning for each suggestion.

Docker Images: {{dockerImages}}
Docker Containers: {{dockerContainers}}
Docker Volumes: {{dockerVolumes}}`,
});

const dockerCleanupSuggestionsFlow = ai.defineFlow(
  {
    name: 'dockerCleanupSuggestionsFlow',
    inputSchema: DockerCleanupSuggestionsInputSchema,
    outputSchema: DockerCleanupSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await dockerCleanupSuggestionsPrompt(input);
    return output!;
  }
);
