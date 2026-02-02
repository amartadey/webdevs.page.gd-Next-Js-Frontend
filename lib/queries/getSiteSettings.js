import { fetchGraphQL } from "../functions";

const getSiteSettings = async() => {

    const query = `
    query GetSiteSettings {
        generalSettings {
            title
            description
            url
            language
            timezone
            dateFormat
            timeFormat
            startOfWeek
            siteIcon
        }
        themes {
            nodes {
            author
            }
        }
        siteLogo {
            altText
            height
            url
            width
        }
        }
    `;

    const response = await fetchGraphQL(query)

    if(!response?.data){
        return null;
    }

    return response.data;
};

export default getSiteSettings;