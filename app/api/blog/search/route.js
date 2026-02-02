import { NextResponse } from "next/server";
import { fetchGraphQL } from "@/lib/functions";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query || query.trim() === '') {
            return NextResponse.json({ nodes: [], pageInfo: { hasNextPage: false } });
        }

        const graphqlQuery = `
            query SearchPosts($search: String!) {
                posts(where: { search: $search }, first: 20) {
                    nodes {
                        id
                        title
                        slug
                        excerpt
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
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                }
            }
        `;

        const response = await fetchGraphQL(graphqlQuery, { search: query });

        if (!response || !response.data) {
            throw new Error('WordPress GraphQL query failed');
        }

        return NextResponse.json({
            nodes: response.data?.posts?.nodes || [],
            pageInfo: response.data?.posts?.pageInfo || { hasNextPage: false, endCursor: null }
        });

    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json(
            { error: 'Failed to search posts', nodes: [], pageInfo: { hasNextPage: false } },
            { status: 500 }
        );
    }
}
