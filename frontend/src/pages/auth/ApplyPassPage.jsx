import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight, Save, ClipboardCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { LoadingOverlay } from '../../components/auth/LoadingOverlay';
import { StepProgress } from '../../components/wizard/StepProgress';
import { PassTypeCard } from '../../components/wizard/PassTypeCard';
import { OrganizationSelector } from '../../components/wizard/OrganizationSelector';
import { RouteSelector } from '../../components/wizard/RouteSelector';
import { MapPreview } from '../../components/wizard/MapPreview';
import { DocumentUploader } from '../../components/wizard/DocumentUploader';
import { ReviewCard } from '../../components/wizard/ReviewCard';
import { OrderSummary } from '../../components/wizard/OrderSummary';
import { DigitalPassCard } from '../../components/dashboard/DigitalPassCard';
import { requestJson, authHeaders } from '../../services/api';

// Payments checkout details subcomponents
import { PaymentMethodCard } from '../../components/payments/PaymentMethodCard';
import { CheckoutCard } from '../../components/payments/CheckoutCard';
import { InvoicePreview } from '../../components/payments/InvoicePreview';

const stepLabels = [
  'Pass Type',
  'Organization',
  'Route Details',
  'Uploads',
  'Review',
  'Payment',
  'Success',
];

export function ApplyPassPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  // Payments states
  const [payMethod, setPayMethod] = useState('card');
  const [autoRenew, setAutoRenew] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Creating secure payment order...');

  // Core Wizard Form state
  const [formData, setFormData] = useState({
    passType: 'monthly',
    organization: '',
    route: 'Central - Airport',
    files: [],
  });

  // Check and restore draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('buspass-draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed.formData);
        setCurrentStep(parsed.currentStep);
        toast.success('Restored your pass application draft!');
      } catch (err) {
        console.error('Failed to load draft:', err);
      }
    }
  }, []);

  const handleSaveDraft = () => {
    const draft = { formData, currentStep };
    localStorage.setItem('buspass-draft', JSON.stringify(draft));
    toast.success('Application draft saved. You can continue later.');
  };

  const handleClearDraft = () => {
    localStorage.removeItem('buspass-draft');
  };

  const handleFileUpload = (category, fileDetails) => {
    setFormData((prev) => {
      const filtered = prev.files.filter((f) => f.category !== category);
      if (!fileDetails) {
        return { ...prev, files: filtered };
      }
      return {
        ...prev,
        files: [...filtered, { category, ...fileDetails }],
      };
    });
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleNextStep = () => {
    // Basic step validations
    if (currentStep === 1 && !formData.organization.trim()) {
      toast.error('Please enter associated Organization');
      triggerShake();
      return;
    }
    if (currentStep === 2 && !formData.route) {
      toast.error('Please select commute route');
      triggerShake();
      return;
    }
    if (currentStep === 3 && formData.files.length < 2) {
      toast.error('Please upload at least ID proof and photo');
      triggerShake();
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, stepLabels.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepJump = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handlePaymentSubmit = async (paymentDetails) => {
    setLoading(true);
    setLoadingMessage('Creating secure payment order...');
    try {
      // Cycle through progress messages
      setTimeout(() => setLoadingMessage('Contacting bank gateway...'), 500);
      setTimeout(() => setLoadingMessage('Authorizing credit tokens...'), 1000);
      setTimeout(() => setLoadingMessage('Payment verified. Initializing smart pass...'), 1500);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const token = localStorage.getItem('token');
      await requestJson('/api/pass/apply', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({
          route: formData.route,
          passType: formData.passType,
          amount: paymentDetails.amount,
        }),
      });

      handleClearDraft();
      toast.success('Smart pass generated and active!');
      setCurrentStep(6); // Go to Step 7 (Success Page)
    } catch (err) {
      triggerShake();
      toast.error(err.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  // Switch views according to current step index
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <p className="text-xs font-semibold text-slate-400 pl-1 text-left">Choose pass tier category</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
              {['student', 'monthly', 'semester', 'staff', 'premium'].map((type) => (
                <PassTypeCard
                  key={type}
                  type={type}
                  selected={formData.passType}
                  onSelect={(val) => setFormData({ ...formData, passType: val })}
                />
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <OrganizationSelector
            value={formData.organization}
            onChange={(val) => setFormData({ ...formData, organization: val })}
          />
        );
      case 2:
        return (
          <div className="space-y-4">
            <RouteSelector
              value={formData.route}
              onChange={(val) => setFormData({ ...formData, route: val })}
            />
            {formData.route && <MapPreview route={formData.route} />}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
            <DocumentUploader
              label="Passport Sized Photo"
              name="photo"
              files={formData.files}
              onUpload={handleFileUpload}
            />
            <DocumentUploader
              label="Student/Employee Identity Card"
              name="identity"
              files={formData.files}
              onUpload={handleFileUpload}
            />
            <DocumentUploader
              label="Address Proof (Aadhaar / Utility Bill)"
              name="address"
              files={formData.files}
              onUpload={handleFileUpload}
            />
          </div>
        );
      case 4:
        return (
          <ReviewCard
            data={formData}
            onEditStep={handleStepJump}
            user={user}
          />
        );
      case 5:
        return (
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-6 items-start text-left">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {['upi', 'card', 'netbanking', 'wallet'].map((method) => (
                  <PaymentMethodCard
                    key={method}
                    type={method}
                    selected={payMethod}
                    onSelect={(val) => setPayMethod(val)}
                  />
                ))}
              </div>
              <div className="h-px bg-white/[0.04]" />
              <CheckoutCard
                method={payMethod}
                autoRenew={autoRenew}
                onAutoRenewToggle={(val) => setAutoRenew(val)}
              />
            </div>
            
            <OrderSummary
              passType={formData.passType}
              onSubmit={handlePaymentSubmit}
              loading={loading}
            />
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start text-center">
            <div className="space-y-5">
              {/* Confetti icons */}
              <div className="flex justify-center">
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute w-24 h-24 rounded-full bg-emerald-500/20 blur-xl"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white border border-white/10"
                  >
                    <ClipboardCheck className="w-8 h-8" />
                  </motion.div>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-white">Smart Pass Generated!</h3>
                <p className="text-[11px] text-slate-400">Your digital transit card has been securely compiled</p>
              </div>

              <div className="pt-1">
                <DigitalPassCard
                  pass={{
                    route: formData.route,
                    pass_type: formData.passType,
                    status: 'Active',
                  }}
                  user={user}
                  onRenew={() => setCurrentStep(0)}
                  onViewQr={() => navigate('/dashboard')}
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] text-xs flex items-center justify-center gap-1.5 focus:outline-none"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>

            {/* Invoice receipt details sheet */}
            <div className="space-y-4">
              <InvoicePreview
                invoiceId="INV-2026-901"
                pass={{ pass_type: formData.passType, route: formData.route }}
                user={user}
                amount={formData.passType === 'student' ? 250 : formData.passType === 'monthly' ? 450 : formData.passType === 'semester' ? 1200 : formData.passType === 'staff' ? 600 : 1800}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout showSidebar={currentStep !== 6}>
      {/* Wizard stepper indicator top banner */}
      <div className="w-full max-w-xl mb-4 bg-slate-950/20 backdrop-blur-md rounded-2xl border border-white/[0.04]">
        <StepProgress
          steps={stepLabels}
          currentStep={currentStep}
          onStepClick={handleStepJump}
        />
      </div>

      <AuthCard
        title={currentStep === 6 ? 'Congratulations!' : stepLabels[currentStep]}
        subtitle={
          currentStep === 6
            ? 'Your transit registration is fully processed'
            : `Step ${currentStep + 1} of 6 — Fill details`
        }
        shake={shake}
        className={currentStep === 5 || currentStep === 6 ? "max-w-4xl w-full" : "max-w-lg"}
      >
        <div className="space-y-6">
          
          {/* Active step display */}
          <div className="min-h-[180px] flex flex-col justify-center">
            {renderStepContent()}
          </div>

          {/* Stepper bottom action utilities */}
          {currentStep !== 6 && (
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
              {/* Back button */}
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 0 || loading}
                className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/20 text-xs font-semibold text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 focus:outline-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              {/* Save Draft / Continue Later */}
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading}
                className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/10 text-slate-500 hover:text-white hover:border-slate-700 transition-colors focus:outline-none flex items-center justify-center"
                title="Save Draft & Continue Later"
              >
                <Save className="w-4 h-4" />
              </button>

              {/* Next button */}
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-1 focus:outline-none active:scale-[0.97]"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="w-20" /> // Spacer for alignment on Payment screen
              )}
            </div>
          )}
        </div>
      </AuthCard>

      <LoadingOverlay show={loading} message={loadingMessage} />
    </AuthLayout>
  );
}
export default ApplyPassPage;
