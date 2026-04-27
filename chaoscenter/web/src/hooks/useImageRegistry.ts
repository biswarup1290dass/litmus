import { getImageRegistry } from '@api/core/ImageRegistry';
import type { ImageRegistry } from '@db';
import { useAppStore } from './useAppStore';

// Default image registry configuration
const DEFAULT_IMAGE_REGISTRY: ImageRegistry = {
  name: 'docker.io',
  repo: 'litmuschaos',
  secret: ''
};

export function useImageRegistry(): { imageRegistry: ImageRegistry | undefined; loading: boolean } {
  const { projectID } = useAppStore();

  // Fetch imageRegistry data
  const { data: getImageRegistryData, loading } = getImageRegistry({
    projectID: projectID ?? ''
  });

  // Create imageRegistry object with fallback values
  const imageRegistry = getImageRegistryData?.getImageRegistry
    ? {
        name: getImageRegistryData.getImageRegistry.imageRegistryInfo.imageRegistryName,
        repo: getImageRegistryData.getImageRegistry.imageRegistryInfo.imageRepoName,
        secret: getImageRegistryData.getImageRegistry.imageRegistryInfo.secretName,
        tag: getImageRegistryData.getImageRegistry.imageRegistryInfo.imageTag
      }
    : DEFAULT_IMAGE_REGISTRY;

  return { imageRegistry, loading };
}
