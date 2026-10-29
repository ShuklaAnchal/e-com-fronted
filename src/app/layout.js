import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import ClientWrapper from "./ClientWrapper"; // new wra
import MetaPixel from "./MetaPixel";

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

const META_PIXEL_ID = "25556566083983018";

const metaPixelSnippet = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        {/* Meta Pixel Code */}
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{ __html: metaPixelSnippet }}
        />
        {/* End Meta Pixel Code */}
      </head>
      <body
        suppressHydrationWarning={true}
        className="min-h-full flex flex-col bg-[#FAF7F2] text-[#2C2C2C] font-sans"
      >

        <MetaPixel pixelId={META_PIXEL_ID} />
        <ReduxProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
