import BlogContainer from "@/components/BlogContainer";
import getBlogOptions from "@/lib/queries/getBlogOptions";
import getBlogPosts from "@/lib/queries/getBlogPosts";
import getLatestPosts from "@/lib/queries/getLatestPosts";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const allBlogsPage = async () => {

    const [blogOptions, blogPosts, latestPost] = await Promise.all([
        getBlogOptions(),
        getBlogPosts(10),
        getLatestPosts(4)
    ])

    const posts = blogPosts?.nodes || []
    const pageInfo = blogPosts?.pageInfo || { hasNextPage: false, endCursor: null }


    return (
        <>
            <section className="innerpage-hero-area" style={{ backgroundImage: `url(${blogOptions.blogHeaderImage.node.sourceUrl})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 offset-lg-1 col-12">
                            <div className="innerpage-hero-content">
                                <h2 className="title">{blogOptions.blogPageTitle}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-blog-area">
                <div className="container">
                    <div className="row">
                        <BlogContainer initialPosts={posts} pageInfo={pageInfo} latestPosts={latestPost} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default allBlogsPage;