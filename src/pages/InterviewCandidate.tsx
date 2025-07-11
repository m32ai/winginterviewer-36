import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Dummy data for now; in a real app, fetch from backend or context
const dummyStages = [
  {
    id: 1,
    name: 'Screening Interview',
    questions: [
      'Tell us about yourself.',
      'Why are you interested in this role?',
      'What is your greatest strength?'
    ],
    assessmentMode: 'voice-video',
    schedulingLink: '',
    type: 'ai-fixed',
  },
  {
    id: 2,
    name: 'Human Interview',
    questions: [],
    assessmentMode: 'human-interviewer',
    schedulingLink: 'https://calendly.com/your-company/interview',
    type: 'human-interviewer',
  }
];

export default function InterviewCandidate() {
  const { stageId } = useParams();
  const [started, setStarted] = useState(false);
  const stage = dummyStages.find(s => s.id.toString() === stageId);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!stage) {
    return <div className="p-8 text-center text-danger">Invalid or missing interview link.</div>;
  }

  if (stage.type === 'human-interviewer') {
    return (
      <Card className="max-w-lg mx-auto mt-12 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">{stage.name}</h2>
        <p className="mb-4">This round is conducted by a human interviewer. Please use the link below to schedule your session:</p>
        <a href={stage.schedulingLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-2">Book Interview</a>
        <div className="text-muted-foreground text-xs">If you have questions, contact your recruiter.</div>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto mt-12 p-8">
      <h2 className="text-2xl font-bold mb-4">{stage.name}</h2>
      {!started ? (
        <div className="flex flex-col items-center gap-4">
          <p>Welcome! Click below to start your interview. You will answer each question in sequence.</p>
          <Button onClick={() => setStarted(true)} className="w-full">Start Interview</Button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <div className="font-semibold mb-2">Question {currentQ + 1} of {stage.questions.length}</div>
            <div className="mb-2">{stage.questions[currentQ]}</div>
            <Input
              placeholder="Type your answer here..."
              value={answers[currentQ] || ''}
              onChange={e => {
                const newAnswers = [...answers];
                newAnswers[currentQ] = e.target.value;
                setAnswers(newAnswers);
              }}
              className="mb-2"
            />
            <div className="flex gap-2">
              {currentQ > 0 && <Button variant="outline" onClick={() => setCurrentQ(currentQ - 1)}>Back</Button>}
              {currentQ < stage.questions.length - 1 ? (
                <Button onClick={() => setCurrentQ(currentQ + 1)} disabled={!answers[currentQ]}>Next</Button>
              ) : (
                <Button onClick={() => alert('Interview submitted!')}>Submit</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
} 