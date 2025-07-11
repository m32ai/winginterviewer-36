import { Users, Briefcase, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: Briefcase, label: "Jobs", active: true },
  { icon: Users, label: "Candidates", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-background border-r border-border h-screen p-4">
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors",
              item.active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};