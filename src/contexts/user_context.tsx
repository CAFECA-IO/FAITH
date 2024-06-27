import { createContext, useContext, useMemo, useEffect } from 'react';
import { client } from '@passwordless-id/webauthn';
import useStateRef from 'react-usestateref';
import { DUMMY_TIMESTAMP, FIDO2_USER_HANDLE } from '@/constants/config';
import { NATIVE_API } from '@/constants/url';
import { checkFIDO2Cookie, createChallenge } from '@/lib/utils/authorization';
import { DEFAULT_USER_NAME } from '@/lib/utils/display';
import { ICredential, IUserAuth } from '@/interfaces/webauthn';
import { useRouter } from 'next/router';

interface UserContextType {
  user: ICredential | null;
  setUser: (user: ICredential) => void;
  signUp: (username?: string) => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  userAuth: IUserAuth | null;
  signedIn: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  userAuth: null,
  signedIn: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser, userRef] = useStateRef<ICredential | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userAuth, setUserAuth, userAuthRef] = useStateRef<IUserAuth | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signedIn, setSignedIn, signedInRef] = useStateRef(false);

  // const readCookie = async () => {
  //   const cookie = document.cookie.split('; ').find((row: string) => row.startsWith('FIDO2='));
  //   const FIDO2 = cookie ? cookie.split('=')[1] : null;
  //   if (FIDO2) {
  //     const decoded = decodeURIComponent(FIDO2);
  //     return JSON.parse(decoded) as ICredential;
  //   }
  //   return null;
  // };

  const writeCookie = async () => {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
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
      setSignedIn(true);

      // 存儲註冊信息到本地存儲
      const registrationArray = JSON.parse(localStorage.getItem('registrationArray') || '[]');
      registrationArray.push(data);
      localStorage.setItem('registrationArray', JSON.stringify(registrationArray));
    } catch (error) {
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
        setSignedIn(true);
        writeCookie();
      }
    } catch (error) {
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
      setSignedIn(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('登出錯誤:', error);
    }
  };

  const setPrivateData = async () => {
    const credentialFromCookie = checkFIDO2Cookie();
    if (credentialFromCookie) {
      setUser(credentialFromCookie[0]);
      setSignedIn(true);
    }

    // const credentialFromCookie = checkFIDO2Cookie();
    // if (credentialFromCookie && 'id' in credentialFromCookie[0]) {
    //   setUserAuth({
    //     username: DEFAULT_USER_NAME,
    //     credential: credentialFromCookie[0],
    //   });
    //   setSignedIn(true);
    // }
  };

  useEffect(() => {
    setPrivateData();
  }, []);

  // redirect to home page when successful login
  useEffect(() => {
    if (signedIn) {
      router.push('/');
    }
  }, [signedIn]);

  const value = useMemo(
    () => ({
      user: userRef.current,
      setUser,
      signUp,
      signIn,
      signOut,
      userAuth: userAuthRef.current,
      signedIn: signedInRef.current,
    }),
    [userRef.current]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserCtx = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserCtx 必須在 UserProvider 內使用');
  }
  return context;
};
