"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { ProductColumn } from "@/app/types/Store";

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "isFeatured",
    header: "Destaque",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.isFeatured ? "Sim" : "Nao"}
      </div>
    )
  },
  {
    accessorKey: "isAvailable",
    header: "Disponível",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original.isAvailable ? "Sim" : "Nao"}
      </div>
    )
  },
  {
    accessorKey: "price",
    header: "Valor",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "size",
    header: "Tamanho",
  },
  {
    accessorKey: "color",
    header: "Cor",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color }} />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Data",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
