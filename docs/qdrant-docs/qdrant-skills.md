# Qdrant Agent Skills

Unlock the power of solutions architecture for your coding agent with Qdrant Agent Skills—structured, problem-oriented knowledge modules built for practical, real-world troubleshooting and architectural guidance.

---

## 🌐 What Are Qdrant Agent Skills?

**Agent Skills** are curated, hierarchical knowledge files designed to help AI coding assistants **reason** through architectural trade-offs, not just repeat documentation. Rather than documenting “how” to use Qdrant, skills empower agents to answer:

- **When** should a feature be used or avoided?
- **Why** are certain errors or patterns occurring?
- **What** should you check first when troubleshooting a symptom?
- **How** to reason through complex migration, performance, or deployment scenarios?

> **Live Skills Directory:**  
> Explore and link to live skill files at [skills.qdrant.tech](https://skills.qdrant.tech).  
> Simply pass a skill’s URL to your AI coding agent—no installation required!

---

## Why Use Skills by URL?

- **Context Efficiency:** Skills are loaded *on demand*, keeping the agent laser-focused on the current problem—no need to pre-load a corpus.
- **Easy Integration:** Share a skill URL with your agent; it will immediately access and incorporate that knowledge.
- **Offline or Advanced Use:**  
  Prefer to install skill files locally, or have your agent auto-discover them?  
  See our [README](https://github.com/qdrant/skills/blob/main/README.md) for installation instructions.

---

## 🚦 Philosophy & Approach

- **Not Just Docs:**  
  Skills are not a mirror of the documentation. They’re a *diagnostic and decision layer*—bridging symptoms (like “hybrid search returns misleading results”) to root-causes and next steps.
- **When vs How:**  
  - *Docs*: “How do I enable scalar quantization?”  
  - *Skill*: “Should I enable it? What to check before? What could go wrong?”
- **Experience Encoded:**  
  Each skill encapsulates lessons from real-world usage, distilling hard-won troubleshooting experience and architectural best practices.

**Skill Anatomy:**

- **Trigger Condition:** When should the agent use this skill?
- **Imperative Steps:** Concrete, actionable instructions linked to documentation.
- **What Not to Do:** Common pitfalls—often the most valuable insights.

---

## 🗂️ Skill Hierarchy

Agent skills are organized by *problem domain* (hub skills), each branching into finer-grained *leaf skills* for specific scenarios.

For example, `qdrant-search-quality` includes:

- **Diagnosis & Tuning:**  
  - Isolate quality issues
  - Set up labeled baselines
  - Tune HNSW parameters
  - Choose the right embedding model
- **Search Strategies:**  
  - Hybrid search
  - Reranking
  - Relevance feedback
  - Exploration APIs

This hierarchy enables top-down navigation:

- **Hub Skills:** Broad architectural and operational guidance
- **Leaf Skills:** Deep dives for specific error conditions or advanced optimization

Explore the full hierarchy at [skills.qdrant.tech](https://skills.qdrant.tech).

---

## 📚 Available Hub Skills

| **Skill**                        | **Primary Use Cases**                                                                    |
|:----------------------------------|:----------------------------------------------------------------------------------------|
| `qdrant-clients-sdk`              | Client SDK setup & code examples (Python, TypeScript, Rust, Go, .NET, Java)             |
| `qdrant-scaling`                  | Scaling strategies: data volume, QPS, latency, horizontal vs vertical                   |
| `qdrant-performance-optimization` | Optimizing search speed, memory usage, indexing bottlenecks                             |
| `qdrant-search-quality`           | Diagnosing poor results, recall issues, hybrid search trade-offs                        |
| `qdrant-monitoring`               | Metrics, health checks, optimizer troubleshooting, cluster debugging                    |
| `qdrant-deployment-options`       | Deployment choices: local, Docker, self-hosted, Cloud, embedded                         |
| `qdrant-model-migration`          | Migration between embedding models with zero downtime                                   |
| `qdrant-version-upgrade`          | Safe upgrade paths, compatibility, rolling upgrades                                     |

---

## 🚀 Installing & Contributing

- **Install Skills for Your Agent:**  
  Agents like Cursor, Claude Code, OpenCode, and others can all use these skills.
  See the [README](https://github.com/qdrant/skills/blob/main/README.md) for instructions.

- **Contribute New Skills or Report Issues:**  
  Your experience can help the community!  
  Learn how in [CONTRIBUTING.md](https://github.com/qdrant/skills/blob/main/CONTRIBUTING.md).

---

**Explore, contribute, and help your AI agents think with Qdrant expertise!**
