import Link from "next/link";
import { normalizeUrl } from "@/lib/functions";
import Image from "next/image";
import config from "@/lib/config";


const Footer = async ({menuData, customLogo}) => {

    
    
    return (
         <footer>
            <div className="container">
                <div className="footer-top-area">
                    <div className="row">
                        <div className="col-lg-4 col-sm-3 col-12">
                            <div className="f-logo">
                                <a href={config.siteUrl} className="link">
                                    <Image src={customLogo.url} width={customLogo.width} height={customLogo.height} alt={customLogo.altText} />

                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-5 col-12">
                            <div className="f-title">
                                <h2 className="title">Let’s Talk?</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-12">
                            <div className="f-chat">
                                <a href="#" className="link btn-style-1">LET’S CHAT</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom-area">
                    <div className="footer-links">
                        <ul className="links">
                            {menuData.menuItems.nodes.map(item=>(
                                <li key={item.id}>
                                    <Link href={normalizeUrl(item.path)}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-copyright">
                        <p className="copyright">© {new Date().getFullYear()} {config.siteName} | All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;