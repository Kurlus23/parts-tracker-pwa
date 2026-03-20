import React from 'react'
// @ts-ignore - virtual module provided by vite-plugin-pwa
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, reg) { /* console.log('SW registered', swUrl, reg) */ },
    onRegisterError(err) { console.error('SW registration error', err) }
  })

  const close = () => { setOfflineReady(false); setNeedRefresh(false) }

  if (!offlineReady && !needRefresh) return null

  return (
    <div className="fixed bottom-20 inset-x-0 px-4">
      <div className="mx-auto max-w-sm bg-white shadow-lg rounded-md p-3 border">
        <div className="text-sm">
          {offlineReady && <span>App ready to work offline.</span>}
          {needRefresh && <span>New version available.</span>}
        </div>
        <div className="mt-2 flex gap-2 justify-end">
          {needRefresh && <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => updateServiceWorker(true)}>Reload</button>}
          <button className="px-3 py-1 bg-gray-200 rounded" onClick={close}>Dismiss</button>
        </div>
      </div>
    </div>
  )
}
