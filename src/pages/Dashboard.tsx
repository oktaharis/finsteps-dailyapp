
import { useState } from "react";
import { FINANCIAL_STEPS } from "@/data/financialSteps";
import { FinancialStep } from "@/types/financial";
import StepCard from "@/components/StepCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [steps] = useState<FinancialStep[]>(FINANCIAL_STEPS);
  const navigate = useNavigate();

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const handleStepClick = (step: FinancialStep) => {
    navigate(`/step/${step.id}`);
  };

  const stats = [
    {
      title: "Total Progress",
      value: `${completedSteps}/${steps.length}`,
      icon: Target,
      color: "text-primary"
    },
    {
      title: "Langkah Selesai",
      value: completedSteps,
      icon: CheckCircle,
      color: "text-financial-success"
    },
    {
      title: "Langkah Tersisa",
      value: steps.length - completedSteps,
      icon: Clock,
      color: "text-financial-warning"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-financial-progress bg-clip-text text-transparent">
          Financial Staircase Tracker
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pantau perjalanan finansial Anda melalui 7 langkah menuju kebebasan finansial
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="financial-gradient text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="h-6 w-6" />
            Progress Keseluruhan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/90">Kemajuan Anda</span>
            <span className="text-2xl font-bold">{progressPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-white/20" />
          <p className="text-white/90 text-sm">
            Anda telah menyelesaikan {completedSteps} dari {steps.length} langkah menuju kebebasan finansial!
          </p>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">7 Langkah Keuangan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StepCard step={step} onClick={handleStepClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="bg-accent/50">
        <CardHeader>
          <CardTitle>💡 Tips Hari Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Mulai dengan langkah kecil! Bahkan menabung Rp 50.000 per minggu dapat membantu Anda mencapai target $1.000 dalam waktu kurang dari setahun.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
