/**
 * ORIGINAL synthetic corpus for the RAG grounding lab.
 * Topic: zero-trust security and secure SDLC (author-written; not from course materials).
 */
window.TUTOR_CORPUS = [
  {
    id: "doc-zt-01",
    doc: "Zero-Trust Primer",
    title: "Never trust, always verify",
    text:
      "Zero trust treats every request as untrusted until it is authenticated, authorized, and continuously evaluated. Network location alone is not a credential. Controls sit close to the resource, not only at the perimeter."
  },
  {
    id: "doc-zt-02",
    doc: "Zero-Trust Primer",
    title: "Identity as the new perimeter",
    text:
      "Strong identity underpins zero trust. Users and services prove who they are with phishing-resistant factors when possible. Short-lived tokens and least-privilege roles limit blast radius if a credential leaks."
  },
  {
    id: "doc-zt-03",
    doc: "Zero-Trust Primer",
    title: "Microsegmentation and policy",
    text:
      "Microsegmentation splits workloads so lateral movement is expensive. Policy engines decide allow or deny using device posture, identity, and request context. Denied paths should produce auditable signals for responders."
  },
  {
    id: "doc-sdlc-01",
    doc: "Secure SDLC Notes",
    title: "Threat modeling early",
    text:
      "Secure software development life cycle work starts before code lands. Threat modeling asks what assets matter, who might attack them, and which misuse cases must fail closed. Findings become backlog items, not slideware."
  },
  {
    id: "doc-sdlc-02",
    doc: "Secure SDLC Notes",
    title: "Shift-left checks",
    text:
      "Shift-left security adds linting, dependency scanning, and secret detection in pull requests. Developers see issues while context is fresh. High-severity findings block merge until owners accept risk or fix the defect."
  },
  {
    id: "doc-sdlc-03",
    doc: "Secure SDLC Notes",
    title: "Supply chain hygiene",
    text:
      "Modern apps inherit risk from packages and build pipelines. Pin versions, verify signatures when available, and keep a software bill of materials. Compromised build runners can inject trust as easily as a bad library."
  },
  {
    id: "doc-sdlc-04",
    doc: "Secure SDLC Notes",
    title: "Release gates and monitoring",
    text:
      "A release gate checks tests, scans, and change approvals before production. After ship, observability watches for abuse patterns and error budgets. Secure SDLC does not end at deploy; feedback returns to design."
  },
  {
    id: "doc-bridge-01",
    doc: "ZT Meets SDLC",
    title: "Building for zero trust",
    text:
      "Applications designed for zero trust avoid long-lived shared secrets, prefer mutual TLS between services, and expose only necessary APIs. Secure SDLC reviews should reject designs that assume a soft internal network."
  },
  {
    id: "doc-bridge-02",
    doc: "ZT Meets SDLC",
    title: "Provenance in study and ops",
    text:
      "Whether tutoring from notes or defending production, provenance matters. Cite the source document for claims, record which policy version allowed a call, and keep answers extractive when accuracy beats fluency."
  }
];
