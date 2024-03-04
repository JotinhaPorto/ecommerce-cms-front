"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BillboardFormValues } from "@/app/types/Store";
import { BillboardCreateFormSchema, BillboardUpdateFormSchema } from "@/app/validation/Store";
import { Heading } from "@/components/heading";
import { MoveRight, Trash } from "lucide-react";
import {

  createBillboard,
  createImageS3,
  deleteBillboard,
  updateBillboard,

} from "@/api/store";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AlertModal } from "@/components/modal/alert-modal";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { AxiosError } from "axios";

type BilboardFormProps = {
  initialData: any | null;
};


const OutdoorForm = ({ initialData }: BilboardFormProps) => {

  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const title = initialData ? "Atualizar outdoor" : "Criar outdoor";
  const description = initialData
    ? "Atualize o outdoor"
    : "Crie um novo outdoor";
  const toastMessage = initialData
    ? "Outdoor atualizado com sucesso!"
    : "Outdoor criado com sucesso!";
  const action = initialData ? "Atualizar" : "Criar";

  const params = useParams();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(BillboardCreateFormSchema || BillboardUpdateFormSchema),
    defaultValues: initialData || {
      label: "",
      image: [],
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data)
    let uploadedImage;
    if (data.image && data.image instanceof FileList) {
      const dataFormatted = new FormData()
      dataFormatted.append('image', data.image[0])
      uploadedImage = await createImageS3(dataFormatted)
    }
    try {
      if (initialData) {
        await updateBillboard(
          { ...data, label: data.label, image: uploadedImage ? uploadedImage : data.image[0] },
          params.storeId as string,
          params.outdoorId as string
        );
      } else {
        await createBillboard({ ...data, label: data.label, image: uploadedImage }, params.storeId as string);
      }
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: toastMessage,
      });
      router.refresh();
      router.push(`/${params.storeId}/outdoors`);
    } catch (error) {
      console.log(error);
    }
  };
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await deleteBillboard(params.storeId as string, params.outdoorId as string);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "Outdoor deletado com sucesso!",
      });
      router.refresh();
      router.push(`/${params.storeId}/outdoors`);
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

  const watchImage = form.watch("image");

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
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pt-3 pb-2"
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="max-w-sm">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input  {...field} placeholder="Digite o nome do Outdoor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="max-w-sm">
                    <FormLabel>{initialData ? "Alterar imagem de fundo" : "Imagem de fundo"}</FormLabel>
                    <FormControl>
                      <Input
                        accept="image/png, image/jpeg"
                        type="file"
                        multiple
                        disabled={imagePreview ? true : false}
                        onChange={(e) => {
                          field.onChange(e.target.files ?? [])
                          console.log(e.target.files)
                          if (e.target.files![0]) {
                            const fileToUrl = URL.createObjectURL(e.target.files![0])
                            setImagePreview(fileToUrl)
                          }

                        }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gax-x-10">
              {imagePreview && (
                <div className="mb-4 flex flex-col  " >
                  <h1 className="font-semibold">Nova imagem</h1>
                  <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <div className="z-10 absolute top-4 right-2">
                      <Button type="button" onClick={() => setImagePreview(null)} variant="destructive" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <Image
                      alt="Imagem de fundo"
                      src={imagePreview}
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
              )}
              {initialData && (
                <div>
                  <h1 className="font-semibold">Imagem existente no outdoor</h1>
                  <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <Image
                      alt="Imagem existente no outdoor"
                      src={initialData?.image[0].url}
                      width={200}
                      height={200}
                    />
                  </div>

                </div>
              )}
            </div>
            <Button type="submit"> {action}</Button>
          </form >
        </Form >
      </div >
    </>
  );
};

export default OutdoorForm;
