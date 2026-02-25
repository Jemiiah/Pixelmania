import { useState } from 'react'
import { Button } from '@/components/ui/Button.tsx'
import { useUIStore } from '@/stores/uiStore.ts'

export function TemplateUpload() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  const addToast = useUIStore((s) => s.addToast)

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  function handleUpload() {
    addToast({ type: 'success', message: 'Template uploaded successfully!' })
    setFileName(null)
    setPreview(null)
    setPosX(0)
    setPosY(0)
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-bold text-text-primary">Upload Template</h3>

      {/* File select */}
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border-default p-6 transition-colors hover:border-primary-500">
        <svg
          className="h-8 w-8 text-text-tertiary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span className="text-sm text-text-secondary">
          {fileName ?? 'Choose an image file'}
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>

      {/* Preview */}
      {preview && (
        <div className="overflow-hidden rounded-md border border-border-subtle">
          <img
            src={preview}
            alt="Template preview"
            className="h-32 w-full object-contain bg-bg-elevated pixel-render"
          />
        </div>
      )}

      {/* Position */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-text-secondary">X Position</label>
          <input
            type="number"
            min={0}
            max={511}
            value={posX}
            onChange={(e) => setPosX(Number(e.target.value))}
            className="w-full rounded-md border border-border-default bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-500 transition-colors duration-150"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Y Position</label>
          <input
            type="number"
            min={0}
            max={511}
            value={posY}
            onChange={(e) => setPosY(Number(e.target.value))}
            className="w-full rounded-md border border-border-default bg-bg-elevated px-3 py-2 text-sm text-text-primary outline-none focus:border-primary-500 transition-colors duration-150"
          />
        </div>
      </div>

      {/* Upload button */}
      <Button
        variant="primary"
        fullWidth
        disabled={!fileName}
        onClick={handleUpload}
      >
        Upload Template
      </Button>
    </div>
  )
}
