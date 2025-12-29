'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login or dashboard based on auth status
    if (auth.isAuthenticated()) {
      router.push('/dashboard/posts');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}
