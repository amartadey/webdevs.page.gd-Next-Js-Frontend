import { fetchGraphQL } from "../functions";


const getContactPage = async () => {

    const query = `
        query GetContactPage {
            page(id: "/enquiry/", idType: URI) {
                title
                contactPage {
                header {
                    pageTitle
                    pageSubtitle
                }
                contactForm {
                    subtitle
                    title
                    text
                }
                contactInformation {
                    allEmail {
                    email
                    }
                    allPhoneNumber {
                    phoneNumber
                    }
                    address {
                    addressLine
                    }
                }
                }
            }
            }
    `

    const response = await fetchGraphQL(query);
    return response?.data?.page || null;


};

export default getContactPage;