
import { FinancialStep } from "@/types/financial";

export const FINANCIAL_STEPS: FinancialStep[] = [
  {
    id: 1,
    title: "Menabung $1,000",
    description: "Langkah pertama untuk memulai perjalanan finansial yang sehat. Targetkan menabung $1,000 sebagai buffer awal.",
    target: 1000,
    current: 0,
    completed: false,
    icon: "💰",
    color: "bg-blue-500",
    notes: ""
  },
  {
    id: 2,
    title: "Bayar Hutang Konsumen",
    description: "Lunasi semua hutang konsumen seperti kartu kredit, pinjaman pribadi, dan cicilan kendaraan.",
    completed: false,
    icon: "💳",
    color: "bg-red-500",
    notes: ""
  },
  {
    id: 3,
    title: "Dana Darurat 3-6 Bulan",
    description: "Kumpulkan dana darurat setara 3-6 bulan pengeluaran untuk menghadapi situasi tak terduga.",
    target: 0, // akan dihitung berdasarkan pengeluaran bulanan
    current: 0,
    completed: false,
    icon: "🛡️",
    color: "bg-green-500",
    notes: ""
  },
  {
    id: 4,
    title: "Investasi untuk Masa Depan",
    description: "Mulai berinvestasi 15% dari pendapatan kotor untuk membangun kekayaan jangka panjang.",
    completed: false,
    icon: "📈",
    color: "bg-purple-500",
    notes: ""
  },
  {
    id: 5,
    title: "Dana Pendidikan Anak",
    description: "Siapkan dana untuk pendidikan anak-anak, termasuk biaya kuliah dan kebutuhan pendidikan lainnya.",
    target: 0,
    current: 0,
    completed: false,
    icon: "🎓",
    color: "bg-yellow-500",
    notes: ""
  },
  {
    id: 6,
    title: "Bayar Lunas Rumah",
    description: "Lunasi KPR atau cicilan rumah untuk mencapai kebebasan finansial yang lebih besar.",
    completed: false,
    icon: "🏠",
    color: "bg-indigo-500",
    notes: ""
  },
  {
    id: 7,
    title: "Berbagi & Membantu",
    description: "Setelah mencapai kebebasan finansial, saatnya berbagi dan membantu sesama untuk mencapai tujuan yang sama.",
    completed: false,
    icon: "🤝",
    color: "bg-pink-500",
    notes: ""
  }
];
