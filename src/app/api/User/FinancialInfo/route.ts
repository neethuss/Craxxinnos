import { NextResponse } from 'next/server';
import User from '@/models/user';
import { connectDB } from '@/utils/db';

// Handle POST request
export async function POST(req: Request) {
  await connectDB()

  try {

    const body = await req.json()

    const { email,
      employmentStatus,
      additionalSavings
    } = body

    console.log(email, employmentStatus, additionalSavings, 'checking formdata in personal info route')

    const user = await User.findOneAndUpdate({ email }, { $set: { employmentStatus, additionalSavings } }, { new: true })
    if (!user) {
      console.log('User not found')
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {

    console.log('Error in signup', error)
    return NextResponse.json({ message: 'Error saving question', error }, { status: 500 });
  }
}