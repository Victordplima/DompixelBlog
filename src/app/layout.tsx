import { MantineProvider } from '@mantine/core';
import './globals.css';

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
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <MantineProvider theme={{ fontFamily: 'Roboto, sans-serif' }}>
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}

