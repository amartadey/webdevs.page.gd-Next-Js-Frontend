import { fetchGraphQL } from "../functions";

const getSingleServicePage = async (slug) => {

    const query =`
        query GetServicePage($slug: ID!) {
            page(id: $slug, idType: URI) {
                title
                content
                contentTypeName
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
            }
            }
    `

    const response = await fetchGraphQL(query, {slug});
    
    return response?.data?.page || null
};

export default getSingleServicePage;