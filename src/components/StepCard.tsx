
import { FinancialStep } from "@/types/financial";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepCardProps {
  step: FinancialStep;
  onClick: (step: FinancialStep) => void;
  isClickable?: boolean;
}

const StepCard = ({ step, onClick, isClickable = true }: StepCardProps) => {
  const getProgressPercentage = () => {
    if (step.completed) return 100;
    if (!step.target || !step.current) return 0;
    return Math.min((step.current / step.target) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card 
      className={`relative transition-all duration-300 hover:shadow-lg animate-fade-in staircase-shadow ${
        isClickable ? 'cursor-pointer hover:scale-105' : ''
      } ${step.completed ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' : ''}`}
      onClick={() => isClickable && onClick(step)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{step.icon}</div>
            <div>
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <Badge variant={step.completed ? "default" : "secondary"}>
                Langkah {step.id}
              </Badge>
            </div>
          </div>
          {step.completed && (
            <div className="h-8 w-8 rounded-full bg-financial-success flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {step.description}
        </p>
        
        {(step.target || step.current) && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{getProgressPercentage().toFixed(0)}%</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
            {step.target && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(step.current || 0)}</span>
                <span>{formatCurrency(step.target)}</span>
              </div>
            )}
          </div>
        )}
        
        {step.notes && (
          <div className="p-3 bg-accent rounded-lg">
            <p className="text-sm text-accent-foreground">{step.notes}</p>
          </div>
        )}
        
        {isClickable && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full group"
          >
            <span>Lihat Detail</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StepCard;
