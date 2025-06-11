
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Save, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    monthlyIncome: "5000",
    monthlyExpenses: "3500",
    currentSavings: "2000",
    financialGoals: "Mencapai kebebasan finansial dalam 5 tahun dan membantu keluarga mencapai tujuan yang sama."
  });

  const handleSave = () => {
    // Simulate saving to database
    console.log("Saving profile:", profile);
    toast({
      title: "Profil Tersimpan!",
      description: "Informasi profil Anda telah berhasil diperbarui.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount) || 0;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const monthlyNetIncome = parseFloat(profile.monthlyIncome) - parseFloat(profile.monthlyExpenses);
  const savingsRate = parseFloat(profile.monthlyIncome) > 0 
    ? ((monthlyNetIncome / parseFloat(profile.monthlyIncome)) * 100).toFixed(1)
    : "0";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Profil Saya</h1>
        <p className="text-muted-foreground">
          Kelola informasi pribadi dan data keuangan Anda
        </p>
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
                {formatCurrency(profile.monthlyIncome)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Pengeluaran Bulanan</p>
              <p className="text-2xl font-bold text-destructive">
                {formatCurrency(profile.monthlyExpenses)}
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
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Edit Profil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income">Pendapatan Bulanan ($)</Label>
              <Input
                id="income"
                type="number"
                value={profile.monthlyIncome}
                onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expenses">Pengeluaran Bulanan ($)</Label>
              <Input
                id="expenses"
                type="number"
                value={profile.monthlyExpenses}
                onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="savings">Tabungan Saat Ini ($)</Label>
              <Input
                id="savings"
                type="number"
                value={profile.currentSavings}
                onChange={(e) => handleInputChange('currentSavings', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Tujuan Finansial</Label>
            <Textarea
              id="goals"
              value={profile.financialGoals}
              onChange={(e) => handleInputChange('financialGoals', e.target.value)}
              placeholder="Ceritakan tujuan finansial Anda..."
              rows={4}
            />
          </div>

          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="h-4 w-4" />
            Simpan Profil
          </Button>
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
              Sisa bulanan: {formatCurrency(monthlyNetIncome.toString())}
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
