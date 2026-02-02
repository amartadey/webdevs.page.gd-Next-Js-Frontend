import { Social, Testimonials } from "@/components/FrontendWidgets";
import ServiceMenu from "@/components/ServiceMenu";
import { sanitizeHtml } from "@/lib/functions";
import getSinglePost from "@/lib/queries/getSinglePost";
import getSingleServicePage from "@/lib/queries/getSingleServicePage";
import { notFound } from "next/navigation";




const singlePage = async ({params}) => {
    const {slug} = await params

    const [servicePage] = await Promise.all([
        getSingleServicePage(`/${slug}/`),
    ])


    if(servicePage){
    return (
    <>
        <section className="innerpage-hero-area" style={{backgroundImage: `url(${servicePage.featuredImage.node.mediaItemUrl})`}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 offset-lg-1 col-12">
                        <div className="innerpage-hero-content" >
                            <h2 className="title">{servicePage.title}</h2>
                            <p className="text">This canot be fetched since WP is using Page Template and WPQuery doesnot work with Page Templates</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="iha-menu">
                <div className="container">
                    <ServiceMenu slug={slug}/>
                </div>
            </div>
        </section>
        <section className="page-single-service-area">
            <div className="container">
                <div className="page-single-service">
                    <div dangerouslySetInnerHTML={{__html:sanitizeHtml(servicePage.content)}}></div>
                </div>
            </div>
        </section>
        <Testimonials />
        <Social />
    </>
)} 


        const post = await getSinglePost(slug);
        
        if (post && post.contentTypeName === 'post'){
            const date = new Date(post.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        return (
            
            <>
                <section className="innerpage-hero-area" id={post.id} style={{backgroundImage: `url("${post.featuredImage.node.sourceUrl}")`}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 offset-lg-1 col-12">
                                <div className="innerpage-hero-content">
                                    <h2 className="title">{post.title}</h2>
                                    <p className="text">{post.blog.bannerSubtitle}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="iha-meta">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 offset-lg-1 col-12">
                                    <div className="iha-all-meta">
                                        <div className="iha-meta-box">
                                            <p className="title">PUBLISH DATE</p>
                                            <p className="info">{formattedDate}</p>
                                        </div>
                                        {post.categories.nodes.length>0 && (
                                        <div className="iha-meta-box">
                                            <p className="title">CATEGORIES</p>
                                            {post.categories.nodes.map(item=>(
                                                <p key={item.id} className="info">{item.name}</p>
                                            ))}
                                            
                                        </div>  
                                        )}
                                        
                                        <div className="iha-meta-box">
                                            <p className="title">READ TIME</p>
                                            <p className="info">{post.blog.readTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="single-blog-post-area">
                    <div className="container" dangerouslySetInnerHTML={{__html:sanitizeHtml(post.content)}}></div>
                </section>
                <section className="related-articles-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title">
                                    <p className="intro">MY BLOG</p>
                                    <h2 className="title">Related Articles</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="single-related-article">
                                    <div className="img"><a href="#"><img src="img/single-blog/related-1.png" alt="" /></a></div>
                                    <div className="content">
                                        <p className="date">JANUARY 25, 2019</p>
                                        <h4 className="title">I’m not a PO, I don’t need to know the product that well</h4>
                                        <p className="text">Communication with our Clients and teams is one of the most important responsibilities of a Project Manager as well.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="single-related-article">
                                    <div className="img"><a href="#"><img src="img/single-blog/related-2.png" alt="" /></a></div>
                                    <div className="content">
                                        <p className="date">JANUARY 25, 2019</p>
                                        <h4 className="title">I’m not a PO, I don’t need to know the product that well</h4>
                                        <p className="text">Communication with our Clients and teams is one of the most important responsibilities of a Project Manager as well.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="single-related-article">
                                    <div className="img"><a href="#"><img src="img/single-blog/related-3.png" alt="" /></a></div>
                                    <div className="content">
                                        <p className="date">JANUARY 25, 2019</p>
                                        <h4 className="title">I’m not a PO, I don’t need to know the product that well</h4>
                                        <p className="text">Communication with our Clients and teams is one of the most important responsibilities of a Project Manager as well.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    } 
    else {
        notFound()
    }
};

export default singlePage;