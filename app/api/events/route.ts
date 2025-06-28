// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { eventSchema } from "@/lib/validations/event";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeUnpublished =
      searchParams.get("includeUnpublished") === "true";

    const events = await prisma.event.findMany({
      where: includeUnpublished ? {} : { published: true },
      orderBy: [{ featured: "desc" }, { startDate: "asc" }],
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin();
    const body = await req.json();

    // Validate the request body
    const validatedData = eventSchema.parse(body);

    // Create the event
    const event = await prisma.event.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    console.error("Error creating event:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors.map((err: any) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "An event with this title already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
