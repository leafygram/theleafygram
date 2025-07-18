
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Phone, Home, MapPin, Building, Globe, Heart, Scale, Leaf, GitCommit, ShieldAlert, Loader2 } from 'lucide-react';

const planOptions = [
  { id: 'hair_fall', name: 'Hair Fall', icon: Heart },
  { id: 'weight_loss', name: 'Weight Loss', icon: Scale },
  { id: 'anti_ageing', name: 'Anti-Ageing', icon: Leaf },
  { id: 'anti_diabetes', name: 'Anti-Diabetes', icon: GitCommit },
  { id: 'liver_detox', name: 'Liver Detox', icon: ShieldAlert },
];

const CompleteProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    if (user) {
        setFormData(prev => ({...prev, full_name: user.user_metadata?.full_name || ''}));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      toast({
        variant: 'destructive',
        title: 'Plan not selected',
        description: 'Please choose a subscription plan to continue.',
      });
      return;
    }
    setLoading(true);

    const profileData = {
      id: user.id,
      full_name: formData.full_name,
      phone_number: formData.phone_number,
      address: formData.address,
      pincode: formData.pincode,
      city: formData.city,
      state: formData.state,
      updated_at: new Date().toISOString(),
    };

    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert(profileData, { onConflict: 'id' });

    if (profileError) {
      toast({
        variant: 'destructive',
        title: 'Profile update failed',
        description: profileError.message,
      });
      setLoading(false);
      return;
    }
    
    const subscriptionData = {
      user_id: user.id,
      plan_type: selectedPlan,
      frequency: 'weekly', // Default frequency
      status: 'Pending',
      updated_at: new Date().toISOString(),
    };

    const { error: subError } = await supabase
      .from('subscriptions')
      .upsert(subscriptionData, { onConflict: 'user_id' });

    if (subError) {
        toast({
            variant: 'destructive',
            title: 'Subscription setup failed',
            description: subError.message,
        });
        setLoading(false);
    } else {
      toast({
        title: 'Profile complete!',
        description: "You're all set up. Welcome to the family!",
      });
      navigate('/dashboard');
    }
  };

  return (
    <>
      <Helmet>
        <title>Complete Your Profile - LeafyGrams</title>
        <meta name="description" content="Complete your profile to get started with LeafyGrams." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Just One More Step!</h1>
            <p className="text-gray-600 mt-2">Complete your profile to personalize your experience.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="flex items-center"><User className="mr-2 h-4 w-4" /> Full Name</Label>
                <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number" className="flex items-center"><Phone className="mr-2 h-4 w-4" /> Phone Number</Label>
                <Input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center"><Home className="mr-2 h-4 w-4" /> Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pincode" className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> Pincode</Label>
                <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center"><Building className="mr-2 h-4 w-4" /> City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="flex items-center"><Globe className="mr-2 h-4 w-4" /> State</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
                <Label className="flex items-center"><Heart className="mr-2 h-4 w-4" /> Choose Your Plan</Label>
                <Select onValueChange={setSelectedPlan} value={selectedPlan}>
                  <SelectTrigger><SelectValue placeholder="Select a wellness plan" /></SelectTrigger>
                  <SelectContent>
                    {planOptions.map(plan => (
                        <SelectItem key={plan.id} value={plan.id}>
                            <div className="flex items-center">
                                <plan.icon className="mr-2 h-4 w-4" />
                                {plan.name}
                            </div>
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-lg py-3" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Save and Go to Dashboard'}
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default CompleteProfilePage;
