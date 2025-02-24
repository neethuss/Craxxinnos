"use client";

import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import PersonalInformation from "@/components/PersonalInformation";
import FinancialInformation from "@/components/FinancialInformation";
import Signup from "@/components/Signup";
import UserDetails from "@/components/UserDetails";
import ProtectedRoute from "@/components/hooks/ProtectedRoute";

const Page: React.FC = () => {
  const params = useParams();
  const [step, setStep] = useState<string | null>(null);

  useEffect(() => {
    if (params?.step) {
      setStep(params.step as string);
    }
  }, [params]);

  const getStepContent = () => {
    switch (step) {
      case "1":
        return (
          <Suspense fallback={null}>
            <ProtectedRoute requiredStep={1}>
              <PersonalInformation />
            </ProtectedRoute>
          </Suspense>
        );
      case "2":
        return (
          <Suspense fallback={null}>
            <ProtectedRoute requiredStep={2}>
              <FinancialInformation />
            </ProtectedRoute>
          </Suspense>
        );

        case "3":
          return (
            <Suspense fallback={null}>
              <ProtectedRoute requiredStep={3}>
                <UserDetails />
              </ProtectedRoute>
            </Suspense>
          );
      default:
        return <Signup />;
    }
  };

  return <Suspense fallback={null}>{step ? getStepContent() : null}</Suspense>;
};

export default Page;
