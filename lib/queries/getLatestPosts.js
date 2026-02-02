import { fetchGraphQL } from "../functions";

const getLatestPosts = async (limit = 4) => {

    const query = `
    query GetRecentPosts($limit: Int!) {
            posts(first: $limit, where: {orderby: {field: DATE, order: DESC}}) {
                nodes {
                id
                title
                slug
                date
                featuredImage {
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

    const response = await fetchGraphQL(query,{limit})
    return response?.data?.posts?.nodes || []
};

export default getLatestPosts;