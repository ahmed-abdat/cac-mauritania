// Export all structured data schemas
export { organizationSchema, websiteSchema } from './organization';
export { localBusinessSchema } from './local-business';
export { 
  constructionServiceSchema,
  renewableEnergyServiceSchema, 
  agricultureServiceSchema,
  entrepreneurshipServiceSchema,
  animalDevelopmentServiceSchema,
  conferenceServiceSchema,
  charitableServiceSchema 
} from './services';

// Import services for mapping
import {
  constructionServiceSchema,
  renewableEnergyServiceSchema, 
  agricultureServiceSchema,
  entrepreneurshipServiceSchema,
  animalDevelopmentServiceSchema,
  conferenceServiceSchema,
  charitableServiceSchema 
} from './services';

// Service category mapping for easy access
export const serviceSchemas = {
  'ready-construction': constructionServiceSchema,
  'regular-construction': constructionServiceSchema,
  'renewable-energy': renewableEnergyServiceSchema,
  'agriculture': agricultureServiceSchema,
  'animal-development': animalDevelopmentServiceSchema,
  'entrepreneurship-center': entrepreneurshipServiceSchema,
  'conference-hall': conferenceServiceSchema,
  'charitable-interventions': charitableServiceSchema,
} as const;

export type ServiceCategory = keyof typeof serviceSchemas;