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

      console.log('token')

      const data =  {
        data: {
          access_token: token,
          user: {
            email: email,
            id: user.id
          }
        },
        status: true,
        message: 'User logged in successfully'
      }

      const response = NextResponse.json(data, { status: 200 });
  
      return response;
    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
  }
