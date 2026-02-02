import { sanitizeHtml } from "@/lib/functions";
import getPortfolioPage from "@/lib/queries/getPortfolioPage";
import Image from "next/image"
import Link from "next/link"
import { Social, Testimonials } from "@/components/FrontendWidgets";

export const dynamic = 'force-dynamic';

const portfolioPage = async () => {
    const pageData = await getPortfolioPage()


    return (
        <>
            <section className="iha-contact innerpage-hero-area" id="_iha" style={{ background: `url(${pageData.featuredImage.node.mediaItemUrl})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="innerpage-hero-content">
                                <h2 className="title">{pageData.worksPage.header.pageTitle}</h2>
                                <p className="text">{pageData.worksPage.header.pageSubtitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="scroll-icon">
                        <div className="container">
                            <div className="scroll-icon-box">
                                <a href="#_iha" className="up smoothscroll"><img src="img/contact/scroll-up.png" alt="" /></a>
                                <span className="box"><img src="img/contact/scroll-box.png" alt="" /></span>
                                <span className="inner"><img src="img/contact/scroll-inner.png" alt="" /></span>
                                <a href="#_cfa" className="down smoothscroll"><img src="img/contact/scroll-down.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="client-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12" id="sticky">
                            <div className="client-area-left-side">
                                <div className="section-title">

                                    <p className="intro" dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.worksPage.allWorks.subtitle) }}></p>
                                    <h2 className="title" dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.worksPage.allWorks.title) }}></h2>
                                </div>
                                <ul className="nav nav-tabs" id="clientTab" role="tablist">
                                    {pageData.worksPage.allWorks.repeater.map((item, index) => (
                                        <li key={item.idForTab} className="nav-item">
                                            <a className={`nav-link${index === 0 ? " active" : ""}`} id={`${item.idForTab}-id`} href={`#${item.idForTab}`} aria-selected={index === 0 ? "true" : "false"}>{item.name}<span className="icon"><i className="fas fa-caret-right"></i></span></a>
                                        </li>
                                    ))}
                                    {/* <li className="nav-item">
                                        <a className="nav-link active" id="web-design-id" href="#web-design" aria-selected="true">Web Design<span className="icon"><i className="fas fa-caret-right"></i></span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="graphic-design-id" href="#graphic-design" aria-selected="false">Graphic Design<span className="icon"><i className="fas fa-caret-right"></i></span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="branding-id" href="#branding" aria-selected="false">Branding<span className="icon"><i className="fas fa-caret-right"></i></span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="ui-ux-id" href="#ui-ux" aria-selected="false">UI/UX Design<span className="icon"><i className="fas fa-caret-right"></i></span></a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="client-area-right-side">
                                <div className="tab-content" id="clientTabContent">

                                    {pageData.worksPage.allWorks.repeater.map((item, index) => (
                                        <div key={item.idForTab} id={item.idForTab} className={`"scroll-box ${index == 0 ? " show active" : ""}"`}>
                                            <div className="row">
                                                <div className="col-lg-12 col-sm-12 col-12">
                                                    <div className="section-title">
                                                        <h2 className="title"><em >{item.name}</em> portfolio</h2>
                                                        <p>Click on the image to open the full design or click the button - <strong>VIEW WEBSITE</strong> to go to the website.</p>
                                                    </div>
                                                    <div className="row no-gutters" id="container">
                                                        {item.images.nodes.map((imgs, index) => {
                                                            const thumbnail = imgs.mediaDetails.sizes.find(size => size.name === 'thumbnail');
                                                            return (
                                                                <div key={imgs.altText + index} className="col-lg-6 col-sm-6" data-category="post-transition">
                                                                    <div className="h2-single-project">
                                                                        <div className="img">

                                                                            <Image src={thumbnail.sourceUrl} width={thumbnail.width} height={thumbnail.height} alt={imgs.altText} />
                                                                        </div>
                                                                        <a href={imgs.mediaItemUrl} className="link test-popup-link" target="_blank"><span className="button"><i className="fas fa-mouse-pointer"></i></span></a>
                                                                        <div className="portfolio-details">
                                                                            <h5>{imgs.title}</h5>
                                                                            <p>Modern online store design</p>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="h2-about-content">
                                                        <p className="text"></p>
                                                    </div>
                                                    <div className="wgh">
                                                        <p>View More in Web Graphics Hub</p>

                                                        <Link href={item.portfolioLinkInWebGraphicsHub} className="link btn-style-1" target="_blank">Click Here</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div id="stop"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />
            <Social />

        </>
    );
};

export default portfolioPage;