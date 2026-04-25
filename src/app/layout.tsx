import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MOE Corporate Portal',
  description: 'Ministry of Education corporate website prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Navigation />
        <main id="main-content">{children}</main>
        <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Ministry of Education, Singapore</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
