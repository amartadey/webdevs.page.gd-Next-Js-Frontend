import Image from "next/image";
import Link from "next/link";
import getHomePageBySlug from "@/lib/queries/getHomePageBySlug";


import { sanitizeHtml } from "@/lib/functions";
import { Social, Testimonials } from "@/components/FrontendWidgets";

export const dynamic = 'force-dynamic';


export default async function Home() {

    const page = await getHomePageBySlug("home");




    return (
        <>
            <section className="hero-area">
                <div className="hero-element-1"><img src="img/home1/hero-element-1.png" alt="" /></div>
                <div className="hero-element-2"><img src="img/home1/hero-element-2.png" alt="" /></div>
                <div className="hero-element-3"><img src="img/home1/hero-element-3.png" alt="" /></div>
                <div className="hero-element-4"><img src="img/home1/hero-element-4.png" alt="" /></div>
                <div className="hero-banner">
                    <Image src={page.featuredImage.node.mediaItemUrl} width={page.featuredImage.node.mediaDetails.width} height={page.featuredImage.node.mediaDetails.height} alt={page.featuredImage.node.altText} />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-12">
                            <div className="hero-content">
                                <h3 className="intro">{page.homePage.header.headerSubtitle}</h3>
                                <h2 className="title">{page.homePage.header.headerTitle}</h2>
                                <h3 className="desg" dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.homePage.header.headerText) }}></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="h2-about-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12 d-flex align-items-center">
                            <div className="h2-about-content">
                                <div className="section-title">
                                    <p className="intro">{page.homePage.aboutMe.subtitle || ""}</p>
                                    <h2 className="title">{page.homePage.aboutMe.title || ""}</h2>
                                </div>
                                <div className="text" dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.content) }}></div>
                                <Link className="link btn-style-1" href={page.homePage.aboutMe.buttonLink.nodes[0].uri || "/"}>
                                    {page.homePage.aboutMe.buttonText || "MORE"}
                                </Link>

                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="h2-about-banner">
                                <div className="img">

                                    <Image src={page.homePage.aboutMe.image.node.mediaItemUrl} width={page.homePage.aboutMe.image.node.mediaDetails.width} height={page.homePage.aboutMe.image.node.mediaDetails.height} alt={page.homePage.aboutMe.image.node.altText} />
                                    <Link href={page.homePage.aboutMe.youtubeLink} className="popup-youtube btn-ripple-out" ><i className="fas fa-play-circle"></i></Link>
                                    {/* <a className="popup-youtube btn-ripple-out" href="hhttps://www.youtube.com/embed/uWUHkCgslNE"><i className="fas fa-play-circle"></i></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="h2-project-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <p className="intro">{page.homePage.recentWorks.subtitle}</p>
                                <h2 className="title">{page.homePage.recentWorks.title}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row no-gutters grid_container" id="container">
                        {page.homePage.recentWorks.gallery.map(item => (
                            <div key={item.imageThumbnail.node.mediaItemUrl} className="col-lg-4 col-sm-6 gallery-box grid" data-category="post-transition">
                                <div className="h2-single-project">
                                    <div className="img">
                                        <Image src={item.imageThumbnail.node.mediaItemUrl} width={item.imageThumbnail.node.mediaDetails.width} height={item.imageThumbnail.node.mediaDetails.height} alt="Image" />
                                    </div>
                                    <Link href={item.websiteLink} className="link" target="_blank"><i className="fal fa-link"></i></Link>
                                </div>
                            </div>
                        ))}





                    </div>
                    <div className="text-center all-projects-button">
                        <a href="#" className="link btn-style-1">VIEW ALL PROJECTS</a>
                    </div>
                </div>
            </section>
            <section className="h2-service-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-12">
                            <div className="section-title">
                                <p className="intro">{page.homePage.service.serviceSubtitle}</p>
                                <h2 className="title">{page.homePage.service.title}</h2>
                                <p className="text">{page.homePage.service.text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        {page.homePage.service.repeater.map(singleService => (
                            <div key={singleService.title} className="col-lg-4 col-sm-6 col-12">
                                <div className="h2-single-service">
                                    <div className="icon-box">
                                        <span className="icon">

                                            <Image src={singleService.icon.node.mediaItemUrl} width={singleService.icon.node.mediaDetails.width} height={singleService.icon.node.mediaDetails.height} alt={`${singleService.title} Icon`} />
                                        </span>
                                    </div>
                                    <div className="content">
                                        <h4 className="title">{singleService.title}</h4>
                                        <p className="text">{singleService.text}</p>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </section>
            <section className="h2-counter-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-12">
                            <div className="h2-single-counter">
                                <h2 className="counter counter-up" data-counterup-time="1500" data-counterup-delay="30">{page.homePage.counter.counterNumber1}</h2>
                                <p className="text">{page.homePage.counter.counterText1}</p>
                                <span className="icon"><i className="far fa-code"></i></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                            <div className="h2-single-counter">
                                <h2 className="counter counter-up" data-counterup-time="1500" data-counterup-delay="30">{page.homePage.counter.counterNumber2}</h2>
                                <p className="text">{page.homePage.counter.counterText2}</p>
                                <span className="icon"><i className="far fa-check-circle"></i></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                            <div className="h2-single-counter">
                                <h2 className="counter counter-up" data-counterup-time="1500" data-counterup-delay="30">{page.homePage.counter.counterNumber3}</h2>
                                <p className="text">{page.homePage.counter.counterText3}</p>
                                <span className="icon"><i className="far fa-coffee"></i></span>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                            <div className="h2-single-counter">
                                <h2 className="counter counter-up" data-counterup-time="1500" data-counterup-delay="30">{page.homePage.counter.counterNumber4}</h2>
                                <p className="text">{page.homePage.counter.counterText4}</p>
                                <span className="icon"><i className="far fa-meh"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="client-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="client-area-left-side">
                                <div className="section-title">
                                    <p className="intro">{page.homePage.clients.subtitle}</p>
                                    <h2 className="title">{page.homePage.clients.title}</h2>
                                </div>
                                <ul className="nav nav-tabs" id="clientTab" role="tablist">

                                    {page.homePage.clients.repeater.map((item, index) => (


                                        <li key={item.idForTab} className="nav-item">
                                            <a
                                                className={`nav-link${index === 0 ? " active" : ""}`}
                                                id="world-tab"
                                                data-toggle="tab"
                                                href={`#${item.idForTab}`}
                                                role="tab"
                                                aria-controls="world"
                                                aria-selected={index === 0 ? "true" : "false"}>{item.name} <span className="icon"><i className="fas fa-caret-right"></i></span></a>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="client-area-right-side">
                                <div className="tab-content" id="clientTabContent">

                                    {page.homePage.clients.repeater.map((item, index) => (
                                        <div key={item.idForTab} className={`tab-pane fade${index === 0 ? "  show active" : ""}`} id={item.idForTab} role="tabpanel" aria-labelledby={`${item.idForTab}-tab`}>
                                            <div className="row">
                                                {item.images.nodes.map(eachImage => (
                                                    <div key={eachImage.altText} className="col-lg-4 col-sm-6 col-12">
                                                        <div className="single-client">
                                                            <Image src={eachImage.mediaItemUrl} width={eachImage.mediaDetails.width} height={eachImage.mediaDetails.height} alt={eachImage.altText} />
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="single-client">
                                                        <img src="img/home1/ab-supplies.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="single-client">
                                                        <img src="img/home1/vipdine.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="single-client">
                                                        <img src="img/home1/puncturesafe.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="single-client">
                                                        <img src="img/home1/remote-car-repair.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="single-client">
                                                        <img src="img/home1/ark-education.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-12">
                                                    <div className="single-client">
                                                        <img src="img/home1/vedic-matter.png" alt="" />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    ))}


                                    {/* <div className="tab-pane fade show active" id="world" role="tabpanel" aria-labelledby="world-tab">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/ab-supplies.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/vipdine.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/puncturesafe.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/remote-car-repair.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/ark-education.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/vedic-matter.png" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="country" role="tabpanel" aria-labelledby="country-tab">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/pura-vita.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/brooklyn-real-estate.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/gap-fit-solutions.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/veloba-tiles-studio.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/pixel-farandole.png" alt="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-6 col-12">
                                                <div className="single-client">
                                                    <img src="img/home1/gold-class-cleaning.jpg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />
            <Social />

        </>
    );
}
