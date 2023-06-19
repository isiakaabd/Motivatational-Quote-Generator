import "./globals.css";

export const metadata = {
  title: "Random Joke Generator",
  description: "Rabdom Joke Generator",
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
