import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";

// GET - Fetch all forms
export async function GET() {
  try {
    await connectDB();

    const forms = await Form.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}

// POST - Create new form
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const form = await Form.create({
      title: body.title || "Untitled Form",
      description: body.description || "",
      fields: body.fields || [],
    });

    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create form" },
      { status: 500 }
    );
  }
}