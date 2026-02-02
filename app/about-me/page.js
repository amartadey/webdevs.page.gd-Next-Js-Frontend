import getAboutPageBySlug from '@/lib/queries/getAboutPageBySlug';
import { sanitizeHtml } from '@/lib/functions';
import Image from 'next/image';
import { Social, Testimonials } from '@/components/FrontendWidgets';


export const dynamic = 'force-dynamic';

const aboutPage = async () => {
    const pageData = await getAboutPageBySlug();





    return (
        <>
            <section className="iha-contact innerpage-hero-area" id="_iha" style={{ background: `url(${pageData.featuredImage.node.mediaItemUrl}) 0 0 / cover` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="innerpage-hero-content">
                                <h2 className="title">{pageData.aboutPage.pageTitle}</h2>
                                <p className="text">{pageData.aboutPage.pageSubtitle}</p>
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
            <section className="info-tab-area">
                <div className="tab-bg-element"><img src="img/home1/tab-bg-elements.png" alt="" /></div>
                <div className="container">
                    <div className="info-tab">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade active show" id="about" role="tabpanel" aria-labelledby="about-tab">
                                <div className="content-about">
                                    <div className="row">
                                        <div className="col-lg-6 col-12">
                                            <div className="banner">

                                                <Image src={pageData.aboutPage.aboutMe.image.node.mediaItemUrl} width={pageData.aboutPage.aboutMe.image.node.mediaDetails.width} height={pageData.aboutPage.aboutMe.image.node.mediaDetails.height} alt={pageData.aboutPage.aboutMe.image.node.altText} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <div className="content">
                                                <p className="intro">{pageData.aboutPage.aboutMe.subtitle}</p>
                                                <h2 className="title">{pageData.aboutPage.aboutMe.title}</h2>
                                                <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.aboutPage.aboutMe.text) }}></span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className="page-single-service-area">
                <div className="container">
                    <div className="page-single-service">
                        <h2 className="title">{pageData.aboutPage.firstBlock.title}</h2>
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <p className="text">{pageData.aboutPage.firstBlock.text1}</p>
                            </div>
                            <div className="col-lg-6 col-12">
                                <p className="text">{pageData.aboutPage.firstBlock.text2}</p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-lg-6 col-md-12 col-12">
                                <div className="img">
                                    <Image src={pageData.aboutPage.imageText.image.node.mediaItemUrl} width={pageData.aboutPage.imageText.image.node.mediaDetails.width} height={pageData.aboutPage.imageText.image.node.mediaDetails.height} alt={pageData.aboutPage.imageText.image.node.altText} />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-12">
                                <h3 className="title-2">{pageData.aboutPage.imageText.title}</h3>
                                <p className="text" dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.aboutPage.imageText.text) }}></p>
                                <h4 className="title-3">{pageData.aboutPage.imageText.listTitle}</h4>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                        <ul className="list">
                                            {pageData.aboutPage.imageText.listItemsLeft.map(item => (
                                                <li key={item.item}>{item.item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                        <ul className="list">
                                            {pageData.aboutPage.imageText.listItemsRight.map(item => (
                                                <li key={item.item}>{item.item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="img mb-5">
                                    <Image src={pageData.aboutPage.allImages.image1.node.mediaItemUrl} width={pageData.aboutPage.allImages.image1.node.mediaDetails.width} height={pageData.aboutPage.allImages.image1.node.mediaDetails.height} alt={pageData.aboutPage.allImages.image1.node.altText} />
                                </div>
                                <div className="img">
                                    <Image src={pageData.aboutPage.allImages.image2.node.mediaItemUrl} width={pageData.aboutPage.allImages.image2.node.mediaDetails.width} height={pageData.aboutPage.allImages.image2.node.mediaDetails.height} alt={pageData.aboutPage.allImages.image2.node.altText} />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12 mt-lg-0 mt-md-0 mt-sm-5 mt-5">
                                <div className="img">
                                    <Image src={pageData.aboutPage.allImages.image3.node.mediaItemUrl} width={pageData.aboutPage.allImages.image3.node.mediaDetails.width} height={pageData.aboutPage.allImages.image3.node.mediaDetails.height} alt={pageData.aboutPage.allImages.image3.node.altText} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <h4 className="title-3">{pageData.aboutPage.listDetails1.title}</h4>
                                <ul className="list">
                                    {pageData.aboutPage.listDetails1.list.map(item => (
                                        <li key={item.item}>{item.item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <h4 className="title-3">{pageData.aboutPage.listDetails2.title}</h4>
                                <ul className="list">
                                    {pageData.aboutPage.listDetails2.list.map(item => (
                                        <li key={item.item}>{item.item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <h4 className="title-3">{pageData.aboutPage.listDetails3.title}</h4>
                                <ul className="list">
                                    {pageData.aboutPage.listDetails3.list.map(item => (
                                        <li key={item.item}>{item.item}</li>
                                    ))}
                                </ul>
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

export default aboutPage;