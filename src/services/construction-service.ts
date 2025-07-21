import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  getDoc,
  doc,
  getFirestore 
} from 'firebase/firestore';
import { app } from '@/config/firebase';

const firestore = getFirestore(app);

export interface FirebaseConstructionProduct {
  id: string;
  title: {
    en: string;
    fr: string;
    ar: string;
  };
  description?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  category: string;
  images: {
    url: string;
    name: string;
  }[];
  createdAt: any;
}

// Simple interface that only uses actual Firebase data
export interface ConstructionProjectDisplay {
  id: string;
  title: {
    en: string;
    fr: string;
    ar: string;
  };
  description?: {
    en?: string;
    fr?: string;
    ar?: string;
  };
  category: string;
  images: {
    id: string;
    name: string;
    url: string;
  }[];
  createdAt: Date;
}

const mapFirebaseProductToDisplay = (product: FirebaseConstructionProduct): ConstructionProjectDisplay => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    images: product.images.map((img, index) => ({
      id: `${product.id}_${index}`,
      name: img.name,
      url: img.url
    })),
    createdAt: product.createdAt?.toDate?.() || new Date()
  };
};

export const getConstructionProjects = async (
  category?: 'ready-construction' | 'regular-construction',
  limitCount: number = 6
): Promise<ConstructionProjectDisplay[]> => {
  try {
    const projects: ConstructionProjectDisplay[] = [];
    
    const categories = category ? [category] : ['ready-construction', 'regular-construction'];
    
    for (const cat of categories) {
      try {
        const collectionPath = `construction-projects/${cat}/categoryProduct`;
        console.log(`Fetching from path: ${collectionPath}`);
        
        const q = query(
          collection(firestore, collectionPath),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );

        const snapshot = await getDocs(q);
        
        snapshot.forEach((doc) => {
          const data = doc.data() as Omit<FirebaseConstructionProduct, 'id'>;
          const product: FirebaseConstructionProduct = {
            id: doc.id,
            ...data
          };
          
          if (product.title && product.images && product.images.length > 0) {
            projects.push(mapFirebaseProductToDisplay(product));
          }
        });
        
        console.log(`Found ${snapshot.size} products in category: ${cat}`);
      } catch (categoryError) {
        console.warn(`Error fetching category ${cat}:`, categoryError);
        continue;
      }
    }

    console.log(`Total construction projects fetched: ${projects.length}`);
    return projects;
  } catch (error) {
    console.error('Error fetching construction projects:', error);
    return [];
  }
};

export const getConstructionProjectById = async (
  category: string,
  id: string
): Promise<ConstructionProjectDisplay | null> => {
  try {
    const docRef = doc(firestore, `construction-projects/${category}/categoryProduct/${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<FirebaseConstructionProduct, 'id'>;
      const product: FirebaseConstructionProduct = {
        id: docSnap.id,
        ...data
      };
      return mapFirebaseProductToDisplay(product);
    }
    return null;
  } catch (error) {
    console.error('Error fetching construction project by ID:', error);
    return null;
  }
};

export const getRelatedConstructionProjects = async (
  currentProjectId: string,
  category: string,
  limitCount: number = 3
): Promise<ConstructionProjectDisplay[]> => {
  try {
    const collectionPath = `construction-projects/${category}/categoryProduct`;
    
    const q = query(
      collection(firestore, collectionPath),
      orderBy('createdAt', 'desc'),
      limit(limitCount + 1) // Get one extra to exclude current project
    );

    const snapshot = await getDocs(q);
    const projects: ConstructionProjectDisplay[] = [];
    
    snapshot.forEach((doc) => {
      if (doc.id !== currentProjectId) { // Exclude current project
        const data = doc.data() as Omit<FirebaseConstructionProduct, 'id'>;
        const product: FirebaseConstructionProduct = {
          id: doc.id,
          ...data
        };
        
        if (product.title && product.images && product.images.length > 0 && projects.length < limitCount) {
          projects.push(mapFirebaseProductToDisplay(product));
        }
      }
    });
    
    return projects;
  } catch (error) {
    console.error('Error fetching related construction projects:', error);
    return [];
  }
};

export const getFeaturedConstructionProjects = async (): Promise<ConstructionProjectDisplay[]> => {
  return getConstructionProjects(undefined, 3);
};

export const getConstructionProjectsByCategory = async (
  category: 'ready-construction' | 'regular-construction'
): Promise<ConstructionProjectDisplay[]> => {
  return getConstructionProjects(category, 10);
};