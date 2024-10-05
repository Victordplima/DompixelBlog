import { MantineProvider } from '@mantine/core';
import { Roboto } from '@next/font/google';
import './globals.css';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: 'DomPixelBlog',
    description: 'Blog para DomPixel',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="pt-BR">
            <head>
            </head>
            <body>
                <MantineProvider theme={{ fontFamily: roboto.style.fontFamily }}>
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
