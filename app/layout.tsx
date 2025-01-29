import "./globals.css";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Traction অভ্যুদয় powered by 𝐎𝐩𝐩𝐨 𝐑𝐞𝐧𝐨𝟏𝟑 𝐒𝐞𝐫𝐢𝐞𝐬 | Robotics Club of BRAC University",
  description: "...",
};

const inter = Inter({ subsets: ["latin"] });
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.className} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
