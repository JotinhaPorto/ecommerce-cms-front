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
import { Size, SizeFormValues } from "@/app/types/Store";
import { ColorFormSchema, SizeFormSchema } from "@/app/validation/Store";
import { Heading } from "@/components/heading";
import { Trash } from "lucide-react";
import { parseCookies } from "nookies";
import {
  createColor,
  createSize,
  deleteColor,
  deleteSize,
  updateColor,
  updateSize,
} from "@/api/store";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AlertModal } from "@/components/modal/alert-modal";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

type SizeFormProps = {
  initialData: Size | null;
};

const SizeForm = ({ initialData }: SizeFormProps) => {
  const [open, setOpen] = useState(false);

  const title = initialData ? "Atualizar tamanho" : "Criar tamanho";
  const description = initialData
    ? "Atualize a tamanho"
    : "Crie uma nova tamanho";
  const toastMessage = initialData
    ? "Tamanho atualizado com sucesso!"
    : "Tamanho criado com sucesso!";
  const action = initialData ? "Atualizar" : "Criar";

  const params = useParams();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SizeFormSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      if (initialData) {
        await updateSize(
          data,
          params.storeId as string,
          params.tamanhosId as string
        );
      } else {
        await createSize(data, params.storeId as string);
      }
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: toastMessage,
      });
      router.refresh();
      router.push(`/${params.storeId}/tamanhos`);
    } catch (error) {
      console.log(error);
    }
  };
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await deleteSize(params.storeId as string, params.tamanhosId as string);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "Tamanho deletado com sucesso!",
      });
      router.refresh();
      router.push(`/${params.storeId}/tamanhos`);
    } catch (error) {
      console.log(error);
    }
  };

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
            className="space-y-8 pt-3"
          >
            <div className="flex gap-x-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="max-w-md w-full">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do tamanho"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="max-w-md w-full">
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o valor do tamanho"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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

export default SizeForm;
