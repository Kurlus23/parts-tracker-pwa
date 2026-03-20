import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'

type Props = { onResult: (text: string) => void }

export default function BarcodeScanner({ onResult }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    let stream: MediaStream | null = null
    let canceled = false

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        })
        if (!videoRef.current) return
        videoRef.current.srcObject = stream
        await videoRef.current.play()

        codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
          if (canceled) return
          if (result) {
            onResult(result.getText())
            setError(null) // clear with null, never undefined
          }
          if (err && (err as any).name !== 'NotFoundException') {
            const msg =
              (err as any)?.message ??
              (typeof err === 'string' ? err : 'Unknown camera error')
            setError(msg) // always a string
          }
        })
      } catch (e: any) {
        const msg = e?.message ?? 'Unable to access camera'
        setError(msg)
      }
    }

    start()
    return () => {
      canceled = true
      codeReader.reset()
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [onResult])

  return (
    <div className="w-full bg-black rounded-md overflow-hidden">
      <video ref={videoRef} className="w-full h-[400px] object-cover" />
      {error && <div className="p-2 text-red-600 text-sm">{error}</div>}
    </div>
  )
}