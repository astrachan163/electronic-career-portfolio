/**
 * Interactive HMAC-SHA256 token lab mirroring the course Flask/Lambda
 * download token scheme (payload = object_key\\nemail\\nissued_at).
 * Uses Web Crypto; fixed public demo key only.
 */
(function () {
  "use strict";

  /** PUBLIC DEMO KEY — intentionally weak and published. Not used in any real system. */
  const DEMO_SECRET = "PUBLIC-DEMO-KEY-NOT-FOR-PRODUCTION-file-share-demo";

  const enc = new TextEncoder();
  const el = (id) => document.getElementById(id);

  function b64urlEncode(bytes) {
    let bin = "";
    const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    for (let i = 0; i < arr.length; i += 1) bin += String.fromCharCode(arr[i]);
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function b64urlDecode(text) {
    const padded = text + "=".repeat((4 - (text.length % 4)) % 4);
    const b64 = padded.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
    return out;
  }

  async function importHmacKey(secret) {
    return crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
  }

  async function signPayloadB64(secret, payloadB64) {
    const key = await importHmacKey(secret);
    const mac = await crypto.subtle.sign("HMAC", key, enc.encode(payloadB64));
    return b64urlEncode(mac);
  }

  /**
   * Constant-time string compare (demo of hmac.compare_digest intent).
   * Avoids early-exit on first mismatch so timing leaks less about prefix.
   */
  function constantTimeEqual(a, b) {
    if (typeof a !== "string" || typeof b !== "string") return false;
    const len = Math.max(a.length, b.length);
    let diff = a.length ^ b.length;
    for (let i = 0; i < len; i += 1) {
      const ca = i < a.length ? a.charCodeAt(i) : 0;
      const cb = i < b.length ? b.charCodeAt(i) : 0;
      diff |= ca ^ cb;
    }
    return diff === 0;
  }

  async function createToken(secret, objectKey, email, issuedAt) {
    const payload = `${objectKey}\n${email}\n${issuedAt}`;
    const payloadB64 = b64urlEncode(enc.encode(payload));
    const signatureB64 = await signPayloadB64(secret, payloadB64);
    return `${payloadB64}.${signatureB64}`;
  }

  async function verifyToken(secret, token, maxAgeSeconds, nowSeconds) {
    const parts = token.split(".");
    if (parts.length !== 2) {
      return { ok: false, reason: "Malformed token (expected payload.signature)." };
    }
    const [payloadB64, signatureB64] = parts;
    let expected;
    try {
      expected = await signPayloadB64(secret, payloadB64);
    } catch (err) {
      return { ok: false, reason: "Could not compute HMAC: " + err.message };
    }
    if (!constantTimeEqual(signatureB64, expected)) {
      return {
        ok: false,
        reason:
          "Signature mismatch (tamper or wrong key). Compared with constant-time equality, matching Python hmac.compare_digest.",
      };
    }
    let payload;
    try {
      payload = new TextDecoder().decode(b64urlDecode(payloadB64));
    } catch (_) {
      return { ok: false, reason: "Payload is not valid base64url UTF-8." };
    }
    const fields = payload.split("\n");
    if (fields.length !== 3) {
      return { ok: false, reason: "Payload must be object_key\\nemail\\nissued_at." };
    }
    const [objectKey, email, issuedRaw] = fields;
    const issuedAt = Number(issuedRaw);
    if (!objectKey || !email || !Number.isFinite(issuedAt)) {
      return { ok: false, reason: "Missing object key, email, or issued_at." };
    }
    // Expiry lives INSIDE the signed payload (issued_at). Changing the
    // "clock" slider without re-signing is how we demonstrate age checks;
    // changing issued_at in the token without re-signing fails the MAC first.
    if (nowSeconds - issuedAt > maxAgeSeconds) {
      return {
        ok: false,
        reason: `Expired: age ${nowSeconds - issuedAt}s exceeds max age ${maxAgeSeconds}s (issued_at is inside the signed payload).`,
      };
    }
    if (nowSeconds - issuedAt < 0) {
      return {
        ok: false,
        reason: "Clock skew: simulated now is before issued_at.",
      };
    }
    return {
      ok: true,
      reason: `Valid for ${objectKey} → ${email}. Age ${nowSeconds - issuedAt}s / max ${maxAgeSeconds}s.`,
      objectKey,
      email,
      issuedAt,
    };
  }

  function setVerdict(result) {
    const box = el("verdict");
    box.className = "verdict " + (result.ok ? "allow" : "deny");
    box.setAttribute("aria-live", "polite");
    box.innerHTML =
      (result.ok ? "ALLOWED" : "DENIED") +
      '<span class="reason">' +
      escapeHtml(result.reason) +
      "</span>";
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function currentInputs() {
    const fileId = el("file-id").value.trim() || "uploads/demo/notes.txt";
    const email = el("recipient").value.trim() || "recipient@demo.invalid";
    const maxAge = Number(el("max-age").value) || 3600;
    const clockSkew = Number(el("clock-skew").value) || 0;
    const now = Math.floor(Date.now() / 1000) + clockSkew;
    return { fileId, email, maxAge, now, clockSkew };
  }

  async function onGenerate() {
    const { fileId, email } = currentInputs();
    const issuedAt = Math.floor(Date.now() / 1000);
    const token = await createToken(DEMO_SECRET, fileId, email, issuedAt);
    el("token").value = token;
    el("issued-at").textContent = String(issuedAt);
    await onVerify();
  }

  async function onVerify() {
    const { maxAge, now } = currentInputs();
    const token = el("token").value.trim();
    el("sim-now").textContent = String(now);
    if (!token) {
      setVerdict({ ok: false, reason: "No token to verify." });
      return;
    }
    const result = await verifyToken(DEMO_SECRET, token, maxAge, now);
    setVerdict(result);
  }

  function onTamper() {
    const token = el("token").value.trim();
    if (!token || !token.includes(".")) {
      setVerdict({ ok: false, reason: "Generate a token first." });
      return;
    }
    const [payloadB64, signatureB64] = token.split(".", 2);
    // Flip one character in the signature (or payload) to simulate a byte tamper.
    const chars = signatureB64.split("");
    if (chars.length === 0) return;
    const i = Math.min(2, chars.length - 1);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    const cur = chars[i];
    chars[i] = alphabet[(alphabet.indexOf(cur) + 1) % alphabet.length];
    el("token").value = payloadB64 + "." + chars.join("");
    onVerify();
  }

  async function onExpireByClock() {
    // Push simulated clock past max age without touching the signed issued_at.
    const maxAge = Number(el("max-age").value) || 3600;
    el("clock-skew").value = String(maxAge + 60);
    el("clock-label").textContent = el("clock-skew").value;
    await onVerify();
  }

  function bind() {
    el("demo-key").textContent = DEMO_SECRET;
    el("generate").addEventListener("click", () => onGenerate().catch(showErr));
    el("verify").addEventListener("click", () => onVerify().catch(showErr));
    el("tamper").addEventListener("click", () => {
      try {
        onTamper();
      } catch (e) {
        showErr(e);
      }
    });
    el("expire-clock").addEventListener("click", () =>
      onExpireByClock().catch(showErr)
    );
    el("clock-skew").addEventListener("input", () => {
      el("clock-label").textContent = el("clock-skew").value;
      onVerify().catch(showErr);
    });
    el("token").addEventListener("input", () => onVerify().catch(showErr));
    el("max-age").addEventListener("change", () => onVerify().catch(showErr));
    if (!globalThis.crypto || !globalThis.crypto.subtle) {
      setVerdict({
        ok: false,
        reason: "Web Crypto SubtleCrypto unavailable in this browser.",
      });
      ["generate", "verify", "tamper", "expire-clock"].forEach((id) => {
        el(id).disabled = true;
      });
      return;
    }
    onGenerate().catch(showErr);
  }

  function showErr(err) {
    setVerdict({ ok: false, reason: String(err && err.message ? err.message : err) });
  }

  // Expose for Node smoke test
  globalThis.FileShareTokenLab = {
    DEMO_SECRET,
    createToken,
    verifyToken,
    constantTimeEqual,
    b64urlEncode,
    b64urlDecode,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
