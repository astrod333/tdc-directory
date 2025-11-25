"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createContext, useContext } from "react";

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: "0px 0px -200px" };

export function FadeIn(props: any) {
	const shouldReduceMotion = useReducedMotion();
	const isInStaggerGroup = useContext(FadeInStaggerContext);

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ duration: 0.5 }}
			{...(isInStaggerGroup
				? {}
				: {
						initial: "hidden",
						whileInView: "visible",
						viewport,
					})}
			{...props}
		/>
	);
}
