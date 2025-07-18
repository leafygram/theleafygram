
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut, Edit, UserCircle, CheckCircle, Clock, Package, CreditCard, Loader2 } from 'lucide-react';

const UserDashboardPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (user) {
      setLoading(true);

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
      if (profileError) {
        toast({ variant: 'destructive', title: 'Error fetching profile', description: profileError.message });
      } else if (!profileData || !profileData.address) {
        navigate('/complete-profile', { replace: true });
        return;
      } else {
        setProfile(profileData);
      }
      
      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (subError) {
        toast({ variant: 'destructive', title: 'Error fetching subscription', description: subError.message });
      } else if (subData) {
        setSubscription(subData);
      } else {
        navigate('/select-plan', { replace: true });
        return;
      }
      
      setLoading(false);
    }
  }, [user, toast, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleMakePayment = () => {
    if (subscription?.payment_url) {
      window.open(subscription.payment_url, '_blank');
      toast({ title: 'Payment window opened!', description: 'After paying, click "Confirm Payment" to update your status.' });
    }
  };

  const confirmPayment = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: 'Confirmed' })
      .eq('user_id', user.id);
    
    if (error) {
      toast({ variant: 'destructive', title: 'Update failed', description: error.message });
    } else {
      toast({ title: 'Payment Confirmed!', description: 'Your subscription is now active.' });
      fetchData(); // Refetch data to show new status
    }
    setLoading(false);
  };
  
  const formatText = (text) => text ? text.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
        </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Dashboard - LeafyGrams</title>
        <meta name="description" content="Manage your LeafyGrams subscription and view your wellness plan." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4 sm:p-6 lg:p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Your Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {profile?.full_name || user?.email}!</p>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:bg-red-100 hover:text-red-600">
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </header>

          <main className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center"><UserCircle className="mr-3 text-emerald-500" /> Account Info</h2>
                <div className="space-y-3">
                    <p><strong>Name:</strong> {profile?.full_name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Phone:</strong> {profile?.phone_number || 'Not set'}</p>
                    <p><strong>Address:</strong> {profile?.address || 'Not set'}</p>
                </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-emerald-400 to-green-500 text-white rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 flex items-center"><Package className="mr-3" /> Plan Info</h2>
                <div className="space-y-3 text-lg">
                    <p><strong>Plan:</strong> {formatText(subscription?.plan_type)}</p>
                    <p><strong>Frequency:</strong> {formatText(subscription?.frequency)}</p>
                    {subscription?.delivery_day && <p><strong>Delivery:</strong> {subscription.delivery_day}</p>}
                    <p className="flex items-center capitalize"><strong>Status:</strong> 
                        {subscription?.status === 'Confirmed' ? <CheckCircle className="ml-2 mr-1 text-green-200" /> : <Clock className="ml-2 mr-1 text-yellow-200" />}
                        {subscription?.status}
                    </p>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button onClick={() => navigate('/modify-plan')} variant="outline" className="text-lg px-6 py-5 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
                <Edit className="mr-2 h-5 w-5" /> Modify Plan & Address
              </Button>
              {subscription?.status === 'Pending' && (
                <>
                <Button onClick={handleMakePayment} className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-5">
                  <CreditCard className="mr-2 h-5 w-5" /> Make Payment
                </Button>
                 <Button onClick={confirmPayment} className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-4 py-2 text-sm">
                  Confirm Payment
                </Button>
                </>
              )}
            </motion.div>
          </main>
        </motion.div>
      </div>
    </>
  );
};

export default UserDashboardPage;
