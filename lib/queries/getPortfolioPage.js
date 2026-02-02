import { fetchGraphQL } from "../functions";


const getPortfolioPage = async () => {
    const query = `
        query GetPortfolioPage {
            page(id: "/portfolio/", idType: URI) {
                title
                featuredImage {
                node {
                    altText
                    mediaItemUrl
                    mediaDetails {
                    width
                    height
                    }
                }
                }
                worksPage {
                header {
                    pageTitle
                    pageSubtitle
                }
                allWorks {
                    subtitle
                    title
                    repeater {
                    idForTab
                    name
                    images {
                        nodes {
                        altText
                        mediaItemUrl
                        thumbnail: sourceUrl(size: THUMBNAIL)
                        title
                        mediaDetails {
                            width
                            height
                            sizes {
                            name
                            sourceUrl
                            width
                            height
                            }
                        }
                        }
                    }
                    portfolioLinkInWebGraphicsHub
                    }
                }
                }
            }
            }
    `

    const response = await fetchGraphQL(query);
    return response?.data?.page || null

};

export default getPortfolioPage;