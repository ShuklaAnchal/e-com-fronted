import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import ClientWrapper from "./ClientWrapper"; // new wra

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata = {
  title: "Siyaas | Handcrafted Soy Candles & Luxury Scents",
  description:
    "Experience the art of scented light with Siyaas. Handcrafted soy candles, diffusers, and luxury wooden crafts for every mood.",
  icons: {
    icon: [
      {
        url: "/siyaas.png",
        type: "image/png",
      },
    ],
    shortcut: "/siyaas.png",
    apple: "/siyaas.png",
  },
};

// export const metadata = {
//   title: "React",
//   description: "Experience the art of scented light with Siyaas. Handcrafted soy candles, diffusers, and luxury wooden crafts for every mood.",
// };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning={true}
        className="min-h-full flex flex-col bg-[#FAF7F2] text-[#2C2C2C] font-sans"
      >
        {" "}
        <ReduxProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
