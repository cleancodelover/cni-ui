import { FormValues, GetResilienceFunction } from "@/models/resilience-function";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type SurveyProps = {
  resilienceFunctions: GetResilienceFunction[];
  onSubmit: (data: any) => void;
  isLoading: boolean;
};

function Survey({ resilienceFunctions, onSubmit, isLoading }: SurveyProps) {
  const [currentFunctionIndex, setCurrentFunctionIndex] = useState(0);
  const [currentFunction, setCurrentFunction] = useState<GetResilienceFunction | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const { register, handleSubmit} = useForm<FormValues>({ mode: "onChange"});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set current function when index changes
  useEffect(() => {
    if (resilienceFunctions.length === 0) return;
    const func = resilienceFunctions[currentFunctionIndex];
    setCurrentFunction(func);

    // Initialize answers for questions not already answered
    const newAnswers = { ...answers };
    func.r_category?.forEach((category) => {
      category.r_controls.forEach((control) => {
        control.questions.forEach((question) => {
          if (!(question.id in newAnswers)) {
            newAnswers[question.id] = -1; // -1 means not answered
          }
        });
      });
    });
    setAnswers(newAnswers);
  }, [currentFunctionIndex, resilienceFunctions]);

  // Calculate progress
  useEffect(() => {
    if (resilienceFunctions.length === 0) return;

    const totalFunctions = resilienceFunctions.length;
    // Add 1 to completedFunctions if current section is fully answered
    const completedFunctions =
      resilienceFunctions.slice(0, currentFunctionIndex).length + 1;
    const currentProgress = (completedFunctions / totalFunctions) * 100;
    setProgress(currentProgress);
  }, [currentFunctionIndex, resilienceFunctions, answers]); // Added answers to dependencies

  const handleOptionSelect = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentFunctionIndex < resilienceFunctions.length - 1) {
      setCurrentFunctionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentFunctionIndex > 0) {
      setCurrentFunctionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submitForm = async (data: FormValues) => {
    try {
      // Filter out unanswered questions (-1 values)
      const answers = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== -1)
      );
      console.log("Submitting answers:", answers);
      onSubmit(answers);
      // router.push('/survey/complete');
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (!currentFunction?.r_category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <div className="text-gray-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Survey Unavailable
          </h2>
          <p className="text-gray-600">
            We are unable to get the survey at the moment.
          </p>
          <p className="text-gray-500 text-sm mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Sticky header with animation */}
        <div
          className={`fixed top-0 left-0 right-0 bg-gray-50 z-10 transition-all duration-300 ${
            isScrolled ? "py-2 shadow-md" : "py-4"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`flex items-center justify-between ${
                isScrolled ? "space-x-4" : "space-x-0"
              }`}
            >
              <div
                className={`transition-all duration-300 ${
                  isScrolled
                    ? "flex items-center space-x-4"
                    : "text-center w-full"
                }`}
              >
                <h1
                  className={`font-bold text-gray-900 transition-all duration-300 ${
                    isScrolled
                      ? "text-xl whitespace-nowrap"
                      : "text-2xl sm:text-3xl w-full"
                  }`}
                >
                  Resilience Assessment Survey
                </h1>
                {!isScrolled && (
                  <p className="text-sm text-gray-600 whitespace-nowrap">
                    {currentFunction.name} (
                    {currentFunction.r_temporal_dimension})
                  </p>
                )}
                {isScrolled && (
                  <p className="text-sm text-gray-600 whitespace-nowrap">
                    {currentFunction.name} (
                    {currentFunction.r_temporal_dimension})
                  </p>
                )}
              </div>
            </div>

            {isScrolled && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">
                    Progress: {currentFunctionIndex + 1} of{" "}
                    {resilienceFunctions.length} sections
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {/* Full progress bar (shown when not scrolled) */}
          {!isScrolled && (
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Progress: {currentFunctionIndex + 1} of{" "}
                  {resilienceFunctions.length} sections
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Survey content */}
          <form>
            <div className="space-y-8">
              {currentFunction?.r_category?.map(
                (category, categoryIndex: number) => (
                  <div
                    key={category.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 border border-gray-100"
                  >
                    {/* Enhanced Category Header */}
                    <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-gray-50 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">
                            <span className="flex w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-sm font-bold items-center justify-center mr-2">
                              {categoryIndex + 1}
                            </span>
                            {category.name}
                          </h3>
                          <p className="text-xs font-medium text-blue-600 mt-1">
                            {category.r_function}
                          </p>
                        </div>
                        <span className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                          {category.r_controls.length} controls
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      {category.r_controls.map((control, controlIndex) => (
                        <div key={control.id} className="mb-8 last:mb-0">
                          {/* Enhanced Control Header */}
                          <div className="flex items-start mb-4 pb-3 border-b border-gray-100">
                            <div className="flex-1">
                              <h4 className="text-md font-medium text-gray-700 flex items-center">
                                <span className="text-blue-500 font-bold mr-2">
                                  •
                                </span>
                                {control.name}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1 italic">
                                {control.r_function_category}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {control.questions.map((question) => (
                              <div
                                key={question.id}
                                className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors duration-200"
                              >
                                <p className="text-sm font-medium text-gray-800 mb-3 flex items-start">
                                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold rounded px-2 py-1 mr-2">
                                    Q{question.order}
                                  </span>
                                  {question.name}
                                </p>
                                <div className="space-y-2">
                                  {question.options
                                    .sort((a, b) => a.order - b.order)
                                    .map((option) => (
                                      <label
                                        key={option.id}
                                        htmlFor={`question-${question.id}-option-${option.id}`}
                                        className="flex items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                                      >
                                        <input
                                          id={`question-${question.id}-option-${option.id}`}
                                          type="radio"
                                          value={option.id}
                                          {...register(question.id.toString())}
                                          onChange={() =>
                                            handleOptionSelect(
                                              question.id,
                                              option.id
                                            )
                                          }
                                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-3 block text-sm text-gray-700">
                                          <span className="font-medium">
                                            {option.name}
                                          </span>
                                          <span className="text-xs text-gray-500 ml-2">
                                            (Weight: {option.weight})
                                          </span>
                                        </span>
                                      </label>
                                    ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentFunctionIndex === 0}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm ${
                  currentFunctionIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>

              {currentFunctionIndex < resilienceFunctions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit(submitForm)}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
                >
                  {isLoading ? "Submitting..." : "Submit Survey"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Survey;
