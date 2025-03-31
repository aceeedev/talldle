import type { Metadata } from "next";
import "./globals.css";
import { Lexend, Limelight } from 'next/font/google';

const limelight = Limelight({
  subsets: ['latin'],
  weight: '400'
});

const lexend = Lexend({
  subsets: ['latin']
});


export const metadata: Metadata = {
  title: "Talldle",
  description: "Sort famous people from shortest to tallest!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
