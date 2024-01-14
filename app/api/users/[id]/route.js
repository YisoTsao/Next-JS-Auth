import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request, { params }) {
  const users = await prisma.user.findMany();
  const findUser = users.find((item) => item.id === params.id);

  return NextResponse.json(findUser);
}

export async function DELETE(request, { params }) {
  const id = params.id;
  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ status: 204 });
}

export async function PATCH(request, { params }) {
  const id = params.id;
  let json = await request.json();

  const updated_user = await prisma.user.update({
    where: { id },
    data: json,
  });

  if (!updated_user) {
    return new NextResponse("No user with ID found", { status: 404 });
  }

  return NextResponse.json(updated_user);
}
