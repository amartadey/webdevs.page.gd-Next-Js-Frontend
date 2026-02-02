export async function fetchGraphQL(query, variables = {}){
    const url = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL;
    if(!url){
        console.error("GraphQL URL not configured !!")
        return null;
    }

    try {
        const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({ query, variables}),
            next: {
                revalidate:0,
                tags:["graphql"]
            }
        })
        if(!response.ok){
            console.error(`GraphQL request Failed: ${response.statusText}`);
            return null;
        }

        const json = await response.json();
        if(json.errors){
            console.error(`GraphQL Error: ${json.errors}`);
        }
        return json
    } catch (error) {
        console.error(`GraphQL Fetch Error: ${error}`);
        return null;
        
    }
}


export const normalizeUrl = (url)=>{
    if(!url) return "#"
    if(url === "/home/" || url === "/home") return "/";
    return url
}

export const sanitizeHtml = (html) =>{
    if(!html) return "";
    return html.trim().replace(/\r\n/g, '\n').replace(/\n+/g, '\n')
}

export const truncateHtml = (html, maxLength = 150) => {
    const text = html.replace(/<[^>]*>/g, '');
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};


