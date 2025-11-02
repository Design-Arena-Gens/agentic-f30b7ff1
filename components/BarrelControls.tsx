"use client";

import { BarrelConfig } from "./BarrelPreview";

type BarrelControlsProps = {
  config: BarrelConfig;
  onChange: (config: BarrelConfig) => void;
};

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  format = (val) => val.toString()
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) {
  return (
    <label className="flex flex-col gap-2 rounded-2xl border border-brown-200/50 bg-white/50 p-4 shadow-sm shadow-black/5 backdrop-blur">
      <div className="flex items-center justify-between text-sm font-medium text-stone-700">
        <span>{label}</span>
        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-500">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        className="accent-amber-700"
      />
    </label>
  );
}

export function BarrelControls({ config, onChange }: BarrelControlsProps) {
  const update = <Key extends keyof BarrelConfig>(key: Key, value: BarrelConfig[Key]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Slider
        label="Количество клепок"
        min={6}
        max={24}
        value={config.staves}
        onChange={(value) => update("staves", value)}
        format={(value) => `${value}`}
      />
      <Slider
        label="Высота"
        min={0}
        max={1}
        step={0.01}
        value={config.height}
        onChange={(value) => update("height", value)}
        format={(value) => `${Math.round((0.6 + value * 0.8) * 100)}%`}
      />
      <Slider
        label="Выпуклость"
        min={0}
        max={1}
        step={0.01}
        value={config.bulge}
        onChange={(value) => update("bulge", value)}
        format={(value) => `${Math.round(value * 100)}%`}
      />
      <Slider
        label="Количество обручей"
        min={1}
        max={6}
        value={config.bandCount}
        onChange={(value) => update("bandCount", value)}
        format={(value) => `${value}`}
      />
      <Slider
        label="Тон древесины"
        min={0}
        max={360}
        value={config.woodHue}
        onChange={(value) => update("woodHue", value)}
        format={(value) => `${value}°`}
      />
      <Slider
        label="Насыщенность"
        min={20}
        max={90}
        value={config.woodSaturation}
        onChange={(value) => update("woodSaturation", value)}
        format={(value) => `${value}%`}
      />
      <Slider
        label="Светлота"
        min={15}
        max={75}
        value={config.woodLightness}
        onChange={(value) => update("woodLightness", value)}
        format={(value) => `${value}%`}
      />
      <Slider
        label="Обжиг"
        min={0}
        max={1}
        step={0.01}
        value={config.charLevel}
        onChange={(value) => update("charLevel", value)}
        format={(value) => `${Math.round(value * 100)}%`}
      />
      <Slider
        label="Лак / глянец"
        min={0}
        max={1}
        step={0.01}
        value={config.gloss}
        onChange={(value) => update("gloss", value)}
        format={(value) => `${Math.round(value * 100)}%`}
      />
      <label className="col-span-full flex flex-col gap-2 rounded-2xl border border-brown-200/50 bg-white/50 p-4 shadow-sm shadow-black/5 backdrop-blur">
        <div className="flex items-center justify-between text-sm font-medium text-stone-700">
          <span>Маркировка</span>
          <span className="text-xs text-stone-500">{config.label.length}/18</span>
        </div>
        <input
          type="text"
          maxLength={18}
          value={config.label}
          onChange={(event) => update("label", event.currentTarget.value)}
          placeholder="Например, ВИНО 1987"
          className="rounded-xl border border-stone-200 bg-white/80 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-stone-700 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-600/30"
        />
      </label>
    </div>
  );
}
