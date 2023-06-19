import "./globals.css";
export const metadata = {
  title: "Inspirational Quote Generator",
  description: "Inspirational Quote Generator",
  openGraph: {
    title: "Inspirational Quote Generator",
    description: "Inspirational Quote Generator Created by Isiaka Abdulahi",
  },
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
