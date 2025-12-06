import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Growing Number - Addictive Puzzle Game',
  description: 'Merge tiles to reach the highest number in this addictive puzzle game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
