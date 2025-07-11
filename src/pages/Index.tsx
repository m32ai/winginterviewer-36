import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { JobHeader } from "@/components/JobHeader";
import { InterviewProcess } from "@/components/InterviewProcess";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <JobHeader />
          <InterviewProcess />
        </div>
      </div>
    </div>
  );
};

export default Index;
