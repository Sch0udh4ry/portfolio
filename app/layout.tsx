import "./globals.css";

export const metadata = {
  title: "Pure Reach Innovation",
  description: "Scaling E-commerce Brands with AI & Performance Marketing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}