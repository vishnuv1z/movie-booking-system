import { Suspense } from 'react';
import TheatreOwnerLogin from '../components/theatre/TheatreOwnerLogin';

export default function TheatreLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <TheatreOwnerLogin />
    </Suspense>
  );
}
