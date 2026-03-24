export async function callJSONAPI(
  url: string,
  body: Record<string, unknown>,
  action?: string
): Promise<Record<string, unknown>> {
  const endpoint = action ? `${url}?action=${action}` : url
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const e = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error((e as { error: string }).error || `HTTP ${res.status}`)
  }

  return res.json()
}
