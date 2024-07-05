import { createContext, useContext, useEffect } from 'react';
import { client } from '@passwordless-id/webauthn';
import useStateRef from 'react-usestateref';
import { DUMMY_TIMESTAMP, FIDO2_USER_HANDLE } from '@/constants/config';
import { NATIVE_API } from '@/constants/url';
import { checkFIDO2Cookie, createChallenge } from '@/lib/utils/authorization';
import { DEFAULT_USER_NAME } from '@/constants/display';
import { ICredential, IUserAuth } from '@/interfaces/webauthn';
import { useRouter } from 'next/router';

interface UserContextType {
  user: ICredential | null;
  setUser: (user: ICredential) => void;
  signUp: (username?: string) => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  userAuth: IUserAuth | null;
  isSignedIn: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  userAuth: null,
  isSignedIn: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser, userRef] = useStateRef<ICredential | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userAuth, setUserAuth, userAuthRef] = useStateRef<IUserAuth | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSignedIn, setIsSignedIn, isSignedInRef] = useStateRef(false);

  const writeCookie = async () => {
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);
    document.cookie = `FIDO2=${encodeURIComponent(JSON.stringify(userRef.current))}; expires=${expiration.toUTCString()}; path=/`;
  };

  const signUp = async (username?: string) => {
    const name = username || DEFAULT_USER_NAME;
    try {
      const newChallenge = await createChallenge(`FIDO2.TEST.reg-${DUMMY_TIMESTAMP}-hello`);
      const registration = await client.register(name, newChallenge, {
        authenticatorType: 'both',
        userVerification: 'required',
        timeout: 60000,
        attestation: true,
        userHandle: FIDO2_USER_HANDLE,
        debug: false,
        discoverable: 'required',
      });

      const response = await fetch(NATIVE_API.SIGN_UP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registration }),
      });

      const data = (await response.json()).payload as IUserAuth;
      setUserAuth(data);
      setUser(data.credential);
      setIsSignedIn(true);

      const registrationArray = JSON.parse(localStorage.getItem('registrationArray') || '[]');
      registrationArray.push(data);
      localStorage.setItem('registrationArray', JSON.stringify(registrationArray));
    } catch (error) {
      // Deprecated: (20240715 - Shirley)
      // eslint-disable-next-line no-console
      console.error('註冊錯誤:', error);
    }
  };

  const signIn = async () => {
    try {
      const newChallenge = await createChallenge(`FIDO2.TEST.reg-${DUMMY_TIMESTAMP}-hello`);
      const authentication = await client.authenticate([], newChallenge, {
        authenticatorType: 'both',
        userVerification: 'required',
        timeout: 60000,
        debug: false,
      });

      if (authentication) {
        setUser({} as ICredential);
        setIsSignedIn(true);
        writeCookie();
      }
    } catch (error) {
      // Deprecated: (20240715 - Shirley)
      // eslint-disable-next-line no-console
      console.error('登入錯誤:', error);
    }
  };

  const signOut = async () => {
    try {
      await fetch(NATIVE_API.SIGN_OUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: user }),
      });

      setUserAuth(null);
      setUser(null);
      setIsSignedIn(false);
    } catch (error) {
      // Deprecated: (20240715 - Shirley)
      // eslint-disable-next-line no-console
      console.error('登出錯誤:', error);
    }
  };

  const setPrivateData = async () => {
    const credentialFromCookie = checkFIDO2Cookie();
    if (credentialFromCookie) {
      setUser(credentialFromCookie[0]);
      setIsSignedIn(true);
    }
  };

  useEffect(() => {
    setPrivateData();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn]);

  // TODO: test the user auth status (20240627 -Shirley)
  // const value = useMemo(
  //   () => ({
  //     user: userRef.current,
  //     setUser,
  //     signUp,
  //     signIn,
  //     signOut,
  //     userAuth: userAuthRef.current,
  //     isSignedIn: isSignedInRef.current,
  //   }),
  //   [userRef.current, isSignedInRef.current, userAuthRef.current]
  // );

  // TODO: test the user auth status (20240627 -Shirley)
  /* eslint-disable react/jsx-no-constructed-context-values */
  const value = {
    user: userRef.current,
    setUser,
    signUp,
    signIn,
    signOut,
    userAuth: userAuthRef.current,
    isSignedIn: isSignedInRef.current,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserCtx = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserCtx 必須在 UserProvider 內使用');
  }
  return context;
};
