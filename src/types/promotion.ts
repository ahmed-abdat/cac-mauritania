export interface Promotion {
    image: {
      name : string;
      url : string;
    }
    title: {
      en: string
      fr: string
      ar: string
    }
    oldPrice: string
    newPrice: string
  }

  export interface PromosDisplay {
    title: {
      en: string;
      fr: string;
      ar: string;
    };
    price: string;
    oldPrice?: string;
    image: {
      name: string;
      url: string;
    };
    id?: string;
  }