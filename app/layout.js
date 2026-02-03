
import Script from "next/script";
import he from "he"
import "./globals.css";
import getSiteSettings from "@/lib/queries/getSiteSettings";
import getMenuByLocation from "@/lib/queries/getMenuByLocation";
import "../public/css/bootstrap.min.css";
import "../public/css/jquery-ui.css";
import "../public/css/all.min.css";
import "../public/css/owl.carousel.min.css";
import "../public/css/animate.css";
import "../public/css/stellarnav.min.css";
import "../public/css/magnific-popup.css";
import "../public/fonts/stylesheet.css";
import "../public/css/style.css";
import "../public/css/responsive.css";
import { Playfair_Display } from 'next/font/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from '@vercel/speed-insights/next';





const siteSettings = await getSiteSettings()
const author = siteSettings?.themes?.nodes?.[0].author.replace(/<[^>]*>/g, '')

export const metadata = {
  title: `${siteSettings?.generalSettings?.title} | ${he.decode(
  siteSettings?.generalSettings?.description || ""
)}`,
  description: siteSettings?.generalSettings?.description,
  authors: [author ? { name: author } : { name: "Unknown" }],
  icons: {
    icon: siteSettings?.generalSettings?.siteIcon,
  },
}

const customLogo = siteSettings?.siteLogo || ""

const mainMenu = await getMenuByLocation("main-menu")
const footerMenu = await getMenuByLocation("footer-menu")

const layout = ({children}) => {
 
  return (
    <>
      <html lang="en">
      <head>
          
          {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" /> */}
      </head>
      <body>
        <Header  menuData={mainMenu} customLogo={customLogo}/>
        {children}
        <Footer menuData ={footerMenu} customLogo={customLogo}/>

        <Script src="js/jquery-3.3.1.min.js" />
        <Script src="js/jquery-ui.js" />
        <Script src="js/owl.carousel.min.js" />
        <Script src="js/jquery.counterup.min.js" />
        <Script src="js/countdown.js" />
        <Script src="js/stellarnav.min.js" />
        <Script src="js/imagesloaded.pkgd.min.js" />
        <Script src="js/isotope.pkgd.min.js" />
        <Script src="js/jquery.magnific-popup.min.js" />
        <Script src="js/jquery.scrollUp.js" />
        <Script src="js/jquery.waypoints.min.js" />
        <Script src="js/popper.min.js" />
        <Script src="js/bootstrap.min.js" />
        <Script src="js/theme.js" />
        <SpeedInsights />
      </body>
      </html>
    </>
  );
};

export default layout;