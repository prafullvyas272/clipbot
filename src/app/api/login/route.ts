'use server';

import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
      const { email, password } = await request.json()
  
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
      }
  
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }
  
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }
  
      // Optional: Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      )

      const data =  {
        data: {
          access_token: token,
          user: {
            email: email
          }
        },
        status: true,
        message: 'User logged in successfully'
      }

      const response = NextResponse.json(data, { status: 200 });

      // Set a cookie or session token (example only)
      response.cookies.set('access_token', token, {
        httpOnly: true,
        path: '/',
      });
  
      return response;
    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
  }
