import { fetchGraphQL } from "../functions";


const getBlogOptions = async () => {

    const query = `
        query GetBlogOptions {
            amartaGeneralSettings {
                websiteOption{
                blogPageTitle
                blogHeaderImage {
                    node {
                    sourceUrl
                    altText
                    mediaDetails {
                        width
                        height
                    }
                    }
                }
                }
            }
        }
    `

    const response = await fetchGraphQL(query);   
    return response?.data?.amartaGeneralSettings?.websiteOption || null

};

export default getBlogOptions;