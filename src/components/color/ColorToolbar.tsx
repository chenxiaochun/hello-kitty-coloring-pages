const PALETTE = [
  "#FF6B9D",
  "#E84C6F",
  "#FFD166",
  "#7EC8E3",
  "#C9A0FF",
  "#FFFFFF",
  "#5C4A5A",
  "#FFB3C9",
] as const;

const BRUSH_SIZES = [
  { id: "small", label: "S", size: 8 },
  { id: "medium", label: "M", size: 16 },
  { id: "large", label: "L", size: 28 },
] as const;

export type ColoringMode = "brush" | "magic-fill";
export type ToolMode = "brush" | "eraser";
export type BrushSizeId = (typeof BRUSH_SIZES)[number]["id"];

type ColorToolbarProps = {
  coloringMode: ColoringMode;
  activeColor: string;
  tool: ToolMode;
  brushSize: BrushSizeId;
  canUndo: boolean;
  onColoringModeChange: (mode: ColoringMode) => void;
  onColorChange: (color: string) => void;
  onToolChange: (tool: ToolMode) => void;
  onBrushSizeChange: (size: BrushSizeId) => void;
  onUndo: () => void;
  onClear: () => void;
};

export function getBrushPixelSize(id: BrushSizeId): number {
  return BRUSH_SIZES.find((b) => b.id === id)?.size ?? 16;
}

export function ColorToolbar({
  coloringMode,
  activeColor,
  tool,
  brushSize,
  canUndo,
  onColoringModeChange,
  onColorChange,
  onToolChange,
  onBrushSizeChange,
  onUndo,
  onClear,
}: ColorToolbarProps) {
  const paletteDisabled = coloringMode === "brush" && tool === "eraser";

  return (
    <footer className="border-t-2 border-[var(--soft-pink)] bg-white px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <ModeButton
            active={coloringMode === "brush"}
            label="Brush"
            description="Draw freely"
            icon="✏️"
            onClick={() => onColoringModeChange("brush")}
          />
          <ModeButton
            active={coloringMode === "magic-fill"}
            label="Magic Fill"
            description="Tap to fill"
            icon="✨"
            onClick={() => onColoringModeChange("magic-fill")}
          />
        </div>

        {coloringMode === "brush" ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <ToolButton
              active={tool === "brush"}
              label="Brush"
              icon="🖌️"
              onClick={() => onToolChange("brush")}
            />
            <ToolButton
              active={tool === "eraser"}
              label="Eraser"
              icon="🧽"
              onClick={() => onToolChange("eraser")}
            />
            <div className="mx-1 hidden h-8 w-px bg-[var(--soft-pink)] sm:block" aria-hidden />
            {BRUSH_SIZES.map((size) => (
              <button
                key={size.id}
                type="button"
                aria-label={`Brush size ${size.label}`}
                onClick={() => onBrushSizeChange(size.id)}
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-transform active:scale-90 ${
                  brushSize === size.id
                    ? "border-[var(--bow-red)] bg-[var(--kitty-pink)] text-white"
                    : "border-[var(--kitty-pink)] bg-white text-[var(--ink-soft)]"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center font-display text-sm font-semibold text-[var(--ink-soft)]">
            Pick a color, then tap any area to fill it!
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={!canUndo}
            onClick={onUndo}
            className="min-h-12 rounded-full border-2 border-[var(--kitty-pink)] bg-white px-4 font-display text-sm font-bold text-[var(--ink-soft)] transition-opacity active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={onClear}
            className="min-h-12 rounded-full border-2 border-[var(--kitty-pink)] bg-[var(--soft-pink)] px-4 font-display text-sm font-bold text-[var(--bow-red)] active:scale-95"
          >
            Clear
          </button>
        </div>

        <div
          className={`flex flex-wrap items-center justify-center gap-3 transition-opacity ${
            paletteDisabled ? "pointer-events-none opacity-40" : ""
          }`}
        >
          {PALETTE.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Select color ${color}`}
              disabled={paletteDisabled}
              onClick={() => onColorChange(color)}
              className={`h-12 w-12 rounded-full border-2 transition-transform active:scale-90 ${
                activeColor === color && !paletteDisabled
                  ? "scale-110 border-[var(--bow-red)] ring-4 ring-[var(--soft-pink)]"
                  : "border-[var(--ink-soft)]/20"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

type ModeButtonProps = {
  active: boolean;
  label: string;
  description: string;
  icon: string;
  onClick: () => void;
};

function ModeButton({ active, label, description, icon, onClick }: ModeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-[20px] border-2 px-3 py-3 font-display transition-transform active:scale-[0.98] ${
        active
          ? "border-[var(--bow-red)] bg-[var(--kitty-pink)] text-white shadow-[0_4px_0_var(--bow-red)]"
          : "border-[var(--kitty-pink)] bg-white text-[var(--ink-soft)]"
      }`}
    >
      <span aria-hidden className="text-xl">
        {icon}
      </span>
      <span className="text-sm font-bold sm:text-base">{label}</span>
      <span className={`text-xs font-semibold ${active ? "text-white/90" : "text-[var(--ink-soft)]/70"}`}>
        {description}
      </span>
    </button>
  );
}

type ToolButtonProps = {
  active: boolean;
  label: string;
  icon: string;
  onClick: () => void;
};

function ToolButton({ active, label, icon, onClick }: ToolButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 items-center gap-2 rounded-full border-2 px-4 font-display text-sm font-bold transition-transform active:scale-95 ${
        active
          ? "border-[var(--bow-red)] bg-[var(--kitty-pink)] text-white"
          : "border-[var(--kitty-pink)] bg-white text-[var(--ink-soft)]"
      }`}
    >
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
