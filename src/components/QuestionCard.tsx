import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2 } from 'lucide-react';

interface QuestionCardProps {
  question: string;
  questionIndex: number;
  stageId: number;
  isEditing: boolean;
  editQuestionText: string;
  onEditChange: (value?: string | React.ChangeEvent<HTMLInputElement>) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onDelete: () => void;
  questionType: string;
  individualQuestionTypes: {[key: string]: string};
  setIndividualQuestionTypes: (types: {[key: string]: string}) => void;
  answerExamples: {[key: string]: string};
  showAnswerExample: {[key: string]: boolean};
  setShowAnswerExample: (examples: {[key: string]: boolean}) => void;
  saveAnswerExample: (questionKey: string, example: string) => void;
  setAnswerExamples: (examples: {[key: string]: string}) => void;
  mcqOptions: {[key: string]: string[]};
  updateMcqOption: (questionKey: string, optionIndex: number, value: string) => void;
  mcqCorrectAnswers: {[key: string]: number};
  setCorrectAnswer: (questionKey: string, optionIndex: number) => void;
  showMcqConfig: {[key: string]: boolean};
  toggleMcqConfig: (questionKey: string) => void;
}

export function QuestionCard({
  question,
  questionIndex,
  stageId,
  isEditing,
  editQuestionText,
  onEditChange,
  onEditSave,
  onEditCancel,
  onDelete,
  questionType,
  individualQuestionTypes,
  setIndividualQuestionTypes,
  answerExamples,
  showAnswerExample,
  setShowAnswerExample,
  saveAnswerExample,
  setAnswerExamples,
  mcqOptions,
  updateMcqOption,
  mcqCorrectAnswers,
  setCorrectAnswer,
  showMcqConfig,
  toggleMcqConfig
}: QuestionCardProps) {
  const questionKey = `${stageId}-${questionIndex}`;
  const currentQuestionType = individualQuestionTypes[questionKey] || "text-based";
  const currentAnswerExample = answerExamples[questionKey] || "";
  const currentMcqOptions = mcqOptions[questionKey] || ['', '', '', ''];
  const currentCorrectAnswer = mcqCorrectAnswers[questionKey] || 0;

  return (
    <div className="group hover:bg-muted/20 transition-colors rounded-lg p-1">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-2">
          <div className="p-3 border rounded-md bg-muted/50 space-y-2 hover:bg-muted/70 transition-colors group-hover:border-muted-foreground/30">
            {!isEditing ? (
              <div className="flex items-start justify-between gap-2 group/question">
                <div className="flex-1">
                  <p className="text-sm font-medium cursor-pointer hover:text-primary transition-colors mb-2" 
                    onClick={() => onEditChange()}>
                    {question}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Type:</span>
                    <Select 
                      value={currentQuestionType} 
                      onValueChange={(value) => {
                        setIndividualQuestionTypes({
                          ...individualQuestionTypes,
                          [questionKey]: value
                        });
                      }}
                    >
                      <SelectTrigger className="w-32 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-based">Text-based</SelectItem>
                        <SelectItem value="mcq">MCQ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all duration-200"
                  onClick={onEditChange}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  value={editQuestionText}
                  onChange={(e) => onEditChange(e)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') onEditSave();
                    else if (e.key === 'Escape') onEditCancel();
                  }}
                  className="text-sm font-medium"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={onEditCancel}>Cancel</Button>
                  <Button size="sm" onClick={onEditSave}>Save</Button>
                </div>
              </div>
            )}

            {/* Answer Example Section for Text-based Questions */}
            {currentQuestionType === "text-based" && (
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAnswerExample({...showAnswerExample, [questionKey]: !showAnswerExample[questionKey]})}
                  className="text-xs"
                >
                  {showAnswerExample[questionKey] ? 'Hide Answer Example' : 'Add Answer Example'}
                </Button>
                
                {showAnswerExample[questionKey] && (
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Good Answer Example:</div>
                    <Input
                      placeholder="Enter an example of a good answer..."
                      value={currentAnswerExample}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setAnswerExamples({
                          ...answerExamples,
                          [questionKey]: newValue
                        });
                      }}
                      className="text-xs"
                    />
                    <Button 
                      size="sm" 
                      onClick={() => saveAnswerExample(questionKey, currentAnswerExample)}
                      className="text-xs"
                    >
                      Save Answer Example
                    </Button>
                  </div>
                )}
                
                {currentAnswerExample && !showAnswerExample[questionKey] && (
                  <div className="mt-2 p-3 bg-accent/10 border border-primary/10 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-primary mb-1">Example Answer:</div>
                        <p className="text-xs text-foreground leading-relaxed">{currentAnswerExample}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-xs h-6 w-6 p-0 text-muted-foreground hover:text-primary"
                        onClick={() => setShowAnswerExample({...showAnswerExample, [questionKey]: true})}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MCQ Configuration Section */}
            {currentQuestionType === "mcq" && (
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => toggleMcqConfig(questionKey)}
                  className="text-xs"
                >
                  {showMcqConfig[questionKey] ? 'Hide MCQ Options' : 'Configure MCQ Options'}
                </Button>
                
                {showMcqConfig[questionKey] && (
                  <div className="space-y-2 p-3 border rounded-md bg-muted/30">
                    <div className="text-xs font-medium text-muted-foreground">Multiple Choice Options:</div>
                    {currentMcqOptions.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <span className="text-xs w-6">{String.fromCharCode(65 + optionIndex)}.</span>
                        <Input
                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                          value={option}
                          onChange={(e) => updateMcqOption(questionKey, optionIndex, e.target.value)}
                          className="flex-1 text-xs"
                        />
                        <Button
                          variant={currentCorrectAnswer === optionIndex ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCorrectAnswer(questionKey, optionIndex)}
                          className="text-xs"
                        >
                          {currentCorrectAnswer === optionIndex ? 'Correct' : 'Mark Correct'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            if (currentMcqOptions.length > 2) {
                              const newOptions = [...currentMcqOptions];
                              newOptions.splice(optionIndex, 1);
                              updateMcqOption(questionKey, optionIndex, '');
                            }
                          }}
                          disabled={currentMcqOptions.length <= 2}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs mt-2"
                      onClick={() => {
                        updateMcqOption(questionKey, currentMcqOptions.length, "");
                      }}
                    >
                      + Add Option
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 