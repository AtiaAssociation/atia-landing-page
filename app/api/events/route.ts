import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { eventSchema } from "@/lib/validations/event";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const events = await prisma.event.findMany({
      where: { published: true },
      orderBy: { startDate: "asc" },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
    return NextResponse.json(events);
  } catch (error) {
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

    const event = await prisma.event.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
