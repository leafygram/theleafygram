
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Key, Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56,12.25C22.56,11.45 22.49,10.68 22.36,9.92H12.27V14.4H18.2C17.93,16.03 17.01,17.41 15.61,18.33V21.1H19.5C21.52,19.22 22.56,16.05 22.56,12.25Z"
    />
    <path
      fill="#34A853"
      d="M12.27,24C15.3,24 17.84,23.04 19.5,21.1L15.61,18.33C14.63,18.99 13.53,19.39 12.27,19.39C9.86,19.39 7.82,17.84 7.02,15.61H3.03V18.49C4.78,21.84 8.21,24 12.27,24Z"
    />
    <path
      fill="#FBBC05"
      d="M7.02,15.61C6.75,14.83 6.62,13.99 6.62,13.11C6.62,12.22 6.75,11.38 7.02,10.6L3.03,7.72C1.9,9.81 1.25,12.25 1.25,15C1.25,17.75 1.9,20.19 3.03,22.28L7.02,19.5V15.61Z"
    />
    <path
      fill="#EA4335"
      d="M12.27,6.61C13.66,6.61 14.8,7.09 15.65,7.9L19.58,4.02C17.84,2.29 15.3,1.25 12.27,1.25C8.21,1.25 4.78,4.16 3.03,7.72L7.02,10.6C7.82,8.16 9.86,6.61 12.27,6.61Z"
    />
  </svg>
);

const AuthForm = ({ isSignUp = false }) => {
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isSignUp) {
      const { error } = await signUp(email, password, { full_name: fullName });
      setLoading(false);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Sign-up failed',
          description: error.message,
        });
      } else {
        setMessage('Please check your inbox and confirm your email to continue.');
        toast({
          title: 'Almost there!',
          description: 'A confirmation link has been sent to your email.',
          duration: 9000,
        });
      }
    } else {
      const { data, error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid credentials or email not verified.',
        });
      } else if (data?.user) {
        toast({
          title: 'Login Successful!',
          description: `Welcome back, ${data.user.email}!`,
          duration: 3000,
        });
      }
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast({
      title: '🚧 Feature Not Implemented',
      description: "This functionality isn't active yet, but you can request it!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {isSignUp && (
          <div className="relative">
            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input type="text" placeholder="Full Name" className="pl-10" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
        )}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input type="email" placeholder="Email Address" className="pl-10" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input type={showPassword ? 'text' : 'password'} placeholder="Password" className="pl-10 pr-10" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
      </div>
      {!isSignUp && (
        <div className="text-right">
          <a href="#" onClick={handleForgotPassword} className="text-sm font-medium text-emerald-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      )}
       {message && <p className="text-sm text-center text-green-600 bg-green-50 p-3 rounded-md">{message}</p>}
      <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-lg py-6" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? (isSignUp ? 'Creating Account...' : 'Logging In...') : (isSignUp ? 'Create Account' : 'Login')}
      </Button>
    </form>
  );
};

const LoginPage = () => {
  const { signInWithGoogle } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
 
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await signInWithGoogle();
    setIsGoogleLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Login / Sign Up - LeafyGrams</title>
        <meta name="description" content="Login or create an account with LeafyGrams to manage your microgreens subscription." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <Link to="/">
                <img
                  src="https://storage.googleapis.com/hostinger-horizons-assets-prod/8e7fb07c-d059-479a-a5c7-9dbe75087297/2ddd0e81fc8bd04bbde26d30750303bf.jpg"
                  alt="LeafyGrams Logo"
                  className="h-20 mx-auto"
                />
              </Link>
              <h1 className="text-3xl font-bold">Welcome to LeafyGrams 🌱</h1>
              <p className="text-gray-600">Your journey to wellness starts here.</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="pt-4">
                <AuthForm />
              </TabsContent>
              <TabsContent value="signup" className="pt-4">
                <AuthForm isSignUp />
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>

            <Button variant="outline" className="w-full text-lg py-6" onClick={handleGoogleLogin} disabled={isGoogleLoading}>
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
               Continue with Google
            </Button>
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

export default LoginPage;
