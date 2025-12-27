import type { ReactElement } from "react";
import { useAuth } from "../auth";

type RequireAuthProps = {
    children: ReactElement;
};

export default function RequireAuth({ children }: RequireAuthProps) {
    const { isAuthenticated, isLoading, error, signInAnonymously } = useAuth();

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-sm text-neutral-500">
                Starting your guest session...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
                <div className="max-w-sm rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                    <p>We couldn't start a guest session.</p>
                    <p className="mt-2 text-xs text-red-600">{error}</p>
                    <button
                        type="button"
                        onClick={() => signInAnonymously()}
                        className="mt-4 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-sm text-neutral-500">
                Preparing your session...
            </div>
        );
    }

    return children;
}
