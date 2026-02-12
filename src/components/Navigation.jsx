import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Menu, X, Github, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const socialLinks = [
        {
            icon: Github,
            href: "https://github.com/msaadakram",
            label: "GitHub",
            color: "hover:text-purple-600 dark:hover:text-purple-400",
        },
        {
            icon: Mail,
            href: "mailto:msaadakram786@gmail.com",
            label: "Email",
            color: "hover:text-blue-600 dark:hover:text-blue-400",
        },
        {
            icon: MessageCircle,
            href: "https://wa.me/923460047018",
            label: "WhatsApp",
            color: "hover:text-green-600 dark:hover:text-green-400",
        },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background/95 backdrop-blur-lg border-b border-border/50 dark:border-border shadow-sm dark:shadow-purple-900/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-lg shadow-lg"
                        >
                            <GraduationCap className="w-6 h-6 text-white" />
                        </motion.div>
                        <span className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            UCP Live Grading
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Social Links */}
                        <div className="flex items-center gap-2 mr-2">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-2 rounded-lg bg-muted/50 dark:bg-muted/30 hover:bg-accent dark:hover:bg-accent/50 transition-all ${link.color} relative group`}
                                    aria-label={link.label}
                                >
                                    <link.icon className="w-4 h-4" />
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {link.label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="w-px h-6 bg-border/50 dark:bg-border" />

                        <Link
                            to="/"
                            className="text-foreground/70 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground transition-colors relative group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 group-hover:w-full transition-all duration-300" />
                        </Link>
                        <Link
                            to="/donate"
                            className="text-foreground/70 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground transition-colors relative group"
                        >
                            Support Us
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 group-hover:w-full transition-all duration-300" />
                        </Link>
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 hover:bg-accent dark:hover:bg-accent/50 rounded-lg transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 space-y-4 border-t border-border/50 dark:border-border"
                    >
                        <Link
                            to="/"
                            className="block text-foreground/70 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/donate"
                            className="block text-foreground/70 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Support Us
                        </Link>

                        {/* Mobile Social Links */}
                        <div className="pt-4 border-t border-border/50 dark:border-border">
                            <p className="text-sm text-muted-foreground mb-3">Connect with us</p>
                            <div className="flex gap-3">
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-3 rounded-lg bg-muted/50 dark:bg-muted/30 hover:bg-accent dark:hover:bg-accent/50 transition-all ${link.color}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        aria-label={link.label}
                                    >
                                        <link.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
