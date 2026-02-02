import Link from "next/link";
import Image from "next/image";
import {normalizeUrl} from "@/lib/functions";
import config from "@/lib/config";





const Header = async ({menuData, customLogo}) => {


    const menuItems = menuData.menuItems?.nodes || [];
    

    
    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-sm-4 col-5">
                        <div className="logo">
                            <Link href={config.siteUrl} className="link">
                                <Image src={customLogo.url} loading="eager" width={customLogo.width} height={customLogo.height} alt={customLogo.altText} />
                                </Link>
                        </div>
                    </div>
                    <div className="col-lg-8 col-sm-4 col-7">
                        <div className="main-menu stellarnav">
                            <ul>
                                {menuItems.map(item => (
                                    item.url ? (
                                    <li key={item.id}>                                       
                                        <Link href={normalizeUrl(item.path)}>{item.label}</Link>
                                    </li>  ) : ( <li key={item.id} className="has-sub">
                                        <a href="#">{item.label}</a>
                                    <ul>
                                        {item.childItems.nodes.map(subMenuItem=>(
                                            <li key={subMenuItem.id}>
                                                <Link href={normalizeUrl(subMenuItem.path)}>{subMenuItem.label}</Link>
                                            </li>
                                        ))}
                                        
                                    </ul>
                                </li>)

                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-4 col-12 d-none d-sm-block">
                        <div className="lets-chat">
                            <a href="#" className="link btn-style-1">LET’S CHAT</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;