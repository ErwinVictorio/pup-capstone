import React from "react";
import { motion } from "motion/react";

export const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
};

export const stagger = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.07,
        },
    },
};

const motionTags = {
    article: motion.article,
    div: motion.div,
    main: motion.main,
    section: motion.section,
};

export function Reveal({ as = "div", className = "", delay = 0, children }) {
    const Component = motionTags[as] ?? motion.div;

    return (
        <Component
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.45, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </Component>
    );
}

export function Stagger({ as = "div", className = "", children }) {
    const Component = motionTags[as] ?? motion.div;

    return (
        <Component initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className={className}>
            {children}
        </Component>
    );
}

export function StaggerItem({ as = "div", className = "", children }) {
    const Component = motionTags[as] ?? motion.div;

    return (
        <Component variants={fadeUp} transition={{ duration: 0.4, ease: "easeOut" }} className={className}>
            {children}
        </Component>
    );
}
