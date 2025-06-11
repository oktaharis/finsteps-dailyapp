import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FINANCIAL_STEPS } from "@/data/financialSteps";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Save, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StepDetail = () => {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getStepProgress, updateStepProgress, loading } = useUserProgress();
  
  const [currentAmount, setCurrentAmount] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);

  const step = FINANCIAL_STEPS.find(s => s.id === Number(stepId));
  const userProgress = getStepProgress(Number(stepId));

  useEffect(() => {
    if (userProgress) {
      setCurrentAmount(userProgress.current_amount.toString());
      setTargetAmount(userProgress.target_amount.toString());
      setNotes(userProgress.notes || "");
      setIsCompleted(userProgress.completed);
    } else if (step) {
      setCurrentAmount("0");
      setTargetAmount((step.target || 0).toString());
      setNotes(step.notes || "");
      setIsCompleted(false);
    }
  }, [userProgress, step]);

  const handleSave = async () => {
    if (!step) return;
    
    setSaving(true);
    const success = await updateStepProgress(step.id, {
      current_amount: parseFloat(currentAmount) || 0,
      target_amount: parseFloat(targetAmount) || 0,
      notes: notes,
      completed: isCompleted,
    });

    if (success) {
      toast({
        title: "Tersimpan!",
        description: "Progress Anda telah berhasil disimpan.",
      });
    }
    setSaving(false);
  };

  const toggleComplete = async () => {
    if (!step) return;
    
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);
    
    const success = await updateStepProgress(step.id, {
      current_amount: parseFloat(currentAmount) || 0,
      target_amount: parseFloat(targetAmount) || 0,
      notes: notes,
      completed: newCompleted,
    });

    if (success) {
      toast({
        title: newCompleted ? "Selamat! 🎉" : "Tandai Belum Selesai",
        description: newCompleted 
          ? "Anda telah menyelesaikan langkah ini!"
          : "Langkah ditandai sebagai belum selesai.",
      });
    }
  };

  const getProgressPercentage = () => {
    const current = parseFloat(currentAmount) || 0;
    const target = parseFloat(targetAmount) || 0;
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount) || 0;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!step) {
    return (
      <div className="text-center py-12">
        <p>Langkah tidak ditemukan</p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Kembali ke Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{step.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{step.title}</h1>
            <p className="text-muted-foreground">Langkah {step.id} dari 7</p>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <Card className={isCompleted ? "bg-green-50 border-green-200" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Status Progres</span>
            <Button
              variant={isCompleted ? "secondary" : "default"}
              onClick={toggleComplete}
              className="gap-2"
              disabled={saving}
            >
              <CheckCircle className="h-4 w-4" />
              {isCompleted ? "Tandai Belum Selesai" : "Tandai Selesai"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{step.description}</p>
          
          {step.target !== undefined && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{getProgressPercentage().toFixed(1)}%</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(currentAmount)}</span>
                <span>{formatCurrency(targetAmount)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Form */}
      <Card>
        <CardHeader>
          <CardTitle>Update Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step.target !== undefined && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current">Jumlah Saat Ini (Rp)</Label>
                <Input
                  id="current"
                  type="number"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target (Rp)</Label>
                <Input
                  id="target"
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan & Strategi</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tulis catatan, strategi, atau rencana untuk mencapai langkah ini..."
              rows={4}
            />
          </div>

          <Button onClick={handleSave} className="w-full gap-2" disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Menyimpan..." : "Simpan Progress"}
          </Button>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-accent/50">
        <CardHeader>
          <CardTitle>💡 Tips untuk Langkah Ini</CardTitle>
        </CardHeader>
        <CardContent>
          {step.id === 1 && (
            <p>Mulai dengan otomatisasi! Set transfer otomatis setiap gajian ke rekening tabungan terpisah.</p>
          )}
          {step.id === 2 && (
            <p>Gunakan metode debt snowball atau avalanche. Fokus pada satu hutang sambil bayar minimum yang lain.</p>
          )}
          {step.id === 3 && (
            <p>Hitung pengeluaran bulanan wajib Anda, lalu kalikan 3-6 bulan. Simpan di rekening yang mudah diakses.</p>
          )}
          {step.id === 4 && (
            <p>Mulai investasi di reksa dana indeks atau saham blue chip. Konsistensi lebih penting dari jumlah.</p>
          )}
          {step.id === 5 && (
            <p>Buka rekening khusus pendidikan anak. Manfaatkan investasi jangka panjang untuk inflasi pendidikan.</p>
          )}
          {step.id === 6 && (
            <p>Pertimbangkan pembayaran ekstra pokok KPR atau refinancing jika suku bunga turun.</p>
          )}
          {step.id === 7 && (
            <p>Mulai dengan 10% pendapatan untuk berbagi. Pilih organisasi atau program yang sesuai nilai Anda.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StepDetail;
