'use server';

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/prisma'; // use shared Prisma client

export async function POST(request: Request) {
  try {
    const { name, phone, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    // Check if phone already exists
    if (phone) {
      const existingPhone = await prisma.user.findFirst({ where: { phone } }); // <--- FIXED
      if (existingPhone) {
        return NextResponse.json({ error: 'Phone already in use' }, { status: 409 });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: 'User registered',
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Registration error:', error.message || error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
