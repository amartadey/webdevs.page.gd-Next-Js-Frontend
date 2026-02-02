"use client"
import { useState } from "react";

const BlogSearch = ({ posts, setPosts, setHasNextPage, setEndCursor }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchMode, setSearchMode] = useState('local'); // 'local' or 'server'
    const [loading, setLoading] = useState(false);

    // Instant client-side filtering as user types
    const handleInputChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term === "") {
            setFilteredPosts([]);
            setIsSearching(false);
            setSearchMode('local');
        } else {
            // Filter loaded posts instantly
            const filtered = posts.filter((post) => {
                const titleMatch = post.title.toLowerCase().includes(term);
                const excerptMatch = post.excerpt?.toLowerCase().includes(term);
                return titleMatch || excerptMatch;
            });
            setFilteredPosts(filtered);
            setIsSearching(true);
            setSearchMode('local');
        }
    };

    // Server-side comprehensive search on submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;

        setLoading(true);
        setSearchMode('server');

        try {
            const response = await fetch(`/api/blog/search?q=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();

            if (data.nodes) {
                // Update main posts display with search results
                setPosts(data.nodes);
                setFilteredPosts(data.nodes);
                setHasNextPage(data.pageInfo.hasNextPage);
                setEndCursor(data.pageInfo.endCursor);
                setIsSearching(true);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Clear search and reset to original posts
    const clearSearch = () => {
        setSearchTerm("");
        setFilteredPosts([]);
        setIsSearching(false);
        setSearchMode('local');
        // Note: We don't reset posts here because we'd need to reload from server
        // The user can refresh the page to get back to the original state
    };

    return (
        <div className="sidebar-widget">
            <form onSubmit={handleSubmit}>
                <div className="search-input-box">
                    <input
                        type="text"
                        placeholder="Search here"
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button type="submit" disabled={loading}>
                        <i className={loading ? "fal fa-spinner fa-spin" : "fal fa-search"}></i>
                    </button>
                </div>
            </form>

            {/* Display search results if searching */}
            {isSearching && (
                <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                            {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} found
                            {searchMode === 'local' && (
                                <span style={{ fontSize: '12px', color: '#999', display: 'block' }}>
                                    Press Enter for full search
                                </span>
                            )}
                            {searchMode === 'server' && (
                                <span style={{ fontSize: '12px', color: '#4CAF50', display: 'block' }}>
                                    Searching all posts
                                </span>
                            )}
                        </p>
                        <button
                            onClick={clearSearch}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#666',
                                cursor: 'pointer',
                                fontSize: '12px',
                                textDecoration: 'underline'
                            }}
                        >
                            Clear
                        </button>
                    </div>

                    {filteredPosts.length > 0 && (
                        <div className="sw-news-box search-result" style={{ marginTop: '10px' }}>
                            {filteredPosts.slice(0, 5).map((post) => (
                                <div key={post.id} style={{ marginBottom: '15px' }}>
                                    <a href={`/${post.slug}`} className="title" style={{ fontSize: '14px' }}>
                                        {post.title}
                                    </a>
                                </div>
                            ))}
                            {filteredPosts.length > 5 && (
                                <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
                                    + {filteredPosts.length - 5} more results (scroll down to see all)
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlogSearch;