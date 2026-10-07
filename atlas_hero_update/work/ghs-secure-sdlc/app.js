/**
 * GHS Secure SDLC Evidence Explorer — simulation only.
 * Policy data paraphrased from private project docs; deny-by-default RBAC.
 */
(function () {
  "use strict";

  /** @typedef {"student"|"parent"|"teacher"|"admin"|"none"} Role */

  /** Roles from the project's UserRole enum (values only). */
  const ROLES = /** @type {const} */ (["student", "parent", "teacher", "admin"]);

  /**
   * Actions model documented API RBAC + Firestore ownership patterns.
   * allowRoles empty / missing → deny for all (default deny).
   * kind "api" uses hasRole-style membership; "data" also notes ownership.
   * @type {Array<{id:string,label:string,layer:string,allowRoles:Role[],note:string}>}
   */
  const ACTIONS = [
    {
      id: "set-role",
      label: "Assign user role (API)",
      layer: "API · hasRole",
      allowRoles: ["admin"],
      note: "Sensitive endpoint requires admin claim after JWT auth. Deny-by-default if role missing or not in allow-list.",
    },
    {
      id: "create-class",
      label: "Create class (self as teacher)",
      layer: "Data · ownership",
      allowRoles: ["teacher", "admin"],
      note: "Create allowed when caller is authenticated and the teacherId field matches the caller. Portfolio model maps this to teacher/admin.",
    },
    {
      id: "manage-class",
      label: "Update / delete own class",
      layer: "Data · ownership",
      allowRoles: ["teacher", "admin"],
      note: "Update/delete when the stored teacherId matches the caller.",
    },
    {
      id: "read-student",
      label: "Read linked student record",
      layer: "Data · relationship",
      allowRoles: ["student", "parent", "teacher", "admin"],
      note: "Read when caller is the student, linked parent, or linked teacher (relationship checks). Unlinked roles are denied in production rules.",
    },
    {
      id: "write-materials",
      label: "Write own teaching materials",
      layer: "Data · ownership",
      allowRoles: ["teacher", "admin"],
      note: "Materials create/update/delete require ownerId to match the caller.",
    },
    {
      id: "update-progress",
      label: "Create / update progress",
      layer: "Data · teacher",
      allowRoles: ["teacher", "admin"],
      note: "Progress writes require the teacherId on the document to match the caller.",
    },
    {
      id: "invite-student",
      label: "Create class invitation",
      layer: "Data · teacher-of-class",
      allowRoles: ["teacher", "admin"],
      note: "Create when the caller is the teacher of the referenced class.",
    },
    {
      id: "read-executions",
      label: "Read execution audit traces",
      layer: "Data · gap noted",
      allowRoles: ["admin"],
      note: "Threat model flags executions-collection read restriction as Open; this matrix shows intended admin-only until rules close the gap.",
    },
  ];

  /**
   * Deny-by-default evaluator mirroring hasRole(allowedRoles):
   * no role → deny; role not in allow list → deny.
   * @param {Role} role
   * @param {{allowRoles: Role[]}} action
   */
  function decide(role, action) {
    if (!role || role === "none") {
      return {
        decision: /** @type {const} */ ("deny"),
        reason:
          "Denied: no role claim on the authenticated principal (middleware returns Forbidden when role is missing).",
      };
    }
    const allowed = Array.isArray(action.allowRoles) ? action.allowRoles : [];
    if (allowed.length === 0) {
      return {
        decision: /** @type {const} */ ("deny"),
        reason: "Denied: action has an empty allow-list (default deny).",
      };
    }
    if (allowed.includes(role)) {
      return {
        decision: /** @type {const} */ ("allow"),
        reason:
          "Allowed: role \"" +
          role +
          "\" is in the action allow-list [" +
          allowed.join(", ") +
          "]. " +
          action.note,
      };
    }
    return {
      decision: /** @type {const} */ ("deny"),
      reason:
        "Denied: role \"" +
        role +
        "\" is not in [" +
        allowed.join(", ") +
        "]. Deny-by-default RBAC rejects insufficient permissions.",
    };
  }

  function renderMatrix() {
    const root = document.getElementById("rbac-matrix");
    if (!root) return;

    const table = document.createElement("table");
    table.className = "data";
    table.setAttribute("aria-describedby", "rbac-legend");

    const caption = document.createElement("caption");
    caption.className = "visually-hidden";
    caption.textContent =
      "Role by action authorization matrix. Allow cells mean the role is on the documented allow-list; deny otherwise.";
    table.appendChild(caption);

    const thead = document.createElement("thead");
    const hr = document.createElement("tr");
    const corner = document.createElement("th");
    corner.scope = "col";
    corner.textContent = "Action \\ Role";
    hr.appendChild(corner);
    ROLES.forEach(function (role) {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = role;
      hr.appendChild(th);
    });
    thead.appendChild(hr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    ACTIONS.forEach(function (action) {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      th.className = "action";
      th.innerHTML =
        action.label +
        "<br><span style=\"font-weight:400;color:var(--muted);font-size:0.78rem\">" +
        action.layer +
        "</span>";
      tr.appendChild(th);
      ROLES.forEach(function (role) {
        const td = document.createElement("td");
        const d = decide(role, action);
        td.className = d.decision === "allow" ? "cell-allow" : "cell-deny";
        td.textContent = d.decision === "allow" ? "Allow" : "Deny";
        td.title = d.reason;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    root.innerHTML = "";
    root.appendChild(table);
  }

  function fillSelects() {
    const roleSelect = document.getElementById("role-select");
    const actionSelect = document.getElementById("action-select");
    if (!roleSelect || !actionSelect) return;

    roleSelect.innerHTML = "";
    const noneOpt = document.createElement("option");
    noneOpt.value = "none";
    noneOpt.textContent = "(no role claim)";
    roleSelect.appendChild(noneOpt);
    ROLES.forEach(function (role) {
      const opt = document.createElement("option");
      opt.value = role;
      opt.textContent = role;
      roleSelect.appendChild(opt);
    });
    roleSelect.value = "teacher";

    actionSelect.innerHTML = "";
    ACTIONS.forEach(function (action) {
      const opt = document.createElement("option");
      opt.value = action.id;
      opt.textContent = action.label;
      actionSelect.appendChild(opt);
    });
  }

  function runTester() {
    const roleSelect = /** @type {HTMLSelectElement|null} */ (
      document.getElementById("role-select")
    );
    const actionSelect = /** @type {HTMLSelectElement|null} */ (
      document.getElementById("action-select")
    );
    const out = document.getElementById("tester-result");
    if (!roleSelect || !actionSelect || !out) return;

    const role = /** @type {Role} */ (roleSelect.value);
    const action = ACTIONS.find(function (a) {
      return a.id === actionSelect.value;
    });
    if (!action) return;

    const result = decide(role, action);
    out.dataset.decision = result.decision;
    out.innerHTML =
      "<strong class=\"decision\">" +
      result.decision +
      "</strong>" +
      "<p><strong>Role:</strong> " +
      (role === "none" ? "(missing)" : role) +
      " · <strong>Action:</strong> " +
      action.label +
      "</p>" +
      "<p>" +
      result.reason +
      "</p>";
  }

  function wireTester() {
    const form = document.getElementById("tester-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      runTester();
    });
  }

  const api = { ROLES, ACTIONS, decide };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (typeof window !== "undefined") {
    window.GhsSecureSdlc = api;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        renderMatrix();
        fillSelects();
        wireTester();
        runTester();
      });
    } else {
      renderMatrix();
      fillSelects();
      wireTester();
      runTester();
    }
  }
})();
