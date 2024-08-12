"use client"
import { Providers } from '@/app/Provider'
import Header from './Header'

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Providers>
            <Header />
            {children}
        </Providers>
    )
}

export default RootLayout
