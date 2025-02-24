import Image from "next/image";
import React from "react";
import Logo from "../../public/assets/craxxinnosLogo.png"
import { BsQuestionCircle } from "react-icons/bs";
import Link from 'next/link'


const Header = () => {
  return (
    <div>
    <div className="flex justify-between h-16">
      <div className="flex items-center ml-10"> 
        <Image 
          src={Logo} 
          alt="logo" 
          layout="responsive" 
          width={50} 
          height={1} 
        />
      </div>
      
      <div className="flex items-center w-9">
        <Link href="">
          <BsQuestionCircle className="text-2xl" />
        </Link>
      </div>
    </div>
    <hr />
  </div>
  );
};

export default Header;
