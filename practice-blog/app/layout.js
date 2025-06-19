import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './component/Header'
import Footer from './component/Footer';
import { BrowserRouter } from "react-router-dom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const MainPage={
  display: "flex",
  flexDirection: "column",
  height: "100vh",
}

export const metadata = {
  title: "Practice Blog",
  description: "Practice Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${MainPage}`}>
          <Header/>
          {children}
          <Footer />
      </body>
    </html>
  );
}
