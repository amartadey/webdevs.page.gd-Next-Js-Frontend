"use client";

import { useState } from "react";
import AllBlogs from "./AllBlogs";
import BlogSearch from "./BlogSearch";
import Image from "next/image";
import Link from "next/link";

const BlogContainer = ({ initialPosts, pageInfo, latestPosts }) => {
    const [posts, setPosts] = useState(initialPosts);
    const [hasNextPage, setHasNextPage] = useState(pageInfo.hasNextPage);
    const [endCursor, setEndCursor] = useState(pageInfo.endCursor);

    return (
        <>
            <div className="col-lg-8 col-12">
                <div className="page-all-blog">
                    <AllBlogs
                        posts={posts}
                        setPosts={setPosts}
                        hasNextPage={hasNextPage}
                        setHasNextPage={setHasNextPage}
                        endCursor={endCursor}
                        setEndCursor={setEndCursor}
                    />
                </div>
            </div>
            <div className="col-lg-4 offset-lg-0 col-sm-8 offset-sm-2 col-12">
                <div className="sidebar">
                    <BlogSearch
                        posts={posts}
                        setPosts={setPosts}
                        setHasNextPage={setHasNextPage}
                        setEndCursor={setEndCursor}
                    />

                    <div className="sw-news sidebar-widget">
                        <div className="sw-news-tab-content tab-content" id="newsTabContent">
                            <div className="tab-pane fade show active" id="trending" role="tabpanel" aria-labelledby="trending-tab">
                                {latestPosts.map(post => (
                                    <div key={post.id} className="sw-news-box">
                                        <div className="img">
                                            <Image src={post.featuredImage.node.sourceUrl} width={post.featuredImage.node.mediaDetails.width} height={post.featuredImage.node.mediaDetails.height} alt={post.featuredImage.node.altText} />
                                        </div>
                                        <div className="content">
                                            <span className="date">
                                                {new Date(post.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "2-digit"
                                                })}
                                            </span>

                                            <Link href={post.slug} className="title">{post.title}</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogContainer;
