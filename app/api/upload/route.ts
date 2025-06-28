import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary environment variables are not configured");
      return NextResponse.json(
        {
          error:
            "Image upload service is not configured. Please check environment variables.",
        },
        { status: 500 }
      );
    }

    await requireAdmin();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Please upload JPG, PNG, WebP, or GIF files.",
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "atia_events",
            transformation: [
              { width: 1200, height: 630, crop: "limit" },
              { quality: "auto" },
              { format: "auto" },
            ],
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(new Error(`Cloudinary upload failed: ${error.message}`));
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: (result as any).secure_url,
      public_id: (result as any).public_id,
      width: (result as any).width,
      height: (result as any).height,
    });
  } catch (error: any) {
    console.error("Upload error:", error);

    // Provide more specific error messages
    if (error.message?.includes("Cloudinary upload failed")) {
      return NextResponse.json(
        { error: "Failed to upload image to cloud storage. Please try again." },
        { status: 500 }
      );
    }

    if (error.message?.includes("Unauthorized")) {
      return NextResponse.json(
        {
          error: "You must be logged in as an administrator to upload images.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to upload image. Please try again." },
      { status: 500 }
    );
  }
}
