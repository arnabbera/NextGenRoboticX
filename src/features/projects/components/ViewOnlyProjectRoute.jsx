import { useEffect, useRef, useState } from "react";
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
  const [enrolledUid, setEnrolledUid] = useState(null);
  const projectRef = useRef(null);
  const enrolled = Boolean(user && enrolledUid === user.uid);
  const canCopy = admin || enrolled;

  useEffect(() => {
    if (!user || admin) return undefined;
    let current = true;
    setEnrolledUid(null);
    async function checkEnrollment() {
      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/course-access/enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Unable to verify course enrollment.");
        const data = await response.json();
        if (current) setEnrolledUid(Number(data.count) > 0 ? user.uid : null);
      } catch {
        if (current) setEnrolledUid(null);
      }
    }
    checkEnrollment();
    return () => { current = false; };
  }, [admin, user]);

  useEffect(() => {
    if (canCopy) return undefined;

    const inProject = (target) => target instanceof Node && projectRef.current?.contains(target);
    const selectionInProject = () => inProject(window.getSelection()?.anchorNode);

    const preventContentAction = (event) => {
      if (
        (inProject(event.target) || ((event.type === "copy" || event.type === "cut") && selectionInProject())) &&
        !isEditableTarget(event.target)
      ) event.preventDefault();
    };
    const preventKeyboardCopy = (event) => {
      if (
        !isEditableTarget(event.target) &&
        (inProject(event.target) || selectionInProject()) &&
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
  }, [canCopy]);

  return (
    <div
      ref={projectRef}
      className="view-only-project"
      style={canCopy ? undefined : {
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
      data-view-only={canCopy ? "false" : "true"}
    >
      {enrolled && !admin && (
        <p role="status" className="bg-emerald-50 px-5 py-3 text-center font-medium text-emerald-900">
          Your course enrollment unlocks copying project text and images across all projects.
        </p>
      )}
      <Outlet context={{ canCopy }} />
      <ProjectResources canCopy={canCopy} />
    </div>
  );
}
