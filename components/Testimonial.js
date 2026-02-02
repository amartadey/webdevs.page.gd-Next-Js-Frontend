'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Testimonial({ testimonial }) {

    const carouselRef = useRef(null); 

    useEffect(() => {
        const initCarousel = () => {
            if (typeof window !== 'undefined' && window.jQuery && window.jQuery.fn.owlCarousel) {
                const $ = window.jQuery;
                
                if ($(carouselRef.current).data('owl.carousel')) {
                    $(carouselRef.current).data('owl.carousel').destroy();
                }

                $(carouselRef.current).owlCarousel({
                    loop: true,
                    margin: 30,
                    responsiveClass: true,
                    navigation: true,
                    navText: ["<i class='fal fa-long-arrow-left'></i>", "<i class='fal fa-long-arrow-right'></i>"],
                    nav: true,
                    items: 2,
                    smartSpeed: 2000,
                    dots: false,
                    autoplay: false,
                    autoplayTimeout: 4000,
                    center: false,
                    responsive: {
                        0: { items: 1 },
                        480: { items: 1 },
                        760: { items: 2 }
                    }
                });
            }
        };

        initCarousel();
        const timer = setTimeout(initCarousel, 500);

        return () => {
            clearTimeout(timer);
            if (typeof window !== 'undefined' && window.jQuery && carouselRef.current) {
                const $ = window.jQuery;
                if ($(carouselRef.current).data('owl.carousel')) {
                    $(carouselRef.current).data('owl.carousel').destroy();
                }
            }
        };
    }, []);
    
    if (!testimonial || !testimonial.repeater) {
        return null;
    }

    return (
        <section className="testimonial-area">           
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <p className="intro">{testimonial.title}</p>
                            <h2 className="title">{testimonial.subtitle}</h2>
                        </div>
                    </div>
                </div>
                <div className="testimonial-carousel owl-carousel" ref={carouselRef}>
                    {testimonial.repeater.map((singleTestimonial, index) => (
                        <div key={index} className="single-testimonial">
                            <div className="info">
                                <div className="img">
                                    <Image 
                                        src={singleTestimonial.image.node.mediaItemUrl} 
                                        alt={singleTestimonial.image.node.altText}
                                        width={singleTestimonial.image.node.mediaDetails.width}
                                        height={singleTestimonial.image.node.mediaDetails.height}
                                    />
                                </div>
                                <div className="info-right">
                                    <h3 className="name">{singleTestimonial.name}</h3>
                                    <p className="desg">{singleTestimonial.location}</p>
                                </div>
                            </div>
                            <p className="text">{singleTestimonial.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}