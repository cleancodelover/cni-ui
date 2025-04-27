import RadioButtonsSelectComponent from '@/components/ui/inputs/radio-buttons'
import { useGetResilienceFunctionQuestions } from '@/hooks/resilience-function-questions';
import React from 'react'
import { useForm } from 'react-hook-form'

function SurveyItem() {
  const { control } = useForm();
  const { questions } = useGetResilienceFunctionQuestions();
  console.log("questions :>>>>>>>>>>>>>>>>>>>>", questions);
  return <div className="bg-gray-800 p-6 rounded-lg shadow-md">
    <RadioButtonsSelectComponent
            control={control}
            name="1"
            label="How often do you use our product?"
            placeholder="Enter email"
            // error={errors.email?.message}
            options={['Daily', 'Weekly', 'Monthly', 'Rarely']}
          />
  {/* <h2 className="text-xl font-semibold mb-4">
    1. How often do you use our product?
  </h2>
  <div className="space-y-3">
    <label className="flex items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer">
      <input
        type="radio"
        name="question1"
        className="form-radio h-5 w-5 text-blue-500"
      />
      <span className="ml-3">Daily</span>
    </label>
    <label className="flex items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer">
      <input
        type="radio"
        name="question1"
        className="form-radio h-5 w-5 text-blue-500"
      />
      <span className="ml-3">Weekly</span>
    </label>
    <label className="flex items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer">
      <input
        type="radio"
        name="question1"
        className="form-radio h-5 w-5 text-blue-500"
      />
      <span className="ml-3">Monthly</span>
    </label>
    <label className="flex items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer">
      <input
        type="radio"
        name="question1"
        className="form-radio h-5 w-5 text-blue-500"
      />
      <span className="ml-3">Rarely</span>
    </label>
  </div> */}
</div>
}

export default SurveyItem