# Web3 Domain Hosting & Freename TLD Architecture Plan

## Executive Summary
This document outlines the strategic and technical roadmap for hosting Andrew Strachan's web properties on Web3 infrastructure, integrating the primary Web2/Web3 domain **nonartificialsi.com**, and configuring the custom Web3 Top-Level Domains (TLDs) **`nonartificialsi`** and **`super-intelligence`** on the user's **Freename** account.

---

## 1. Domain Portfolio Overview

| Domain / TLD | Type | Target Network / Registry | Primary Function |
|--------------|------|---------------------------|------------------|
| **nonartificialsi.com** | ICANN Web2 + Web3 Bridged | Traditional Registrar (e.g., Cloudflare / Namecheap) + ENS / IPFS | Global Web2 accessibility, canonical business entrypoint, DNSSEC-anchored Web3 resolution |
| **`/nonartificialsi`** | Decentralized TLD | Freename.io (Polygon / Base / Solana / BSC) | Brand sovereign Web3 ecosystem, decentralized subdomains (e.g. `andrew.nonartificialsi`, `portfolio.nonartificialsi`) |
| **`/super-intelligence`** | Decentralized TLD | Freename.io (Polygon / Base / Solana / BSC) | Frontier AI / Autonomous Systems showcase, subdomains for Project Atlas and defense prototypes |

---

## 2. Freename Account & TLD Registration Workflow

Freename (freename.io) is a multi-chain decentralized TLD and domain registry allowing users to own, mint, and monetize custom Web3 Top-Level Domains (TLDs) and second-level domains (SLDs).

### Step 2.1: TLD Registration & Minting on Freename
1. **Log in to Freename Account**:
   - Access [freename.io](https://freename.io/) and authenticate with the user's account credentials and connected Web3 wallet (MetaMask, Coinbase Wallet, or Rabby).
2. **Search and Claim TLDs**:
   - Navigate to **"TLD Registry"**.
   - Search for **`nonartificialsi`** and **`super-intelligence`**.
   - Verify availability and select the minting blockchain:
     - **Recommended Blockchain**: **Polygon (PoS)** or **Base (L2)** for near-zero gas fees, high transaction throughput, and broad multichain compatibility.
3. **Execute Purchase / Claim**:
   - Complete the registration order under the user's account.
   - Confirm the on-chain mint transaction in the connected Web3 wallet to claim smart contract ownership of the TLD registry.

### Step 2.2: Minting Second-Level Domains (SLDs)
Under the newly acquired TLDs, mint the core operational domains:
- `portfolio.nonartificialsi`
- `andrew.nonartificialsi`
- `atlas.super-intelligence`
- `defense.super-intelligence`

---

## 3. Web3 Hosting Architecture: Dual-Stack Deployment

To ensure 100% uptime, censorship resistance, and instant global access across both legacy browsers (Chrome, Safari) and Web3-native browsers (Brave, Opera, Web3 plugins), a dual-stack decentralized hosting model is implemented.

```
                   ┌───────────────────────────────────────┐
                   │         GitHub Repository             │
                   │ (astrachan163/career-portfolio)       │
                   └──────────────────┬────────────────────┘
                                      │
                   ┌──────────────────┴────────────────────┐
                   │    CI/CD & IPFS Pinning Engine        │
                   │ (Fleek / 4EVERLAND / Pinata / IPFS)   │
                   └──────┬─────────────────────────┬──────┘
                          │                         │
            ┌─────────────▼──────────┐   ┌──────────▼──────────┐
            │ Decentralized Storage  │   │ Traditional Edge    │
            │   (IPFS CID & Filecoin)│   │ (GitHub Pages / CF) │
            └─────────────┬──────────┘   └──────────┬──────────┘
                          │                         │
     ┌────────────────────┴────────┐                │
     │ Web3 Resolution (Freename)  │                │
     │ - nonartificialsi           │                │
     │ - super-intelligence        │                │
     └─────────────┬───────────────┘                │
                   │                                │
    ┌──────────────▼───────────┐      ┌─────────────▼──────────┐
    │ Brave / Opera / Unstoppable│     │ Standard Browsers      │
    │ Web3 Native Resolution    │     │ nonartificialsi.com    │
    └──────────────────────────┘      └────────────────────────┘
```

### Step 3.1: Decentralized Content Pinning (IPFS & Arweave)
1. **Automated IPFS Pinning via Fleek or Pinata**:
   - Connect the GitHub repository `astrachan163/electronic-career-portfolio` to Fleek.co or Pinata.cloud.
   - On every push to `gh-pages` / `main`, trigger an automated build that generates a cryptographically immutable **IPFS Content Identifier (CID)** (e.g., `ipfs://bafybeic...`).
2. **Permanent Storage Fallback**:
   - Mirror static assets to Arweave via Bundlr / Irys for perpetual decentralized storage.

### Step 3.2: Connecting Content Hash (CID) to Freename Domains
1. In the Freename Dashboard, open **"My Domains"** / **"Domain Management"**.
2. Select the domain (e.g., `andrew.nonartificialsi` or `portfolio.nonartificialsi`).
3. Under **DNS / Web3 Records**:
   - Set **Content Hash / IPFS Hash**: `ipfs://<DEPLOYED_IPFS_CID>`.
   - Set **Redirect URL / Web2 Fallback**: `https://astrachan163.github.io/electronic-career-portfolio/`.
   - Configure **Crypto Wallet Addresses**: Bind ETH, SOL, and BTC public addresses to enable receiving crypto payments directly to the domain handle.
4. Sign the blockchain transaction to update the on-chain resolver record.

---

## 4. Bridging Web2 & Web3: `nonartificialsi.com` Integration

`nonartificialsi.com` serves as the primary bridge uniting traditional DNS with Web3 decentralization.

### Step 4.1: DNSSEC and ENS / Freename Linking
1. **DNS Provider Configuration** (e.g. Cloudflare):
   - Enable **DNSSEC** (Domain Name System Security Extensions) on `nonartificialsi.com`.
2. **Content Resolution via CNAME / ALIAS**:
   - Set root `@` or `www` record:
     - `CNAME` pointing to `astrachan163.github.io` (for GitHub Pages hosting).
     - Alternatively, configure Cloudflare IPFS Gateway:
       - Set `_dnslink.nonartificialsi.com` TXT record to `dnslink=/ipfs/<DEPLOYED_IPFS_CID>`.
3. **Web3 Interoperability**:
   - Enable Cloudflare Web3 Gateway or Fleek custom domain routing so both traditional HTTP/HTTPS requests and decentralized resolvers fetch the identical cryptographic build.

---

## 5. Client Resolution & Browser Compatibility

Because ICANN root servers do not natively resolve custom decentralized TLDs by default, access to `nonartificialsi` and `super-intelligence` is achieved via:

1. **Native Web3 Browsers**:
   - **Brave Browser**: Native IPFS and decentralized domain support. Users navigate directly to `http://portfolio.nonartificialsi/` or `brave://settings/web3`.
   - **Opera Crypto Browser**: Built-in multi-chain Web3 domain resolution.
2. **Freename Browser Extension / DNS Resolver**:
   - Install the official **Freename Extension** for Chrome/Firefox/Edge.
   - Configure custom DoH (DNS-over-HTTPS) resolver: `https://dns.freename.io/dns-query` in router or operating system settings.
3. **Public Web2 Gateways (Universal Access)**:
   - Provide public bridge URLs for users without Web3 plugins:
     - `https://portfolio.nonartificialsi.freename.host/`
     - `https://nonartificialsi.com`
     - `https://astrachan163.github.io/electronic-career-portfolio/`

---

## 6. Implementation Checklist & Action Plan

- [x] **Architecture Plan Completed**: Published to `web3_domain_plan.md`.
- [ ] **Phase 1: Freename Setup**:
  1. Access Freename account and verify wallet connection (Polygon/Base network).
  2. Mint `/nonartificialsi` and `/super-intelligence` TLDs.
  3. Mint initial SLDs (`portfolio.nonartificialsi`, `atlas.super-intelligence`).
- [ ] **Phase 2: Decentralized Content Publishing**:
  1. Export production static build of career portfolio (`dist/public`).
  2. Upload and pin build directory to IPFS via Pinata or Fleek.
  3. Retrieve root IPFS CID (`bafy...`).
- [ ] **Phase 3: Resolver Mapping**:
  1. Update Freename on-chain records with IPFS CID.
  2. Configure TXT `_dnslink` records on `nonartificialsi.com`.
  3. Verify resolution in Brave and via public Web3 gateways.
- [ ] **Phase 4: Ongoing Maintenance**:
  1. Establish GitHub Actions workflow to auto-repin to IPFS on git push and update DNSLink.
