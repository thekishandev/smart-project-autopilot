"use client";

import { useState, Children, isValidElement, cloneElement, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
    children: React.ReactNode;
}

export const Step = ({ children }: StepProps) => {
    return <div className="space-y-4">{children}</div>;
};

interface StepperProps {
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onFinalStepCompleted?: () => void;
    backButtonText?: string;
    nextButtonText?: string;
    children: React.ReactNode;
}

export default function Stepper({
    initialStep = 0,
    onStepChange,
    onFinalStepCompleted,
    backButtonText = "Back",
    nextButtonText = "Next",
    children,
}: StepperProps) {
    // Ensure initialStep is within bounds
    const steps = Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];
    const safeInitialStep = Math.min(Math.max(0, initialStep), steps.length - 1);

    const [currentStep, setCurrentStep] = useState(safeInitialStep);

    const totalSteps = steps.length;
    const isLastStep = currentStep === totalSteps - 1;

    const handleNext = () => {
        if (isLastStep) {
            onFinalStepCompleted?.();
        } else {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            onStepChange?.(nextStep);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            onStepChange?.(prevStep);
        }
    };

    return (
        <div className="w-full">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 relative px-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gray-800 -z-10" />
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#00f3ff] -z-10 transition-all duration-300"
                    style={{ width: `${(currentStep / (Math.max(1, totalSteps - 1))) * 100}%` }}
                />

                {steps.map((_, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={index} className="relative group bg-[#030303] px-1">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300",
                                    isActive ? "border-[#00f3ff] text-[#00f3ff] scale-110 shadow-[0_0_10px_rgba(0,243,255,0.5)]" :
                                        isCompleted ? "border-[#00f3ff] bg-[#00f3ff] text-black" :
                                            "border-gray-800 text-gray-600 bg-black"
                                )}
                            >
                                {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-xs font-mono">{index + 1}</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Content Transition */}
            <div className="relative min-h-[300px] bg-[#0a0a0f] border border-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-lg mx-auto"
                    >
                        {steps[currentStep]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded text-xs font-mono uppercase transition-colors tracking-wide",
                        currentStep === 0 ? "opacity-0 pointer-events-none" : "hover:text-[#00f3ff] text-gray-500"
                    )}
                >
                    <ChevronLeft className="w-4 h-4" /> {backButtonText}
                </button>

                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-[#00f3ff] text-black px-6 py-2 rounded text-xs font-bold font-mono uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                >
                    {isLastStep ? "Finish Setup" : nextButtonText}
                    {!isLastStep && <ChevronRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}
