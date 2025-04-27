import React from "react";
import Header from "./header";
import Footer from "./footer";
import SurveyItem from "./item";
import { useGetResilienceFunctions } from "@/hooks/resilience-functions";

function SurveyForm() {
  const { resilience_functions } = useGetResilienceFunctions();
  console.log("resilience_functions :>>>>>>>>>>>  ", resilience_functions);
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-8">
            {
              [1,2,3,4,5].map(item=><SurveyItem key={item.toString()} />)
            }
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default SurveyForm;
