import Link from "next/link"
import { Button } from "./ui/button"
import { Sprout } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            {/* Logo */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="text-xl font-bold text-primary font-mono tracking-wider"
                    >Planetventory</Link>
                </div>
            </div>

            {/* Navbar components */}
            <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" className="flex items-center gap-2" asChild>
                    <Link href="/plants">
                        <Sprout className="w-4 h-4" />
                        <span className="hidden lg:inline">Plant</span>
                    </Link>
                </Button>
            </div>

        </nav>
    )   
}