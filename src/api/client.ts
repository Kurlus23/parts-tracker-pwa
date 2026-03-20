const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

async function http(path: string, init?: RequestInit) {
  const r = await fetch(`${API}${path}`, { headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) }, ...init })
  if (!r.ok) {
    let msg = `HTTP ${r.status}`
    try { const j = await r.json(); msg = (j as any).error ?? msg } catch {}
    throw new Error(msg)
  }
  return r.json()
}

export const api = {
  parts: { list: () => http('/parts'), lookup: (pn: string) => http(`/parts/lookup/${encodeURIComponent(pn)}`), create: (b: any) => http('/parts', { method: 'POST', body: JSON.stringify(b) }), update: (id: number, b: any) => http(`/parts/${id}`, { method: 'PATCH', body: JSON.stringify(b) }), remove: (id: number) => http(`/parts/${id}`, { method: 'DELETE' }) },
  inventory: {
    list: (q?: { lat?: number; lng?: number; radiusMiles?: number; productCode?: string }) => {
      const sp = new URLSearchParams()
      if (q?.lat != null && q?.lng != null) { sp.set('lat', String(q.lat)); sp.set('lng', String(q.lng)) }
      if (q?.radiusMiles != null) sp.set('radiusMiles', String(q.radiusMiles))
      if (q?.productCode) sp.set('productCode', q.productCode)
      const suffix = sp.toString() ? `?${sp.toString()}` : ''
      return http(`/inventory${suffix}`)
    },
    create: (b: any) => http('/inventory', { method: 'POST', body: JSON.stringify(b) }), update: (id: number, b: any) => http(`/inventory/${id}`, { method: 'PATCH', body: JSON.stringify(b) }), remove: (id: number) => http(`/inventory/${id}`, { method: 'DELETE' })
  },
  sites: { list: () => http('/sites'), create: (b: any) => http('/sites', { method: 'POST', body: JSON.stringify(b) }), update: (id: number, b: any) => http(`/sites/${id}`, { method: 'PATCH', body: JSON.stringify(b) }), remove: (id: number) => http(`/sites/${id}`, { method: 'DELETE' }) },
  sharepoint: { status: () => http('/sharepoint/status'), sync: () => http('/sharepoint/sync', { method: 'POST' }) }
}
