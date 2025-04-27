import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/providersContext";
import { ToastContainer } from "react-toastify";
// import { useCallback, useEffect } from "react";
// import { saveToSecureStore, secureKeys } from "@/utils/secure-store";
// import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRMTI Research",
  description: "Research project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const route = usePathname()
  // const saveRoute = useCallback(async()=>{
  //   await saveToSecureStore(secureKeys.currentRoute, route)
  // }, [route])

  // useEffect(() => {
  //   saveRoute();
  // }, [saveRoute])
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
          <ToastContainer />
          </Providers>
      </body>
    </html>
  );
}
