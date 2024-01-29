import { z } from "zod";

export const StoreFormSchema = z.object({
    name: z.string().min(4, "Nome deve ter mais que 4 caracteres").max(10, "Nome deve ter menos que 10 caracteres"),
});

