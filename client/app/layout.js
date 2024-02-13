'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContext, AppProvider } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <AppProvider>
        {children}
    </AppProvider>
  );
}
