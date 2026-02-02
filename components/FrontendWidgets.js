import getThemeOptions from "@/lib/queries/getThemeOptions";
import SocialMedia from "./SocialMedia";
import Testimonial from "./Testimonial";

const themeOptions = await getThemeOptions()

export const Social = async () => {
    
    return (
        <>
            {themeOptions && <SocialMedia socialMedia={themeOptions.socialMedia} /> }
        </>
    )
};

export const Testimonials = async()=>{
    return(
        <>
            {themeOptions && <Testimonial testimonial={themeOptions.testimonials}/>}
        </>
        
    )
}
