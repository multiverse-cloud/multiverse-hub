export function getSafeRedirectPath(nextPath?: string | null, fallback = '/') {
  if (!nextPath || !nextPath.startsWith('/') || nextPath.startsWith('//')) {
    return fallback
  }

  return nextPath
}

export function getSafeAdminRedirectPath(nextPath?: string | null, fallback = '/admin') {
  const safePath = getSafeRedirectPath(nextPath, fallback)

  if (safePath === '/admin' || safePath.startsWith('/admin/')) {
    return safePath
  }

  return fallback
}

export function getSafePublicRedirectPath(nextPath?: string | null, fallback = '/') {
  const safePath = getSafeRedirectPath(nextPath, fallback)

  if (safePath === '/admin' || safePath.startsWith('/admin/')) {
    return fallback
  }

  return safePath
}
