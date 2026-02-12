import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function TypewriterText({ text, delay = 0, speed = 50, className = "" }) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const startDelay = setTimeout(() => {
            if (currentIndex < text.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }, speed);
                return () => clearTimeout(timeout);
            } else {
                setIsComplete(true);
            }
        }, delay);

        return () => clearTimeout(startDelay);
    }, [currentIndex, text, delay, speed]);

    return (
        <span className={className}>
            {displayedText}
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block ml-0.5"
                >
                    |
                </motion.span>
            )}
        </span>
    );
}
