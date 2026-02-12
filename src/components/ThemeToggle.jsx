import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const initialTheme = savedTheme || "light";

        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-purple-600 dark:to-pink-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                {theme === "light" ? (
                    <Sun className="w-5 h-5 text-white" />
                ) : (
                    <Moon className="w-5 h-5 text-white" />
                )}
            </motion.div>
        </motion.button>
    );
}
