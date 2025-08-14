"use client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch, setSubscriptionStatus, setSubscriptionMessage } from '@/lib/store';
import { strapiService } from '@/lib/strapi';

export default function Footer() {
  const { t } = useTranslation();
  const { direction } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();
  const [submittedEmails, setSubmittedEmails] = useState<string[]>([]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .test('unique-email', t('footer.subscribeError'), function(value) {
        return !submittedEmails.includes(value || '');
      })
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(setSubscriptionStatus('loading'));
      
      try {
        const response = await strapiService.subscribeEmail(values.email);

        if (response) {
          setSubmittedEmails(prev => [...prev, values.email]);
          dispatch(setSubscriptionStatus('success'));
          dispatch(setSubscriptionMessage(t('footer.subscribeSuccess')));
          resetForm();
        } else {
          throw new Error('Subscription failed');
        }
      } catch (error) {
        const existingEmails = JSON.parse(localStorage.getItem('subscribedEmails') || '[]');
        const updatedEmails = [...existingEmails, values.email];
        localStorage.setItem('subscribedEmails', JSON.stringify(updatedEmails));
        
        setSubmittedEmails(prev => [...prev, values.email]);
        dispatch(setSubscriptionStatus('success'));
        dispatch(setSubscriptionMessage(t('footer.subscribeSuccess')));
        resetForm();
      }

      setTimeout(() => {
        dispatch(setSubscriptionStatus('idle'));
        dispatch(setSubscriptionMessage(''));
      }, 3000);
    }
  });

  const { subscriptionStatus, subscriptionMessage } = useAppSelector(state => state.ui.formStates);

  return (
    <footer className="bg-[#4B2615]" dir={direction}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
          
          {/* Email subscription */}
          <form onSubmit={formik.handleSubmit} className="flex items-center space-x-3">
            <input
              type="email"
              name="email"
              placeholder={t('email')}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`px-4 py-3 rounded-lg bg-[#643F2E] text-white placeholder-white/60 border ${
                formik.touched.email && formik.errors.email 
                  ? 'border-red-400' 
                  : 'border-white/20'
              } focus:outline-none focus:border-white/40 w-80`}
            />
            <button
              type="submit"
              disabled={subscriptionStatus === 'loading'}
              className="px-6 py-3 bg-white text-[#4B2615] rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {subscriptionStatus === 'loading' ? '...' : t('footer.subscribe')}
            </button>
          </form>

          {/* Social icons */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white hover:text-[#1DA1F2] transition-colors" aria-label="Twitter">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            
            <a href="#" className="text-white hover:text-[#1877F2] transition-colors" aria-label="Facebook">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            <a href="#" className="text-white hover:text-[#EA4335] transition-colors" aria-label="Google">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Error/Success Messages */}
        {formik.touched.email && formik.errors.email && (
          <div className="text-center mb-4">
            <p className="text-red-400 text-sm">{formik.errors.email}</p>
          </div>
        )}
        {subscriptionStatus === 'success' && (
          <div className="text-center mb-8">
            <p className="text-green-400">{subscriptionMessage}</p>
          </div>
        )}

        {/* Bottom section */}
<div className="border-t border-white/20 pt-8">
  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <div className="flex flex-wrap items-center space-x-6 text-white/70 text-sm">
      <a href="#" className="hover:text-white transition-colors">About</a>
      <a href="#" className="hover:text-white transition-colors">Our Strategy</a>
      <a href="#" className="hover:text-white transition-colors">Our Advantages</a>
      <a href="#" className="hover:text-white transition-colors">Social Responsibility</a>
      <a href="#" className="hover:text-white transition-colors">Our Services</a>
    </div>
    <div className="text-white/60 text-sm">
      &copy; 2024. All rights reserved.
    </div>
  </div>
</div>

      </div>
    </footer>
  );
}
