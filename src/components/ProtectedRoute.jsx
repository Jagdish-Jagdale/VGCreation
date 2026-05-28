import { useEffect } from "react";

export default function ProtectedRoute({ children, requireAuth = true, redirectTo }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    if (requireAuth && !isAdmin) {
      window.history.pushState(null, "", redirectTo || "/login");
      setTimeout(() => {
        window.dispatchEvent(new PopStateEvent("popstate"));
      }, 0);
    } else if (!requireAuth && isAdmin) {
      window.history.pushState(null, "", redirectTo || "/admin");
      setTimeout(() => {
        window.dispatchEvent(new PopStateEvent("popstate"));
      }, 0);
    }
  }, [isAdmin, requireAuth, redirectTo]);

  if (requireAuth && !isAdmin) return null;
  if (!requireAuth && isAdmin) return null;

  return children;
}
