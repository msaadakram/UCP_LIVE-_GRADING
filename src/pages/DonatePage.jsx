import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { motion } from "framer-motion";
import {
    Heart,
    Coffee,
    Gift,
    Code,
    Users,
    Star,
    ArrowLeft,
    Sparkles,
    Shield,
    CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export function DonatePage() {
    const [selectedAmount, setSelectedAmount] = useState(10);
    const [customAmount, setCustomAmount] = useState("");
    const [donorName, setDonorName] = useState("");
    const [message, setMessage] = useState("");

    const predefinedAmounts = [5, 10, 25, 50, 100];

    const handleDonate = () => {
        const amount = customAmount || selectedAmount;
        toast.success(`Thank you for your $${amount} donation! ❤️`, {
            description: "Your support helps us continue improving UCP Live Grading.",
        });
        setDonorName("");
        setMessage("");
        setCustomAmount("");
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Animated background */}
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
                    className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 dark:from-pink-500/20 dark:via-purple-500/20 dark:to-blue-500/20 rounded-full blur-3xl"
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
                    className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-red-500/10 via-purple-500/10 to-pink-500/10 dark:from-red-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-full blur-3xl"
                />
            </div>

            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-red-500 dark:from-pink-600 dark:to-red-600 mb-8 shadow-2xl"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Heart className="w-12 h-12 text-white fill-white" />
                        </motion.div>
                    </motion.div>

                    <Badge className="mb-4 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Community Supported
                    </Badge>
                    <h1 className="text-5xl mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                        Support UCP Live Grading
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your donation helps us maintain, improve, and expand UCP Live Grading for students and educators everywhere.
                    </p>
                </motion.div>
            </section>

            {/* Donation Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Donation Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
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
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
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
                        animate={{ opacity: 1, x: 0 }}
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
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                            <tier.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">{tier.amount}</div>
                                            <p className="text-sm text-muted-foreground">{tier.description}</p>
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

                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {[
                                    { icon: Shield, label: "Secure" },
                                    { icon: CheckCircle2, label: "Verified" },
                                    { icon: Heart, label: "Trusted" },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300">
                                        <item.icon className="w-4 h-4" />
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Why Donate */}
                        <Card className="p-6 dark:bg-card/80 backdrop-blur-sm border-2 dark:border-border/50">
                            <h3 className="mb-4">Why Donate?</h3>
                            <div className="space-y-3">
                                {[
                                    "Keep the service free for all students",
                                    "Fund new feature development",
                                    "Cover server and hosting costs",
                                    "Support the open-source community",
                                ].map((reason, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                        <span className="text-sm">{reason}</span>
                                    </motion.div>
                                ))}
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
            </section>

            <Footer />
        </div>
    );
}
