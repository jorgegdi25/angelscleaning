import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
    projectId: 'viiq562q',
    dataset: 'production',
    useCdn: true, // Use CDN for incredibly fast, cacheable reads
    apiVersion: '2023-05-03', // Use current date for API version
});

const builder = imageUrlBuilder(sanityClient);

// Helper function to easily generate Image URLs
export const urlFor = (source) => builder.image(source);
