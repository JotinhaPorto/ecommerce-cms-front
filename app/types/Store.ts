import { z } from "zod";
import {
  BillboardCreateFormSchema,
  BillboardUpdateFormSchema,
  CategoryFormSchema,
  ColorFormSchema,
  ProductFormSchema,
  ProductUpdateSchema,
  SizeFormSchema,
  StoreFormSchema,
} from "../validation/Store";

export type Store = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type SettingsFormValues = z.infer<typeof StoreFormSchema>;

export type ColorFormValues = z.infer<typeof ColorFormSchema>;

export type SizeFormValues = z.infer<typeof SizeFormSchema>;

export type BillboardFormValues = z.infer<typeof BillboardCreateFormSchema> | z.infer<typeof BillboardUpdateFormSchema>

export type ProductFormValues = z.infer<typeof ProductFormSchema> | z.infer<typeof ProductUpdateSchema>

export type CategoryFormValues = z.infer<typeof CategoryFormSchema>;
export type Color = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  storeId: string;
};
export type Size = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  storeId: string;
};

export type Billboard = {
  id: string;
  label: string;
  createdAt: string;
  updatedAt: string;
  storeId: string;
}

export type BillboardWithImage = {
  id: string;
  label: string;
  createdAt: string;
  updatedAt: string;
  storeId: string;
  image: [{ url: string }]
}


export interface ImageUpload {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  bucket: string
  key: string
  acl: string
  contentType: string
  contentDisposition: any
  contentEncoding: any
  storageClass: string
  serverSideEncryption: any
  location: string
  etag: string
}

export interface Categories {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  storeId: string;
  billboardId: string;
  billboard: Billboard;
}
export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  storeId: string;
  billboardId: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  isFeatured: Boolean
  isAvailable: Boolean
  createdAt: string;
  updatedAt: string;
  storeId: string;
  sizeId: string;
  colorId: string;
  categoryId: string;
}
export type CategoryColumn = Omit<Categories, "storeId" | "updatedAt">;
export type ColorColumn = Omit<Color, "storeId" | "updatedAt">;
export type SizeColumn = Omit<Size, "storeId" | "updatedAt">;
export type BillboardColumn = Omit<Billboard, "storeId" | "updatedAt">
export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  isFeatured: Boolean
  isAvailable: Boolean
  createdAt: string;
  size: string;
  color: string;
  category: string
}