import { Suspense } from 'react';
import Home from './Home';

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Home />
    </Suspense>
  );
}
