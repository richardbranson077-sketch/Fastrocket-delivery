'use client';

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ReactNode } from 'react';

// Provider component to wrap your app or specific pages
export function ReCaptchaProvider({ children }: { children: ReactNode }) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
        console.warn('reCAPTCHA site key not found. reCAPTCHA will not be enabled.');
        return <>{children}</>;
    }

    return (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
            {children}
        </GoogleReCaptchaProvider>
    );
}

// Hook to use reCAPTCHA in your components
export function useReCaptcha() {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const getReCaptchaToken = async (action: string = 'submit'): Promise<string | null> => {
        if (!executeRecaptcha) {
            console.warn('reCAPTCHA not available');
            return null;
        }

        try {
            const token = await executeRecaptcha(action);
            return token;
        } catch (error) {
            console.error('reCAPTCHA execution failed:', error);
            return null;
        }
    };

    return { getReCaptchaToken };
}
