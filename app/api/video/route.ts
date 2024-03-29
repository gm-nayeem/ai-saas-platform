import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
// import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        // const freeTrial = await checkApiLimit();
        // const isPro = await checkSubscription();

        // if (!freeTrial && !isPro) {
        //     return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
        // }

        // const input = {
        //     fps: 24,
        //     width: 1024,
        //     height: 576,
        //     prompt: "Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic",
        //     guidance_scale: 17.5,
        //     negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
        // };

        const input = {
            prompt
        };

        const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });

        // if (!isPro) {
        //     await incrementApiLimit();
        // }

        return NextResponse.json(response);
    } catch (error) {
        console.log('[VIDEO_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};