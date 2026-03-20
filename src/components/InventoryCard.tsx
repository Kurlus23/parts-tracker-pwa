export default function InventoryCard({ entry }: { entry: any }) {
  const maps = `https://maps.google.com/?q=${entry.latitude},${entry.longitude}`
  const waze = `https://waze.com/ul?ll=${entry.latitude},${entry.longitude}&navigate=yes`
  return (
    <div className="bg-white rounded-md shadow p-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg font-semibold">{entry.nomenclature}</div>
          <div className="text-sm text-gray-600">
            <span className="font-mono">{entry.partNumber}</span>
            {" · "}
            <span className="inline-block bg-blue-50 text-blue-700 px-2 py-[2px] rounded text-xs">{entry.productCode}</span>
          </div>
          {entry.serialNumber && <div className="text-sm mt-1">SN: {entry.serialNumber}</div>}
          <div className="text-sm text-gray-700">{entry.locationName ?? '-'}</div>
          {entry.siteName && <div className="text-sm text-gray-500">{entry.siteName}</div>}
          {entry.distanceMiles != null && <div className="text-sm text-gray-700 mt-1">{entry.distanceMiles.toFixed(1)} mi</div>}
        </div>
        <div className="bg-gray-100 rounded px-2 py-1 text-sm">Qty {entry.quantity}</div>
      </div>
      <div className="flex gap-2 mt-3">
        <a className="px-3 py-2 rounded bg-green-600 text-white text-sm" href={maps} target="_blank" rel="noreferrer">G Maps</a>
        <a className="px-3 py-2 rounded bg-indigo-600 text-white text-sm" href={waze} target="_blank" rel="noreferrer">Waze</a>
      </div>
    </div>
  )
}
