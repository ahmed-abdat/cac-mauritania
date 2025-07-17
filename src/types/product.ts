import { Timestamp } from "firebase/firestore";

export interface ConvertedTimestamp {
  seconds: number;
  nanoseconds: number;
  date: string;
}

export interface Product {
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
  price?: string;
  oldPrice?: string;
  specification?: string;
  images: {
    url: string;
    name: string;
  }[];
  stock: boolean;
  category?: string;
  id?: string;
  createdAt?: Timestamp | ConvertedTimestamp;
}


export interface ProductCategory {
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
  images: {
    name: string;
    url: string;
  }[];
  id? : string;
  price?: string;
  oldPrice?: string;
  category? : string;
  stock : boolean
}


// export const products: Product[] = [
//   {
//     id: "1",
//     title: "Bâtiment en kit ouvert de 300m² Hauteur 5m",
//     // specifications: "300m² (12.6m x 24m x 5m)",
//     // price: "11 750 MR",
//     // oldPrice: "12 250 MR",
//     stock: false,
//     category: "Construction",
//     // description: "Description for Building 1",
//     images: [
//       { src: "/01.jpeg" },
//       { src: "/02.jpeg" },
//       { src: "/03.jpeg" },
//     ],
//   },
//   {
//     id: "2",
//     title: "Bâtiment en kit ouvert de 620m² hauteur 5m",
//     specifications: "620m² (20.6m x 30m x 5m)",
//     price: "25 610 MR",
//     oldPrice: "26 610 MR",
//     stock: true,
//     category: "Building",
//     description: "Description for Building 2",
//     images: [
//       { src: "/agricol_images/1.jpg" },
//       { src: "/agricol_images/2.jpg" },
//       { src: "/agricol_images/3.jpg" },
//     ],
//   },
//   {
//     id: "3",
//     title: "Abri bi-pente en kit - 80 m² - 8x10x3,35m",
//     specifications: "80m² (8m x 10m x 3.35m)",
//     price: "3 488 MR",
//     stock: true,
//     category: "Construction",
//     description: "Description for Building 3",
//     images: [
//       { src: "/agricol_images/4.jpg" },
//       { src: "/agricol_images/5.jpg" },
//       { src: "/agricol_images/6.jpg" },
//     ],
//   },
//   {
//     id: "4",
//     title: "Hangar industriel en kit 990m²",
//     specifications: "990m² (20.6m x 48m x 5m)",
//     price: "39 640 MR",
//     oldPrice: "41 640 MR",
//     stock: true,
//     category: "Construction",
//     description: "Retour en stock de notre hangar en kit galvanisé de 529m² ! Équipé d'un portillon de service et d'une porte sectionnelle isolée et motorisée, ce bâtiment est idéal pour démarrer immédiatement votre projet industriel ou commercial. Disponible dès maintenant. Réservez le sans attendre en nous contactant !",
//     images: [
//       { src: "/agricol_images/7.jpg" },
//       { src: "/agricol_images/8.jpg" },
//       { src: "/agricol_images/9.jpg" },
//     ],
//   },
//   {
//     id: "5",
//     title: "Bâtiment en kit ouvert de 150m² hauteur 3m",
//     specifications: "150m² (10m x 15m x 3m)",
//     price: "12 000 MR",
//     stock: true,
//     category: "Building",
//     description: "Description for Building 5",
//     images: [
//       { src: "/agricol_images/10.jpg" },
//       { src: "/agricol_images/11.jpg" },
//       { src: "/agricol_images/12.jpg" },
//     ],
//   },
//   {
//     id: "6",
//     title: "Maison en bois de 100m²",
//     specifications: "100m² (10m x 10m x 3m)",
//     price: "20 000 MR",
//     stock: true,
//     category: "Housing",
//     description: "Description for Wooden House",
//     images: [
//       { src: "/agricol_images/13.jpg" },
//       { src: "/agricol_images/14.jpg" },
//     ],
//   },
//   {
//     id: "7",
//     title: "Garage en métal de 50m²",
//     specifications: "50m² (5m x 10m x 2.5m)",
//     price: "8 000 MR",
//     stock: false,
//     category: "Garage",
//     description: "Description for Metal Garage",
//     images: [
//       { src: "/agricol_images/15.jpg" },
//     ],
//   },
//   {
//     id: "8",
//     title: "Abri de jardin de 20m²",
//     specifications: "20m² (4m x 5m x 2.5m)",
//     price: "2 000 MR",
//     oldPrice: "2 500 MR",
//     stock: true,
//     category: "Garden",
//     description: "Description for Garden Shed",
//     images: [
//       { src: "/agricol_images/16.jpg" },
//       { src: "/agricol_images/17.jpg" },
//     ],
//   },
//   {
//     id: "9",
//     title: "Studio préfabriqué de 30m²",
//     specifications: "30m² (5m x 6m x 3m)",
//     price: "10 000 MR",
//     stock: true,
//     category: "Prefabricated",
//     description: "Description for Prefabricated Studio",
//     images: [
//       { src: "/agricol_images/18.jpg" },
//       { src: "/agricol_images/19.jpg" },
//       { src: "/agricol_images/20.jpg" },
//     ],
//   },
//   {
//     id: "10",
//     title: "Bungalow de plage de 60m²",
//     specifications: "60m² (6m x 10m x 3.5m)",
//     price: "15 000 MR",
//     oldPrice: "16 000 MR",
//     stock: false,
//     category: "Beach",
//     description: "Description for Beach Bungalow",
//     images: [
//       { src: "/agricol_images/21.jpg" },
//       { src: "/agricol_images/22.jpg" },
//     ],
//   },
// ];


// export const SanterProducts: Product[] = [
//   // Santé Category
//   {
//     id: "1",
//     title: "Kit de soins de santé de base",
//     stock: true,
//     category: "sante",
//     images: [
//       { src: "/agricol_images/1.jpg" },
//       { src: "/agricol_images/2.jpg" },
//       { src: "/agricol_images/3.jpg" },
//     ],
//   },
//   {
//     id: "2",
//     title: "Trousse de premiers secours",
//     stock: false,
//     category: "sante",
//     images: [
//       { src: "/agricol_images/4.jpg" },
//       { src: "/agricol_images/5.jpg" },
//       { src: "/agricol_images/6.jpg" },
//     ],
//   },
//   {
//     id: "3",
//     title: "Kit médical d'urgence",
//     stock: true,
//     category: "sante",
//     images: [
//       { src: "/agricol_images/7.jpg" },
//       { src: "/agricol_images/8.jpg" },
//       { src: "/agricol_images/9.jpg" },
//     ],
//   },
//   {
//     id: "4",
//     title: "Ensemble de diagnostic de santé",
//     stock: false,
//     category: "sante",
//     images: [
//       { src: "/agricol_images/10.jpg" },
//       { src: "/agricol_images/11.jpg" },
//       { src: "/agricol_images/12.jpg" },
//     ],
//   },
//   {
//     id: "5",
//     title: "Équipement de réanimation cardio-pulmonaire",
//     stock: true,
//     category: "sante",
//     images: [
//       { src: "/agricol_images/13.jpg" },
//       { src: "/agricol_images/14.jpg" },
//       { src: "/agricol_images/15.jpg" },
//     ],
//   },
//   {
//     id: "6",
//     title: "Kit de prévention des infections",
//     stock: true,
//     category: "sante",
//     images: [
//       { src: "/agricol_images/16.jpg" },
//       { src: "/agricol_images/17.jpg" },
//       { src: "/agricol_images/18.jpg" },
//     ],
//   },
//   // Security Category
//   {
//     id: "7",
//     title: "Caméra de sécurité HD",
//     stock: true,
//     category: "security",
//     images: [
//       { src: "/agricol_images/19.jpg" },
//       { src: "/agricol_images/20.jpg" },
//       { src: "/agricol_images/21.jpg" },
//     ],
//   },
//   {
//     id: "8",
//     title: "Système d'alarme antivol",
//     stock: false,
//     category: "security",
//     images: [
//       { src: "/agricol_images/22.jpg" },
//       { src: "/agricol_images/23.jpg" },
//       { src: "/agricol_images/24.jpg" },
//     ],
//   },
//   {
//     id: "9",
//     title: "Kit de surveillance domestique",
//     stock: true,
//     category: "security",
//     images: [
//       { src: "/agricol_images/25.jpg" },
//       { src: "/agricol_images/26.jpg" },
//       { src: "/agricol_images/27.jpg" },
//     ],
//   },
//   {
//     id: "10",
//     title: "Détecteur de mouvement",
//     stock: false,
//     category: "security",
//     images: [
//       { src: "/agricol_images/28.jpg" },
//       { src: "/agricol_images/1.jpg" },
//       { src: "/agricol_images/2.jpg" },
//     ],
//   },
//   {
//     id: "11",
//     title: "Système de sécurité sans fil",
//     stock: true,
//     category: "security",
//     images: [
//       { src: "/agricol_images/3.jpg" },
//       { src: "/agricol_images/4.jpg" },
//       { src: "/agricol_images/5.jpg" },
//     ],
//   },
//   {
//     id: "12",
//     title: "Interphone vidéo",
//     stock: true,
//     category: "security",
//     images: [
//       { src: "/agricol_images/6.jpg" },
//       { src: "/agricol_images/7.jpg" },
//       { src: "/agricol_images/8.jpg" },
//     ],
//   },
//   // Bureautique Category
//   {
//     id: "13",
//     title: "Ensemble de fournitures de bureau",
//     stock: true,
//     category: "biroutice",
//     images: [
//       { src: "/agricol_images/9.jpg" },
//       { src: "/agricol_images/10.jpg" },
//       { src: "/agricol_images/11.jpg" },
//     ],
//   },
//   {
//     id: "14",
//     title: "Chaise de bureau ergonomique",
//     stock: false,
//     category: "biroutice",
//     images: [
//       { src: "/agricol_images/12.jpg" },
//       { src: "/agricol_images/13.jpg" },
//       { src: "/agricol_images/14.jpg" },
//     ],
//   },
//   {
//     id: "15",
//     title: "Bureau ajustable en hauteur",
//     stock: true,
//     category: "biroutice",
//     images: [
//       { src: "/agricol_images/15.jpg" },
//       { src: "/agricol_images/16.jpg" },
//       { src: "/agricol_images/17.jpg" },
//     ],
//   },
//   {
//     id: "16",
//     title: "Lampe de bureau LED",
//     stock: false,
//     category: "biroutice",
//     images: [
//       { src: "/agricol_images/18.jpg" },
//       { src: "/agricol_images/19.jpg" },
//       { src: "/agricol_images/20.jpg" },
//     ],
//   },
//   {
//     id: "17",
//     title: "Ensemble de rangement pour bureau",
//     stock: true,
//     category: "biroutice",
//     images: [
//       { src: "/agricol_images/21.jpg" },
//       { src: "/agricol_images/22.jpg" },
//       { src: "/agricol_images/23.jpg" },
//     ],
//   },
//   {
//     id: "18",
//     title: "Imprimante multifonction",
//     stock: true,
//     category: "biroutice",
//     images: [
//       { src: "/agricol_images/24.jpg" },
//       { src: "/agricol_images/25.jpg" },
//       { src: "/agricol_images/26.jpg" },
//     ],
//   },
// ];