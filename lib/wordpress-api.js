
const WP_REST_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL
const WP_AUTH_USER = process.env.WORDPRESS_AUTH_USER
const WP_AUTH_PASSWORD = process.env.WORDPRESS_AUTH_PASSWORD

const getAuthHeader = () => {
    const credentials = Buffer.from(`${WP_AUTH_USER}: ${WP_AUTH_PASSWORD}`).toString("base64")
    return `Basic ${credentials}`
}



export const uploadFileToWordPress = async (file) => {

    try {
        const formData = new FormData()
        formData.append("file", file)
        const response = await fetch(`${WP_REST_API_URL}/media`, {
            method: "POST",
            headers: {
                "Authorization": getAuthHeader(),
            },
            body: formData,
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`WordPress file upload failed: ${error.message || response.statusText}`)
        }

        const media = await response.json();
        return {
            id: media.id,
            url: media.source_url,
            filename: media.title.rendered
        }

    } catch (error) {
        console.error("Error uploading file to wordpress: ", error);
        throw error;
    }
};

export async function createFormSubmission(formData, mediaFiles = []) {
    try {
        const postResponse = await fetch(`${WP_REST_API_URL}/form_submission`, {
            method: "POST",
            headers: {
                "Authorization": getAuthHeader(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: `Enquiry form ${formData.fullName}`,
                status: "publish"
            }),
        })

        if (!postResponse.ok) {
            const error = await postResponse.json()
            console.error("Post creation error: ", error);
            throw new Error(`Wordpress Post creation Failed: ${error.message || postResponse.statusText}`)
        }

        const post = await postResponse.json()
        console.log("Post created with ID: ", post.id);

        const mediaIds = mediaFiles.map(file => file.id);

        const acfFields = {
            full_name: formData.fullName,
            email_address: formData.email,
            companyorganization: formData.organization || "",
            budget: formData.budget || "",
            phone_number: formData.phone || "",
            country: formData.country || "",
            message: formData.message || "",
            attached_files: mediaIds,
            submission_date: new Date().toISOString().replace("T", " ").substring(0, 19),
        }

        console.log("Updating ACF Fields: ", acfFields);
        await updateACFFields(post.id, acfFields)
        return post.id

    } catch (error) {
        console.error("Error creating form submission in WordPress: ", error);
        throw error
    }
}

async function updateACFFields(postId, fields) {
    try {
        const response = await fetch(`${WP_REST_API_URL}/form_submission/${postId}`, {
            method: "POST",
            headers: {
                "Authorization": getAuthHeader(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                acf: fields,
            }),
        })

        if (!response.ok) {
            const error = await response.json();
            console.error("ACF Update error response: ", error);

            console.log("trying meta fields as fallback...");
            const metaResponse = await fetch(`${WP_REST_API_URL}/form_submission/${postId}`, {
                method: "POST",
                headers: {
                    "Authorization": getAuthHeader(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    meta: fields,
                }),
            })

            if (!metaResponse.ok) {
                const metaError = await metaResponse.json()
                console.error("Meta Update Error: ", metaError);
                throw new Error(`ACF fields update failed: ${error.message || response.statusText}`);
            }

            console.log("Meta fields updated successfully");
            return await metaResponse.json()
        }

        console.log("ACF fields updated successfully");
        return await response.json()


    } catch (error) {
        console.error("Error Updating ACF Fields: ", error);
        throw error;
    }
}

export async function testWordPressConnection() {
    try {
        const response = await fetch(`${WP_REST_API_URL}/form_submission`, {
            method: "POST",
            headers: {
                "Authorization": getAuthHeader()
            }
        });

        return response.ok
    } catch (error) {
        console.error("Wordpress Connection Test Failed: ", error);
        return false;
    }
}