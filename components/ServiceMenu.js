import getMenuByLocation from "@/lib/queries/getMenuByLocation";
import util from "util";
import Link from "next/link";


const ServiceMenu = async ({ slug }) => {
    const serviceMenuItems = await getMenuByLocation("service-menu");
    return (
        <ul className="iha-menu-item">
            {serviceMenuItems.menuItems.nodes.map(menuItem => (
                <li key={menuItem.id} className={`${menuItem.path.replace(/\//g, '') === slug ? "active" : ""}`}>
                    <Link href={menuItem.path}>{menuItem.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default ServiceMenu;