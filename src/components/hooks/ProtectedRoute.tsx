"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredStep: number;
}

const ProtectedRoute = ({ children, requiredStep }: ProtectedRouteProps) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);


  useEffect(() => {
    if (!user.email || user.signupStep === 0) {
      router.replace("/signup"); // Redirect to main signup page
    } else if (user.signupStep < requiredStep) {
      router.replace(`/signup/${user.signupStep}`); // Redirect to user's current signup step
    }
  }, [user, router, requiredStep]);


  if (!user.email || user.signupStep < requiredStep) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
