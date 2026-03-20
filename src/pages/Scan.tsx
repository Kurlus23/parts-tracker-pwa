import { useEffect, useState } from 'react'
import BarcodeScanner from '../components/BarcodeScanner'
import { useListSites, useLookupPartByNumber, useCreateInventoryEntry } from '../api/hooks'
import { useGeolocation } from '../hooks/useGeolocation'

export default function Scan() {
  const { position, loading: gpsLoading } = useGeolocation()
  const [raw, setRaw] = useState<string>('')
  const [pn, setPn] = useState<string>('')
  const [serial, setSerial] = useState<string>('')
  const [qty, setQty] = useState<number>(1)
  const [locationName, setLocationName] = useState<string>('')
  const [siteId, setSiteId] = useState<number | undefined>()
  const sites = useListSites()
  const lookup = useLookupPartByNumber(pn)
  const create = useCreateInventoryEntry()

  useEffect(() => {
    if (!raw) return
    const mPN = raw.match(/PN\s*[:=]\s*([A-Za-z0-9\-\._]+)/i)
    const mSN = raw.match(/SN\s*[:=]\s*([A-Za-z0-9\-\._]+)/i)
    setPn(mPN?.[1] ?? raw.trim())
    setSerial(mSN?.[1] ?? '')
  }, [raw])

  const part = lookup.data
  const partId = part?.id

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!partId || !position) return
    create.mutate({
      partId,
      quantity: qty,
      latitude: position.latitude,
      longitude: position.longitude,
      serialNumber: serial || undefined,
      locationName: locationName || undefined,
      siteId: siteId ? Number(siteId) : undefined
    }, { onSuccess: () => { setSerial(''); setQty(1); setLocationName('') } })
  }

  return (
    <div className="p-4 pb-24 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Add Inventory</h1>
        <div className="text-sm text-gray-600">
          {gpsLoading ? 'Locating...' : position ? `${position.latitude.toFixed(5)}, ${position.longitude.toFixed(5)}` : 'GPS unavailable'}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm text-gray-700">Camera Scan</div>
        <BarcodeScanner onResult={(text) => setRaw(text)} />
        <div className="text-sm text-gray-500">Scanned: <span className="font-mono">{raw}</span></div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-700">Manual Entry</div>
        <form onSubmit={(e) => { e.preventDefault() }}>
          <input className="border rounded px-3 py-2 w-full" placeholder="Part Number" value={pn} onChange={e => setPn(e.target.value)} />
          <button className="mt-2 px-3 py-2 rounded bg-blue-600 text-white" type="submit">Lookup</button>
        </form>
      </div>

      {lookup.isFetching && <div>Looking up part...</div>}
      {lookup.isError && pn && <div className="text-red-600">Part not found</div>}
      {part && (
        <div className="bg-white rounded-md shadow p-3 space-y-1">
          <div className="font-semibold">{part.nomenclature}</div>
          <div className="text-sm">PN: <span className="font-mono">{part.partNumber}</span></div>
          <div className="text-sm">Product Code: <span className="inline-block bg-blue-50 text-blue-700 px-2 py-[2px] rounded text-xs">{part.productCode}</span></div>
          {part.manufacturer && <div className="text-sm">Manufacturer: {part.manufacturer}</div>}
          {part.category && <div className="text-sm">Category: {part.category}</div>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-md shadow p-3 space-y-3">
        <div className="grid gap-2">
          <label className="text-sm">Serial Number</label>
          <input className="border rounded px-3 py-2" value={serial} onChange={e => setSerial(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Quantity</label>
          <input type="number" className="border rounded px-3 py-2" value={qty} onChange={e => setQty(Number(e.target.value))} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Location Name</label>
          <input className="border rounded px-3 py-2" placeholder="Simulation Room, Shelf A3" value={locationName} onChange={e => setLocationName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Site</label>
          <select className="border rounded px-3 py-2" value={String(siteId ?? '')} onChange={e => setSiteId(e.target.value ? Number(e.target.value) : undefined)}>
            <option value="">(none)</option>
            {(sites.data ?? []).map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="grid gap-1 text-sm text-gray-600">
          <div>Latitude: {position?.latitude ?? '-'}</div>
          <div>Longitude: {position?.longitude ?? '-'}</div>
        </div>

        <button disabled={!partId || !position || create.isPending} className="px-3 py-2 rounded bg-green-600 text-white">
          {create.isPending ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
