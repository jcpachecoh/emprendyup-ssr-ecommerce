/**
 * Utilities for reading lightweight auth/session info from localStorage.
 * The project persists a zustand session store under the key 'session',
 * but other shapes may exist. These helpers try common locations and
 * safely parse JSON to return the current user's id when present.
 */

export function safeJsonParse<T = unknown>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch (e) {
    return null;
  }
}

/**
 * Try to extract a user object from a few common localStorage shapes.
 */
export function getUserFromLocalStorage(): any | null {
  if (typeof window === 'undefined') return null;

  // common keys to try (ordered)
  const keys = ['session', 'user', 'auth', 'app_session'];

  for (const key of keys) {
    const raw = localStorage.getItem(key);
    const parsed = safeJsonParse<any>(raw);
    if (!parsed) continue;

    // Zustand persist commonly stores the state directly under the key, e.g. { user: { ... } }
    if (parsed.user) return parsed.user;

    // Some apps store under { state: { user: ... } }
    if (parsed.state?.user) return parsed.state.user;

    // If the parsed value itself looks like a user object (has id/email), return it
    if (typeof parsed === 'object' && (parsed.id || parsed.email || parsed.name)) return parsed;
  }

  return null;
}

/**
 * Returns the current user's id found in localStorage, or null if not present.
 */
export function getUserIdFromLocalStorage(): string | null {
  const user = getUserFromLocalStorage();
  if (!user) return null;
  // user.id may be nested or be a number
  const id = user.id ?? user.userId ?? user.uid ?? null;
  return id != null ? String(id) : null;
}

export default getUserIdFromLocalStorage;
