import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "../auth";

const ProfilePage = () => {
    const { user, isLoading, signOut, linkWithEmailPassword, signIn, resetPassword } = useAuth();
    const [token, setToken] = useState<string | null>(null);
    const [tokenError, setTokenError] = useState<string | null>(null);
    const [linkEmail, setLinkEmail] = useState("");
    const [linkPassword, setLinkPassword] = useState("");
    const [linkError, setLinkError] = useState<string | null>(null);
    const [linkSuccess, setLinkSuccess] = useState(false);
    const [isLinking, setIsLinking] = useState(false);
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signInError, setSignInError] = useState<string | null>(null);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [resetMessage, setResetMessage] = useState<string | null>(null);
    const [resetError, setResetError] = useState<string | null>(null);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        let isActive = true;

        const loadToken = async () => {
            if (!user) {
                setToken(null);
                return;
            }

            setTokenError(null);

            try {
                const nextToken = await user.getIdToken();
                if (isActive) {
                    setToken(nextToken);
                }
            } catch (error) {
                if (isActive) {
                    setTokenError(error instanceof Error ? error.message : "Unable to load token.");
                }
            }
        };

        void loadToken();

        return () => {
            isActive = false;
        };
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-sm text-neutral-500">
                Loading profile...
            </div>
        );
    }

    const handleLinkAccount = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLinkError(null);
        setLinkSuccess(false);
        setIsLinking(true);

        try {
            await linkWithEmailPassword(linkEmail, linkPassword);
            setLinkSuccess(true);
            setLinkEmail("");
            setLinkPassword("");
        } catch (error) {
            setLinkError(error instanceof Error ? error.message : "Unable to link account.");
        } finally {
            setIsLinking(false);
        }
    };

    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSignInError(null);
        setResetMessage(null);
        setResetError(null);
        setIsSigningIn(true);

        try {
            await signIn(signInEmail, signInPassword);
            setSignInEmail("");
            setSignInPassword("");
        } catch (error) {
            setSignInError(error instanceof Error ? error.message : "Unable to sign in.");
        } finally {
            setIsSigningIn(false);
        }
    };

    const handleResetPassword = async () => {
        setResetMessage(null);
        setResetError(null);

        if (!signInEmail.trim()) {
            setResetError("Enter your email above to receive a reset link.");
            return;
        }

        setIsResetting(true);

        try {
            await resetPassword(signInEmail);
            setResetMessage("Password reset email sent.");
        } catch (error) {
            setResetError(error instanceof Error ? error.message : "Unable to send reset email.");
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <div className="mx-auto flex max-w-xl flex-col gap-6 px-6 py-10">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-neutral-200">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt={user?.displayName ?? "Profile"} className="h-full w-full object-cover" />
                    ) : null}
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-neutral-900">Profile</h1>
                    <p className="text-sm text-neutral-500">Manage your Pubcast identity.</p>
                </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="space-y-3 text-sm text-neutral-700">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-400">Name</p>
                        <p className="font-medium text-neutral-900">
                            {user?.displayName ?? (user?.isAnonymous ? "Guest" : "Unknown")}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-400">Email</p>
                        <p className="font-medium text-neutral-900">{user?.email ?? "Guest session"}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-400">User ID</p>
                        <p className="break-all font-medium text-neutral-900">{user?.uid ?? "Unknown"}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wide text-neutral-400">Account Type</p>
                        <p className="font-medium text-neutral-900">{user?.isAnonymous ? "Guest" : "Registered"}</p>
                    </div>
                </div>
            </div>

            {user?.isAnonymous ? (
                <>
                    <form
                        onSubmit={handleLinkAccount}
                        className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                    >
                        <div>
                            <p className="text-xs uppercase tracking-wide text-neutral-400">Upgrade Account</p>
                            <p className="mt-2 text-sm text-neutral-600">
                                Save your progress by creating a full account. This will link your guest session to an email and
                                password.
                            </p>
                        </div>
                        <label className="block text-sm font-medium text-neutral-700">
                            Email
                            <input
                                type="email"
                                name="link-email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={linkEmail}
                                onChange={(event) => setLinkEmail(event.target.value)}
                                className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                            />
                        </label>
                        <label className="block text-sm font-medium text-neutral-700">
                            Password
                            <input
                                type="password"
                                name="link-password"
                                autoComplete="new-password"
                                placeholder="Create a password"
                                value={linkPassword}
                                onChange={(event) => setLinkPassword(event.target.value)}
                                className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={isLinking || isSigningIn}
                            className="w-full rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLinking ? "Linking..." : "Create account"}
                        </button>
                        {linkError ? (
                            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                                {linkError}
                            </p>
                        ) : null}
                        {linkSuccess ? (
                            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                                Account linked successfully.
                            </p>
                        ) : null}
                    </form>

                    <form
                        onSubmit={handleSignIn}
                        className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                    >
                        <div>
                            <p className="text-xs uppercase tracking-wide text-neutral-400">Sign In</p>
                            <p className="mt-2 text-sm text-neutral-600">
                                Already have an account? Sign in to restore your existing profile.
                            </p>
                        </div>
                        <label className="block text-sm font-medium text-neutral-700">
                            Email
                            <input
                                type="email"
                                name="signin-email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                value={signInEmail}
                                onChange={(event) => setSignInEmail(event.target.value)}
                                className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                            />
                        </label>
                        <label className="block text-sm font-medium text-neutral-700">
                            Password
                            <input
                                type="password"
                                name="signin-password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                value={signInPassword}
                                onChange={(event) => setSignInPassword(event.target.value)}
                                className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={isSigningIn || isLinking || isResetting}
                            className="w-full rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-800 hover:border-neutral-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSigningIn ? "Signing in..." : "Sign in to existing account"}
                        </button>
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            disabled={isSigningIn || isLinking || isResetting}
                            className="text-left text-xs font-medium text-neutral-600 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isResetting ? "Sending reset link..." : "Forgot password?"}
                        </button>
                        {signInError ? (
                            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                                {signInError}
                            </p>
                        ) : null}
                        {resetError ? (
                            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                                {resetError}
                            </p>
                        ) : null}
                        {resetMessage ? (
                            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                                {resetMessage}
                            </p>
                        ) : null}
                    </form>
                </>
            ) : (
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600 shadow-sm">
                    Your account is linked and ready to use.
                </div>
            )}

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wide text-neutral-400">ID Token (debug)</p>
                    {tokenError ? (
                        <p className="text-sm text-red-600">{tokenError}</p>
                    ) : (
                        <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-neutral-100 p-3 text-xs text-neutral-700">
                            {token ?? "No token available."}
                        </pre>
                    )}
                </div>
            </div>

            <button
                type="button"
                onClick={() => signOut()}
                className="inline-flex w-fit items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
                Log out
            </button>
        </div>
    );
};

export default ProfilePage;
