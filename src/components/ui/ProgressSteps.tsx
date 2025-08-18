import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
}

export function ProgressSteps({ steps, currentStep, completedSteps }: ProgressStepsProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isUpcoming = index > currentIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    'transition-all duration-200',
                    {
                      'bg-green-500 text-white': isCompleted,
                      'bg-blue-600 text-white': isCurrent,
                      'bg-gray-200 text-gray-500': isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={clsx(
                      'text-xs font-medium',
                      {
                        'text-green-600': isCompleted,
                        'text-blue-600': isCurrent,
                        'text-gray-500': isUpcoming,
                      }
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-400 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    'flex-1 h-0.5 mx-4 transition-colors duration-200',
                    {
                      'bg-green-500': index < currentIndex,
                      'bg-gray-200': index >= currentIndex,
                    }
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}