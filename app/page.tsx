"use client";

import { BarrelDesigner } from "@/components/BarrelDesigner";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,249,235,0.9),_rgba(233,209,173,0.6),_rgba(130,92,50,0.4))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(97,66,36,0.25),_transparent_65%)]" />
      <motion.div
        className="absolute -top-48 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/3 rounded-full bg-amber-700/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.4, delay: 0.6 }}
      />
      <section className="relative z-10 w-full max-w-5xl">
        <BarrelDesigner />
      </section>
    </main>
  );
}
