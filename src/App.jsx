
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import TrialPage from '@/pages/TrialPage';
import PlanSelectionPage from '@/pages/PlanSelectionPage';
import UserDashboardPage from '@/pages/UserDashboardPage';
import CompleteProfilePage from '@/pages/CompleteProfilePage';
import ProtectedRoute from '@/components/ProtectedRoute';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import RefundPolicyPage from '@/pages/RefundPolicyPage';
import ModifyPlanPage from '@/pages/ModifyPlanPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trial" element={<TrialPage />} />
        <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfilePage /></ProtectedRoute>} />
        <Route path="/select-plan" element={<ProtectedRoute><PlanSelectionPage /></ProtectedRoute>} />
        <Route path="/modify-plan" element={<ProtectedRoute><ModifyPlanPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
