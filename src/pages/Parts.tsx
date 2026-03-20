import { useListParts, useSyncSharePoint, useGetSharePointStatus, useDeletePart } from '../api/hooks'
import { useState } from 'react'

export default function Parts() {
  const parts = useListParts()
  const status = useGetSharePointStatus()
  const sync = useSyncSharePoint()
  const del = useDeletePart()
  const [search, setSearch] = useState('')

  const items = (parts.data ?? []).filter((p: any) => {
    const s = search.toLowerCase()
    const fields = [p.partNumber, p.nomenclature, p.productCode, p.manufacturer, p.category].map((x: string) => (x || '').toLowerCase())
    return s ? fields.some(f => f.includes(s)) : true
  })

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold">Parts Catalog</h1>
        <button disabled={sync.isPending || !status.data?.connected}
                onClick={() => sync.mutate()}
                className={`px-3 py-2 rounded text-white ${status.data?.connected ? 'bg-green-600' : 'bg-gray-400'}`}>
          {sync.isPending ? 'Syncing...' : 'Sync SharePoint'}
        </button>
      </div>

      <div className={`p-2 mb-3 rounded ${status.data?.connected ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
        {status.isLoading ? 'Checking SharePoint...' :
          status.data?.connected ?
            <>Connected to {status.data.siteUrl} list "{status.data.listName}". Last synced: {status.data.lastSynced ?? 'never'}.</> :
            <>Disconnected — set env vars to enable sync.</>}
      </div>

      <input className="border rounded px-3 py-2 w-full mb-3" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />

      <div className="bg-white rounded shadow divide-y">
        {items.map((p: any) => (
          <div key={p.id} className="p-3 flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.nomenclature}</div>
              <div className="text-sm text-gray-600">
                PN: <span className="font-mono">{p.partNumber}</span>
                {' · '}
                <span className="inline-block bg-blue-50 text-blue-700 px-2 py-[2px] rounded text-xs">{p.productCode}</span>
                {p.manufacturer && <> · {p.manufacturer}</>}
                {p.category && <> · {p.category}</>}
              </div>
            </div>
            <button onClick={() => del.mutate(p.id)} className="text-red-600 text-sm">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
