"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { CategoryColumn } from "@/app/types/Store";

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "billboard",
    header: "Outdoor",
    cell: ({ row }) => row.original.billboard.label,
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
