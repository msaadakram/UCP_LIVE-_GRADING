import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Zap,
    BarChart3,
    Users,
    Lock,
    CheckCircle2,
    Star,
    Clock,
    TrendingUp,
    MessageSquare,
    Heart,
    Coffee,
    Gift,
    Code,
    Sparkles,
    Shield,
    Target,
    CreditCard,
    Smartphone,
    Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { TypewriterText } from "../components/TypewriterText";
import easypaisaLogo from "../assets/1205a5812932699e71cefd156f68c8adb98d23a9.png";
import jazzcashLogo from "../assets/e745747b1cde5389ca9cecab2b9d0df609c6c7d5.png";
import payoneerLogo from "../assets/0d46ae1efe0f26010889b49e0176866d79737980.png";

export function HomePage() {
    const [selectedAmount, setSelectedAmount] = useState(10);
    const [customAmount, setCustomAmount] = useState("");
    const [donorName, setDonorName] = useState("");
    const [message, setMessage] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("easypaisa");

    const predefinedAmounts = [5, 10, 25, 50, 100];

    const paymentMethods = [
        {
            id: "easypaisa",
            name: "EasyPaisa",
            icon: Smartphone,
            color: "from-green-500 to-emerald-600",
            account: "+92 321 6574555",
            instructions: "Send payment to the account number above and share transaction ID.",
        },
        {
            id: "jazzcash",
            name: "JazzCash",
            icon: Wallet,
            color: "from-orange-500 to-red-600",
            account: "+92 321 6574555",
            instructions: "Transfer to JazzCash mobile account and provide transaction reference.",
        },
        {
            id: "payoneer",
            name: "Payoneer",
            icon: CreditCard,
            color: "from-blue-500 to-purple-600",
            account: "muhammadakram153590@gmail.com",
            instructions: "Send payment to our Payoneer email address.",
        },
    ];

    const handleDonate = () => {
        const amount = customAmount || selectedAmount;
        const method = paymentMethods.find(m => m.id === paymentMethod);
        toast.success(`Thank you for your $${amount} donation via ${method?.name}! ❤️`, {
            description: `Please send payment to: ${method?.account}`,
        });
        setDonorName("");
        setMessage("");
        setCustomAmount("");
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Animated background elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-blue-500/10 dark:from-pink-500/20 dark:via-purple-500/20 dark:to-blue-500/20 rounded-full blur-3xl"
                />

                {/* Additional subtle grid pattern for dark mode */}
                <div className="absolute inset-0 dark:opacity-20 opacity-0 transition-opacity duration-1000">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.15) 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>
            </div>

            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="inline-block"
                                    >
                                        <Sparkles className="w-3 h-3 mr-1" />
                                    </motion.div>
                                    Live Grading Technology
                                </Badge>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient min-h-[120px] md:min-h-[140px]"
                            >
                                <TypewriterText text="Grade Smarter, Not Harder. Develop By MUHAMAMD SAAD AKRAM!!" delay={200} speed={50} />
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-xl text-muted-foreground mb-8"
                            >
                                Transform your grading workflow with real-time evaluation,
                                intelligent insights, and seamless collaboration. Built for
                                educators who demand excellence.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link to="/donate" className="relative group">
                                    {/* Animated glow effect */}
                                    <motion.div
                                        animate={{
                                            opacity: [0.5, 1, 0.5],
                                            scale: [1, 1.05, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm transition duration-1000 group-hover:duration-200"
                                    />

                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative"
                                    >
                                        <Button
                                            size="lg"
                                            className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 w-full sm:w-auto shadow-2xl border-0 text-white font-semibold text-lg px-8 py-6"
                                        >
                                            {/* Shimmer effect */}
                                            <motion.div
                                                animate={{
                                                    x: ["-100%", "200%"],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    repeatDelay: 1,
                                                    ease: "easeInOut",
                                                }}
                                                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                            />

                                            <span className="relative flex items-center gap-2">
                                                <Heart className="w-5 h-5 fill-white" />
                                                Support Development
                                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </Button>
                                    </motion.div>
                                </Link>
                            </motion.div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 mt-12">
                                {[
                                    { value: "10K+", label: "Installer", delay: 0.6, gradient: "from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400" },
                                    { value: "70K+", label: "Course Data", delay: 0.7, gradient: "from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400" },
                                    { value: "95%", label: "Satisfaction", delay: 0.8, gradient: "from-pink-600 to-orange-600 dark:from-pink-400 dark:to-orange-400" },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: stat.delay, duration: 0.6 }}
                                        whileHover={{ y: -5 }}
                                        className="relative group"
                                    >
                                        <div className={`text-3xl font-semibold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                                        <motion.div
                                            className="absolute -inset-2 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 dark:group-hover:from-blue-500/5 dark:group-hover:to-purple-500/5 rounded-lg -z-10 transition-all"
                                            initial={false}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 rounded-3xl opacity-20 dark:opacity-10 blur-3xl"
                            />
                            <motion.div
                                whileHover={{ scale: 1.02, rotate: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative rounded-2xl overflow-hidden shadow-2xl animate-float"
                            >
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1758270704534-fd9715bffc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGFzc3Jvb20lMjB0ZWNobm9sb2d5JTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcwODI1Njg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Modern classroom technology"
                                    className="w-full h-auto"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4">Chrome Extension</Badge>
                        <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Grade Anywhere, Anytime
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Our powerful Chrome extension brings live grading directly to your browser.
                            Grade assignments, provide instant feedback, and track student progress without leaving your current tab.
                        </p>
                    </motion.div>

                    {/* Chrome Extension Showcase */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring" }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-20 blur-3xl animate-pulse" />
                                <Card className="p-8 relative overflow-hidden border-2 border-purple-200 dark:border-purple-800/50 dark:bg-card/50 backdrop-blur-sm">
                                    <motion.div
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                        className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-xl"
                                    >
                                        <Sparkles className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <ImageWithFallback
                                        src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                                        alt="Chrome Extension Interface"
                                        className="w-full h-auto rounded-lg shadow-xl"
                                    />
                                </Card>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="space-y-6"
                        >
                            {[
                                {
                                    icon: Zap,
                                    title: "Instant Grading",
                                    description: "Grade assignments in real-time as students submit them. No delays, no waiting.",
                                    color: "from-yellow-500 to-orange-500",
                                },
                                {
                                    icon: MessageSquare,
                                    title: "Live Feedback",
                                    description: "Provide immediate comments and suggestions that students see instantly.",
                                    color: "from-blue-500 to-cyan-500",
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Progress Tracking",
                                    description: "Monitor student performance with live analytics and detailed insights.",
                                    color: "from-purple-500 to-pink-500",
                                },
                                {
                                    icon: Lock,
                                    title: "Secure & Private",
                                    description: "All data is encrypted and stored securely. Your privacy is our priority.",
                                    color: "from-green-500 to-emerald-500",
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.6 }}
                                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                >
                                    <div className="flex items-start gap-4">
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                                        >
                                            <feature.icon className="w-7 h-7 text-white" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                            <p className="text-muted-foreground">{feature.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Extension Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: CheckCircle2,
                                    title: "Easy Installation",
                                    description: "One-click install from Chrome Web Store. Setup in under 30 seconds.",
                                    stat: "< 30s",
                                },
                                {
                                    icon: Users,
                                    title: "10,000+ Users",
                                    description: "Join thousands of educators using our extension daily.",
                                    stat: "10K+",
                                },
                                {
                                    icon: Star,
                                    title: "4.9/5 Rating",
                                    description: "Highly rated by educators worldwide for reliability and ease of use.",
                                    stat: "4.9★",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.6 }}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                >
                                    <Card className="p-6 text-center h-full border-2 hover:border-purple-300 hover:shadow-xl transition-all">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                                            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4"
                                        >
                                            <item.icon className="w-8 h-8 text-white" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.2 + 0.5 }}
                                            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                                        >
                                            {item.stat}
                                        </motion.div>
                                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Download CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16 text-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative inline-block"
                        >
                            {/* Animated background glow */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 rounded-3xl opacity-20 dark:opacity-30 blur-2xl"
                            />

                            <Card className="p-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50 border-2 border-purple-200 dark:border-purple-700/50 relative backdrop-blur-sm shadow-2xl">
                                {/* Sparkle decorations */}
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-full flex items-center justify-center opacity-20 dark:opacity-30"
                                >
                                    <Sparkles className="w-6 h-6 text-white" />
                                </motion.div>

                                <motion.div
                                    animate={{
                                        rotate: [360, 0],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute bottom-4 left-4 w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 dark:from-blue-500 dark:to-cyan-600 rounded-full flex items-center justify-center opacity-20 dark:opacity-30"
                                >
                                    <Star className="w-5 h-5 text-white" />
                                </motion.div>

                                <div className="relative z-10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 flex items-center justify-center shadow-2xl"
                                    >
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </motion.div>

                                    <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                        Ready to Get Started?
                                    </h3>
                                    <p className="text-foreground/80 dark:text-foreground/70 mb-6 max-w-md mx-auto text-lg">
                                        Install the UCP Live Grading Chrome Extension and start grading smarter today.
                                    </p>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 shadow-xl hover:shadow-2xl transition-all text-lg px-8 py-6"
                                        >
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Install Chrome Extension
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </motion.div>

                                    <p className="text-sm text-muted-foreground mt-4">
                                        Free forever • No credit card required
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4">How It Works</Badge>
                        <h2 className="text-4xl mb-4">Simple Steps to Get Started</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Follow these easy steps to integrate UCP Live Grading into your workflow.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: 1,
                                icon: Zap,
                                title: "Install the Extension",
                                description: "Download and install the UCP Live Grading Chrome Extension from the Chrome Web Store.",
                                color: "from-yellow-500 to-orange-500",
                            },
                            {
                                step: 2,
                                icon: Shield,
                                title: "Secure Your Data",
                                description: "Enterprise-grade security ensures your data is protected with end-to-end encryption.",
                                color: "from-green-500 to-emerald-500",
                            },
                            {
                                step: 3,
                                icon: Clock,
                                title: "Start Grading",
                                description: "Automate repetitive tasks and focus on providing meaningful feedback to students.",
                                color: "from-blue-500 to-cyan-500",
                            },
                            {
                                step: 4,
                                icon: Users,
                                title: "Collaborate with Team",
                                description: "Work seamlessly with co-teachers and share grading rubrics across departments.",
                                color: "from-purple-500 to-pink-500",
                            },
                            {
                                step: 5,
                                icon: BarChart3,
                                title: "Analyze Performance",
                                description: "Gain insights into student performance with comprehensive analytics and reporting.",
                                color: "from-red-500 to-orange-500",
                            },
                            {
                                step: 6,
                                icon: Target,
                                title: "Customize Rubrics",
                                description: "Create and reuse custom grading rubrics tailored to your specific requirements.",
                                color: "from-indigo-500 to-purple-500",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
                                    <div
                                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                                    >
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Donation Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-red-500 dark:from-pink-600 dark:to-red-600 mb-6 shadow-2xl"
                        >
                            <Heart className="w-10 h-10 text-white fill-white" />
                        </motion.div>
                        <Badge className="mb-4 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                            Support Development
                        </Badge>
                        <h2 className="text-5xl mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Help Us Build Better Tools
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            UCP Live Grading is built by a passionate team of developers who
                            believe in making education better. Your support helps us continue
                            developing new features and maintaining the platform.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Donation Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <Card className="p-8 dark:bg-card/80 backdrop-blur-sm border-2 dark:border-border/50">
                                <h2 className="mb-6">Make a Donation</h2>

                                {/* Predefined Amounts */}
                                <div className="mb-6">
                                    <label className="block mb-3">Select Amount</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {predefinedAmounts.map((amount) => (
                                            <motion.button
                                                key={amount}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setSelectedAmount(amount);
                                                    setCustomAmount("");
                                                }}
                                                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${selectedAmount === amount && !customAmount
                                                    ? "border-purple-600 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                                                    : "border-border hover:border-purple-300 dark:hover:border-purple-600"
                                                    }`}
                                            >
                                                <div className="text-2xl font-bold">${amount}</div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Amount */}
                                <div className="mb-6">
                                    <label className="block mb-2">Custom Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            $
                                        </span>
                                        <Input
                                            type="number"
                                            placeholder="Enter custom amount"
                                            value={customAmount}
                                            onChange={(e) => setCustomAmount(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>

                                {/* Donor Info */}
                                <div className="mb-6">
                                    <label className="block mb-2">Your Name (Optional)</label>
                                    <Input
                                        placeholder="Anonymous"
                                        value={donorName}
                                        onChange={(e) => setDonorName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2">Message (Optional)</label>
                                    <Textarea
                                        placeholder="Share why you're supporting us..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2">Payment Method</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {paymentMethods.map((method) => (
                                            <motion.button
                                                key={method.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${paymentMethod === method.id
                                                    ? "border-purple-600 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                                                    : "border-border hover:border-purple-300 dark:hover:border-purple-600"
                                                    }`}
                                            >
                                                {method.id === "easypaisa" ? (
                                                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                                                        <img src={easypaisaLogo} alt="EasyPaisa" className="w-full h-full object-contain" />
                                                    </div>
                                                ) : method.id === "jazzcash" ? (
                                                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                                                        <img src={jazzcashLogo} alt="JazzCash" className="w-full h-full object-contain" />
                                                    </div>
                                                ) : method.id === "payoneer" ? (
                                                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1">
                                                        <img src={payoneerLogo} alt="Payoneer" className="w-full h-full object-contain" />
                                                    </div>
                                                ) : (
                                                    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${paymentMethods.find(m => m.id === method.id)?.color} flex items-center justify-center`}>
                                                        <method.icon className="w-5 h-5 text-white" />
                                                    </div>
                                                )}
                                                <div className="text-sm font-semibold">{method.name}</div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-6"
                                >
                                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 border-2 border-purple-200 dark:border-purple-800/50">
                                        <div className="flex items-start gap-3">
                                            {(() => {
                                                const method = paymentMethods.find(m => m.id === paymentMethod);
                                                const Icon = method?.icon || CreditCard;
                                                return (
                                                    <>
                                                        {paymentMethod === "easypaisa" ? (
                                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1.5 flex-shrink-0">
                                                                <img src={easypaisaLogo} alt="EasyPaisa" className="w-full h-full object-contain" />
                                                            </div>
                                                        ) : paymentMethod === "jazzcash" ? (
                                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1.5 flex-shrink-0">
                                                                <img src={jazzcashLogo} alt="JazzCash" className="w-full h-full object-contain" />
                                                            </div>
                                                        ) : paymentMethod === "payoneer" ? (
                                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1.5 flex-shrink-0">
                                                                <img src={payoneerLogo} alt="Payoneer" className="w-full h-full object-contain" />
                                                            </div>
                                                        ) : (
                                                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method?.color} flex items-center justify-center flex-shrink-0`}>
                                                                <Icon className="w-6 h-6 text-white" />
                                                            </div>
                                                        )}
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                                                                {method?.name} Account
                                                            </h4>
                                                            <p className="text-lg font-mono font-bold text-purple-800 dark:text-purple-200 mb-2">
                                                                {method?.account}
                                                            </p>
                                                            <p className="text-sm text-purple-700 dark:text-purple-300">
                                                                {method?.instructions}
                                                            </p>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </Card>
                                </motion.div>

                                <Button
                                    onClick={handleDonate}
                                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 dark:from-pink-500 dark:to-purple-500 dark:hover:from-pink-600 dark:hover:to-purple-600 shadow-lg"
                                    size="lg"
                                >
                                    <Heart className="w-4 h-4 mr-2" />
                                    Donate ${customAmount || selectedAmount}
                                </Button>

                                <p className="text-xs text-muted-foreground mt-4 text-center">
                                    Your donation helps support development and hosting costs.
                                </p>
                            </Card>
                        </motion.div>

                        {/* Impact Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="space-y-6"
                        >
                            <Card className="p-6 dark:bg-card/80 backdrop-blur-sm border-2 dark:border-border/50">
                                <h3 className="mb-4">Your Impact</h3>
                                <div className="space-y-4">
                                    {[
                                        {
                                            icon: Coffee,
                                            amount: "$5",
                                            description: "Buy us a coffee and keep us coding!",
                                            color: "from-yellow-500 to-orange-500",
                                        },
                                        {
                                            icon: Code,
                                            amount: "$25",
                                            description: "Support a week of development work",
                                            color: "from-blue-500 to-cyan-500",
                                        },
                                        {
                                            icon: Star,
                                            amount: "$50",
                                            description: "Help us add a new feature",
                                            color: "from-purple-500 to-pink-500",
                                        },
                                        {
                                            icon: Gift,
                                            amount: "$100+",
                                            description: "Become a premium supporter",
                                            color: "from-pink-500 to-red-500",
                                        },
                                    ].map((tier, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                                            className="flex items-start gap-4"
                                        >
                                            <div
                                                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                                            >
                                                <tier.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-semibold">{tier.amount}</div>
                                                <p className="text-sm text-muted-foreground">
                                                    {tier.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40 border-2 border-purple-200 dark:border-purple-800/50 backdrop-blur-sm">
                                <div className="flex items-start gap-3 mb-4">
                                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    <div>
                                        <h3 className="text-purple-900 dark:text-purple-100">Community Funded</h3>
                                        <p className="text-sm text-purple-700 dark:text-purple-300">
                                            100% of donations go directly to development and hosting
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Where Donations Go */}
                            <Card className="p-6 dark:bg-card/80 backdrop-blur-sm border-2 dark:border-border/50">
                                <h3 className="mb-4">Where Your Donation Goes</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: "Development", percentage: 60, color: "bg-blue-600" },
                                        { label: "Infrastructure", percentage: 25, color: "bg-purple-600" },
                                        { label: "Community Support", percentage: 15, color: "bg-pink-600" },
                                    ].map((item, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium">{item.label}</span>
                                                <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${item.percentage}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                                    className={`${item.color} h-2 rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="p-12 text-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-0 overflow-hidden relative">
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="relative z-10">
                                <h2 className="text-4xl mb-4 text-white">
                                    Ready to Transform Your Grading?
                                </h2>
                                <p className="text-xl mb-8 text-white/90">
                                    Join thousands of educators who are already saving time and
                                    improving student outcomes.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to="/donate">
                                        <Button
                                            size="lg"
                                            className="bg-white text-purple-600 hover:bg-gray-100 w-full sm:w-auto"
                                        >
                                            Support Development
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
