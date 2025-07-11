import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Users, Calendar } from "lucide-react";

export const JobHeader = () => {
  return (
    <div className="bg-background p-6 border-b border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Contract UX Researcher</h1>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Active
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Engineering</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Remote</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>24 Applicants</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Posted on 16 May 2025</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-6">
        <button className="text-muted-foreground hover:text-foreground border-b-2 border-transparent pb-2">
          Job Details
        </button>
        <button className="text-muted-foreground hover:text-foreground border-b-2 border-transparent pb-2">
          Applicants
        </button>
        <button className="text-primary border-b-2 border-primary pb-2 font-medium">
          Interview process
        </button>
      </div>
    </div>
  );
};