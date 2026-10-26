import { Toaster } from "@/components/ui/toaster";
import { Montserrat, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

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
    <html
      lang="en"
      className={`${nunito.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
