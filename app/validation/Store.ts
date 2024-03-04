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
export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(4, "Nome deve ter mais que 4 caracteres")
    .max(10, "Nome deve ter menos que 10 caracteres"),
  billboardId: z
    .string()
    .min(1, "Selecione um billboard")
});

const MAX_IMAGE_SIZE = 2; //In MegaBytes
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};


export const BillboardCreateFormSchema = z.object({
  label: z.string().min(4, "Nome deve ter mais que 4 caracteres").max(10, "Nome deve ter menos que 10 caracteres"),
  image: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, "Selecione uma imagem")

  ,
})

export const BillboardUpdateFormSchema = BillboardCreateFormSchema.extend({
  image: BillboardCreateFormSchema.shape.image.optional(),
})




export const ProductFormSchema = z.object({
  name: z
    .string()
    .min(4, "Nome deve ter mais que 4 caracteres")
    .max(20, "Nome deve ter menos que 20 caracteres"),
  price: z.coerce.number().min(1, "O preço deve ser maior que 0"),
  image: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, "Selecione uma imagem")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
      );
    }, `O tamanho máximo da imagem é ${MAX_IMAGE_SIZE}MB`)
  ,
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isAvailable: z.boolean().default(false).optional()
})

export const ProductUpdateSchema = ProductFormSchema.extend({
  image: ProductFormSchema.shape.image.optional(),
})