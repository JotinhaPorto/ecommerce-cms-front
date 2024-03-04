"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { BillboardColumn } from "@/app/types/Store";

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Nome",
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
