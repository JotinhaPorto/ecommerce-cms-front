"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SideBarMain = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Visão geral",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/outdoors`,
      label: "Outdoor",
      active: pathname === `/${params.storeId}/outdoors`,
    },
    {
      href: `/${params.storeId}/categorias`,
      label: "Categorias",
      active: pathname === `/${params.storeId}/categorias`,
    },
    {
      href: `/${params.storeId}/tamanhos`,
      label: "Tamanhos",
      active: pathname === `/${params.storeId}/tamanhos`,
    },
    {
      href: `/${params.storeId}/cores`,
      label: "Cores",
      active: pathname === `/${params.storeId}/cores`,
    },
    {
      href: `/${params.storeId}/produtos`,
      label: "Produtos",
      active: pathname === `/${params.storeId}/produtos`,
    },
    {
      href: `/${params.storeId}/pedidos`,
      label: "Pedidos",
      active: pathname === `/${params.storeId}/pedidos`,
    },
    {
      href: `/${params.storeId}/configuracoes`,
      label: "Configurações",
      active: pathname === `/${params.storeId}/configuracoes`,
    },
  ];


  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          type="button"
          className={cn(
            "flex items-center gap-x-2 text-muted-foreground text-sm font-[500] pl-6 transition-all",
            route.active && "text-black"
          )}
        >
          <div className="flex items-center gap-x-2 py-4">
            {/* <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-700")}
          /> */}
            {route.label}
          </div>
          <div
            className={cn(
              "ml-auto opacity-0 border-2 border-black h-full transition-all",
              route.active && "opacity-100"
            )}
          />
        </Link>
      ))}
    </div>
  );
};

export default SideBarMain;
