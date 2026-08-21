import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { isAdministrator } from "../../../components/auth/AdminRoute";
import ProjectResources from "./ProjectResources";

const blockedShortcuts = new Set(["a", "c", "p", "s", "u", "x"]);

function isEditableTarget(target) {
  return (
    target instanceof Element &&
    Boolean(target.closest('input, textarea, [contenteditable="true"]'))
  );
}

export default function ViewOnlyProjectRoute() {
  const { user, profile } = useAuth();
  const admin = isAdministrator(user, profile);

  useEffect(() => {
    if (admin) return undefined;

    const preventContentAction = (event) => {
      if (!isEditableTarget(event.target)) event.preventDefault();
    };
    const preventKeyboardCopy = (event) => {
      if (
        !isEditableTarget(event.target) &&
        (event.ctrlKey || event.metaKey) &&
        blockedShortcuts.has(event.key.toLowerCase())
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("copy", preventContentAction);
    document.addEventListener("cut", preventContentAction);
    document.addEventListener("contextmenu", preventContentAction);
    document.addEventListener("dragstart", preventContentAction);
    document.addEventListener("selectstart", preventContentAction);
    document.addEventListener("keydown", preventKeyboardCopy);

    return () => {
      document.removeEventListener("copy", preventContentAction);
      document.removeEventListener("cut", preventContentAction);
      document.removeEventListener("contextmenu", preventContentAction);
      document.removeEventListener("dragstart", preventContentAction);
      document.removeEventListener("selectstart", preventContentAction);
      document.removeEventListener("keydown", preventKeyboardCopy);
    };
  }, [admin]);

  return (
    <div
      className="view-only-project"
      style={admin ? undefined : {
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
      data-view-only={admin ? "false" : "true"}
    >
      <Outlet />
      <ProjectResources />
    </div>
  );
}
