(function () {
  "use strict";

  var P = window.CitadelPolicy;
  if (!P) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<p role="alert">policy.js failed to load.</p>'
    );
    return;
  }

  var agentEl = document.getElementById("agent");
  var toolEl = document.getElementById("tool");
  var argsEl = document.getElementById("args");
  var pipelineEl = document.getElementById("pipeline");
  var decisionEl = document.getElementById("decision");
  var auditEl = document.getElementById("audit");
  var whyEl = document.getElementById("why");
  var scenariosEl = document.getElementById("scenarios");
  var verifyEl = document.getElementById("verify");
  var geminiEl = document.getElementById("consumeGemini");

  function fillSelects() {
    Object.keys(P.AGENTS).forEach(function (id) {
      var o = document.createElement("option");
      o.value = id;
      o.textContent =
        id +
        " — " +
        P.AGENTS[id].role +
        (P.AGENTS[id].runtime ? "" : " (design persona)");
      agentEl.appendChild(o);
    });
    Object.keys(P.ALLOWED_TOOLS).forEach(function (t) {
      var o = document.createElement("option");
      o.value = t;
      o.textContent = t;
      toolEl.appendChild(o);
    });
  }

  function defaultArgsFor(tool) {
    var map = {
      read_file: { path: "/sandbox/citadel/notes/readme.txt" },
      write_file: {
        path: "/sandbox/citadel/notes/out.txt",
        content: "hello"
      },
      execute_safe_cli: { command: "ls notes" },
      store_memory: { context: "status ok", category: "System Update" },
      recall_memory: { query: "prior decisions" }
    };
    return map[tool] || {};
  }

  function renderPipeline(steps) {
    pipelineEl.innerHTML = "";
    if (!steps || !steps.length) {
      ["Identity", "Scope", "Tool allowlist", "Argument validation", "Rate / limits", "Allow/Deny"].forEach(
        function (label) {
          var li = document.createElement("li");
          li.className = "waiting";
          li.innerHTML =
            '<div class="stage-label">' +
            label +
            '</div><div class="stage-detail">Awaiting evaluation</div>';
          pipelineEl.appendChild(li);
        }
      );
      return;
    }
    steps.forEach(function (s) {
      var li = document.createElement("li");
      li.className = s.result || "waiting";
      li.innerHTML =
        '<div class="stage-label">' +
        escapeHtml(s.label) +
        " · " +
        escapeHtml(s.result || "waiting") +
        '</div><div class="stage-detail">' +
        escapeHtml(s.detail || "") +
        "</div>";
      pipelineEl.appendChild(li);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showResult(out) {
    renderPipeline(out.steps);
    decisionEl.textContent = out.decision + (out.code ? " (" + out.code + ")" : "");
    decisionEl.className = "decision " + out.decision;
    decisionEl.setAttribute("aria-live", "polite");
    auditEl.textContent = out.audit;
    if (out.decision === "DENY") {
      whyEl.hidden = false;
      whyEl.textContent = "Why denied: " + out.whyDenied;
    } else {
      whyEl.hidden = false;
      whyEl.textContent = out.reason;
    }
  }

  function evaluateCurrent() {
    var args;
    try {
      args = JSON.parse(argsEl.value || "{}");
    } catch (e) {
      whyEl.hidden = false;
      whyEl.textContent = "Arguments must be valid JSON.";
      decisionEl.textContent = "DENY (BAD_JSON)";
      decisionEl.className = "decision DENY";
      return;
    }
    P.resetRateLimit();
    var out = P.evaluate({
      agent: agentEl.value,
      tool: toolEl.value,
      args: args,
      consumeGemini: geminiEl.checked
    });
    showResult(out);
  }

  function loadScenario(s) {
    agentEl.value = s.agent;
    if (!P.ALLOWED_TOOLS[s.tool] && toolEl.querySelector('option[value="' + s.tool + '"]') === null) {
      var o = document.createElement("option");
      o.value = s.tool;
      o.textContent = s.tool + " (not allowlisted)";
      toolEl.appendChild(o);
    }
    toolEl.value = s.tool;
    argsEl.value = JSON.stringify(s.args, null, 2);
    geminiEl.checked = !!s.consumeGemini;
    P.resetRateLimit();
    var out = P.runScenario(s, { resetRate: true });
    showResult(out);
    return out;
  }

  function buildScenarios() {
    scenariosEl.innerHTML = "";
    P.SCENARIOS.forEach(function (s) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "scenario";
      btn.id = "scenario-" + s.id;
      btn.innerHTML =
        '<span class="badge ' +
        s.expect +
        '">' +
        s.expect +
        "</span><span>" +
        escapeHtml(s.title) +
        '</span><span class="meta-inline">' +
        escapeHtml(s.agent) +
        " → " +
        escapeHtml(s.tool) +
        "</span>";
      btn.addEventListener("click", function () {
        var out = loadScenario(s);
        btn.classList.toggle("ok", out.decision === s.expect);
        btn.classList.toggle("bad", out.decision !== s.expect);
        btn.setAttribute(
          "aria-description",
          out.decision === s.expect ? "Matched expected outcome" : "Outcome mismatch"
        );
      });
      scenariosEl.appendChild(btn);
    });
  }

  function runAllVerify() {
    var results = P.verifyAllScenarios();
    var pass = results.filter(function (r) {
      return r.ok;
    }).length;
    verifyEl.textContent =
      "Scenario self-check: " + pass + "/" + results.length + " matched expected outcomes.";
    verifyEl.style.color = pass === results.length ? "var(--allow)" : "var(--deny)";
    results.forEach(function (r) {
      var btn = document.getElementById("scenario-" + r.id);
      if (!btn) return;
      btn.classList.toggle("ok", r.ok);
      btn.classList.toggle("bad", !r.ok);
    });
    return pass === results.length;
  }

  document.getElementById("evaluate").addEventListener("click", evaluateCurrent);
  document.getElementById("verifyAll").addEventListener("click", runAllVerify);
  toolEl.addEventListener("change", function () {
    argsEl.value = JSON.stringify(defaultArgsFor(toolEl.value), null, 2);
  });

  fillSelects();
  argsEl.value = JSON.stringify(defaultArgsFor("read_file"), null, 2);
  renderPipeline([]);
  buildScenarios();
  runAllVerify();

  // Expose for manual / automated checks
  window.__citadelDemo = {
    evaluateCurrent: evaluateCurrent,
    loadScenario: loadScenario,
    runAllVerify: runAllVerify,
    policy: P
  };
})();
