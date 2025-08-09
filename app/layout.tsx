import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Apple-inspired font stack
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

// Separate viewport export to fix Next.js warnings
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6366f1"
}

export const metadata: Metadata = {
  title: "GAMAKAY Cards - Portal to Escape Your Gaming Shackles | Premium Digital Gift Cards",
  description: "Unlock unlimited gaming with GAMAKAY's premium digital gift cards. Instant delivery, maximum security, and unbeatable prices for Steam, PlayStation, Xbox, Nintendo & more. Start your gaming journey today!",
  keywords: "gaming gift cards, digital gift cards, Steam cards, PlayStation cards, Xbox cards, Nintendo cards, instant delivery, gaming platform, esports, video games",
  authors: [{ name: "GAMAKAY Cards" }],
  creator: "GAMAKAY Cards",
  publisher: "GAMAKAY Cards",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gamakay.com",
    siteName: "GAMAKAY Cards",
    title: "GAMAKAY Cards - Portal to Escape Your Gaming Shackles",
    description: "Unlock unlimited gaming with GAMAKAY's premium digital gift cards. Instant delivery, maximum security, and unbeatable prices.",
    images: [
      {
        url: "/images/gamakay-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GAMAKAY Cards - Premium Digital Gaming Gift Cards"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GAMAKAY Cards - Portal to Escape Your Gaming Shackles",
    description: "Unlock unlimited gaming with premium digital gift cards. Instant delivery, maximum security.",
    images: ["/images/gamakay-og-image.jpg"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    apple: "/apple-touch-icon.png"
  },
  manifest: "/manifest.json",
  other: {
    "color-scheme": "dark light"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={`${inter.className} antialiased smooth-scroll`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
