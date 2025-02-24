import React from 'react'
import { IStepper } from '../utils/Types'

const Stepper:React.FC<IStepper> = ({currentStep}) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {[1, 2].map((step) => (
        <div
          key={step}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
            currentStep === step ? "bg-blue-600" : "bg-gray-300 text-gray-700"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  )
}

export default Stepper
