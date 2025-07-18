import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Phone, Mail, MapPin, Leaf, Heart, Scale, Shield, Sparkles, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const RazorpayButton = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.async = true;
        script.dataset.payment_button_id = 'pl_QsUV0CT2NKpyUS';
        
        const form = document.getElementById('razorpay-form');
        form.appendChild(script);

        return () => {
            if (form && form.contains(script)) {
                form.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="flex justify-center mt-6">
            <form id="razorpay-form"></form>
        </div>
    );
};

const TrialPage = () => {
    const { toast } = useToast();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        pincode: '',
        wellness_goal: '',
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || '',
                name: user.user_metadata?.full_name || '',
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const submissionData = {
            ...formData,
            user_id: user?.id || null,
        };

        const { error } = await supabase.from('trial_submissions').insert([submissionData]);

        if (error) {
            toast({
                variant: 'destructive',
                title: 'Submission Failed!',
                description: error.message,
            });
            setLoading(false);
        } else {
            toast({
                title: 'Details Saved!',
                description: "Please complete the payment to finalize your trial.",
            });
            setShowPayment(true);
        }
        // Keep loading true to disable the form
    };

    const wellnessGoals = [
        { value: 'hair_fall', label: 'Hair Fall', icon: Heart },
        { value: 'weight_loss', label: 'Weight Loss', icon: Scale },
        { value: 'immunity', label: 'Immunity', icon: Shield },
        { value: 'detox', label: 'Detox', icon: Sparkles },
        { value: 'skin_glow', label: 'Skin Glow', icon: Brain },
    ];

    return (
        <>
            <Helmet>
                <title>Start Your Trial - LeafyGrams</title>
                <meta name="description" content="Sign up for a trial pack from LeafyGrams and kickstart your health journey." />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                        <div className="text-center space-y-2 mb-8">
                            <Link to="/">
                                <img 
                                    src="https://storage.googleapis.com/hostinger-horizons-assets-prod/8e7fb07c-d059-479a-a5c7-9dbe75087297/2ddd0e81fc8bd04bbde26d30750303bf.jpg" 
                                    alt="LeafyGrams Logo" 
                                    className="h-20 mx-auto"
                                />
                            </Link>
                            <h1 className="text-4xl font-bold">Your journey to better health starts here 🌱</h1>
                            <p className="text-lg text-gray-600">Tell us what you need, and we’ll deliver the right microgreens to your doorstep.</p>
                        </div>
                        
                        {!showPayment ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input id="name" type="text" placeholder="e.g. Anjali Sharma" className="pl-10" required value={formData.name} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Mobile Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input id="phone" type="tel" placeholder="e.g. 9876543210" className="pl-10" required value={formData.phone} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email ID</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input id="email" type="email" placeholder="e.g. anjali@example.com" className="pl-10" required value={formData.email} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Delivery Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input id="address" type="text" placeholder="House No, Street, Landmark" className="pl-10" required value={formData.address} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" type="text" placeholder="e.g. Delhi" required value={formData.city} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pincode">Pincode</Label>
                                        <Input id="pincode" type="text" placeholder="e.g. 110001" required value={formData.pincode} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="wellness-goal">Select Wellness Goal</Label>
                                    <Select required onValueChange={(value) => handleSelectChange('wellness_goal', value)} value={formData.wellness_goal}>
                                        <SelectTrigger id="wellness-goal" className="w-full">
                                            <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <div className="pl-6"><SelectValue placeholder="Choose your goal..." /></div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {wellnessGoals.map(goal => {
                                                const Icon = goal.icon;
                                                return (
                                                    <SelectItem key={goal.value} value={goal.value}>
                                                        <div className="flex items-center">
                                                            <Icon className="h-4 w-4 mr-2 text-gray-500" />
                                                            <span>{goal.label}</span>
                                                        </div>
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-lg py-6 mt-4" disabled={loading}>
                                    {loading ? 'Processing...' : 'Continue'}
                                </Button>

                                <p className="text-center text-xs text-gray-500 pt-4">
                                    Note: This is a one-time trial pack. For weekly or monthly subscriptions, check our full plans after your trial.
                                </p>
                            </form>
                        ) : (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-800">Complete Your Payment</h2>
                                <p className="text-gray-600 mt-2">Click the button below to finalize your trial pack order.</p>
                                <RazorpayButton />
                            </div>
                        )}
                    </div>
                     <p className="text-center text-sm text-gray-500 mt-6">
                        <Link to="/" className="font-medium text-emerald-600 hover:underline">
                            &larr; Back to Home
                        </Link>
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default TrialPage;