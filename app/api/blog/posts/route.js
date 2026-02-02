import getBlogPosts from "@/lib/queries/getBlogPosts";
import { NextResponse } from "next/server";

export const GET = async (request) => {

    const { searchParams } = new URL(request.url);
    const after = searchParams.get("after");

    try {
        const data = await getBlogPosts(10, after)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to Fetch Posts" },
            { status: 500 }
        )
    }
};