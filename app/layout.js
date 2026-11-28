import "./globals.css";
import "./lux.css";

import { CartProvider } from "@/context/CartContext";
import PwaSetup from "@/components/PwaSetup";
import { SiteDataProvider } from "@/components/SiteDataProvider";
import { getPublicSiteData } from "@/lib/siteData";
import { telHref } from "@/lib/siteDefaults";

const SITE_URL = "https://www.komlaskitchen.com";

// Pages are rebuilt instantly when the CMS saves; this is only a safety net.
export const revalidate = 3600;

export const viewport = {
  themeColor: "#123f27",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Komla's Kitchen | Authentic African Food Delivery in Chicago",
  description:
    "Enjoy authentic African cuisine delivered fresh in Chicago. Discover flavorful dishes made with love at Komla's Kitchen. Order online or call +1 (312) 554-5481.",
  keywords:
    "African food delivery Chicago, jollof rice Chicago, West African cuisine, authentic African restaurant Chicago, Komla's Kitchen",
  openGraph: {
    title: "Komla's Kitchen | Authentic African Food Delivery in Chicago",
    description:
      "Enjoy authentic African cuisine delivered fresh in Chicago. Discover flavorful dishes made with love at Komla's Kitchen.",
    type: "website",
    locale: "en_US",
    siteName: "Komla's Kitchen",
    images: [
      {
        url: "/pictures/jollof_main_dish.jpeg",
        width: 1200,
        height: 630,
        alt: "Komla's Kitchen - Authentic African Food Delivery in Chicago",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Komla's Kitchen | Authentic African Food Delivery in Chicago",
    description:
      "Enjoy authentic African cuisine delivered fresh in Chicago. Discover flavorful dishes made with love at Komla's Kitchen.",
    images: ["/pictures/jollof_main_dish.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    title: "Komla's",
    statusBarStyle: "black-translucent",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }) {
  const site = await getPublicSiteData();
  const { settings } = site;
  const phones = [settings.phonePrimary, settings.phoneSecondary].filter(Boolean).map((p) => telHref(p).replace("tel:", ""));
  return (
    <html lang="en">
      <head>
        {/* Nunito — one rounded sans-serif family for the whole site */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400..900;1,400..800&display=swap"
          rel="stylesheet"
        />
        {/* Served as static files so relative ../fonts/ paths resolve correctly */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/font-awesome.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: settings.name,
              description:
                "Authentic African cuisine delivered fresh in Chicago. Traditional recipes made with quality ingredients and love.",
              url: SITE_URL,
              telephone: phones,
              address: {
                "@type": "PostalAddress",
                streetAddress: settings.address.split(",")[0],
                addressLocality: "Chicago",
                addressRegion: "IL",
                postalCode: settings.postalCode,
                addressCountry: "US",
              },
              servesCuisine: ["African", "West African", "Ghanaian"],
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "11:00",
                  closes: "21:00",
                },
              ],
              image: "/pictures/jollof_main_dish.jpeg",
              hasMenu: `${SITE_URL}/food-menu`,
            }),
          }}
        />
      </head>
      <body>
        <PwaSetup />
        <SiteDataProvider value={site}>
          <CartProvider>{children}</CartProvider>
        </SiteDataProvider>
      </body>
    </html>
  );
}
