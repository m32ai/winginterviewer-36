import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GripVertical, Trash2, Plus, Send, Pen, Clock, Edit, Type, Video } from "lucide-react";

export const InterviewProcess = () => {
  const [question, setQuestion] = useState("");
  const [roundName, setRoundName] = useState("Initial screening");
  const [editingStageName, setEditingStageName] = useState<{[key: number]: boolean}>({});
  const [editStageNameText, setEditStageNameText] = useState<{[key: number]: string}>({});
  const [timeLimit, setTimeLimit] = useState("");
  const [autoTrigger, setAutoTrigger] = useState(true);
  const [assessmentMode, setAssessmentMode] = useState("text");
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
  const [interviewStages, setInterviewStages] = useState([
    { 
      id: 1, 
      name: "Initial screening", 
      questions: [] as string[],
      assessmentMode: "text",
      timeLimit: "",
      autoTrigger: true,
      presetQuestions: "executive-assistant",
      minMatchPercentage: "",
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
    }
  };

  const addInterviewStage = () => {
    const newStage = {
      id: interviewStages.length + 1,
      name: `Round ${interviewStages.length + 1}`,
      questions: [] as string[],
      assessmentMode: "text",
      timeLimit: "",
      autoTrigger: true,
      presetQuestions: "executive-assistant",
      minMatchPercentage: "",
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
      setInterviewStages(interviewStages.map(stage => 
        stage.id === stageId 
          ? { ...stage, questions: [...stage.questions, question] }
          : stage
      ));
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
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
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
                        className="text-lg font-semibold h-auto py-1 px-2 border-primary/50 focus:border-primary"
                        autoFocus
                      />
                    ) : (
                      <h3 
                        className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors" 
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
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-sm font-medium cursor-help">Response Type:</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Choose how candidates will respond to questions</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div className="flex items-center gap-2">
                          <Type className={`h-4 w-4 transition-colors ${stage.assessmentMode === "text" ? "text-primary" : "text-muted-foreground"}`} />
                          <span className={`text-sm transition-colors ${stage.assessmentMode === "text" ? "text-primary font-medium" : "text-muted-foreground"}`}>Text</span>
                        </div>
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
                          className="data-[state=checked]:bg-primary"
                        />
                        <div className="flex items-center gap-2">
                          <Video className={`h-4 w-4 transition-colors ${stage.assessmentMode === "voice-video" ? "text-primary" : "text-muted-foreground"}`} />
                          <span className={`text-sm transition-colors ${stage.assessmentMode === "voice-video" ? "text-primary font-medium" : "text-muted-foreground"}`}>Voice + Video</span>
                        </div>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 cursor-help">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="30 min"
                                value={stage.timeLimit}
                                onChange={(e) => {
                                  setInterviewStages(interviewStages.map(s => 
                                    s.id === stage.id ? { ...s, timeLimit: e.target.value } : s
                                  ));
                                }}
                                className="w-20 h-8 text-sm"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Set a time limit for this interview round (optional)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 cursor-help">
                              <span className="text-sm font-medium">Min Match %:</span>
                              <Input
                                placeholder="75"
                                value={stage.minMatchPercentage || ""}
                                onChange={(e) => {
                                  setInterviewStages(interviewStages.map(s => 
                                    s.id === stage.id ? { ...s, minMatchPercentage: e.target.value } : s
                                  ));
                                }}
                                className="w-16 h-8 text-sm"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Minimum score required to proceed to next round</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 cursor-help">
                              <span className="text-sm font-medium">Type:</span>
                              <Select value={stage.questionType || "open-ended"} onValueChange={(value) => {
                                setInterviewStages(interviewStages.map(s => 
                                  s.id === stage.id ? { ...s, questionType: value } : s
                                ));
                              }}>
                                <SelectTrigger className="w-32 h-8 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="open-ended">Open-ended</SelectItem>
                                  <SelectItem value="mcq">MCQ</SelectItem>
                                  <SelectItem value="mixed">Mixed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Type of questions in this round</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-1">Round {stageIndex + 1}</Badge>
                </div>
              </div>
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
                <Select defaultValue="ai-fixed">
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

            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium mb-2 block">Auto-Trigger Next Round</label>
                <div className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/30">
                  <Switch 
                    id={`auto-trigger-${stage.id}`}
                    checked={stage.autoTrigger}
                    onCheckedChange={(checked) => {
                      setInterviewStages(interviewStages.map(s => 
                        s.id === stage.id ? { ...s, autoTrigger: checked } : s
                      ));
                    }}
                    className="data-[state=checked]:bg-primary"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`auto-trigger-${stage.id}`} className="text-sm font-medium cursor-pointer">
                      {stage.autoTrigger ? "Enabled" : "Disabled"} - Automatically proceed to next round
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stage.autoTrigger 
                        ? "Candidates meeting the minimum score will automatically advance" 
                        : "Manual review required before advancing candidates"}
                    </p>
                  </div>
                  <Badge variant={stage.autoTrigger ? "default" : "secondary"} className="ml-2">
                    {stage.autoTrigger ? "ON" : "OFF"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium">Questions</h4>
              </div>
              
              {stage.questions.length > 0 ? (
                <div className="space-y-3">
                  {stage.questions.map((q, questionIndex) => {
                    const questionKey = `${stage.id}-${questionIndex}`;
                    const isEditing = editingQuestion[questionKey];
                    
                    return (
                      <div key={questionIndex} className="group hover:bg-muted/20 transition-colors rounded-lg p-1">
                        <div className="flex items-start gap-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground mt-3 cursor-move opacity-0 group-hover:opacity-60 transition-opacity" />
                          
                          <div className="flex-1 space-y-2">
                            <div className="p-3 border rounded-md bg-muted/50 space-y-2 hover:bg-muted/70 transition-colors group-hover:border-muted-foreground/30">
                              {!isEditing ? (
                                <div className="flex items-start justify-between gap-2 group/question">
                                  <p className="text-sm font-medium flex-1 cursor-pointer hover:text-primary transition-colors" 
                                     onClick={() => startEditingQuestion(stage.id, questionIndex, q)}>
                                    {q}
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 transition-all duration-200"
                                    onClick={() => startEditingQuestion(stage.id, questionIndex, q)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <Input
                                    value={editQuestionText[questionKey] || ""}
                                    onChange={(e) => setEditQuestionText({
                                      ...editQuestionText,
                                      [questionKey]: e.target.value
                                    })}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        saveEditedQuestion(stage.id, questionIndex);
                                      } else if (e.key === 'Escape') {
                                        cancelEditingQuestion(stage.id, questionIndex);
                                      }
                                    }}
                                    className="text-sm font-medium"
                                    autoFocus
                                  />
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => cancelEditingQuestion(stage.id, questionIndex)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      size="sm"
                                      onClick={() => saveEditedQuestion(stage.id, questionIndex)}
                                    >
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {!isEditing && (stage.questionType === "open-ended" || stage.questionType === "mixed") && (
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-auto p-1"
                                    onClick={() => setShowAnswerExample({...showAnswerExample, [questionKey]: true})}
                                  >
                                    {answerExamples[questionKey] ? 'Edit Good Answer Example' : 'Add Good Answer Example'}
                                  </Button>
                                </div>
                              )}
                            </div>

                            {!isEditing && (stage.questionType === "open-ended" || stage.questionType === "mixed") && showAnswerExample[questionKey] && (
                              <div className="space-y-2">
                                <div className="text-xs font-medium text-muted-foreground">Good Answer Example:</div>
                                <Input
                                  placeholder="Enter an example of a good answer..."
                                  value={answerExamples[questionKey] || ""}
                                  onChange={(e) => setAnswerExamples({
                                    ...answerExamples,
                                    [questionKey]: e.target.value
                                  })}
                                  className="text-xs"
                                />
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-xs"
                                    onClick={() => {
                                      setShowAnswerExample({...showAnswerExample, [questionKey]: false});
                                      setAnswerExamples({
                                        ...answerExamples,
                                        [questionKey]: ""
                                      });
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    size="sm"
                                    className="text-xs"
                                    onClick={() => saveAnswerExample(questionKey, answerExamples[questionKey] || "")}
                                  >
                                    Save
                                  </Button>
                                </div>
                              </div>
                            )}
                            
                            {!isEditing && (stage.questionType === "open-ended" || stage.questionType === "mixed") && answerExamples[questionKey] && !showAnswerExample[questionKey] && (
                              <div className="mt-2 p-2 bg-accent/20 border border-primary/20 rounded-md">
                                <div className="text-xs font-medium text-muted-foreground mb-1">Good Answer Example:</div>
                                <p className="text-xs text-foreground">{answerExamples[questionKey]}</p>
                                 <Button 
                                   size="sm" 
                                   variant="ghost"
                                   className="text-xs h-auto p-1 mt-1"
                                   onClick={() => setShowAnswerExample({...showAnswerExample, [questionKey]: true})}
                                 >
                                   <Edit className="h-3 w-3 mr-1" />
                                   Edit
                                 </Button>
                              </div>
                            )}

                            {(stage.questionType === "mcq" || stage.questionType === "mixed") && !isEditing && (
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
                                    {[0, 1, 2, 3].map((optionIndex) => (
                                      <div key={optionIndex} className="flex items-center gap-2">
                                        <span className="text-xs w-6">{String.fromCharCode(65 + optionIndex)}.</span>
                                        <Input
                                          placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                          value={mcqOptions[questionKey]?.[optionIndex] || ""}
                                          onChange={(e) => updateMcqOption(questionKey, optionIndex, e.target.value)}
                                          className="flex-1 text-xs"
                                        />
                                        <Button
                                          variant={mcqCorrectAnswers[questionKey] === optionIndex ? "default" : "outline"}
                                          size="sm"
                                          onClick={() => setCorrectAnswer(questionKey, optionIndex)}
                                          className="text-xs"
                                        >
                                          {mcqCorrectAnswers[questionKey] === optionIndex ? 'Correct' : 'Mark Correct'}
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
                            onClick={() => removeQuestionFromStage(stage.id, questionIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                 <div className="text-center py-8 text-muted-foreground">
                   No questions added yet. Use the "Add Question" button below to get started.
                 </div>
               )}
               
               {/* Add Question Button at the bottom */}
               <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                 <Input
                   placeholder="Add new question"
                   value={question}
                   onChange={(e) => setQuestion(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                       addQuestionToStage(stage.id);
                     }
                   }}
                   className="flex-1"
                 />
                 <Button 
                   onClick={() => addQuestionToStage(stage.id)}
                   className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                 >
                   <Plus className="h-4 w-4" />
                 </Button>
               </div>
             </div>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Custom Question Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="templateName">Template Name</Label>
              <Input
                id="templateName"
                placeholder="e.g., Software Engineer Template"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Questions</Label>
              <div className="space-y-2">
                {templateQuestions.map((question, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Question ${index + 1}`}
                      value={question}
                      onChange={(e) => updateTemplateQuestion(index, e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTemplateQuestion(index)}
                      disabled={templateQuestions.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addTemplateQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsCreatingTemplate(false)}>
                Cancel
              </Button>
              <Button onClick={saveTemplate}>
                Save Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};