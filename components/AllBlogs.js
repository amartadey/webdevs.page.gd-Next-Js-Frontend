"use client";


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sanitizeHtml = (html) => {
    if (!html) return "";
    return html.trim().replace(/\r\n/g, '\n').replace(/\n+/g, '\n')
}

const truncateHtml = (html, maxLength = 150) => {
    const text = html.replace(/<[^>]*>/g, '');
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

const AllBlogs = ({ posts, setPosts, hasNextPage, setHasNextPage, endCursor, setEndCursor }) => {
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/blog/posts?after=${endCursor}`);
            const data = await response.json();
            if (data.nodes) {
                setPosts([...posts, ...data.nodes]);
                setHasNextPage(data.pageInfo.hasNextPage);
                setEndCursor(data.pageInfo.endCursor);
            }
        } catch (error) {
            console.error("Error Loading More Posts: ", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="row justify-content-center">
                {posts.map(post => (
                    <div key={post.id} className="col-lg-6 col-sm-6 col-12">
                        <div className="single-related-article">
                            <div className="img">
                                <Link href={post.slug}>
                                    <Image src={post.featuredImage.node.sourceUrl} width={post.featuredImage.node.mediaDetails.width} height={post.featuredImage.node.mediaDetails.height} alt={post.featuredImage.node.altText} />
                                </Link>
                            </div>
                            <Link href={post.slug} className="content">
                                <p className="date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}</p>
                                <h4 className="title">{post.title}</h4>
                                <div className="text">
                                    <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(truncateHtml(post.excerpt)) }}></p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}

            </div>

            {/* Load More Button  */}
            {hasNextPage && (
                <div className="row">
                    <div className="col-12 text-center" style={{ marginTop: "40px" }}>
                        <button onClick={loadMore} disabled={loading} className="btn btn-style-1">
                            {loading ? "LOADING ... " : "LOAD MORE"}
                        </button>
                    </div>
                </div>
            )}
        </>

    );
};

export default AllBlogs;