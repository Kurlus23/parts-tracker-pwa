import { useGeolocation } from '../hooks/useGeolocation'
import { useListInventory } from '../api/hooks'
import InventoryCard from '../components/InventoryCard'
import { useState } from 'react'

export default function Home() {
  const { position, loading, error } = useGeolocation()
  const [radius, setRadius] = useState<number | null>(25)
  const [q, setQ] = useState('')

  const query = useListInventory(position ? { lat: position.latitude, lng: position.longitude, radiusMiles: radius ?? undefined } : undefined)
  const items = (query.data ?? [])
    .filter((i: any) => {
      const s = (q || '').toLowerCase()
      const fields = [i.partNumber, i.nomenclature, i.productCode].map((x: string) => (x || '').toLowerCase())
      return s ? fields.some(f => f.includes(s)) : true
    })

  return (
    <div className="p-4 pb-24">
      <h1 className="text-xl font-bold mb-3">Nearby Inventory</h1>
      <div className="flex gap-2 mb-3">
        <input className="border rounded px-3 py-2 flex-1" placeholder="Search by part, nomenclature, code" value={q} onChange={e => setQ(e.target.value)} />
        <select className="border rounded px-2" value={String(radius ?? 'any')} onChange={e => setRadius(e.target.value === 'any' ? null : Number(e.target.value))}>
          <option value="5">5 mi</option>
          <option value="10">10 mi</option>
          <option value="25">25 mi</option>
          <option value="50">50 mi</option>
          <option value="any">Any</option>
        </select>
      </div>

      {loading && <div>Acquiring GPS signal...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid gap-3">
        {items.map((it: any) => <InventoryCard key={it.id} entry={it} />)}
      </div>
    </div>
  )
}
