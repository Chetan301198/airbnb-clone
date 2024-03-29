import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import RegisterModal from "@/app/components/Modal/RegisterModal";
import ToastProvider from "@/app/providers/ToastProvider";
import LoginModal from "@/app/components/Modal/LoginModal";
import RentModal from "@/app/components/Modal/RentModal";
import SearchModal from "@/app/components/Modal/SearchModal";
import AuthProvider from "./components/AuthProvider";
import { GlobalContextProvider } from "./context";
import Loading from "./components/Loading";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    if (document.readyState !== "complete") {
      return <Loading />;
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <GlobalContextProvider>
            <ToastProvider />
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <SearchModal />
            <Navbar />
            <div className="pb-8 pt-28">{children}</div>
          </GlobalContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
