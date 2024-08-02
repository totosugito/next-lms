import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {

        // We are creating a customer but we don't know when their payment
        // method will be charged. We need to create a customer in Stripe
        // and then create a session for them to pay for the course.

        // The metadata is used to identify the user and the course they are
        // purchasing. We will use this information in the webhook to update
        // the database.

        const user = await currentUser();

        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true,
            },
        });

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: params.courseId,
                },
            },
        });

        if (purchase) {
            return new NextResponse("Already Purchased", { status: 400 });
        }

        if (!course) {
            return new NextResponse("Not Found", { status: 404 });
        }

        try {

            const asset = await db.purchase.create({
                data: {
                    userId: user.id,
                    courseId: params.courseId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
        } catch (error) {
            console.log("[Purchase Create]", error);
        }
        return NextResponse.json({});
    } catch (error) {
        console.log("COURSE_ID_CHECKOUT", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}