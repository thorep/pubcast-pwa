import React from "react";
import { NavLink } from "react-router";

type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

function IconBox({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex h-6 w-6 items-center justify-center">
      {children}
    </span>
    );
}

// Minimal inline icons (swap later for lucide/heroicons if you want)
const HomeIcon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
    </svg>
);

const PlayIcon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 5v14l11-7-11-7Z" />
    </svg>
);

const TrophyIcon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
        <path d="M6 7H4a2 2 0 0 0 2 2" />
        <path d="M18 7h2a2 2 0 0 1-2 2" />
        <path d="M12 11v3" />
        <path d="M8 21h8" />
        <path d="M10 14h4a2 2 0 0 1 2 2v3H8v-3a2 2 0 0 1 2-2Z" />
    </svg>
);

const UserIcon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="8" r="4" />
    </svg>
);

const defaultItems: NavItem[] = [
    { label: "Home", href: "/", icon: <IconBox>{HomeIcon}</IconBox> },
    { label: "Bingo", href: "/bingo", icon: <IconBox>{PlayIcon}</IconBox> },
    { label: "Leaderboard", href: "/leaderboard", icon: <IconBox>{TrophyIcon}</IconBox> },
    { label: "Profile", href: "/profile", icon: <IconBox>{UserIcon}</IconBox> },
];

type BottomNavProps = {
    items?: NavItem[];
};

export default function BottomNav({ items = defaultItems }: BottomNavProps) {
    return (
        <nav className="fixed inset-x-0 bottom-0 z-50">
            {/* Safe-area + spacing from screen edge */}
            <div className="mx-auto max-w-md px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <div
                    className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur shadow-sm
                     dark:border-neutral-800 dark:bg-neutral-900/90"
                >
                    <ul className="flex items-stretch justify-between px-2 py-2">
                        {items.map((item) => (
                            <li key={item.href} className="flex-1">
                                <NavLink
                                    to={item.href}
                                    // "end" makes "/" not match every route like "/profile"
                                    end={item.href === "/"}
                                    className={({ isActive }) =>
                                        [
                                            "mx-1 flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2",
                                            "text-xs font-medium transition",
                                            isActive
                                                ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                                                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white",
                                        ].join(" ")
                                    }
                                >
                                    <span className="text-current">{item.icon}</span>
                                    <span className="leading-none">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}