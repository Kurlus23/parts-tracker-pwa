import { useListInventory } from '../api/hooks'
import { useState } from 'react'
import InventoryCard from '../components/InventoryCard'

export default function Inventory() {
  const q = useListInventory()
  const [search, setSearch] = useState('')
  const items = (q.data ?? []).filter((i: any) => {
    const s = search.toLowerCase()
    const fields = [i.partNumber, i.nomenclature, i.locationName, i.siteName].map((x: string) => (x || '').toLowerCase())
    return s ? fields.some(f => f.includes(s)) : true
  })

  return (
    <div className="p-4 pb-24">
      <h1 className="text-xl font-bold mb-3">Inventory</h1>
      <input className="border rounded px-3 py-2 w-full mb-3" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      <div className="grid gap-3">
        {items.map((it: any) => <InventoryCard key={it.id} entry={it} />)}
      </div>
    </div>
  )
}
