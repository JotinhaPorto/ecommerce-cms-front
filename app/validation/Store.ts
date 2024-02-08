import { z } from "zod";

export const StoreFormSchema = z.object({
  name: z
    .string()
    .min(4, "Nome deve ter mais que 4 caracteres")
    .max(10, "Nome deve ter menos que 10 caracteres"),
});

export const ColorFormSchema = z.object({
  name: z
    .string()
    .min(4, "Nome deve ter mais que 4 caracteres")
    .max(10, "Nome deve ter menos que 10 caracteres"),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: "A string deve ser um valor de uma cor do tipo hex válida",
  }),
});
export const SizeFormSchema = z.object({
  name: z
    .string()
    .min(4, "Nome deve ter mais que 4 caracteres")
    .max(10, "Nome deve ter menos que 10 caracteres"),
  value: z
    .string()
    .min(1, "Nome deve ter mais que 1 caractere")
    .max(4, "Nome deve ter menos que 4 caracteres"),
});
