"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarrelPreview, type BarrelConfig } from "./BarrelPreview";
import { BarrelControls } from "./BarrelControls";

const defaultConfig: BarrelConfig = {
  staves: 14,
  height: 0.5,
  bulge: 0.43,
  bandCount: 3,
  woodHue: 28,
  woodSaturation: 63,
  woodLightness: 43,
  charLevel: 0.32,
  gloss: 0.38,
  label: "СЕЛЬСКАЯ КАЗНА"
};

export function BarrelDesigner() {
  const [config, setConfig] = useState<BarrelConfig>(defaultConfig);

  const flavorNotes = useMemo(() => {
    const toastLevel = config.charLevel;
    if (toastLevel < 0.2) {
      return ["свежее дерево", "травы", "цветочный мёд"];
    }
    if (toastLevel < 0.45) {
      return ["карамель", "ваниль", "жареные орехи"];
    }
    if (toastLevel < 0.7) {
      return ["пряности", "дым", "кленовый сироп"];
    }
    return ["какао", "копчёность", "карамелизованный сахар"];
  }, [config.charLevel]);

  return (
    <div className="flex flex-col gap-10">
      <motion.section
        className="flex flex-col gap-6 rounded-3xl border border-white/40 bg-white/55 p-8 shadow-2xl shadow-amber-900/10 backdrop-blur-xl md:flex-row md:items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-1 flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-600/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Barrel Forge
          </span>
          <h1 className="text-4xl font-black tracking-tight text-stone-800 md:text-5xl">
            Соберите идеальную бочку
          </h1>
          <p className="text-lg text-stone-600">
            Управляйте геометрией, оттенком дерева и обжигом, чтобы получить именно ту бочку,
            которая подчеркнёт характер вашего напитка.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-stone-500">
            {flavorNotes.map((note) => (
              <span
                key={note}
                className="rounded-full bg-amber-900/5 px-3 py-1 font-medium text-amber-800"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
        <div className="flex h-[420px] flex-1 items-center justify-center">
          <BarrelPreview config={config} />
        </div>
      </motion.section>

      <motion.section
        className="rounded-3xl border border-white/40 bg-white/65 p-8 shadow-xl shadow-amber-800/10 backdrop-blur-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-stone-800">Параметры</h2>
          <p className="text-sm text-stone-500">
            Каждый параметр обновляет визуализацию в реальном времени. Сохраняйте настройки,
            делитесь с командой и экспортируйте в производство.
          </p>
        </div>
        <BarrelControls config={config} onChange={setConfig} />
      </motion.section>
    </div>
  );
}
