import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {UserType}  from "@/utils/Types";
import { setSignupStep } from "@/store/userSlice";
import { useRouter } from "next/navigation";

const UserDetails = () => {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          throw new Error("No email found in local storage.");
        }

        const res = await axios.get("/api/User/Signup",{
          params: { email },
        });

        setUserData(res.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 400:
              toast.error('Account already exists with the email or phone number');
              break;
            default:
              toast.error('An error occurred while fetching user data.');
          }
        } else {

          if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 404:
            toast.error('User not found');
            router.push('/signup')
            break;
        }
      } else {
        toast.error("Unexpected error occured");
      }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return null
  }

  const handleAddNewAccount = () =>{
    console.log('aaaa')
    setSignupStep(0)
    localStorage.removeItem('email')
    router.push('/signup')
  }

  return (
    <div className=" flex flex-col min-h-screen">
    <div>
      <Header />
    </div>
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <p className="w-full p-2 border rounded-md bg-gray-100">
              {userData.fullName}
            </p>
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <p className="w-full p-2 border rounded-md bg-gray-100">
              {userData.email}
            </p>
          </div>
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <p className="w-full p-2 border rounded-md bg-gray-100">
              {userData.dob}
            </p>
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <p className="w-full p-2 border rounded-md bg-gray-100">
              {userData.currentAddress}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 ">
        <button className="px-5 py-2 rounded-xl bg-pink-700 hover:bg-pink-500" onClick={handleAddNewAccount}>
          Add New Account
        </button>
      </div>
    </div>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
    />
  </div>
  );
};

export default UserDetails;