/**
 * Plain-JS BM25 / TF-IDF retrieval + extractive grounded answer.
 * No language model. Browser and Node (via export) compatible.
 */
(function (root) {
  "use strict";

  function tokenize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter(function (t) {
        return t.length > 1;
      });
  }

  function sentenceSplit(text) {
    return String(text || "")
      .split(/(?<=[.!?])\s+/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function buildIndex(chunks) {
    var N = chunks.length;
    var df = Object.create(null);
    var docs = chunks.map(function (c) {
      var tokens = tokenize(c.title + " " + c.text);
      var tf = Object.create(null);
      tokens.forEach(function (t) {
        tf[t] = (tf[t] || 0) + 1;
      });
      Object.keys(tf).forEach(function (t) {
        df[t] = (df[t] || 0) + 1;
      });
      return {
        id: c.id,
        doc: c.doc,
        title: c.title,
        text: c.text,
        tokens: tokens,
        tf: tf,
        len: tokens.length
      };
    });
    var avgdl =
      docs.reduce(function (a, d) {
        return a + d.len;
      }, 0) / (N || 1);
    return { docs: docs, df: df, N: N, avgdl: avgdl };
  }

  function idf(term, index) {
    var n = index.df[term] || 0;
    return Math.log(1 + (index.N - n + 0.5) / (n + 0.5));
  }

  function scoreTfIdf(queryTokens, doc, index) {
    var score = 0;
    var seen = Object.create(null);
    queryTokens.forEach(function (t) {
      if (seen[t]) return;
      seen[t] = true;
      var tf = doc.tf[t] || 0;
      if (!tf) return;
      score += (tf / doc.len) * idf(t, index);
    });
    return score;
  }

  function scoreBm25(queryTokens, doc, index, k1, b) {
    k1 = k1 == null ? 1.5 : k1;
    b = b == null ? 0.75 : b;
    var score = 0;
    var seen = Object.create(null);
    queryTokens.forEach(function (t) {
      if (seen[t]) return;
      seen[t] = true;
      var f = doc.tf[t] || 0;
      if (!f) return;
      var idfVal = idf(t, index);
      var denom = f + k1 * (1 - b + b * (doc.len / index.avgdl));
      score += idfVal * ((f * (k1 + 1)) / denom);
    });
    return score;
  }

  function retrieve(options) {
    var chunks = options.chunks || [];
    var query = options.query || "";
    var method = options.method === "tfidf" ? "tfidf" : "bm25";
    var k = Math.max(1, Math.min(options.k || 3, chunks.length || 1));
    var focusDoc = options.focusDoc || null;

    var pool = focusDoc
      ? chunks.filter(function (c) {
          return c.doc === focusDoc;
        })
      : chunks.slice();

    if (!pool.length) {
      return { hits: [], method: method, focusDoc: focusDoc, query: query };
    }

    var index = buildIndex(pool);
    var qTokens = tokenize(query);
    var scored = index.docs.map(function (d) {
      var score =
        method === "tfidf"
          ? scoreTfIdf(qTokens, d, index)
          : scoreBm25(qTokens, d, index);
      return {
        id: d.id,
        doc: d.doc,
        title: d.title,
        text: d.text,
        score: score
      };
    });

    scored.sort(function (a, b) {
      return b.score - a.score;
    });

    var hits = scored.slice(0, k).filter(function (h) {
      return h.score > 0;
    });
    if (!hits.length && scored.length) {
      hits = scored.slice(0, Math.min(k, scored.length));
    }

    return { hits: hits, method: method, focusDoc: focusDoc, query: query };
  }

  function groundedAnswer(hits, maxSentences) {
    maxSentences = maxSentences || 3;
    var sentences = [];
    var chips = [];
    hits.forEach(function (h) {
      var parts = sentenceSplit(h.text);
      parts.forEach(function (s) {
        sentences.push({ text: s, doc: h.doc, id: h.id, title: h.title });
      });
      if (chips.indexOf(h.doc) === -1) chips.push(h.doc);
    });
    var picked = sentences.slice(0, maxSentences);
    return {
      sentences: picked,
      chips: chips,
      answerText: picked
        .map(function (s) {
          return s.text;
        })
        .join(" ")
    };
  }

  var api = {
    tokenize: tokenize,
    retrieve: retrieve,
    groundedAnswer: groundedAnswer,
    buildIndex: buildIndex
  };

  root.TutorRAG = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
