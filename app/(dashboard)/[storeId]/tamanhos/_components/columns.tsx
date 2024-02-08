"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { SizeColumn } from "@/app/types/Store";

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "value",
    header: "Valor",
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
