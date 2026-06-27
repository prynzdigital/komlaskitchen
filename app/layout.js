import "./globals.css";
import 'rc-slider/assets/index.css';

import Preloader from "@/layouts/Preloader";

export const metadata = {
  metadataBase: new URL("https://komlas-kitchen.com"),
  title: "Komla's Kitchen | Authentic African Food Delivery in Chicago",
  description:
    "Enjoy authentic African cuisine delivered fresh in Chicago. Discover flavorful dishes made with love at Komla's Kitchen. Order online or call 312-287-8155.",
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
      { url: "/icon.png", sizes: "any", type: "image/png" },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  alternates: {
    canonical: "https://komlas-kitchen.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Served as static files so relative ../fonts/ paths resolve correctly */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/font-awesome.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/meanmenu.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Komla's Kitchen",
              description:
                "Authentic African cuisine delivered fresh in Chicago. Traditional recipes made with quality ingredients and love.",
              url: "https://komlas-kitchen.com",
              telephone: "+13122878155",
              address: {
                "@type": "PostalAddress",
                streetAddress: "3718 S Indiana Ave",
                addressLocality: "Chicago",
                addressRegion: "IL",
                postalCode: "60653",
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
              hasMenu: "https://komlas-kitchen.com/food-menu",
            }),
          }}
        />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
