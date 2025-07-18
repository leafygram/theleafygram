import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Heart, Shield, Scale, Zap, Leaf, ShieldAlert, GitCommit, Loader2 } from 'lucide-react';

const planOptions = [
  { id: 'hair_fall', name: 'Hair Fall', icon: Heart },
  { id: 'immunity', name: 'Immunity', icon: Shield },
  { id: 'weight_loss', name: 'Weight Loss', icon: Scale },
  { id: 'complete_wellness', name: 'Complete Wellness', icon: Zap },
  { id: 'anti_ageing', name: 'Anti-Ageing', icon: Leaf },
  { id: 'liver_detox', name: 'Liver Detox', icon: ShieldAlert },
  { id: 'anti_diabetes', name: 'Anti-Diabetes', icon: GitCommit },
];

const frequencyOptions = [
  { id: 'one_time', name: 'One-time' },
  { id: 'weekly', name: 'Weekly' },
  { id: 'monthly', name: 'Monthly' },
];

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const paymentLink = 'https://rzp.io/l/leafygrams-test';

const PlanSelectionPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [deliveryDay, setDeliveryDay] = useState('');
  const [profile, setProfile] = useState({ phone_number: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [subscriptionExists, setSubscriptionExists] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (user) {
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('phone_number, address')
        .eq('id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile({
          phone_number: profileData.phone_number || '',
          address: profileData.address || '',
        });
        setIsEditingAddress(!profileData.address);
      }

      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (subData) {
        setSubscriptionExists(true);
        setSelectedPlan(subData.plan_type);
        setSelectedFrequency(subData.frequency);
        setDeliveryDay(subData.delivery_day);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPlan = async () => {
    if (!selectedPlan || !selectedFrequency || (selectedFrequency !== 'one_time' && !deliveryDay)) {
      toast({ variant: 'destructive', title: 'Selection Incomplete', description: 'Please fill all plan details.' });
      return;
    }
    setLoading(true);

    if (isEditingAddress) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({ phone_number: profile.phone_number, address: profile.address })
        .eq('id', user.id);
      
      if (profileError) {
        toast({ variant: 'destructive', title: 'Profile Update Failed', description: profileError.message });
        setLoading(false);
        return;
      }
    }

    const subscriptionData = {
      user_id: user.id,
      plan_type: selectedPlan,
      frequency: selectedFrequency,
      delivery_day: deliveryDay,
      status: 'Pending',
      payment_url: paymentLink,
      updated_at: new Date().toISOString(),
    };

    const { error } = subscriptionExists
      ? await supabase.from('subscriptions').update(subscriptionData).eq('user_id', user.id)
      : await supabase.from('subscriptions').insert({ ...subscriptionData, created_at: new Date().toISOString() });
    
    if (error) {
      toast({ variant: 'destructive', title: 'Oh no! Something went wrong.', description: error.message });
    } else {
      toast({ title: 'Plan Confirmed!', description: 'Your wellness plan has been saved.' });
      navigate('/dashboard');
    }
    setLoading(false);
  };
  
  return (
    <>
      <Helmet>
        <title>Select Your Plan - LeafyGrams</title>
        <meta name="description" content="Choose your personalized wellness plan from LeafyGrams." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{subscriptionExists ? 'Modify Your Plan' : 'Choose Your Wellness Path'}</h1>
            <p className="text-lg text-gray-600 mt-2">{subscriptionExists ? 'Update your preferences below.' : "Let's get your personalized microgreens plan started."}</p>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Select Plan Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {planOptions.map(plan => (
                  <motion.div key={plan.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={cn('w-full p-4 border-2 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all duration-200', selectedPlan === plan.id ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg' : 'bg-gray-50 hover:bg-emerald-100 hover:border-emerald-300 border-gray-200')}
                    >
                      <plan.icon className="w-8 h-8" />
                      <span className="font-semibold text-center">{plan.name}</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Select Frequency</h2>
                <Select onValueChange={(value) => { setSelectedFrequency(value); setDeliveryDay(''); }} value={selectedFrequency}>
                  <SelectTrigger><SelectValue placeholder="Choose frequency" /></SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map(freq => <SelectItem key={freq.id} value={freq.id}>{freq.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <AnimatePresence>
              {selectedFrequency && selectedFrequency !== 'one_time' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Select Delivery Day</h2>
                  <Select onValueChange={setDeliveryDay} value={deliveryDay}>
                    <SelectTrigger><SelectValue placeholder="Choose a day" /></SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">4. Delivery Details</h2>
                <Button variant="link" onClick={() => setIsEditingAddress(!isEditingAddress)}>
                  {isEditingAddress ? 'Hide' : 'Edit Address & Phone'}
                </Button>
              </div>
              <AnimatePresence>
              {isEditingAddress && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                  <div>
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input id="phone_number" name="phone_number" value={profile.phone_number} onChange={handleProfileChange} placeholder="Your phone number" />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={profile.address} onChange={handleProfileChange} placeholder="Your delivery address" />
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button onClick={handleConfirmPlan} disabled={loading} className="px-12 py-6 text-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-xl">
              {loading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
              {loading ? 'Saving...' : 'Confirm Plan'}
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PlanSelectionPage;