'use client'
import { useGetResilienceFunctionQuestions } from '@/hooks/resilience-function-questions';
import { useSubmitResponse } from '@/hooks/store-response';
import Survey from '@/views/survey'
import { useRouter } from 'next/navigation';
import React from 'react'

function SurveyPage() {
  const router = useRouter();
  const { questions, loading } = useGetResilienceFunctionQuestions();
  const { handleSurveySubmit, loading: isLoading} = useSubmitResponse(()=>{
    router.replace('/dashboard');
  });
  
  const onSubmit = async (answers: Record<string, string>) => {
    try {
      handleSurveySubmit(answers)
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  };


  if (loading && !questions?.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return <Survey isLoading={isLoading} resilienceFunctions={questions} onSubmit={onSubmit} />
}

export default SurveyPage