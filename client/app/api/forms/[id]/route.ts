import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    await Form.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Form deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to delete form" },
      { status: 500 }
    );
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const isView = searchParams.get("view") === "true";

  let form;
  if (isView) {
    form = await Form.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
  } else {
    form = await Form.findById(id);
  }

  if (!form) {
    return NextResponse.json(
      { message: "Form not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(form);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const updated = await Form.findByIdAndUpdate(
    id,
    {
      title: body.title,
      description: body.description,
      fields: body.fields,
    },
    { new: true }
  );

  return NextResponse.json(updated);
}