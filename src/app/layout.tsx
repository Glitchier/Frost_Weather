import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "FrostWeather",
  description: "A weather web app build with OpenWeather API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
