import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';
import { connectDB } from '@/utils/db';
import bcrypt from 'bcryptjs'
// Handle POST request
export async function POST(req: Request) {
  await connectDB()

  try {

    const body = await req.json()

    const { email, mobileNumber, password } = body

    console.log(email, mobileNumber, password, 'checking formdata in signup route')

  
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] })

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email or mobile number already exists' }, { status: 400 })

    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email, mobileNumber, password: hashedPassword
    })

    await newUser.save()

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {

    console.log('Error in signup', error)
    return NextResponse.json({ message: 'Error saving question', error }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  await connectDB()

  try {
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log('Error in finding user', error)
    return NextResponse.json({ message: 'Error in finding user ', error }, { status: 500 });
  }
}