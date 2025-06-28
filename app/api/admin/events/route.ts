import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    const events = await prisma.event.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching admin events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
