"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/app/hooks/useModal";
import Modal from "../modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createStore } from "@/api/store";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

const storeSchema = z.object({
  name: z
    .string()
    .min(4, "Nome deve ter mais que 4 caracteres")
    .max(10, "Nome deve ter menos que 10 caracteres"),
});

type TStoreSchema = z.infer<typeof storeSchema>;
const StoreModal = () => {
  const { push } = useRouter();

  const form = useForm<TStoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: TStoreSchema) => {
    try {
      const response = await createStore(data);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        description: "Loja criada com sucesso!",
      });
      push(`/${response.id}`);
      storeModal.closeModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error?.response?.data;
        form.setError(errorData.fieldError, {
          message: errorData.message,
        });
      }
    }
  };

  const storeModal = useModal();
  const { toast } = useToast();

  return (
    <Modal
      title="Crie uma loja"
      description="Crie uma loja pra gerenciar produtos e categorias"
      isOpen={storeModal.isOpen}
      onClose={storeModal.closeModal}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end pt-4 gap-3">
            <Button variant="outline" onClick={storeModal.closeModal}>
              Cancelar
            </Button>
            <Button type="submit">Continuar</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default StoreModal;
