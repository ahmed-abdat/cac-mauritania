// src/app/action.ts
"use server";

import nodemailer from "nodemailer";
import { createEmailTemplate } from "@/utils/templates/emailTemplate";
import {
  collection,
  getFirestore,
  orderBy,
  query,
  limit,
  getDocs,
  startAfter,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { app } from "@/config/firebase";
import { PromosDisplay } from "@/types/promotion";
import { Presentation } from "@/types/presentation";
import { Product, ConvertedTimestamp } from "@/types/product";

const firestore = getFirestore(app);

export async function sendEmail(formData: {
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  phoneNumber: string;
  message: string;
}) {
  const { firstName, lastName, companyName, email, phoneNumber, message } =
    formData;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlBody = createEmailTemplate({
    firstName,
    lastName,
    companyName,
    email,
    phoneNumber,
    message,
  });

  const publicUrl = process.env.PUBLIC_URL;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    // Internal notification email - could be internationalized in future if needed
    subject: `New Contact Request - ${firstName} ${lastName}`,
    html: htmlBody,
    attachments: [
      {
        filename: "logo.jpg",
        path: `${publicUrl}`,
        cid: "logo", // same cid value as in the html img src
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Error sending email:", error.message, error.stack);
    return { success: false, error: error.message };
  }
}

export const getPromo = async (
  id: string,
  promoCollection: string = "promos"
) => {
  const docRef = doc(firestore, promoCollection, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        price: data.price,
        oldPrice: data.oldPrice,
        title: data.title,
        image: data.image,
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchPromos = async (promoCollection: string = "promos") => {
  try {
    const q = query(
      collection(firestore, promoCollection),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    let promos: PromosDisplay[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      promos.push({
        id: doc.id,
        price: data.price,
        oldPrice: data.oldPrice,
        title: data.title,
        image: data.image,
      });
    });
    return promos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPresentationImages = async (categoryId: string) => {
  const docRef = doc(firestore, "presentation", categoryId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Presentation;
      return data.media;
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getGalaryMedia = async (categoryId: string) => {
  const docRef = doc(firestore, "galarys", categoryId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Presentation;
      return data.media;
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMeillersProducts = async () => {
  // collection Name is meillers-produits
  const collectionRef = collection(firestore, "meillers-produits");
  const q = query(collectionRef, orderBy("createdAt", "desc"), limit(4));
  try {
    const snapshot = await getDocs(q);
    let products: Product[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        title: data.title,
        price: data.price,
        images: data.images,
        specification: data.specification,
        stock: data.stock,
        oldPrice: data.oldPrice,
      });
    });
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMarketPlaceProduct = async (
  collectionName: string,
  productId: string
) => {
  const docRef = doc(firestore, collectionName, productId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const convertedCreatedAt: ConvertedTimestamp | undefined = data.createdAt
        ? {
            seconds: data.createdAt.seconds,
            nanoseconds: data.createdAt.nanoseconds,
            date: new Date(data.createdAt.seconds * 1000).toISOString(),
          }
        : undefined;

      return {
        product: {
          id: docSnap.id,
          title: data.title,
          price: data.price,
          images: data.images,
          specification: data.specification,
          stock: data.stock,
          oldPrice: data.oldPrice,
          category: data.category,
          description: data.description,
          createdAt: convertedCreatedAt,
        },
        docSnap,
      };
    } else {
      console.log("No such document!");
      return { product: null };
    }
  } catch (error) {
    console.log(error);
    return { product: null };
  }
};

// Fetch initial batch of marketplace products
export const getMarketPlaceProducts = async (
  collectionName: string,
  limited: boolean = true
) => {
  const numberOfProducts = limited ? 10 : 60;
  const collectionRef = collection(firestore, collectionName);
  const q = query(
    collectionRef,
    orderBy("createdAt", "desc"),
    limit(numberOfProducts)
  );

  try {
    const snapshot = await getDocs(q);
    let products: Product[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const convertedCreatedAt: ConvertedTimestamp | undefined = data.createdAt
        ? {
            seconds: data.createdAt.seconds,
            nanoseconds: data.createdAt.nanoseconds,
            date: new Date(data.createdAt.seconds * 1000).toISOString(),
          }
        : undefined;

      products.push({
        id: doc.id,
        title: data.title,
        price: data.price,
        images: data.images,
        specification: data.specification,
        stock: data.stock,
        oldPrice: data.oldPrice,
        category: data.category,
        description: data.description,
        createdAt: convertedCreatedAt,
      });
    });

    if (products.length === 0) return { products: [], lastDocId: null };

    if (products.length < numberOfProducts) {
      return { products, lastDocId: null };
    }

    const lastDocId = snapshot.docs[snapshot.docs.length - 1].id;
    return { products, lastDocId };
  } catch (error) {
    console.error("Error fetching marketplace products:", error);
    return { products: [], lastDocId: null };
  }
};

// Fetch more marketplace products for lazy loading
export const fetchMoreMarketPlaceProducts = async (
  collectionName: string,
  lastDocId: string | null
) => {
  console.log("Fetching more marketplace products");
  const numberOfProductsToFetch = 10;
  let id: string | null = lastDocId;
  if (!lastDocId) return { otherPostes: [], id: null };

  try {
    const { docSnap } = await getMarketPlaceProduct(collectionName, lastDocId);

    if (!docSnap) return { otherPostes: [], id: null };

    const q = query(
      collection(firestore, collectionName),
      orderBy("createdAt", "desc"),
      startAfter(docSnap),
      limit(numberOfProductsToFetch)
    );

    const snapshot = await getDocs(q);
    let products: Product[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const convertedCreatedAt: ConvertedTimestamp | undefined = data.createdAt
        ? {
            seconds: data.createdAt.seconds,
            nanoseconds: data.createdAt.nanoseconds,
            date: new Date(data.createdAt.seconds * 1000).toISOString(),
          }
        : undefined;

      products.push({
        id: doc.id,
        title: data.title,
        price: data.price,
        images: data.images,
        specification: data.specification,
        stock: data.stock,
        oldPrice: data.oldPrice,
        category: data.category,
        description: data.description,
        createdAt: convertedCreatedAt,
      });
    });

    id = snapshot.docs[snapshot.docs.length - 1].id;
    const docsLength = snapshot.size;
    if (docsLength < numberOfProductsToFetch) {
      id = null;
    }
    return { otherPostes: products, id };
  } catch (error) {
    console.error("Error fetching more marketplace products:", error);
    return { otherPostes: [], id: null };
  }
};

export const getHealthProduct = async (
  categoryId: string,
  productId: string
) => {
  const docRef = doc(
    firestore,
    `health-products/${categoryId}/categoryProduct`,
    productId
  );
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Product;
      return {
        product: {
          id: docSnap.id,
          title: data.title,
          price: data.price,
          images: data.images,
          specification: data.specification,
          stock: data.stock,
          oldPrice: data.oldPrice,
          category: data.category,
          description: data.description,
        },
        docSnap,
      };
    } else {
      console.log("No such document!");
      return { product: null };
    }
  } catch (error) {
    console.log(error);
    return { product: null };
  }
};

export const getHealthProducts = async (
  categoryId: string,
  limited: boolean = true
) => {
  const numberOfproducts = limited ? 10 : 60;
  const collectionRef = collection(
    firestore,
    `health-products/${categoryId}/categoryProduct`
  );
  const q = query(
    collectionRef,
    orderBy("createdAt", "desc"),
    limit(numberOfproducts)
  );
  try {
    const snapshot = await getDocs(q);
    let products: Product[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const convertedCreatedAt: ConvertedTimestamp | undefined = data.createdAt
        ? {
            seconds: data.createdAt.seconds,
            nanoseconds: data.createdAt.nanoseconds,
            date: new Date(data.createdAt.seconds * 1000).toISOString(),
          }
        : undefined;

      products.push({
        id: doc.id,
        title: data.title,
        category: data.category,
        images: data.images,
        description: data.description,
        stock: data.stock,
        createdAt: convertedCreatedAt,
      });
    });
    if (products.length === 0) return { products: [], lastDocId: null };

    if (products.length < numberOfproducts) {
      return { products, lastDocId: null };
    }

    const lastDocId = snapshot.docs[snapshot.docs.length - 1].id;
    return { products, lastDocId };
  } catch (error) {
    console.log(error);
    return { products: [], lastDoc: null };
  }
};

export const fetchMoreHealthProducts = async (
  categoryId: string,
  lastDocId: string | null
) => {
  console.log("fetchMorePostes");
  const numberOfproductToFetch = 10;
  let id: string | null = lastDocId;
  if (!lastDocId) return { otherPostes: [], id: null };

  try {
    const { docSnap } = await getHealthProduct(categoryId, lastDocId);
    const collectionRef = collection(
      firestore,
      `health-products/${categoryId}/categoryProduct`
    );
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      startAfter(docSnap),
      limit(numberOfproductToFetch)
    );
    const snapshot = await getDocs(q);
    let products: Product[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const convertedCreatedAt: ConvertedTimestamp | undefined = data.createdAt
        ? {
            seconds: data.createdAt.seconds,
            nanoseconds: data.createdAt.nanoseconds,
            date: new Date(data.createdAt.seconds * 1000).toISOString(),
          }
        : undefined;

      products.push({
        id: doc.id,
        title: data.title,
        category: data.category,
        images: data.images,
        description: data.description,
        stock: data.stock,
        createdAt: convertedCreatedAt,
      });
    });
    id = snapshot.docs[snapshot.docs.length - 1].id;
    const docsLength = snapshot.size;
    if (docsLength < numberOfproductToFetch) {
      id = null;
    }
    return { otherPostes: products, id };
  } catch (error) {
    console.log(error);
    return { otherPostes: [], id: null };
  }
};
