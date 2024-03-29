import React from "react";
import { MoreHorizontal, Copy, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn } from "@/app/types/Store";
import { deleteBillboard } from "@/api/store";
import { AxiosError } from "axios";
type CellActionProps = {
  data: BillboardColumn;
};

const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      title: "ID copiado!",
      description: "O ID foi copiado para a área de transferência.",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBillboard(params.storeId as string, id as string);
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "Outdoor deletado!",
        description: "O outdoor foi deletado com sucesso.",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
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
  const handleUpdate = (id: string) => {
    router.push(`/${params.storeId}/outdoors/${id}`);
  };

  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleCopy(data.id)}>
          <Copy className="mr-4 h-4 w-4" />
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdate(data.id)}>
          <Pencil className="mr-4 h-4 w-4" />
          Modificar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(data.id)}>
          <Trash className="mr-4 h-4 w-4" />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
