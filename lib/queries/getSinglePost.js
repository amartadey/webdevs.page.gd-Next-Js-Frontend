import { fetchGraphQL } from "../functions";


const getSinglePost = async (slug) => {

    const query = `
    query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            title
            slug
            date
            categories {
            nodes {
                id
                name
                slug
            }
            }
            excerpt
            contentTypeName
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
            blog {
            bannerSubtitle
            readTime
            }
            content
            
        }
        }
    `

    const response = await fetchGraphQL(query, {slug})
    
    return response?.data?.post || null
};

export default getSinglePost;