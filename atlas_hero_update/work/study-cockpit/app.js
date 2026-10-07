(function () {
  "use strict";

  var STAGES = [
    {
      id: "ingest",
      n: "01",
      title: "Ingest course materials",
      label: "Ingest",
      does:
        "Drop lecture decks, notes, and related files into a local inbox. A router classifies by filename patterns and optional header overrides, then moves items into module folders or a staging area for human review.",
      path: "scripts/inbox_pipeline.py · scripts/intake_routing.py",
      note: "Descriptions are sanitized: no live course titles, exam keys, cloud account ids, or personal emails."
    },
    {
      id: "extract",
      n: "02",
      title: "Extract & index",
      label: "Extract",
      does:
        "Slide and text extractors produce markdown/JSON indexes. Pattern extractors and scoring helpers tag structural units used later for practice generation and dashboard navigation.",
      path: "scripts/extract_lectures.py · scripts/ucs_pattern_extract.py · scripts/ucs_score.py",
      note: "All processing is local filesystem I/O under the study directory."
    },
    {
      id: "curate",
      n: "03",
      title: "Curate (outbox loop)",
      label: "Curate",
      does:
        "Predictive candidates land in outbox/awaiting-review. A local Ollama curation service (or a human) reviews against grounding/rules, writing outbox/reviewed. Apply scripts merge approved items into banks.",
      path: "scripts/ollama_curate.py · scripts/emit_curation_queue.py · scripts/apply_curated_questions.py",
      note: "Default Ollama host is loopback; the dashboard server refuses non-loopback hosts."
    },
    {
      id: "views",
      n: "04",
      title: "Quiz & lecture views",
      label: "Dashboard views",
      does:
        "A local dashboard serves static study UI plus Mode A script execution from a whitelist. Quizzes, lecture viewers, and script consoles read generated manifests — not a public SaaS.",
      path: "scripts/dashboard_server.py · dashboard.html · scripts/build_dashboard_manifest.py",
      note: "Launcher: Study Cockpit.command → scripts/study_cockpit.sh (checks local model runtime, starts server, opens browser)."
    },
    {
      id: "train",
      n: "05",
      title: "Local training / kernel loop",
      label: "Train kernel",
      does:
        "Export curated examples to chat-format JSONL, then optionally fine-tune a small LoRA adapter with MLX on Apple silicon. Dry-run mode plans the job offline without downloading weights.",
      path: "scripts/export_kernel_training_data.py · scripts/mlx_train_kernel.py",
      note: "Training is optional and local; this demo page never launches training."
    },
    {
      id: "feedback",
      n: "06",
      title: "Feedback into the loop",
      label: "Feedback",
      does:
        "Kernel feedback logs and sync helpers close the loop so reviewed quality signals can influence later curation and training exports.",
      path: "scripts/log_kernel_feedback.py · scripts/sync_curated_questions.py · Study_Cockpit_Master.ipynb",
      note: "Master notebook is a control panel for health, pipeline, kernel, and guardrails."
    }
  ];

  /** Synthetic catalog: topic units with base relevance + emphasis affinities */
  var CATALOG = [
    {
      id: "u1",
      title: "Shared responsibility diagram",
      kind: "lecture-core",
      base: 0.55,
      affinity: { lecture: 0.9, quiz: 0.3, practice: 0.4, instructor: 0.5 }
    },
    {
      id: "u2",
      title: "Instructor callout: exam-style traps",
      kind: "instructor-emphasis",
      base: 0.4,
      affinity: { lecture: 0.35, quiz: 0.55, practice: 0.5, instructor: 1.0 }
    },
    {
      id: "u3",
      title: "Predictive MCQ candidate (pattern-matched)",
      kind: "practice",
      base: 0.45,
      affinity: { lecture: 0.25, quiz: 0.7, practice: 0.95, instructor: 0.4 }
    },
    {
      id: "u4",
      title: "Slide glossary: elasticity vs scalability",
      kind: "lecture-core",
      base: 0.5,
      affinity: { lecture: 0.85, quiz: 0.45, practice: 0.35, instructor: 0.35 }
    },
    {
      id: "u5",
      title: "Guest reading sidebar (low priority)",
      kind: "guest",
      base: 0.35,
      affinity: { lecture: 0.4, quiz: 0.15, practice: 0.2, instructor: 0.1 }
    },
    {
      id: "u6",
      title: "Lab SOP: local dashboard Mode A",
      kind: "lab",
      base: 0.48,
      affinity: { lecture: 0.3, quiz: 0.25, practice: 0.55, instructor: 0.45 }
    },
    {
      id: "u7",
      title: "Curated bank item (reviewed)",
      kind: "curated",
      base: 0.52,
      affinity: { lecture: 0.3, quiz: 0.85, practice: 0.75, instructor: 0.65 }
    },
    {
      id: "u8",
      title: "Raw predictive candidate (awaiting review)",
      kind: "awaiting-review",
      base: 0.42,
      affinity: { lecture: 0.2, quiz: 0.5, practice: 0.8, instructor: 0.25 }
    }
  ];

  function $(id) {
    return document.getElementById(id);
  }

  function renderStages() {
    var root = $("flow");
    root.innerHTML = "";
    STAGES.forEach(function (s, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "stage-btn";
      btn.id = "st-" + s.id;
      btn.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      btn.setAttribute("aria-controls", "detail");
      btn.innerHTML =
        '<span class="n">STAGE ' + s.n + '</span><span class="t">' + s.label + "</span>";
      btn.addEventListener("click", function () {
        showStage(s.id);
      });
      btn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          var n = STAGES[(i + 1) % STAGES.length];
          showStage(n.id);
          $("st-" + n.id).focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          var p = STAGES[(i - 1 + STAGES.length) % STAGES.length];
          showStage(p.id);
          $("st-" + p.id).focus();
        }
      });
      root.appendChild(btn);
    });
    showStage(STAGES[0].id);
  }

  function showStage(id) {
    var s = STAGES.find(function (x) {
      return x.id === id;
    });
    if (!s) return;
    STAGES.forEach(function (x) {
      var b = $("st-" + x.id);
      if (b) b.setAttribute("aria-pressed", x.id === id ? "true" : "false");
    });
    $("detail").innerHTML =
      "<h3 style='margin:0 0 .4rem;font-size:1rem'>" +
      s.title +
      "</h3><p style='margin:.2rem 0'>" +
      s.does +
      '</p><p class="path">' +
      s.path +
      '</p><p class="muted">' +
      s.note +
      "</p>";
  }

  function weights() {
    return {
      lecture: Number($("w-lecture").value) / 100,
      quiz: Number($("w-quiz").value) / 100,
      practice: Number($("w-practice").value) / 100,
      instructor: Number($("w-instructor").value) / 100
    };
  }

  function scoreItem(item, w) {
    var a = item.affinity;
    var blend =
      a.lecture * w.lecture +
      a.quiz * w.quiz +
      a.practice * w.practice +
      a.instructor * w.instructor;
    return item.base * 0.35 + blend * 0.65;
  }

  function renderModule() {
    var w = weights();
    $("v-lecture").textContent = Math.round(w.lecture * 100);
    $("v-quiz").textContent = Math.round(w.quiz * 100);
    $("v-practice").textContent = Math.round(w.practice * 100);
    $("v-instructor").textContent = Math.round(w.instructor * 100);

    var threshold = 0.48;
    var ranked = CATALOG.map(function (item) {
      return { item: item, score: scoreItem(item, w) };
    }).sort(function (a, b) {
      return b.score - a.score;
    });

    var root = $("module-items");
    root.innerHTML = "";
    ranked.forEach(function (row) {
      var included = row.score >= threshold;
      var div = document.createElement("div");
      div.className = "item" + (included ? "" : " excluded");
      var pct = Math.min(100, Math.round(row.score * 100));
      div.innerHTML =
        "<div><strong>" +
        row.item.title +
        '</strong><div class="muted" style="font-size:.8rem">' +
        row.item.kind +
        (included ? " · included" : " · below threshold") +
        '</div><div class="bar" aria-hidden="true"><span style="width:' +
        pct +
        '%"></span></div></div><div class="score">' +
        row.score.toFixed(2) +
        "</div>";
      root.appendChild(div);
    });

    var includedCount = ranked.filter(function (r) {
      return r.score >= threshold;
    }).length;
    $("module-summary").textContent =
      includedCount +
      " of " +
      ranked.length +
      " units included (threshold " +
      threshold.toFixed(2) +
      "). Raise Instructor emphasis to pull callouts into the module; raise Practice to favor predictive candidates.";
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderStages();
    ["w-lecture", "w-quiz", "w-practice", "w-instructor"].forEach(function (id) {
      $(id).addEventListener("input", renderModule);
    });
    renderModule();
  });
})();
