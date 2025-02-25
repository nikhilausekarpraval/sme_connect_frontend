'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './header.module.css';

export default function AzureAuth() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data after login
  useEffect(() => {

    if (session && session?.user) {
      fetchUserData(session?.user?.email);
    }

  }, [session]);

  // Function to handle user sign-in
  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      var result = await signIn('azure-ad');

    } catch (err) {
      setError('Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user sign-out
  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await signOut();
      setUserData(null);
    } catch (err) {
      setError('Sign-out failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch user data from API
  const fetchUserData = async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/user-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to fetch user data');

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError('Failed to load user data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${!session && status === 'loading' ? styles.loading : styles.loaded}`}
        >
          {!session ? (
            <>
              <span className={styles.notSignedInText}>You are not signed in</span>
              <button className={styles.buttonPrimary} onClick={handleSignIn} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              {error && <p className={styles.error}>{error}</p>}
            </>
          ) : (
            <>
              {session.user.image && (
                <span style={{ backgroundImage: `url('${session.user.image}')` }} className={styles.avatar} />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              {loading ? (
                <p>Loading user data...</p>
              ) : (
                userData && <p className={styles.userDetails}>Welcome, {userData.fullName} ({userData.role})</p>
              )}
              <button className={styles.button} onClick={handleSignOut} disabled={loading}>
                {loading ? 'Signing out...' : 'Sign Out'}
              </button>
              {error && <p className={styles.error}>{error}</p>}
            </>
          )}
        </p>
      </div>
    </header>
  );
}
