import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2 } from 'lucide-react';

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
  mcqOptions,
  updateMcqOption,
  mcqCorrectAnswers,
  setCorrectAnswer,
  showMcqConfig,
  toggleMcqConfig
}) {
  const questionKey = `${stageId}-${questionIndex}`;
  return (
    <div className="group hover:bg-muted/20 transition-colors rounded-lg p-1">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-2">
          <div className="p-3 border rounded-md bg-muted/50 space-y-2 hover:bg-muted/70 transition-colors group-hover:border-muted-foreground/30">
            {!isEditing ? (
              <div className="flex items-start justify-between gap-2 group/question">
                <div className="flex-1">
                  <p className="text-sm font-medium cursor-pointer hover:text-primary transition-colors mb-2" 
                    onClick={onEditChange}>
                    {question}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Type:</span>
                    {/* ...Type selector here if needed... */}
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
                  onChange={onEditChange}
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
            {/* ...MCQ and answer example logic here... */}
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