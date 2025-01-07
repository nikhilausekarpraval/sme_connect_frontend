import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import localFont from "next/font/local";
import BootstrapClient from "./Components/BootstrapClient";
import { AppWrapper } from "./Context/AppContext";
import "./globals.css";
import { CustomNavbar } from "./Components/TopNavBar/CustomNavbar";
import { LeftMenubar } from "./Components/LeftMenuBar/LeftMenubar";


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "SME Connect",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased ${roboto.variable}`}
      >
        {/* <AppRouterCacheProvider options={{ enableCssLayer: true, key: 'css' }}> */}
        {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
        <AppWrapper>
          <div className="min-h-screen">
            <CustomNavbar />
            <div className="flex  h-[calc(100vh-var(--top-menu-height))] transition-all duration-50">
              <div className="">
                <LeftMenubar />
              </div>
              {/* flex-1 flex */}
              <div className="w-100 overflow-hidden">
                {children}
              </div>
            </div>
          </div>
        </AppWrapper>
        {/* </ThemeProvider> */}
        {/* </AppRouterCacheProvider> */}
        <BootstrapClient />
      </body>
    </html>
  );
}
