import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";
import Submission from "@/models/Submission";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const submissions = await Submission.find({ formId: id }).sort({
      submittedAt: -1,
    });

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const { answers } = body;

    if (!answers) {
      return NextResponse.json(
        { message: "Answers are required" },
        { status: 400 }
      );
    }

    const form = await Form.findById(id);
    if (!form) {
      return NextResponse.json(
        { message: "Form not found" },
        { status: 404 }
      );
    }

    // Validate required fields
    for (const field of form.fields) {
      if (field.required) {
        const value = answers[field.id];
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return NextResponse.json(
            { message: `Field "${field.label}" is required` },
            { status: 400 }
          );
        }
      }
    }

    // Save submission
    const submission = await Submission.create({
      formId: id,
      answers,
    });

    // Update submissions count
    form.submissionsCount = (form.submissionsCount || 0) + 1;
    await form.save();

    return NextResponse.json(
      { success: true, submission },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Submission failed" },
      { status: 500 }
    );
  }
}
