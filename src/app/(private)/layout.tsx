"use client";

import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOutAction } from "../actions/auth-action";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90 tw-mb-4">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-14 items-center">
                        <Link
                            href="#"
                            className="flex items-center"
                            prefetch={false}
                        >
                            <h4 className="text-xl">AI Gen Resume</h4>
                            <span className="sr-only">AI Gen Resume</span>
                        </Link>
                        {/* <nav className="hidden md:flex gap-4">
                        <Link
				href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Home
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            About
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Services
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Contact
                        </Link>
                    </nav> */}
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={signOutAction}
                                variant="ghost"
                                size="sm"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    );
};

export default DashboardLayout;
