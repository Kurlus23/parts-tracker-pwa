import { useListSites, useCreateSite, useDeleteSite } from '../api/hooks'
import { useState } from 'react'
import { Phone, MapPin } from 'lucide-react'

export default function Sites() {
  const sites = useListSites()
  const create = useCreateSite()
  const del = useDeleteSite()

  const [name, setName] = useState('')
  const [securityContact, setSecurityContact] = useState('')
  const [securityPhone, setSecurityPhone] = useState('')
  const [parkingInstructions, setParkingInstructions] = useState('')
  const [accessNotes, setAccessNotes] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')

  function addSite(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return
    create.mutate({ name, securityContact, securityPhone, parkingInstructions, accessNotes, additionalNotes }, {
      onSuccess: () => { setName(''); setSecurityContact(''); setSecurityPhone(''); setParkingInstructions(''); setAccessNotes(''); setAdditionalNotes('') }
    })
  }

  return (
    <div className="p-4 pb-24 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Sites</h1>
        <button onClick={addSite} className="px-3 py-2 rounded bg-blue-600 text-white">Add Site</button>
      </div>

      <div className="bg-white p-3 rounded shadow space-y-2">
        <input className="border rounded px-3 py-2 w-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Security Contact" value={securityContact} onChange={e => setSecurityContact(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Security Phone" value={securityPhone} onChange={e => setSecurityPhone(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Parking Instructions" value={parkingInstructions} onChange={e => setParkingInstructions(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Access Notes" value={accessNotes} onChange={e => setAccessNotes(e.target.value)} />
        <input className="border rounded px-3 py-2 w-full" placeholder="Additional Notes" value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)} />
      </div>

      <div className="grid gap-3">
        {(sites.data ?? []).map((s: any) => (
          <div key={s.id} className="bg-white rounded shadow p-3">
            <div className="text-lg font-semibold">{s.name}</div>
            {s.address && <div className="text-sm flex items-center gap-1 text-gray-700"><MapPin size={16}/> {s.address}</div>}
            {s.securityContact && (
              <div className="text-sm mt-1">
                Security: {s.securityContact} {s.securityPhone && <a className="text-blue-600 inline-flex items-center gap-1" href={`tel:${s.securityPhone}`}><Phone size={14}/> {s.securityPhone}</a>}
              </div>
            )}
            {s.parkingInstructions && <div className="text-sm mt-1">Parking: {s.parkingInstructions}</div>}
            {s.accessNotes && <div className="text-sm">Access: {s.accessNotes}</div>}
            {s.additionalNotes && <div className="text-sm">Notes: {s.additionalNotes}</div>}
            <div className="mt-2">
              <button className="text-red-600 text-sm" onClick={() => del.mutate(s.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
