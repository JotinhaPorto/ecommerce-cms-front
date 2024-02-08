import { z } from "zod";
import {
  ColorFormSchema,
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

export type ColorColumn = Omit<Color, "storeId" | "updatedAt">;
export type SizeColumn = Omit<Size, "storeId" | "updatedAt">;
