import { useEffect, useState } from 'react'
export function useGeolocation() {
  const [position, setPosition] = useState<GeolocationCoordinates | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!navigator.geolocation) { setError('Geolocation not supported'); setLoading(false); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => { setPosition(pos.coords); setLoading(false) },
      (err) => { setError(err.message); setLoading(false) }
    )
  }, [])
  return { position, loading, error }
}
