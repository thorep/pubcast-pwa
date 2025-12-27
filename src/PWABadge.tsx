import { useRegisterSW } from 'virtual:pwa-register/react'

function PWABadge() {
  // check for updates every hour

 // const period = 60 * 60 * 1000
  const period = 1000*5

  const {
    
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r)
      }
      else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated')
            registerPeriodicSync(period, swUrl, r)
        })
      }
    },
  })

  function close() {
    
    setNeedRefresh(false)
  }

  return (
    <div role="alert" aria-labelledby="toast-message">
      {needRefresh && (
        <div className="fixed right-4 top-[calc(env(safe-area-inset-top)+1rem)] z-[60] w-[min(92vw,22rem)] rounded-lg border border-neutral-200 bg-white p-4 text-left shadow">
          <div className="text-sm text-neutral-700">
            <span id="toast-message">New content available, click on reload button to update.</span>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              className="rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-800 hover:border-neutral-400"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
            <button
              className="rounded-md border border-neutral-200 px-3 py-1 text-sm text-neutral-600 hover:border-neutral-300"
              onClick={() => close()}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PWABadge

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}
