import React, { createContext, useContext, useEffect, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const { user, loading: authLoading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const checkOnboardingStatus = useCallback(async (currentUser) => {
    if (authLoading || !currentUser || isRedirecting) return;
    
    const publicRoutes = ['/', '/login', '/trial'];
    const currentPath = location.pathname;

    // If user is on a public page and not trying to log in, do nothing.
    if (publicRoutes.includes(currentPath) && currentPath !== '/login') {
        return;
    }

    setIsRedirecting(true);

    try {
        const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('id, address')
            .eq('id', currentUser.id)
            .maybeSingle();

        if (profileError) throw profileError;

        if (!profile) {
            if (currentPath !== '/complete-profile') {
                toast({
                    title: 'Let\'s get you set up!',
                    description: 'Complete your profile to continue.',
                });
                navigate('/complete-profile');
            }
            return;
        }

        const { data: subscription, error: subError } = await supabase
            .from('subscriptions')
            .select('id')
            .eq('user_id', currentUser.id)
            .maybeSingle();

        if (subError) throw subError;

        if (!subscription) {
            if (currentPath !== '/select-plan') {
                navigate('/select-plan');
            }
            return;
        }
        
        if (currentPath !== '/dashboard') {
            navigate('/dashboard');
        }

    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: `Failed to check your status: ${error.message}` });
        console.error("Onboarding check error:", error);
    } finally {
        setTimeout(() => setIsRedirecting(false), 500);
    }
  }, [authLoading, navigate, location.pathname, toast, isRedirecting]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          // Use a timeout to allow the welcome toast to be seen before redirecting
          setTimeout(() => {
            checkOnboardingStatus(session.user);
          }, 2000);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [checkOnboardingStatus]);


  // This effect handles the case where a user is already logged in and refreshes the page
  useEffect(() => {
    if (session && !authLoading && !isRedirecting) {
        const publicRoutes = ['/', '/login', '/trial'];
        if (!publicRoutes.includes(location.pathname)) {
            checkOnboardingStatus(user);
        }
    }
  }, [session, authLoading, user, location.pathname, isRedirecting, checkOnboardingStatus]);


  return (
    <AppStateContext.Provider value={{}}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);