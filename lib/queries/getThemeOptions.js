import { fetchGraphQL } from "../functions";

const getThemeOptions = async () => {

    const query = `
        query GetThemeOptions {
            amartaGeneralSettings {
                websiteOption {
                testimonials {
                    title
                    subtitle
                    repeater {
                    image {
                        node {
                        altText
                        mediaItemUrl
                        mediaDetails{
                            width
                            height
                        }
                        }
                    }
                    name
                    location
                    comment
                    }
                }
                socialMedia {
                    subtitle
                    title
                    allSocials {
                    link
                    name
                    subtite
                    iconClass
                    }
                }
                footerText
                blogHeaderImage {
                    node {
                    altText
                    mediaItemUrl
                    mediaDetails{
                        width
                        height
                    }
                    }
                }
                blogPageTitle
                }
            }
            }
    `

    const response = await fetchGraphQL(query);
    if (!response?.data?.amartaGeneralSettings?.websiteOption){
        return null;
    }

    return response.data.amartaGeneralSettings.websiteOption
};

export default getThemeOptions;