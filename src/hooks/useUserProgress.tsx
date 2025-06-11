
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface UserProgress {
  id: string;
  user_id: string;
  step_id: number;
  current_amount: number;
  target_amount: number;
  completed: boolean;
  notes: string | null;
}

export const useUserProgress = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('step_id');

      if (error) {
        console.error('Error fetching progress:', error);
        toast({
          title: "Error",
          description: "Failed to fetch progress data",
          variant: "destructive",
        });
      } else {
        setProgress(data || []);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStepProgress = async (stepId: number, updates: Partial<UserProgress>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          step_id: stepId,
          ...updates,
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating progress:', error);
        toast({
          title: "Error",
          description: "Failed to update progress",
          variant: "destructive",
        });
        return false;
      } else {
        // Update local state
        setProgress(prev => {
          const existing = prev.find(p => p.step_id === stepId);
          if (existing) {
            return prev.map(p => p.step_id === stepId ? data : p);
          } else {
            return [...prev, data];
          }
        });
        
        toast({
          title: "Success",
          description: "Progress updated successfully",
        });
        return true;
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      return false;
    }
  };

  const getStepProgress = (stepId: number) => {
    return progress.find(p => p.step_id === stepId);
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  return {
    progress,
    loading,
    updateStepProgress,
    getStepProgress,
    refetch: fetchProgress,
  };
};
