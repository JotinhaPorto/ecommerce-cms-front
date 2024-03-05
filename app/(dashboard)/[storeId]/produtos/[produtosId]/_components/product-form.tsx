"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductFormValues, Size } from "@/app/types/Store";
import { ProductFormSchema, ProductUpdateSchema } from "@/app/validation/Store";
import { Heading } from "@/components/heading";
import { Trash } from "lucide-react";
import {
  createImagesS3,
  createProduct,
  deleteProduct,
  deleteSize,
  updateProduct,
} from "@/api/store";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AlertModal } from "@/components/modal/alert-modal";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Category, Color } from "@/app/types/Store";
import Image from "next/image";
import { AxiosError } from "axios";

interface ProductFormProps {
  initialData: any | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
};
const ProductForm = ({ initialData, categories, colors, sizes }: ProductFormProps) => {
  const [open, setOpen] = useState(false);
  const s = initialData ? initialData.image.map((image: { url: any; }) => image.url) : null
  const [imagePreview, setImagePreview] = useState<string[] | null>([]);
  const [images, setImages] = useState<string[] | null>(initialData ? s : null);

  const title = initialData ? "Atualizar produto" : "Criar produto";
  const description = initialData
    ? "Atualize a produto"
    : "Crie uma nova produto";
  const toastMessage = initialData
    ? "Produto atualizado com sucesso!"
    : "Produto criado com sucesso!";
  const action = initialData ? "Atualizar" : "Criar";

  const params = useParams();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ProductFormSchema || ProductUpdateSchema),
    defaultValues: initialData || {
      name: "",
      categoryId: "",
      colorId: "",
      sizeId: "",
      price: 0,
      image: [],
      isFeatured: false,
      isAvailable: false,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    let uploadedImage;
    if (data.image && data.image instanceof FileList) {
      const dataFormatted = new FormData()
      for (let i = 0; i < data.image.length; i++) {
        dataFormatted.append('images', data.image[i])
      }
      uploadedImage = await createImagesS3(dataFormatted)
    }
    try {
      if (initialData) {
        await updateProduct(
          { ...data, name: data.name, image: uploadedImage ? uploadedImage : data.image },
          params.storeId as string,
          params.produtosId as string
        );
      } else {

        await createProduct({ ...data, image: uploadedImage }, params.storeId as string);
      }
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: toastMessage,
      });
      router.refresh();
      router.push(`/${params.storeId}/produtos`);
    } catch (error) {
      console.log(error);
    }
  };
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await deleteProduct(params.storeId as string, params.produtosId as string);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "Produto deletado com sucesso!",
      });
      router.refresh();
      router.push(`/${params.storeId}/produtos`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          description: `${error.response!.data.message}`,
        });
      }
    }
  };



  const onDeleteStateImageAndVaAlueInput = (url: string, index: number) => {
    if (watchImage) {
      const removeImageInInputValue = Array.from(watchImage).filter((_, i) => i !== index)
      form.setValue("image", removeImageInInputValue as any)

    }
    setImages(images!.filter((image) => image !== url))
  }
  const onDeletePreviewImage = (image: any, index: number) => {
    console.log(image, index)
    setImagePreview(imagePreview!.filter((_, i) => i !== index))
  }
  const watchImage = form.watch("image");


  console.log(images)
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={false}
      />
      <div className="px-4">
        <div className="py-5 flex justify-between items-center">
          <div>
            <Heading title={title} description={description} />
          </div>
          {initialData && (
            <Button variant="destructive" onClick={() => setOpen(true)}>
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-3"
          >
            <div className="flex">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="max-w-md w-full">
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Clique e selecione uma imagem</p>
                            </div>
                            <Input
                              accept="image/png, image/jpeg"
                              className="hidden"
                              type="file"
                              multiple
                              onChange={(e) => {
                                field.onChange(e.target.files)
                                const files = Array.from(e.target.files ?? []);
                                const transformFile = files.map((file) => URL.createObjectURL(file));
                                setImagePreview(transformFile)
                              }}
                            />
                          </label>

                        </div>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gax-x-10">
              <div className="flex gap-x-4 max-w-sm overflow-auto text-nowrap">
                {imagePreview && imagePreview.map((image: any, index: number) => (
                  <div className="mb-4 flex flex-col" key={index}>
                    <h1 className="font-semibold">Nova imagem ({index + 1})</h1>
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                      <div className="z-10 absolute top-4 right-2">
                        <Button type="button" onClick={() => onDeletePreviewImage(image, index)} variant="destructive" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <Image
                        alt="Imagem de fundo"
                        src={image}
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col ">
                <h1 className="font-semibold">Imagem existente no outdoor</h1>
                <div className="flex gap-x-4 max-w-sm overflow-auto text-nowrap">
                  {initialData && initialData.image.map((image: any, index: number) => (
                    <div className="mb-4 flex items-center gap-4" key={index}>
                      <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <Image
                          src={image.url}
                          alt="image"
                          width={300}
                          height={300}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="max-w-md w-full">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do produto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="max-w-md w-full">
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o preço do produto"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="max-w-md w-full">
                    <FormLabel>Categoria</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                      <FormDescription> This is your public display name.</FormDescription>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeId"
                render={({ field }) => (
                  <FormItem className="max-w-md w-full">
                    <FormLabel>Tamanho</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Selecione um tamanho" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>{size.value}</SelectItem>
                        ))}
                      </SelectContent>
                      <FormDescription> This is your public display name.</FormDescription>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorId"
                render={({ field }) => (
                  <FormItem className="max-w-md w-full">
                    <FormLabel>Cor</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Selecione um tamanho" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>{color.name}</SelectItem>
                        ))}
                      </SelectContent>
                      <FormDescription> This is your public display name.</FormDescription>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Destacar
                      </FormLabel>
                      <FormDescription>
                        Esse produto vai aparecer em destaques
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Ocultar
                      </FormLabel>
                      <FormDescription>
                        Esse produto não vai aparecer na loja
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">{action}</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProductForm;
