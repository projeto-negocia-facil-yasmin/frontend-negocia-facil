export function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch {
    return {};
  }
}

export function isAdmin() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const { roles = [] } = parseJwt(token);
  return roles.includes("ROLE_ADMIN");
}