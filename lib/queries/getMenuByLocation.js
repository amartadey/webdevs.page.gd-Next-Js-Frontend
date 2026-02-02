import { fetchGraphQL } from "../functions";


const getMenuByLocation = async (location) => {

    const query =`
        query GetMenu {
            menu(id: "${location}", idType: LOCATION) {
                id
                name
                menuItems(first: 100, where: { parentId: 0 }) {
                nodes {
                    id
                    label
                    url
                    path
                    cssClasses
                    childItems(first: 100) {
                    nodes {
                        id
                        label
                        url
                        path
                    }
                    }
                }
                }
            }
        }
    `

    const response = await fetchGraphQL(query)
    if(!response?.data?.menu){
        return null
    }
    
    return response.data.menu;
};

export default getMenuByLocation;