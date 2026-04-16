import { Suspense } from 'react';
import TheatreOwnerSignup from '../components/theatre/TheatreOwnerSignup';

export default function TheatreSignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <TheatreOwnerSignup />
    </Suspense>
  );
}
