import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { eventSchema } from "@/lib/validations/event";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requireAdmin();
    const { id } = await params;
    const body = await req.json();

    console.log("id", id);

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Validate the request body
    const validatedData = eventSchema.parse(body);

    // Update the event
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        updatedAt: new Date(),
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json(event);
  } catch (error: any) {
    console.error("Error updating event:", error);

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

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdmin();
    const { id } = await params;

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if it exists
    if ((existingEvent as any).public_id) {
      try {
        await cloudinary.uploader.destroy((existingEvent as any).public_id);
        console.log(
          `Image deleted from Cloudinary: ${(existingEvent as any).public_id}`
        );
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
        // Continue with event deletion even if image deletion fails
      }
    }

    // Delete the event
    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Event deleted successfully",
      deletedEvent: { id, title: existingEvent.title },
    });
  } catch (error: any) {
    console.error("Error deleting event:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
