import { toast } from "react-toastify";

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

export function confirmAction(message) {
  return window.confirm(message);
}

export function success(msg) {
  toast.success(msg);
}

export function error(msg) {
  toast.error(msg);
}

export function info(msg) {
  toast.info(msg);
}