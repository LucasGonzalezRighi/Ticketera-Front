import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockLoginApi } from '@/lib/auth-v2/mockApi';
// In a real app, you would import useAuth here
// import { useAuth } from '@/context/AuthContext';

export type LoginStatus = 'idle' | 'loading' | 'success' | 'error';

export const useLoginV2 = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<LoginStatus>('idle');
    const [error, setError] = useState<string | undefined>(undefined);
    
    // Validation State
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = re.test(email);
        setIsEmailValid(isValid);
        if (!email) setEmailError('Email is required');
        else if (!isValid) setEmailError('Please enter a valid email address');
        else setEmailError(undefined);
        return isValid;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEmail(val);
        validateEmail(val);
        if (status === 'error') setStatus('idle'); // Reset global error on input
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (status === 'error') setStatus('idle');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateEmail(email)) return;
        if (!password) {
            setError('Password is required');
            return;
        }

        setStatus('loading');
        setError(undefined);

        try {
            const response = await mockLoginApi(email, password);
            
            // Here you would normally set the auth context
            // auth.login(response.token, response.user);
            
            setStatus('success');
            
            // Simulate redirect delay for animation
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);

        } catch (err: any) {
            setStatus('error');
            setError(err.message || 'An unexpected error occurred');
        }
    };

    return {
        email,
        password,
        status,
        error,
        emailError,
        isEmailValid,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit
    };
};
