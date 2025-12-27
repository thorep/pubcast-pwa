import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    linkWithCredential,
    onAuthStateChanged,
    signInAnonymously as firebaseSignInAnonymously,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    type User,
} from "firebase/auth";
import { auth } from "./firebase";

type AuthContextValue = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    linkWithEmailPassword: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    signInAnonymously: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isAutoSigningIn = useRef(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
            setUser(nextUser);

            if (nextUser) {
                setError(null);
                setIsLoading(false);
                isAutoSigningIn.current = false;
                return;
            }

            if (isAutoSigningIn.current) {
                return;
            }

            setIsLoading(true);
            setError(null);
            isAutoSigningIn.current = true;

            firebaseSignInAnonymously(auth)
                .catch((signInError) => {
                    setError(signInError instanceof Error ? signInError.message : "Unable to start guest session.");
                    setIsLoading(false);
                })
                .finally(() => {
                    isAutoSigningIn.current = false;
                });
        });

        return () => unsubscribe();
    }, []);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            isLoading,
            error,
            signIn: async (email: string, password: string) => {
                setError(null);
                await signInWithEmailAndPassword(auth, email, password);
            },
            signUp: async (email: string, password: string) => {
                setError(null);
                if (auth.currentUser?.isAnonymous) {
                    const credential = EmailAuthProvider.credential(email, password);
                    await linkWithCredential(auth.currentUser, credential);
                    return;
                }
                await createUserWithEmailAndPassword(auth, email, password);
            },
            linkWithEmailPassword: async (email: string, password: string) => {
                setError(null);
                if (!auth.currentUser) {
                    throw new Error("No active session to link.");
                }
                if (!auth.currentUser.isAnonymous) {
                    throw new Error("Account is already linked.");
                }
                const credential = EmailAuthProvider.credential(email, password);
                await linkWithCredential(auth.currentUser, credential);
            },
            signInAnonymously: async () => {
                setError(null);
                await firebaseSignInAnonymously(auth);
            },
            resetPassword: async (email: string) => {
                setError(null);
                await sendPasswordResetEmail(auth, email);
            },
            signOut: async () => {
                setError(null);
                await firebaseSignOut(auth);
            },
        }),
        [error, isLoading, user],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
