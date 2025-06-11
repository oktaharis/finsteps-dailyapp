
import { useState } from "react";
import { FINANCIAL_STEPS } from "@/data/financialSteps";
import { FinancialStep } from "@/types/financial";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, DollarSign } from "lucide-react";

const ProgressPage = () => {
  const [steps] = useState<FinancialStep[]>(FINANCIAL_STEPS);

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const totalSavings = steps.reduce((sum, step) => {
    return sum + (step.current || 0);
  }, 0);

  const totalTargets = steps.reduce((sum, step) => {
    return sum + (step.target || 0);
  }, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStepProgress = (step: FinancialStep) => {
    if (step.completed) return 100;
    if (!step.target || !step.current) return 0;
    return Math.min((step.current / step.target) * 100, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Progress Overview</h1>
        <p className="text-muted-foreground">
          Pantau kemajuan Anda di setiap langkah menuju kebebasan finansial
        </p>
      </div>

      {/* Overall Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="financial-gradient text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm">Progress Keseluruhan</p>
                <p className="text-3xl font-bold">{progressPercentage.toFixed(0)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-white/90" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Tabungan</p>
                <p className="text-2xl font-bold">{formatCurrency(totalSavings)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-financial-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Langkah Selesai</p>
                <p className="text-2xl font-bold">{completedSteps}/{steps.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-financial-progress" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Detail per Langkah</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {steps.map((step) => (
            <div key={step.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{step.icon}</span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">Langkah {step.id}</p>
                  </div>
                </div>
                <Badge variant={step.completed ? "default" : "secondary"}>
                  {step.completed ? "Selesai" : `${getStepProgress(step).toFixed(0)}%`}
                </Badge>
              </div>

              <Progress value={getStepProgress(step)} className="h-2" />

              {step.target && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatCurrency(step.current || 0)}</span>
                  <span>{formatCurrency(step.target)}</span>
                </div>
              )}

              {step.notes && (
                <p className="text-sm text-muted-foreground bg-accent p-3 rounded-lg">
                  {step.notes}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Monthly Progress Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Grafik Progress Bulanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-accent/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">
              Grafik progress akan ditampilkan di sini setelah terintegrasi dengan database
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;
