import '../styles/globals.css';
import type { Metadata } from 'next';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
    title: 'OLIVE YOUNG | Product Scanner',
    description: 'Personalized Beauty Experience',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
            </head>
            <body>
                {children}
                <Chatbot />
            </body>
        </html>
    );
}
