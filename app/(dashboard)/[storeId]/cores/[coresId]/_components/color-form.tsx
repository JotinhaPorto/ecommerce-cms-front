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
import { Color, ColorFormValues } from "@/app/types/Store";
import { ColorFormSchema } from "@/app/validation/Store";
import { Heading } from "@/components/heading";
import { Trash } from "lucide-react";
import { parseCookies } from "nookies";
import { createColor, deleteColor, updateColor } from "@/api/store";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AlertModal } from "@/components/modal/alert-modal";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

type ColorFormProps = {
  initialData: Color | null;
};

const ColorForm = ({ initialData }: ColorFormProps) => {
  const [open, setOpen] = useState(false);

  const title = initialData ? "Atualizar cor" : "Criar cor";
  const description = initialData ? "Atualize a cor" : "Crie uma nova cor";
  const toastMessage = initialData
    ? "Cor atualizada com sucesso!"
    : "Cor criada com sucesso!";
  const action = initialData ? "Atualizar" : "Criar";

  const params = useParams();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ColorFormSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      if (initialData) {
        await updateColor(
          data,
          params.storeId as string,
          params.coresId as string
        );
      } else {
        await createColor(data, params.storeId as string);
      }
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: toastMessage,
      });
      router.refresh();
      router.push(`/${params.storeId}/cores`);
    } catch (error) {
      console.log(error);
    }
  };

  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await deleteColor(params.storeId as string, params.coresId as string);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "Cor deletada com sucesso!",
      });
      router.refresh();
      router.push(`/${params.storeId}/cores`);
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
                      <Input placeholder="Digite o nome da cor" {...field} />
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
                      <div className="flex gap-x-3">
                        <Input
                          placeholder="Digite o valor da cor (hexadecimal)"
                          {...field}
                        />
                        <div
                          className="border p-4 rounded-full"
                          style={{ backgroundColor: field.value }}
                        ></div>
                      </div>
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

export default ColorForm;
