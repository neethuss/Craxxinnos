import Image from "next/image";
import Logo from '../../public/assets/craxxinnosLogo.png'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src={Logo} alt='Logo'/>
      <Link href='/signup'>
      <button className="px-5 py-2 bg-pink-700 rounded-2xl text-white mt-4 hover:bg-pink-500">
        Signup Now
      </button></Link>
    </div>
  );
}
