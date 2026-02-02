import ContactForm from "@/components/ContactForm";
import { Social } from "@/components/FrontendWidgets";
import SocialMedia from "@/components/SocialMedia";
import getContactPage from "@/lib/queries/getContactPage";
import getThemeOptions from "@/lib/queries/getThemeOptions";

export const dynamic = 'force-dynamic';

const contactPage = async () => {

    const [themeOptions, pageData] = await Promise.all([
        getThemeOptions(),
        getContactPage()
    ])

    return (
        <>
            <section className="iha-contact innerpage-hero-area" id="_iha">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="innerpage-hero-content">
                                <h2 className="title">{pageData.contactPage.header.pageTitle}</h2>
                                <p className="text">{pageData.contactPage.header.pageSubtitle}</p>
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
            <section className="contact-form-area" id="_cfa">
                <div className="container">
                    <ContactForm subtitle={pageData.contactPage.contactForm.subtitle} title={pageData.contactPage.contactForm.title} text={pageData.contactPage.contactForm.text} />
                </div>
            </section>
            <section className="contact-address-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                            <div className="single-contact-address">
                                <h6 className="title"><span className="icon"><i className="fas fa-envelope"></i></span> EMAIL:</h6>
                                <ul className="info">
                                    {pageData.contactPage.contactInformation.allEmail.map(e => (
                                        <li key={e.email}>{e.email}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                            <div className="single-contact-address">
                                <h6 className="title"><span className="icon"><i className="fas fa-phone"></i></span> PHONE:</h6>
                                <ul className="info">
                                    {pageData.contactPage.contactInformation.allPhoneNumber.map(e => (
                                        <li key={e.phoneNumber}>{e.phoneNumber}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                            <div className="single-contact-address">
                                <h6 className="title"><span className="icon"><i className="fas fa-map-marker-alt"></i></span> ADDRESS:</h6>
                                <ul className="info">
                                    {pageData.contactPage.contactInformation.address.map(e => (
                                        <li key={e.addressLine}>{e.addressLine}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Social />
        </>
    );
};

export default contactPage;