import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();

    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json(
        { error: "No public_id provided" },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);

    return NextResponse.json({
      message: "Image deleted successfully",
      result,
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
