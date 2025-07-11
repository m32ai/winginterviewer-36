import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GripVertical, Trash2, Plus, Send, Pen, Clock, Edit, Type, Video, Sparkles } from "lucide-react";
import { QuestionCard } from './QuestionCard';

export const InterviewProcess = () => {
  const [question, setQuestion] = useState("");
  const [roundName, setRoundName] = useState("Initial screening");
  const [editingStageName, setEditingStageName] = useState<{[key: number]: boolean}>({});
  const [editStageNameText, setEditStageNameText] = useState<{[key: number]: string}>({});
  const [timeLimit, setTimeLimit] = useState("");
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);
  const [autoTrigger, setAutoTrigger] = useState(true);
  const [assessmentMode, setAssessmentMode] = useState("voice-video");
  const [presetQuestions, setPresetQuestions] = useState("executive-assistant");
  const [newTemplateName, setNewTemplateName] = useState("");
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  
  // Predefined question templates with MCQ options and good answers
  const questionTemplates = {
    "executive-assistant": [
      {
        question: "Tell me about your experience managing executive calendars and scheduling.",
        goodAnswer: "I have 3+ years managing C-level calendars using Outlook and Calendly. I prioritize by urgency, buffer time for prep, coordinate across time zones, and maintain detailed scheduling protocols to prevent conflicts.",
        mcqOptions: null
      },
      {
        question: "How do you prioritize tasks when supporting multiple executives?",
        goodAnswer: "I use a matrix system based on urgency and impact. I maintain daily check-ins with each executive, use shared priority boards, and establish clear escalation procedures for conflicting demands.",
        mcqOptions: null
      },
      {
        question: "What is the most important skill for an Executive Assistant?",
        goodAnswer: null,
        mcqOptions: {
          options: ["Time Management", "Communication", "Discretion", "Technical Skills"],
          correctAnswer: 1
        }
      },
      {
        question: "Describe a time when you had to handle confidential information. How did you ensure security?",
        goodAnswer: "I handled merger discussions by using encrypted communication, limiting access on a need-to-know basis, securing physical documents in locked files, and never discussing details outside designated secure spaces.",
        mcqOptions: null
      },
      {
        question: "How do you handle travel arrangements and expense reporting?",
        goodAnswer: "I book through corporate platforms, compare costs vs. convenience, maintain detailed itineraries with backup options, track expenses in real-time using expense management software, and ensure compliance with company policies.",
        mcqOptions: null
      }
    ],
    "ux-researcher": [
      {
        question: "Walk me through your process for conducting user research.",
        goodAnswer: "I start with research objectives, choose appropriate methodologies (qualitative vs quantitative), recruit representative participants, conduct sessions with proper documentation, analyze findings using affinity mapping, and present actionable insights to stakeholders.",
        mcqOptions: null
      },
      {
        question: "Which research method is best for understanding user motivations?",
        goodAnswer: null,
        mcqOptions: {
          options: ["Surveys", "User Interviews", "A/B Testing", "Analytics"],
          correctAnswer: 1
        }
      },
      {
        question: "How do you choose between different research methodologies?",
        goodAnswer: "I consider research goals, timeline, budget, and participant availability. For behavioral data I use analytics/testing, for attitudes I use surveys, for deep insights I use interviews, and for usability I use testing sessions.",
        mcqOptions: null
      },
      {
        question: "Describe a time when research findings contradicted stakeholder assumptions.",
        goodAnswer: "Stakeholders assumed users wanted more features, but research showed they needed simpler navigation. I presented findings with user quotes and videos, proposed solutions based on user needs, and facilitated workshops to align the team.",
        mcqOptions: null
      },
      {
        question: "How do you ensure research insights are actionable for design teams?",
        goodAnswer: "I create user personas, journey maps, and design principles from research. I collaborate closely with designers, provide specific recommendations, and establish metrics to measure implementation success.",
        mcqOptions: null
      }
    ],
    "product-manager": [
      {
        question: "How do you prioritize features in a product roadmap?",
        goodAnswer: "I use frameworks like RICE or MoSCoW, considering user impact, business value, technical effort, and strategic alignment. I gather input from stakeholders, validate with user research, and maintain flexibility for market changes.",
        mcqOptions: null
      },
      {
        question: "What framework is most effective for feature prioritization?",
        goodAnswer: null,
        mcqOptions: {
          options: ["RICE", "Kano Model", "MoSCoW", "All depend on context"],
          correctAnswer: 3
        }
      },
      {
        question: "Describe your experience working with engineering and design teams.",
        goodAnswer: "I facilitate cross-functional collaboration through regular standups, clear requirements documentation, design reviews, and technical feasibility discussions. I ensure alignment on goals and maintain open communication channels.",
        mcqOptions: null
      },
      {
        question: "Tell me about a time when you had to make a difficult product decision.",
        goodAnswer: "I had to sunset a feature with low adoption but vocal users. I analyzed usage data, conducted user interviews, explored alternatives, communicated transparently with affected users, and provided migration support.",
        mcqOptions: null
      },
      {
        question: "How do you gather and analyze user feedback?",
        goodAnswer: "I use multiple channels: in-app feedback, user interviews, surveys, support tickets, and analytics. I categorize feedback by themes, validate with additional research, and prioritize based on frequency and impact.",
        mcqOptions: null
      }
    ],
    "sdr": [
      {
        question: "How do you research and identify potential prospects?",
        goodAnswer: "I use LinkedIn Sales Navigator, company websites, and industry reports to identify prospects. I analyze their role, company challenges, recent news, and mutual connections to personalize outreach effectively.",
        mcqOptions: null
      },
      {
        question: "What's the ideal cold email length for initial outreach?",
        goodAnswer: null,
        mcqOptions: {
          options: ["1-2 sentences", "50-125 words", "200+ words", "Length doesn't matter"],
          correctAnswer: 1
        }
      },
      {
        question: "Walk me through your process for crafting personalized outreach messages.",
        goodAnswer: "I research the prospect's role and company challenges, reference specific triggers like recent funding or job changes, highlight relevant value propositions, include social proof, and end with a clear, low-pressure call-to-action.",
        mcqOptions: null
      },
      {
        question: "How do you handle rejection and maintain motivation?",
        goodAnswer: "I view rejection as part of the process, not personal. I track metrics to see progress, celebrate small wins, learn from feedback, maintain a healthy pipeline, and focus on helping prospects solve problems rather than just selling.",
        mcqOptions: null
      },
      {
        question: "Describe your approach to qualifying leads and setting up meetings.",
        goodAnswer: "I use BANT or MEDDIC frameworks to qualify. I ask discovery questions about budget, timeline, decision-making process, and pain points. I position meetings as consultative discussions rather than sales pitches.",
        mcqOptions: null
      }
    ]
  };
  
  // State for managing questions and stages
  const [questions, setQuestions] = useState<string[]>([]);
  const [templateQuestions, setTemplateQuestions] = useState<string[]>([""]);
  const [customTemplates, setCustomTemplates] = useState<{[key: string]: string}>({});
  const [showAnswerExample, setShowAnswerExample] = useState<{[key: string]: boolean}>({});
  const [answerExamples, setAnswerExamples] = useState<{[key: string]: string}>({});
  const [currentAnswerExample, setCurrentAnswerExample] = useState("");
  const [mcqOptions, setMcqOptions] = useState<{[key: string]: string[]}>({});
  const [mcqCorrectAnswers, setMcqCorrectAnswers] = useState<{[key: string]: number}>({});
  const [showMcqConfig, setShowMcqConfig] = useState<{[key: string]: boolean}>({});
  const [editingQuestion, setEditingQuestion] = useState<{[key: string]: boolean}>({});
  const [editQuestionText, setEditQuestionText] = useState<{[key: string]: string}>({});
  const [individualQuestionTypes, setIndividualQuestionTypes] = useState<{[key: string]: string}>({});
  
  // Template creation specific state
  const [templateQuestionTypes, setTemplateQuestionTypes] = useState<{[key: number]: string}>({});
  const [templateMcqOptions, setTemplateMcqOptions] = useState<{[key: number]: string[]}>({});
  const [templateMcqCorrectAnswers, setTemplateMcqCorrectAnswers] = useState<{[key: number]: number}>({});
  const [templateShowMcqConfig, setTemplateShowMcqConfig] = useState<{[key: number]: boolean}>({});
  const [templateAnswerExamples, setTemplateAnswerExamples] = useState<{[key: number]: string}>({});
  const [templateShowAnswerExample, setTemplateShowAnswerExample] = useState<{[key: number]: boolean}>({});
  
  // AI Question Generation State
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [aiJobRole, setAiJobRole] = useState("");
  const [aiQuestionCount, setAiQuestionCount] = useState(5);
  const [aiQuestionType, setAiQuestionType] = useState("mixed");
  const [showAiGenerator, setShowAiGenerator] = useState(false);
  
  // Interview Mode and Scheduling State
  const [interviewModes, setInterviewModes] = useState<{[key: number]: string}>({});
  const [schedulingLinks, setSchedulingLinks] = useState<{[key: number]: string}>({});
  
  const [interviewStages, setInterviewStages] = useState([
    { 
      id: 1, 
      name: "Screening Interview", 
      questions: [] as string[],
      assessmentMode: "voice-video",
      timeLimit: "45",
      autoTrigger: true,
      presetQuestions: "executive-assistant",
      minMatchPercentage: "75",
      questionType: "open-ended"
    }
  ]);
  const [currentStageId, setCurrentStageId] = useState(1);

  const addQuestion = () => {
    if (question.trim()) {
      setQuestions([...questions, question]);
      setQuestion("");
    }
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addTemplateQuestion = () => {
    setTemplateQuestions([...templateQuestions, ""]);
  };

  const updateTemplateQuestion = (index: number, value: string) => {
    const updated = [...templateQuestions];
    updated[index] = value;
    setTemplateQuestions(updated);
  };

  const removeTemplateQuestion = (index: number) => {
    if (templateQuestions.length > 1) {
      setTemplateQuestions(templateQuestions.filter((_, i) => i !== index));
      // Clean up related state
      const newTemplateQuestionTypes = { ...templateQuestionTypes };
      const newTemplateMcqOptions = { ...templateMcqOptions };
      const newTemplateMcqCorrectAnswers = { ...templateMcqCorrectAnswers };
      const newTemplateShowMcqConfig = { ...templateShowMcqConfig };
      const newTemplateAnswerExamples = { ...templateAnswerExamples };
      const newTemplateShowAnswerExample = { ...templateShowAnswerExample };
      
      delete newTemplateQuestionTypes[index];
      delete newTemplateMcqOptions[index];
      delete newTemplateMcqCorrectAnswers[index];
      delete newTemplateShowMcqConfig[index];
      delete newTemplateAnswerExamples[index];
      delete newTemplateShowAnswerExample[index];
      
      setTemplateQuestionTypes(newTemplateQuestionTypes);
      setTemplateMcqOptions(newTemplateMcqOptions);
      setTemplateMcqCorrectAnswers(newTemplateMcqCorrectAnswers);
      setTemplateShowMcqConfig(newTemplateShowMcqConfig);
      setTemplateAnswerExamples(newTemplateAnswerExamples);
      setTemplateShowAnswerExample(newTemplateShowAnswerExample);
    }
  };

  const saveTemplate = () => {
    if (newTemplateName.trim() && templateQuestions.some(q => q.trim())) {
      const templateKey = newTemplateName.toLowerCase().replace(/\s+/g, '-');
      setCustomTemplates({
        ...customTemplates,
        [templateKey]: newTemplateName
      });
      setPresetQuestions(templateKey);
      setIsCreatingTemplate(false);
      setNewTemplateName("");
      setTemplateQuestions([""]);
      // Reset template-specific state
      setTemplateQuestionTypes({});
      setTemplateMcqOptions({});
      setTemplateMcqCorrectAnswers({});
      setTemplateShowMcqConfig({});
      setTemplateAnswerExamples({});
      setTemplateShowAnswerExample({});
    }
  };

  // Template MCQ helper functions
  const updateTemplateMcqOption = (questionIndex: number, optionIndex: number, value: string) => {
    const currentOptions = templateMcqOptions[questionIndex] || ['', '', '', ''];
    const newOptions = [...currentOptions];
    newOptions[optionIndex] = value;
    setTemplateMcqOptions({
      ...templateMcqOptions,
      [questionIndex]: newOptions
    });
  };

  const toggleTemplateMcqConfig = (questionIndex: number) => {
    setTemplateShowMcqConfig({
      ...templateShowMcqConfig,
      [questionIndex]: !templateShowMcqConfig[questionIndex]
    });
  };

  const setTemplateCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    setTemplateMcqCorrectAnswers({
      ...templateMcqCorrectAnswers,
      [questionIndex]: optionIndex
    });
  };

  const updateTemplateQuestionType = (questionIndex: number, questionType: string) => {
    setTemplateQuestionTypes({
      ...templateQuestionTypes,
      [questionIndex]: questionType
    });
  };

  const addInterviewStage = () => {
    const stageNames = ["Technical Interview", "Behavioral Interview", "Final Interview", "Case Study", "Presentation"];
    const newStage = {
      id: interviewStages.length + 1,
      name: stageNames[interviewStages.length] || `Interview Round ${interviewStages.length + 1}`,
      questions: [] as string[],
      assessmentMode: "voice-video",
      timeLimit: "45",
      autoTrigger: true,
      presetQuestions: "executive-assistant",
      minMatchPercentage: "75",
      questionType: "open-ended"
    };
    setInterviewStages([...interviewStages, newStage]);
  };

  const deleteStage = (stageId: number) => {
    if (interviewStages.length > 1) {
      setInterviewStages(interviewStages.filter(stage => stage.id !== stageId));
    }
  };

  const updateStageName = (stageId: number, newName: string) => {
    setInterviewStages(interviewStages.map(stage => 
      stage.id === stageId ? { ...stage, name: newName } : stage
    ));
  };

  const addQuestionToStage = (stageId: number) => {
    if (question.trim()) {
      const newQuestionIndex = interviewStages.find(s => s.id === stageId)?.questions.length || 0;
      const questionKey = `${stageId}-${newQuestionIndex}`;
      
      setInterviewStages(interviewStages.map(stage => 
        stage.id === stageId 
          ? { ...stage, questions: [...stage.questions, question] }
          : stage
      ));
      
      // Set default question type to text-based
      setIndividualQuestionTypes({
        ...individualQuestionTypes,
        [questionKey]: "text-based"
      });
      
      setQuestion("");
    }
  };

  const addEmptyQuestionToStage = (stageId: number) => {
    setInterviewStages(interviewStages.map(stage => 
      stage.id === stageId 
        ? { ...stage, questions: [...stage.questions, ""] }
        : stage
    ));
  };

  const removeQuestionFromStage = (stageId: number, questionIndex: number) => {
    setInterviewStages(interviewStages.map(stage => 
      stage.id === stageId 
        ? { ...stage, questions: stage.questions.filter((_, i) => i !== questionIndex) }
        : stage
    ));
  };

  const updateMcqOption = (questionKey: string, optionIndex: number, value: string) => {
    const currentOptions = mcqOptions[questionKey] || ['', '', '', ''];
    const newOptions = [...currentOptions];
    newOptions[optionIndex] = value;
    setMcqOptions({
      ...mcqOptions,
      [questionKey]: newOptions
    });
  };

  const toggleMcqConfig = (questionKey: string) => {
    setShowMcqConfig({
      ...showMcqConfig,
      [questionKey]: !showMcqConfig[questionKey]
    });
  };

  const setCorrectAnswer = (questionKey: string, optionIndex: number) => {
    setMcqCorrectAnswers({
      ...mcqCorrectAnswers,
      [questionKey]: optionIndex
    });
  };

  const startEditingQuestion = (stageId: number, questionIndex: number, questionText: string) => {
    const questionKey = `${stageId}-${questionIndex}`;
    setEditingQuestion({
      ...editingQuestion,
      [questionKey]: true
    });
    setEditQuestionText({
      ...editQuestionText,
      [questionKey]: questionText
    });
  };

  const saveEditedQuestion = (stageId: number, questionIndex: number) => {
    const questionKey = `${stageId}-${questionIndex}`;
    const newText = editQuestionText[questionKey];
    
    if (newText && newText.trim()) {
      setInterviewStages(interviewStages.map(stage => 
        stage.id === stageId 
          ? { 
              ...stage, 
              questions: stage.questions.map((q, i) => 
                i === questionIndex ? newText.trim() : q
              )
            }
          : stage
      ));
    }
    
    setEditingQuestion({
      ...editingQuestion,
      [questionKey]: false
    });
    setEditQuestionText({
      ...editQuestionText,
      [questionKey]: ""
    });
  };

  const cancelEditingQuestion = (stageId: number, questionIndex: number) => {
    const questionKey = `${stageId}-${questionIndex}`;
    setEditingQuestion({
      ...editingQuestion,
      [questionKey]: false
    });
    setEditQuestionText({
      ...editQuestionText,
      [questionKey]: ""
    });
  };

  const startEditingStageName = (stageId: number, stageName: string) => {
    setEditingStageName({
      ...editingStageName,
      [stageId]: true
    });
    setEditStageNameText({
      ...editStageNameText,
      [stageId]: stageName
    });
  };

  const saveEditedStageName = (stageId: number) => {
    const newText = editStageNameText[stageId];
    
    if (newText && newText.trim()) {
      updateStageName(stageId, newText.trim());
    }
    
    setEditingStageName({
      ...editingStageName,
      [stageId]: false
    });
    setEditStageNameText({
      ...editStageNameText,
      [stageId]: ""
    });
  };

  const cancelEditingStageName = (stageId: number) => {
    setEditingStageName({
      ...editingStageName,
      [stageId]: false
    });
    setEditStageNameText({
      ...editStageNameText,
      [stageId]: ""
    });
  };

  const saveAnswerExample = (questionKey: string, example: string) => {
    setAnswerExamples({
      ...answerExamples,
      [questionKey]: example
    });
    setShowAnswerExample({
      ...showAnswerExample,
      [questionKey]: false
    });
  };

  // AI Question Generation Functions
  const generateQuestionsWithAI = async (jobRole: string, count: number, questionType: string) => {
    setIsGeneratingQuestions(true);
    
    try {
      // Simulate AI API call with realistic questions
      const questions = await simulateAIQuestionGeneration(jobRole, count, questionType);
      return questions;
    } catch (error) {
      console.error('Error generating questions:', error);
      return [];
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const simulateAIQuestionGeneration = async (jobRole: string, count: number, questionType: string): Promise<string[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const questionTemplates = {
      "software-engineer": [
        "Describe a challenging technical problem you solved and the approach you took.",
        "How do you stay updated with the latest programming languages and frameworks?",
        "Walk me through your experience with code reviews and best practices.",
        "Explain a time when you had to optimize performance in a critical system.",
        "How do you handle conflicting requirements from different stakeholders?",
        "Describe your experience with testing methodologies and quality assurance.",
        "How do you approach debugging complex issues in production?",
        "Tell me about a project where you had to learn a new technology quickly."
      ],
      "product-manager": [
        "How do you prioritize features when resources are limited?",
        "Describe a time when you had to make a difficult product decision.",
        "How do you gather and validate user requirements?",
        "Walk me through your experience with agile methodologies.",
        "How do you handle feedback from multiple stakeholders?",
        "Describe a successful product launch you were involved in.",
        "How do you measure product success and iterate based on data?",
        "Tell me about a time when you had to pivot a product strategy."
      ],
      "ux-designer": [
        "Walk me through your design process from research to final deliverables.",
        "How do you handle feedback from stakeholders and users?",
        "Describe a time when you had to design for accessibility.",
        "How do you balance user needs with business requirements?",
        "Tell me about a project where you had to work with technical constraints.",
        "How do you conduct user research and translate insights into design?",
        "Describe a time when you had to defend your design decisions.",
        "How do you stay updated with design trends and best practices?"
      ],
      "data-scientist": [
        "Describe a complex data analysis project you worked on.",
        "How do you handle missing or inconsistent data?",
        "Walk me through your experience with machine learning models.",
        "How do you validate your findings and ensure accuracy?",
        "Describe a time when you had to explain technical concepts to non-technical stakeholders.",
        "How do you stay updated with the latest data science techniques?",
        "Tell me about a project where you had to work with large datasets.",
        "How do you approach feature engineering and model selection?"
      ],
      "marketing-manager": [
        "How do you develop and execute marketing campaigns?",
        "Describe a successful campaign you managed and the results achieved.",
        "How do you measure ROI and optimize marketing spend?",
        "Walk me through your experience with digital marketing channels.",
        "How do you handle budget constraints while achieving goals?",
        "Describe a time when you had to pivot a marketing strategy.",
        "How do you stay updated with marketing trends and best practices?",
        "Tell me about a campaign that didn't perform as expected and how you handled it."
      ]
    };

    const roleKey = jobRole.toLowerCase().replace(/\s+/g, '-');
    const availableQuestions = questionTemplates[roleKey as keyof typeof questionTemplates] || questionTemplates["software-engineer"];
    
    // Return random questions based on count
    const shuffled = availableQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const addGeneratedQuestionsToStage = async (stageId: number) => {
    // Use a default job role since we don't have job title/JD inputs in this component
    const defaultJobRole = "Software Engineer";
    
    const questions = await generateQuestionsWithAI(defaultJobRole, 5, "mixed");
    
    if (questions.length > 0) {
      setInterviewStages(interviewStages.map(stage => 
        stage.id === stageId 
          ? { ...stage, questions: [...stage.questions, ...questions] }
          : stage
      ));
      
      // Set question types for generated questions
      const stage = interviewStages.find(s => s.id === stageId);
      const startIndex = stage?.questions.length || 0;
      
      const newQuestionTypes: {[key: string]: string} = {};
      questions.forEach((_, index) => {
        const questionKey = `${stageId}-${startIndex + index}`;
        newQuestionTypes[questionKey] = "text-based";
      });
      
      setIndividualQuestionTypes({
        ...individualQuestionTypes,
        ...newQuestionTypes
      });
    }
  };

  const addGeneratedQuestionsToTemplate = async () => {
    if (!aiJobRole.trim()) return;
    
    const questions = await generateQuestionsWithAI(aiJobRole, aiQuestionCount, aiQuestionType);
    
    if (questions.length > 0) {
      setTemplateQuestions([...templateQuestions, ...questions]);
      
      // Set question types for generated template questions
      const startIndex = templateQuestions.length;
      const newQuestionTypes: {[key: number]: string} = {};
      questions.forEach((_, index) => {
        newQuestionTypes[startIndex + index] = "text-based";
      });
      
      setTemplateQuestionTypes({
        ...templateQuestionTypes,
        ...newQuestionTypes
      });
      
      setShowAiGenerator(false);
      setAiJobRole("");
    }
  };

  return (
    <div className="spacing-md bg-muted/30 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Interview Rounds</h2>
          <p className="text-muted-foreground">Set up multiple interview rounds, configure AI assistance, and customize questions for each stage</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Send className="h-4 w-4 mr-2" />
          Send Interview Invitations
        </Button>
      </div>

      {/* Interview Stages */}
      {interviewStages.map((stage, stageIndex) => (
        <div key={stage.id} className="material-card-elevated mb-8">
          <div className="spacing-md">
                          <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                    <span className="text-sm font-semibold text-primary">{stageIndex + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {editingStageName[stage.id] ? (
                        <Input
                          value={editStageNameText[stage.id] || ""}
                          onChange={(e) => setEditStageNameText({
                            ...editStageNameText,
                            [stage.id]: e.target.value
                          })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              saveEditedStageName(stage.id);
                            } else if (e.key === 'Escape') {
                              cancelEditingStageName(stage.id);
                            }
                          }}
                          onBlur={() => saveEditedStageName(stage.id)}
                          className="text-xl font-semibold h-auto py-1 px-2 border-primary/50 focus:border-primary"
                          autoFocus
                        />
                      ) : (
                        <h3 
                          className="text-xl font-semibold cursor-pointer hover:text-primary transition-colors" 
                          onClick={() => startEditingStageName(stage.id, stage.name)}
                        >
                          {stage.name}
                        </h3>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => startEditingStageName(stage.id, stage.name)}
                        className="h-7 w-7 p-0 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all duration-200"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      
                      <div className="flex items-center gap-6 ml-6">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`auto-trigger-${stage.id}`}
                              checked={true}
                              disabled={true}
                              className="data-[state=checked]:bg-primary scale-110"
                            />
                            <span className="text-sm font-semibold text-foreground">
                              Auto-Advance Qualified Candidates
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help text-muted-foreground">?</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>This feature is always enabled for now. Manual review will be available soon.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="mt-1">Round {stageIndex + 1}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const interviewLink = `https://winginterviewer-36-efkl4f4pd-serenechan.vercel.app/interview/${stage.id}?minMatch=${stage.minMatchPercentage || 75}`;
                      navigator.clipboard.writeText(interviewLink);
                    }}
                    className="text-xs h-8"
                  >
                    <Send className="h-3 w-3 mr-1" />
                    Copy Link
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteStage(stage.id)}
                    disabled={interviewStages.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            {/* Compact controls row */}
            <div className="flex flex-wrap items-end gap-6 mb-4">
              <div className="flex flex-col min-w-[120px]">
                <label className="text-xs font-medium mb-1">Min Match %</label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="75"
                    value={stage.minMatchPercentage || "75"}
                    onChange={(e) => {
                      setInterviewStages(interviewStages.map(s => 
                        s.id === stage.id ? { ...s, minMatchPercentage: e.target.value } : s
                      ));
                    }}
                    className="w-16 h-7 text-xs"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help text-muted-foreground text-xs">?</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Only candidates with a match score at or above this percentage will be invited to this round.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex flex-col min-w-[120px]">
                <label className="text-xs font-medium mb-1">Time Limit</label>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`time-limit-${stage.id}`}
                    checked={!!stage.timeLimit}
                    onCheckedChange={(checked) => {
                      setInterviewStages(interviewStages.map(s => 
                        s.id === stage.id ? { ...s, timeLimit: checked ? (s.timeLimit || "45") : "" } : s
                      ));
                    }}
                    className="data-[state=checked]:bg-primary scale-90"
                  />
                  {stage.timeLimit && (
                    <>
                      <Input
                        placeholder="45"
                        value={stage.timeLimit}
                        onChange={(e) => {
                          setInterviewStages(interviewStages.map(s => 
                            s.id === stage.id ? { ...s, timeLimit: e.target.value } : s
                          ));
                        }}
                        className="w-12 h-7 text-xs"
                      />
                      <span className="text-xs text-muted-foreground">min</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col min-w-[180px]">
                <label className="text-xs font-medium mb-1">Response Type</label>
                <div className="flex items-center gap-2">
                  <Type className={`h-3 w-3 transition-colors ${stage.assessmentMode === "text" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-xs transition-colors ${stage.assessmentMode === "text" ? "text-primary font-medium" : "text-muted-foreground"}`}>Text</span>
                  <Switch
                    id={`response-type-${stage.id}`}
                    checked={stage.assessmentMode === "voice-video"}
                    onCheckedChange={(checked) => {
                      setInterviewStages(interviewStages.map(s => 
                        s.id === stage.id ? { 
                          ...s, 
                          assessmentMode: checked ? "voice-video" : "text" 
                        } : s
                      ));
                    }}
                    className="data-[state=checked]:bg-primary scale-90"
                  />
                  <Video className={`h-3 w-3 transition-colors ${stage.assessmentMode === "voice-video" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-xs transition-colors ${stage.assessmentMode === "voice-video" ? "text-primary font-medium" : "text-muted-foreground"}`}>Voice + Video</span>
                </div>
              </div>
            </div>

            {/* Question Template and Interview Mode row */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Question Template</label>
                <Select value={stage.presetQuestions} onValueChange={(value) => {
                  if (value === "create-new") {
                    setIsCreatingTemplate(true);
                  } else {
                    // Replace questions with template questions
                    const templateQuestions = questionTemplates[value as keyof typeof questionTemplates];
                    if (templateQuestions) {
                      const newQuestions: string[] = [];
                      const newAnswerExamples: {[key: string]: string} = {};
                      const newMcqOptions: {[key: string]: string[]} = {};
                      const newMcqCorrectAnswers: {[key: string]: number} = {};
                      const newQuestionType = templateQuestions.some(tq => tq.mcqOptions) ? "mixed" : "open-ended";
                      
                      templateQuestions.forEach((tq, index) => {
                        newQuestions.push(tq.question);
                        const questionKey = `${stage.id}-${index}`;
                        
                        if (tq.goodAnswer) {
                          newAnswerExamples[questionKey] = tq.goodAnswer;
                        }
                        
                        if (tq.mcqOptions) {
                          newMcqOptions[questionKey] = tq.mcqOptions.options;
                          newMcqCorrectAnswers[questionKey] = tq.mcqOptions.correctAnswer;
                        }
                      });
                      
                      setAnswerExamples({...answerExamples, ...newAnswerExamples});
                      setMcqOptions({...mcqOptions, ...newMcqOptions});
                      setMcqCorrectAnswers({...mcqCorrectAnswers, ...newMcqCorrectAnswers});
                      
                      setInterviewStages(interviewStages.map(s => 
                        s.id === stage.id ? { 
                          ...s, 
                          presetQuestions: value,
                          questions: newQuestions,
                          questionType: newQuestionType
                        } : s
                      ));
                    } else {
                      setInterviewStages(interviewStages.map(s => 
                        s.id === stage.id ? { ...s, presetQuestions: value } : s
                      ));
                    }
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a question template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive-assistant">Executive Assistant Template</SelectItem>
                    <SelectItem value="ux-researcher">UX Researcher Template</SelectItem>
                    <SelectItem value="product-manager">Product Manager Template</SelectItem>
                    <SelectItem value="sdr">SDR (Sales Development Representative) Template</SelectItem>
                    {Object.entries(customTemplates).map(([key, name]) => (
                      <SelectItem key={key} value={key}>{name} (Custom)</SelectItem>
                    ))}
                    <SelectItem value="create-new" className="text-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Custom Template
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Pre-built question sets for specific roles
                </p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Interview Mode</label>
                <Select 
                  value={interviewModes[stage.id] || "ai-fixed"}
                  onValueChange={(value) => {
                    setInterviewModes({
                      ...interviewModes,
                      [stage.id]: value
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-fixed">
                      <div className="flex flex-col">
                        <span className="font-medium">AI / Fixed Questions</span>
                        <span className="text-xs text-muted-foreground">Pre-defined questions for consistency across candidates</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ai-freeflow">
                      <div className="flex flex-col">
                        <span className="font-medium">AI / Free Flow</span>
                        <span className="text-xs text-muted-foreground">Dynamic AI interview with follow-up questions</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ai-hybrid">
                      <div className="flex flex-col">
                        <span className="font-medium">AI / Fixed + Free Flow</span>
                        <span className="text-xs text-muted-foreground">Starts with fixed questions, then AI follow-ups</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="human-interviewer">
                      <div className="flex flex-col">
                        <span className="font-medium">Human Interviewer</span>
                        <span className="text-xs text-muted-foreground">Live human-conducted interview session</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="practical-assessment">
                      <div className="flex flex-col">
                        <span className="font-medium">Practical Assessment / Test</span>
                        <span className="text-xs text-muted-foreground">Coding challenges, skill tests, hands-on tasks</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>



            {/* Questions Section */}
            {interviewModes[stage.id] !== "human-interviewer" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium">Questions</h4>
                  {/* AI Question Generator - Only show for AI modes */}
                  {interviewModes[stage.id] !== "human-interviewer" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addGeneratedQuestionsToStage(stage.id)}
                      disabled={isGeneratingQuestions}
                      className="text-xs"
                    >
                      {isGeneratingQuestions ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Questions
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                {stage.questions.length > 0 ? (
                  stage.questions.map((q, questionIndex) => (
                    <QuestionCard
                      key={questionIndex}
                      question={q}
                      questionIndex={questionIndex}
                      stageId={stage.id}
                      isEditing={editingQuestion[`${stage.id}-${questionIndex}`]}
                      editQuestionText={editQuestionText[`${stage.id}-${questionIndex}`]}
                      onEditChange={() => startEditingQuestion(stage.id, questionIndex, q)}
                      onEditSave={() => saveEditedQuestion(stage.id, questionIndex)}
                      onEditCancel={() => cancelEditingQuestion(stage.id, questionIndex)}
                      onDelete={() => removeQuestionFromStage(stage.id, questionIndex)}
                      questionType={individualQuestionTypes[`${stage.id}-${questionIndex}`]}
                      individualQuestionTypes={individualQuestionTypes}
                      setIndividualQuestionTypes={setIndividualQuestionTypes}
                      answerExamples={answerExamples}
                      showAnswerExample={showAnswerExample}
                      setShowAnswerExample={setShowAnswerExample}
                      saveAnswerExample={saveAnswerExample}
                      mcqOptions={mcqOptions}
                      updateMcqOption={updateMcqOption}
                      mcqCorrectAnswers={mcqCorrectAnswers}
                      setCorrectAnswer={setCorrectAnswer}
                      showMcqConfig={showMcqConfig}
                      toggleMcqConfig={toggleMcqConfig}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground flex flex-col items-center gap-4">
                    No questions added yet.
                    <div className="flex gap-3 justify-center">
                      <Button onClick={() => addGeneratedQuestionsToStage(stage.id)} className="bg-secondary text-secondary-foreground">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Questions
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">Use the button above to quickly generate questions for this round.</div>
                  </div>
                )}
                
                {/* Add Question Button at the bottom */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Type your question here..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addQuestionToStage(stage.id);
                          }
                        }}
                        className="text-sm"
                      />
                    </div>
                    <Button 
                      onClick={() => addQuestionToStage(stage.id)}
                      disabled={!question.trim()}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-medium"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Press Enter or click "Add Question" to add this question to the interview
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Add New Stage Button */}
      <Button 
        onClick={addInterviewStage}
        variant="outline" 
        className="w-full h-16 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add New Interview Round
      </Button>

      {/* Template Creation Dialog */}
      <Dialog open={isCreatingTemplate} onOpenChange={setIsCreatingTemplate}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Custom Question Template</DialogTitle>
            <p className="text-sm text-muted-foreground">Build a reusable question set for specific roles or interview types</p>
          </DialogHeader>
            <div>
              <Label htmlFor="templateName" className="text-sm font-medium">Template Name</Label>
              <Input
                id="templateName"
                placeholder="e.g., Software Engineer Template, Marketing Manager Template"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                className="mt-1"
              />
            </div>
            {/* Removed job role/description input */}
            <div className="flex items-center gap-3">
              <Button
                onClick={async () => {
                  setIsGeneratingQuestions(true);
                  try {
                    const questions = await generateQuestionsWithAI("Software Engineer", 5, "mixed"); // Default job role
                    if (questions.length > 0) {
                      setTemplateQuestions(questions);
                    }
                  } catch (err) {
                    // Optionally show error
                  } finally {
                    setIsGeneratingQuestions(false);
                  }
                }}
                disabled={!newTemplateName.trim() || isGeneratingQuestions}
                className="bg-primary text-primary-foreground"
              >
                {isGeneratingQuestions ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Questions
                  </>
                )}
              </Button>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Questions</Label>
              <div className="space-y-3">
                {templateQuestions.map((question, index) => {
                  const questionType = templateQuestionTypes[index] || "text-based";
                  
                  return (
                    <div key={index} className="group hover:bg-muted/20 transition-colors rounded-lg p-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="p-3 border rounded-md bg-muted/50 space-y-2 hover:bg-muted/70 transition-colors group-hover:border-muted-foreground/30">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground">Question {index + 1}</span>
                                <Select 
                                  value={questionType} 
                                  onValueChange={(value) => updateTemplateQuestionType(index, value)}
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
                            
                            <Input
                              placeholder="Enter your interview question..."
                              value={question}
                              onChange={(e) => updateTemplateQuestion(index, e.target.value)}
                              className="text-sm font-medium"
                            />
                            
                            {/* Answer Example Section */}
                            {(questionType === "text-based") && (
                              <div className="space-y-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setTemplateShowAnswerExample({...templateShowAnswerExample, [index]: !templateShowAnswerExample[index]})}
                                  className="text-xs"
                                >
                                  {templateShowAnswerExample[index] ? 'Hide Answer Example' : 'Add Answer Example'}
                                </Button>
                                
                                {templateShowAnswerExample[index] && (
                                  <div className="space-y-2">
                                    <div className="text-xs font-medium text-muted-foreground">Good Answer Example:</div>
                                    <Input
                                      placeholder="Enter an example of a good answer..."
                                      value={templateAnswerExamples[index] || ""}
                                      onChange={(e) => setTemplateAnswerExamples({
                                        ...templateAnswerExamples,
                                        [index]: e.target.value
                                      })}
                                      className="text-xs"
                                    />
                                  </div>
                                )}
                                
                                {templateAnswerExamples[index] && !templateShowAnswerExample[index] && (
                                  <div className="mt-2 p-3 bg-accent/10 border border-primary/10 rounded-lg">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        <div className="text-xs font-medium text-primary mb-1">Example Answer:</div>
                                        <p className="text-xs text-foreground leading-relaxed">{templateAnswerExamples[index]}</p>
                                      </div>
                                      <Button 
                                        size="sm" 
                                        variant="ghost"
                                        className="text-xs h-6 w-6 p-0 text-muted-foreground hover:text-primary"
                                        onClick={() => setTemplateShowAnswerExample({...templateShowAnswerExample, [index]: true})}
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* MCQ Configuration Section */}
                            {questionType === "mcq" && (
                              <div className="space-y-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => toggleTemplateMcqConfig(index)}
                                  className="text-xs"
                                >
                                  {templateShowMcqConfig[index] ? 'Hide MCQ Options' : 'Configure MCQ Options'}
                                </Button>
                                
                                {templateShowMcqConfig[index] && (
                                  <div className="space-y-2 p-3 border rounded-md bg-muted/30">
                                    <div className="text-xs font-medium text-muted-foreground">Multiple Choice Options:</div>
                                    {templateMcqOptions[index]?.map((option, optionIndex) => (
                                      <div key={optionIndex} className="flex items-center gap-2">
                                        <span className="text-xs w-6">{String.fromCharCode(65 + optionIndex)}.</span>
                                        <Input
                                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                          value={option}
                                          onChange={(e) => updateTemplateMcqOption(index, optionIndex, e.target.value)}
                                          className="flex-1 text-xs"
                                        />
                                        <Button
                                          variant={templateMcqCorrectAnswers[index] === optionIndex ? "default" : "outline"}
                                          size="sm"
                                          onClick={() => setTemplateCorrectAnswer(index, optionIndex)}
                                          className="text-xs"
                                        >
                                          {templateMcqCorrectAnswers[index] === optionIndex ? 'Correct' : 'Mark Correct'}
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-xs"
                                          onClick={() => {
                                            if ((templateMcqOptions[index]?.length || 0) > 2) {
                                              const newOptions = [...(templateMcqOptions[index] || [])];
                                              newOptions.splice(optionIndex, 1);
                                              setTemplateMcqOptions({ ...templateMcqOptions, [index]: newOptions });
                                            }
                                          }}
                                          disabled={(templateMcqOptions[index]?.length || 0) <= 2}
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
                                        setTemplateMcqOptions({
                                          ...templateMcqOptions,
                                          [index]: [...(templateMcqOptions[index] || ["",""]), ""]
                                        });
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
                          onClick={() => removeTemplateQuestion(index)}
                          disabled={templateQuestions.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
                <Button 
                  variant="outline" 
                  onClick={addTemplateQuestion}
                  className="w-full border-dashed border-2 h-12 text-muted-foreground hover:text-primary hover:border-primary/50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Question
                </Button>
                

            
            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button variant="outline" onClick={() => setIsCreatingTemplate(false)}>
                Cancel
              </Button>
              <Button onClick={saveTemplate} className="min-w-24">
                Save Template
              </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};