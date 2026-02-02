import Link from "next/link";

const SocialMedia = ({socialMedia}) => {

    return (
        
        <section className="social-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <p className="intro">{socialMedia.subtitle}</p>
                                <h2 className="title">{socialMedia.title}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {socialMedia.allSocials.map(eachSocial=>(
                            <div key={eachSocial.name} className="col-lg-4 col-sm-6 col-12">
                                <Link href={eachSocial.link}>
                                    <div className="single-social">
                                        <h3 className="title">{eachSocial.name}</h3>
                                        <p className="info">{eachSocial.subtite}</p>
                                        <span className="icon"><i className={eachSocial.iconClass}></i></span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
    );
};

export default SocialMedia;