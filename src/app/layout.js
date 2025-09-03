import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Dhruv Sharma | Software Engineer/Dev",
//   description: "Portfolio and projects of Dhruv Sharma, software engineer and developer.",
//   keywords: ["Dhruv Sharma", "portfolio", "software engineer", "developer", "projects", "frontend", "react", "nextjs"],
//   openGraph: {
//     title: "Dhruv Sharma | Software Engineer/Dev",
//     description: "Portfolio and projects of Dhruv Sharma, software engineer and developer.",
//     url: "https://thedhruv.dev",
//     siteName: "Dhruv Sharma",
//     locale: "en_US",
//     type: "website",
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
