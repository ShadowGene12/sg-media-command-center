import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock question data structure
const diagnosticQuestions = {
  "bottleneck-scanner": {
    title: "Business Bottleneck Scanner",
    sections: [
      {
        name: "Market & Offer Clarity",
        questions: [
          {
            id: "q1",
            text: "How clearly can you articulate the specific problem your offer solves?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "Very unclear", maxLabel: "Crystal clear" }
          },
          {
            id: "q2",
            text: "How well do you understand your ideal customer's decision-making process?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "Not at all", maxLabel: "Completely" }
          },
          {
            id: "q3",
            text: "How differentiated is your offer from competitors?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "Identical", maxLabel: "Unique" }
          }
        ]
      },
      {
        name: "Customer Acquisition",
        questions: [
          {
            id: "q4",
            text: "How predictable is your lead generation?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "Completely random", maxLabel: "Highly predictable" }
          },
          {
            id: "q5",
            text: "How effective is your lead magnet at qualifying prospects?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "Not effective", maxLabel: "Very effective" }
          }
        ]
      },
      {
        name: "Sales & Conversion",
        questions: [
          {
            id: "q6",
            text: "How structured is your sales process?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "No structure", maxLabel: "Fully systemized" }
          },
          {
            id: "q7",
            text: "How confident are you in handling objections?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "Not confident", maxLabel: "Very confident" }
          }
        ]
      },
      {
        name: "Profit Optimization",
        questions: [
          {
            id: "q8",
            text: "How well do you understand your unit economics?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "Don't know", maxLabel: "Know precisely" }
          },
          {
            id: "q9",
            text: "How strong is your customer retention?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "Very weak", maxLabel: "Very strong" }
          }
        ]
      },
      {
        name: "Financial Control",
        questions: [
          {
            id: "q10",
            text: "How well do you track key performance indicators?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "Don't track", maxLabel: "Track daily" }
          },
          {
            id: "q11",
            text: "How accurate is your financial forecasting?",
            type: "scale",
            scale: { min: 1, max: 5, minLabel: "No forecasting", maxLabel: "Very accurate" }
          }
        ]
      }
    ]
  }
};

const DiagnosticAssessment = () => {
  const { diagnosticId } = useParams();
  const navigate = useNavigate();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});

  const diagnostic = diagnosticQuestions[diagnosticId as keyof typeof diagnosticQuestions];

  if (!diagnostic) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Diagnostic not found</h1>
          <Button onClick={() => navigate("/diagnostics")}>Back to Diagnostics</Button>
        </div>
      </AppLayout>
    );
  }

  const currentSection = diagnostic.sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];
  
  const totalQuestions = diagnostic.sections.reduce((acc, section) => acc + section.questions.length, 0);
  const currentQuestionNumber = diagnostic.sections
    .slice(0, currentSectionIndex)
    .reduce((acc, section) => acc + section.questions.length, 0) + currentQuestionIndex + 1;

  const progress = (Object.keys(responses).length / totalQuestions) * 100;

  const handleResponse = (value: number) => {
    setResponses({ ...responses, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < diagnostic.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Assessment complete
      navigate(`/reports/${diagnosticId}/results`, { state: { responses } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(diagnostic.sections[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const canProceed = responses[currentQuestion.id] !== undefined;

  return (
    <AppLayout>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Progress Header */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionNumber} of {totalQuestions}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <ProgressBar value={progress} />
          </div>

          {/* Question Card */}
          <Card className="max-w-3xl mx-auto p-8 md:p-12 shadow-lg">
            <div className="space-y-8">
              {/* Section Label */}
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {currentSection.name}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {currentQuestion.text}
                </h2>
              </div>

              {/* Response Options */}
              {currentQuestion.type === "scale" && (
                <div className="space-y-6">
                  <div className="flex flex-col gap-3">
                    {Array.from({ length: currentQuestion.scale.max }, (_, i) => i + 1).map((value) => (
                      <button
                        key={value}
                        onClick={() => handleResponse(value)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          responses[currentQuestion.id] === value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{value}</span>
                          {value === 1 && (
                            <span className="text-sm text-muted-foreground">
                              {currentQuestion.scale.minLabel}
                            </span>
                          )}
                          {value === currentQuestion.scale.max && (
                            <span className="text-sm text-muted-foreground">
                              {currentQuestion.scale.maxLabel}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                >
                  {currentSectionIndex === diagnostic.sections.length - 1 && 
                   currentQuestionIndex === currentSection.questions.length - 1
                    ? "Complete"
                    : "Next"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default DiagnosticAssessment;
