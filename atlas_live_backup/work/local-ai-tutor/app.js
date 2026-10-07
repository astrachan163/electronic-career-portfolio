(function () {
  "use strict";

  var STAGES = [
    {
      id: "ingest",
      n: "01",
      label: "Ingest PDF / Markdown / code",
      title: "Document ingestion",
      does:
        "Opens user-selected files with sandbox-safe access, extracts text (PDFKit for PDF; native string load for Markdown/text/code), and records an ingested-file entry for the workspace knowledge base.",
      path: "MaqkrsTutor2/Core/RAG/DocumentIngestionManager.swift",
      device:
        "Files and extracted text stay on the device. No cloud upload in the grounded study path."
    },
    {
      id: "chunk",
      n: "02",
      label: "Chunk",
      title: "Sentence-aware chunking",
      does:
        "Splits extracted text into overlapping, sentence-aware chunks (defaults around 500 words with overlap) so retrieval can return focused passages instead of whole books.",
      path: "MaqkrsTutor2/Core/RAG/NativeChunker.swift",
      device: "Chunking runs entirely in-process on Apple platforms."
    },
    {
      id: "embed",
      n: "03",
      label: "Embed",
      title: "Local embeddings",
      does:
        "Turns each chunk into a dense vector (production path uses a local embedding model such as nomic-embed-text via Ollama/ModelManager). This demo approximates retrieval with BM25/TF-IDF instead of vectors.",
      path: "MaqkrsTutor2/Core/RAG/DocumentIngestionManager.swift (+ ModelManager.embed)",
      device: "Embedding calls target a local runtime; vectors are not sent to a hosted API."
    },
    {
      id: "store",
      n: "04",
      label: "sqlite-vec store",
      title: "On-device vector store",
      does:
        "Persists embeddings in a local sqlite-vec virtual table with metadata (workspace, document, chunk text, source file, page/section labels) for KNN retrieval and provenance UI.",
      path: "MaqkrsTutor2/Core/RAG/VectorStore.swift",
      device: "Database file lives in the app sandbox; no cloud vector DB."
    },
    {
      id: "retrieve",
      n: "05",
      label: "Focused retrieval",
      title: "Scoped retrieval + provenance",
      does:
        "Queries the store for top-k chunks, optionally limited to a focused document sticky in the session. Returned chunks carry source metadata for citation chips.",
      path: "MaqkrsTutor2/Core/RAG/VectorStore.swift (KNN + document filters)",
      device: "Retrieval is local SQLite KNN over the workspace index."
    },
    {
      id: "resolve",
      n: "06",
      label: "Turn resolution",
      title: "Deterministic turn resolution",
      does:
        "Before generation, resolves source document(s), language, and study mode (Tutor / Explain / Summarize / Translate / Practice) so the turn does not drift across unrelated history.",
      path: "MaqkrsTutor2/Core/Chat/ChatTurnCoordinator.swift",
      device: "Resolution is pure app logic on-device."
    },
    {
      id: "answer",
      n: "07",
      label: "Local Gemma answer",
      title: "Local model answer",
      does:
        "Streams an answer from a locally hosted Gemma variant (Ollama on desktop; llama.cpp / MLX paths based on platform). Grounding context is the retrieved passages plus resolved turn settings.",
      path: "MaqkrsTutor2/Core/MLX/ModelManager.swift (+ Ollama / direct multimodal backends)",
      device:
        "Model weights and prompts stay local. This static demo does not run any language model."
    }
  ];

  function el(id) {
    return document.getElementById(id);
  }

  function renderStages() {
    var root = el("pipeline");
    root.innerHTML = "";
    STAGES.forEach(function (s, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "stage";
      btn.id = "stage-" + s.id;
      btn.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      btn.setAttribute("aria-controls", "stage-panel");
      btn.innerHTML =
        '<span class="n">STAGE ' +
        s.n +
        '</span><span class="label">' +
        s.label +
        "</span>";
      btn.addEventListener("click", function () {
        showStage(s.id);
      });
      btn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          var next = STAGES[(i + 1) % STAGES.length];
          showStage(next.id);
          el("stage-" + next.id).focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          var prev = STAGES[(i - 1 + STAGES.length) % STAGES.length];
          showStage(prev.id);
          el("stage-" + prev.id).focus();
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
      var b = el("stage-" + x.id);
      if (b) b.setAttribute("aria-pressed", x.id === id ? "true" : "false");
    });
    var panel = el("stage-panel");
    panel.innerHTML =
      "<h3>" +
      s.title +
      '</h3><p>' +
      s.does +
      '</p><p class="path" title="Source path label (private tree)">' +
      s.path +
      '</p><p class="device"><strong>On device:</strong> ' +
      s.device +
      "</p>";
  }

  function uniqueDocs(corpus) {
    var seen = [];
    corpus.forEach(function (c) {
      if (seen.indexOf(c.doc) === -1) seen.push(c.doc);
    });
    return seen;
  }

  function highlight(text, query) {
    var tokens = TutorRAG.tokenize(query);
    var esc = text.replace(/[&<>]/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[ch];
    });
    tokens.forEach(function (t) {
      if (t.length < 3) return;
      var re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      esc = esc.replace(re, "<mark>$1</mark>");
    });
    return esc;
  }

  function runLab() {
    var query = el("q").value.trim();
    var method = el("method").value;
    var k = parseInt(el("topk").value, 10) || 3;
    var focusOn = el("focus").checked;
    var focusDoc = focusOn ? el("focusDoc").value : null;
    var result = TutorRAG.retrieve({
      chunks: window.TUTOR_CORPUS,
      query: query || "zero trust identity",
      method: method,
      k: k,
      focusDoc: focusDoc
    });
    var grounded = TutorRAG.groundedAnswer(result.hits, 3);
    var hitsRoot = el("hits");
    hitsRoot.innerHTML = "";
    if (!result.hits.length) {
      hitsRoot.innerHTML = "<p class='device'>No chunks scored. Try different terms.</p>";
    } else {
      result.hits.forEach(function (h, idx) {
        var card = document.createElement("article");
        card.className = "hit" + (idx === 0 ? " top" : "");
        card.innerHTML =
          "<header><span>" +
          h.doc +
          " · " +
          h.title +
          '</span><span>score ' +
          h.score.toFixed(3) +
          "</span></header><div>" +
          highlight(h.text, query) +
          "</div>";
        hitsRoot.appendChild(card);
      });
    }
    var ans = el("grounded");
    ans.innerHTML =
      "<strong>Extractive grounded answer</strong> (sentences copied only from retrieved chunks; no LM):<p>" +
      (grounded.answerText
        ? grounded.answerText.replace(/[&<>]/g, function (ch) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[ch];
          })
        : "<em>Nothing retrieved.</em>") +
      '</p><div class="chips" aria-label="Source documents">' +
      grounded.chips
        .map(function (c) {
          return '<span class="chip">' + c + "</span>";
        })
        .join("") +
      "</div><p class='device'>Scope: " +
      (focusDoc ? "focused document — " + focusDoc : "whole workspace") +
      " · method " +
      result.method +
      "</p>";
  }

  function initFocusDocs() {
    var sel = el("focusDoc");
    uniqueDocs(window.TUTOR_CORPUS).forEach(function (d) {
      var opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      sel.appendChild(opt);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderStages();
    initFocusDocs();
    el("run").addEventListener("click", runLab);
    el("q").addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        runLab();
      }
    });
    el("focus").addEventListener("change", function () {
      el("focusDoc").disabled = !el("focus").checked;
      runLab();
    });
    el("method").addEventListener("change", runLab);
    el("topk").addEventListener("change", runLab);
    el("focusDoc").addEventListener("change", runLab);
    el("focusDoc").disabled = true;
    runLab();
  });
})();
