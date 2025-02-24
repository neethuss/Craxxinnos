import { NextResponse } from 'next/server';
import User from '@/models/user';
import { connectDB } from '@/utils/db';

// Handle POST request
export async function POST(req: Request) {
  await connectDB()

  try {


    const body = await req.json()

    const { email, title,
      fullName,
      dob,
      currentAddress,
      livedDuration,
      aboutYou, } = body

    console.log(title,
      fullName,
      dob,
      currentAddress,
      livedDuration,
      aboutYou, 'checking formdata in personal info route')

    const user = await User.findOneAndUpdate({ email }, { $set: { title, fullName, dob, currentAddress, livedDuration, aboutYou } }, { new: true })
    console.log(user, 'user')
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