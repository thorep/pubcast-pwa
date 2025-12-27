import { Link } from "react-router";

const RegisterPage = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center gap-6 px-6">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-neutral-900">Create your account</h1>
                <p className="mt-2 text-sm text-neutral-500">Join Pubcast to keep score and play along.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <label className="block text-sm font-medium text-neutral-700">
                    Name
                    <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Alex Rivera"
                        className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                    />
                </label>

                <label className="block text-sm font-medium text-neutral-700">
                    Email
                    <input
                        type="email"
                        name="email"
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
                        autoComplete="new-password"
                        placeholder="Create a password"
                        className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                >
                    Create account
                </button>
            </form>

            <div className="text-center text-sm text-neutral-500">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-neutral-900 hover:underline">
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
