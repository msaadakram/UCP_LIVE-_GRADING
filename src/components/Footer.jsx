import { Link } from "react-router-dom";
import { GraduationCap, Github, Mail, MessageCircle, Heart, Code, Sparkles, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
    const socialLinks = [
        {
            icon: Github,
            href: "https://github.com/msaadakram",
            label: "GitHub",
            color: "from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600",
            hoverColor: "hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-500 dark:hover:to-blue-500",
        },
        {
            icon: Mail,
            href: "mailto:msaadakram786@gmail.com",
            label: "Email",
            color: "from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500",
            hoverColor: "hover:from-blue-700 hover:to-cyan-700 dark:hover:from-blue-600 dark:hover:to-cyan-600",
        },
        {
            icon: MessageCircle,
            href: "https://wa.me/923460047018",
            label: "WhatsApp",
            color: "from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500",
            hoverColor: "hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600",
        },
    ];

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "msaadakram786@gmail.com",
            href: "mailto:msaadakram786@gmail.com",
        },
        {
            icon: MessageCircle,
            label: "WhatsApp",
            value: "+92 346 0047018",
            href: "https://wa.me/923460047018",
        },
        {
            icon: Github,
            label: "GitHub",
            value: "@msaadakram",
            href: "https://github.com/msaadakram",
        },
    ];

    return (
        <footer className="bg-muted/30 dark:bg-muted/10 border-t border-border/50 dark:border-border mt-20 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.05, 0.03],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-lg shadow-lg"
                            >
                                <GraduationCap className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                UCP Live Grading
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Real-time grading solutions for modern educators. Streamline your workflow,
                            provide instant feedback, and focus on what matters most - your students.
                        </p>

                        {/* Contact Info Cards */}
                        <div className="space-y-2 pt-2">
                            {contactInfo.map((contact, index) => (
                                <motion.a
                                    key={index}
                                    href={contact.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 dark:hover:bg-muted/20 transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20 flex items-center justify-center group-hover:from-blue-600/20 group-hover:to-purple-600/20 dark:group-hover:from-blue-500/30 dark:group-hover:to-purple-500/30 transition-all">
                                        <contact.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-muted-foreground">{contact.label}</div>
                                        <div className="text-sm font-medium">{contact.value}</div>
                                    </div>
                                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            Product
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <Link to="/donate" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Support Us
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Chrome Extension
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                            Support
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/donate" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-pink-600 dark:bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Donate
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-pink-600 dark:bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-pink-600 dark:bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Community
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="mt-12 pt-8 border-t border-border/50 dark:border-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <p className="text-sm text-muted-foreground">
                                Connect with us on social media
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-3 bg-gradient-to-br ${link.color} ${link.hoverColor} rounded-xl shadow-lg hover:shadow-xl transition-all relative group`}
                                    aria-label={link.label}
                                >
                                    <link.icon className="w-5 h-5 text-white" />
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {link.label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-8 pt-8 border-t border-border/50 dark:border-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-center md:text-left text-sm text-muted-foreground">
                            © 2026 UCP Live Grading. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Made with</span>
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400 fill-pink-600 dark:fill-pink-400" />
                            </motion.div>
                            <span>by MUHAMMAD SAAD AKRAM</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
