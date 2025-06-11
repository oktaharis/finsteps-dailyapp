
import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Save, Settings, Loader2, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    monthly_income: "",
    monthly_expenses: "",
    current_savings: "",
    financial_goals: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        monthly_income: profile.monthly_income.toString(),
        monthly_expenses: profile.monthly_expenses.toString(),
        current_savings: profile.current_savings.toString(),
        financial_goals: profile.financial_goals || ""
      });
    }
  }, [profile]);

  const handleSave = async () => {
    const success = await updateProfile({
      name: formData.name,
      email: formData.email,
      monthly_income: parseFloat(formData.monthly_income) || 0,
      monthly_expenses: parseFloat(formData.monthly_expenses) || 0,
      current_savings: parseFloat(formData.current_savings) || 0,
      financial_goals: formData.financial_goals,
    });

    if (success) {
      setEditing(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      navigate('/auth');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p>Profile not found</p>
      </div>
    );
  }

  const monthlyNetIncome = profile.monthly_income - profile.monthly_expenses;
  const savingsRate = profile.monthly_income > 0 
    ? ((monthlyNetIncome / profile.monthly_income) * 100).toFixed(1)
    : "0";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Profil Saya</h1>
          <p className="text-muted-foreground">
            Kelola informasi pribadi dan data keuangan Anda
          </p>
        </div>
        <Button variant="outline" onClick={handleSignOut} className="gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informasi Profil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" />
              <AvatarFallback className="text-lg font-semibold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </div>
              <Badge variant="secondary">Financial Tracker User</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Pendapatan Bulanan</p>
              <p className="text-2xl font-bold text-financial-success">
                {formatCurrency(profile.monthly_income)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Pengeluaran Bulanan</p>
              <p className="text-2xl font-bold text-destructive">
                {formatCurrency(profile.monthly_expenses)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Tingkat Tabungan</p>
              <p className="text-2xl font-bold text-financial-progress">
                {savingsRate}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Edit Profil
            </div>
            <Button
              variant={editing ? "outline" : "default"}
              onClick={() => editing ? setEditing(false) : setEditing(true)}
            >
              {editing ? "Cancel" : "Edit"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!editing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">Pendapatan Bulanan ($)</Label>
              <Input
                id="income"
                type="number"
                value={formData.monthly_income}
                onChange={(e) => handleInputChange('monthly_income', e.target.value)}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expenses">Pengeluaran Bulanan ($)</Label>
              <Input
                id="expenses"
                type="number"
                value={formData.monthly_expenses}
                onChange={(e) => handleInputChange('monthly_expenses', e.target.value)}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="savings">Tabungan Saat Ini ($)</Label>
              <Input
                id="savings"
                type="number"
                value={formData.current_savings}
                onChange={(e) => handleInputChange('current_savings', e.target.value)}
                disabled={!editing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Tujuan Finansial</Label>
            <Textarea
              id="goals"
              value={formData.financial_goals}
              onChange={(e) => handleInputChange('financial_goals', e.target.value)}
              placeholder="Ceritakan tujuan finansial Anda..."
              rows={4}
              disabled={!editing}
            />
          </div>

          {editing && (
            <Button onClick={handleSave} className="w-full gap-2">
              <Save className="h-4 w-4" />
              Simpan Profil
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Financial Health Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle>💡 Skor Kesehatan Finansial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-financial-success mb-2">
              {monthlyNetIncome > 0 ? "Baik" : "Perlu Perbaikan"}
            </div>
            <p className="text-muted-foreground">
              Sisa bulanan: {formatCurrency(monthlyNetIncome)}
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Rekomendasi:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {monthlyNetIncome > 0 ? (
                <>
                  <li>• Tingkatkan tabungan dan investasi dengan sisa pendapatan</li>
                  <li>• Pertimbangkan untuk mempercepat pelunasan hutang</li>
                  <li>• Mulai membangun dana darurat jika belum ada</li>
                </>
              ) : (
                <>
                  <li>• Evaluasi dan kurangi pengeluaran yang tidak perlu</li>
                  <li>• Cari sumber pendapatan tambahan</li>
                  <li>• Buat anggaran bulanan yang realistis</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
