import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './client'

export function useListInventory(q?: { lat?: number; lng?: number; radiusMiles?: number; productCode?: string; }) { return useQuery({ queryKey: ['inventory', q], queryFn: () => api.inventory.list(q) }) }
export function useCreateInventoryEntry() { const qc = useQueryClient(); return useMutation({ mutationFn: api.inventory.create, onSuccess: () => qc.invalidateQueries({ queryKey: ['inventory'] }) }) }
export function useUpdateInventoryEntry() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, data }: { id: number; data: any }) => api.inventory.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['inventory'] }) }) }
export function useDeleteInventoryEntry() { const qc = useQueryClient(); return useMutation({ mutationFn: (id: number) => api.inventory.remove(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['inventory'] }) }) }
export function useLookupPartByNumber(partNumber?: string) { return useQuery({ queryKey: ['parts.lookup', partNumber], queryFn: () => api.parts.lookup(partNumber!), enabled: !!partNumber }) }
export function useListParts() { return useQuery({ queryKey: ['parts'], queryFn: api.parts.list }) }
export function useCreatePart() { const qc = useQueryClient(); return useMutation({ mutationFn: api.parts.create, onSuccess: () => qc.invalidateQueries({ queryKey: ['parts'] }) }) }
export function useUpdatePart() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, data }: { id: number; data: any }) => api.parts.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['parts'] }) }) }
export function useDeletePart() { const qc = useQueryClient(); return useMutation({ mutationFn: (id: number) => api.parts.remove(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['parts'] }) }) }
export function useListSites() { return useQuery({ queryKey: ['sites'], queryFn: api.sites.list }) }
export function useCreateSite() { const qc = useQueryClient(); return useMutation({ mutationFn: api.sites.create, onSuccess: () => qc.invalidateQueries({ queryKey: ['sites'] }) }) }
export function useUpdateSite() { const qc = useQueryClient(); return useMutation({ mutationFn: ({ id, data }: { id: number; data: any }) => api.sites.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['sites'] }) }) }
export function useDeleteSite() { const qc = useQueryClient(); return useMutation({ mutationFn: (id: number) => api.sites.remove(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['sites'] }) }) }
export function useSyncSharePoint() { const qc = useQueryClient(); return useMutation({ mutationFn: api.sharepoint.sync, onSuccess: () => qc.invalidateQueries({ queryKey: ['parts'] }) }) }
export function useGetSharePointStatus() { return useQuery({ queryKey: ['sharepoint.status'], queryFn: api.sharepoint.status }) }
