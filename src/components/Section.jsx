import { motion, useReducedMotion } from "framer-motion";

export default function Section({ id, title, isHero = false, children }) {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id={id}
      className={`${isHero ? "min-h-screen flex items-center" : "py-20 md:py-28"
        } px-6 md:px-12 lg:px-24 max-w-7xl mx-auto`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
    >
      {!isHero && title && (
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="border-b-4 border-accent pb-2">{title}</span>
        </h2>
      )}
      {children}
    </motion.section>
  );
}
