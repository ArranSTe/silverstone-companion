import type { Metadata } from "next"
import ThemeLoader from "./components/ThemeLoader"
import "./globals.css"

export const metadata: Metadata = {
  title: "Silverstone Companion",
  description: "Offline-ready British GP weekend companion",
  manifest: "/manifest.json",
  themeColor: "#07080d",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Silverstone",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeLoader />
        {children}
      </body>
    </html>
  )
}