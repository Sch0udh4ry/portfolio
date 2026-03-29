import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}