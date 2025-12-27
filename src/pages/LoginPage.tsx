import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../auth";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, loginAsGuest } = useAuth();
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/";

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center gap-6 px-6">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-neutral-900">Welcome back</h1>
                <p className="mt-2 text-sm text-neutral-500">Sign in to continue to Pubcast.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <label className="block text-sm font-medium text-neutral-700">
                    Email
                    <input
                        type="email"
                        name="email1"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                    />
                </label>

                <label className="block text-sm font-medium text-neutral-700">
                    Password
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                >
                    Log in
                </button>
            </form>

            <button
                type="button"
                onClick={() => {
                    loginAsGuest();
                    navigate(from, { replace: true });
                }}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-800 hover:border-neutral-400"
            >
                Continue as guest
            </button>

            <div className="text-center text-sm text-neutral-500">
                New here?{" "}
                <Link to="/register" className="font-medium text-neutral-900 hover:underline">
                    Create an account
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
