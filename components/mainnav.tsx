"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'


const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Visão geral',
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/outdoors`,
            label: 'Outdoor',
            active: pathname === `/${params.storeId}/outdoors`,
        },
        {
            href: `/${params.storeId}/categorias`,
            label: 'Categorias',
            active: pathname === `/${params.storeId}/categorias`,
        },
        {
            href: `/${params.storeId}/tamanhos`,
            label: 'Tamanhos',
            active: pathname === `/${params.storeId}/tamanhos`,
        },
        {
            href: `/${params.storeId}/cores`,
            label: 'Cores',
            active: pathname === `/${params.storeId}/cores`,
        },
        {
            href: `/${params.storeId}/produtos`,
            label: 'Produtos',
            active: pathname === `/${params.storeId}/produtos`,
        },
        {
            href: `/${params.storeId}/pedidos`,
            label: 'Pedidos',
            active: pathname === `/${params.storeId}/pedidos`,
        },
        {
            href: `/${params.storeId}/configuracoes`,
            label: 'Configurações',
            active: pathname === `/${params.storeId}/configuracoes`,
        },
    ]


    return (
        <nav
            className={cn("hidden md:flex items-center gap-x-4", className)}
            {...props}
        >
            {routes.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary line-clamp-1',
                        item.active ? 'text-black' : 'text-muted-foreground'
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav