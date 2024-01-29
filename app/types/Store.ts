import { z } from "zod";
import { StoreFormSchema } from "../validation/Store";

export type Store = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    userId: string
}

export type SettingsFormValues = z.infer<typeof StoreFormSchema>