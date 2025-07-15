import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Every Master was once a beginner.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "Pricing",
            url: "#pricing"
        },
        {
            text: "Testimonials",
            url: "#testimonials"
        }
    ],
    telephone: '+91-70-1674-5669',
    socials: {
        facebook: 'https://facebook.com/ashutoshacademybotad',
        youtube: 'https://www.youtube.com/gujjuchess64',
        instagram: 'https://www.instagram.com/ashutoshchessacademy/',
        whatsapp: 'https://wa.me/917016745669',
    }
}