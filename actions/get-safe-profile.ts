import { db } from "@/lib/db";
import { SafeProfile } from "@/types";
import { auth, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import {MemberRole} from "@prisma/client";

export default async function getSafeProfile() {
  try {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    let currentProfile = await db.profile.findUnique({
        where: {
          userId,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          imageUrl: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!currentProfile) {
        currentProfile = {
          userId: userId,
          id: "",
          name: "",
          imageUrl: "",
          email: "",
          role: MemberRole.TEACHER,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        // return null;
      }

      // Convert createdAt and updatedAt to ISO strings
      const safeProfile: SafeProfile = {
        ...currentProfile,
        createdAt: currentProfile.createdAt.toISOString(),
        updatedAt: currentProfile.updatedAt.toISOString(),
      };

        // currentProfile is passed to client component and client components
        // can only pass stringified JSON objects. So we need to convert
        // Date objects to ISO strings.
        // The ... operator is used to copy all properties from currentProfile
        // to a new object. We then overwrite the createdAt, updatedAt and
        // emailVerified properties with their ISO string values.
    return safeProfile;
  } catch (error: any) {
    return null;
  }
}

