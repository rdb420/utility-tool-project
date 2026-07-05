# 🚀 FastEmbed

## What is FastEmbed?

**FastEmbed** is a modern, lightweight Python library focused on fast and accurate embedding generation for your data. Designed to be user-friendly and production-ready, FastEmbed offers seamless support for the most popular embedding models and integrates with state-of-the-art vector databases like **Qdrant** for multimodal search and information retrieval.

Whether you’re working on machine learning, NLP, recommendation systems, or semantic search, FastEmbed helps you convert your data—text, images, and more—into high-quality vector representations, making downstream tasks efficient and reliable.

---

## ⚡️ Key Features

- **Ultra-Lightweight:** Minimal dependencies, making it ideal for serverless & resource-limited environments. Built on the efficient ONNX runtime—no need for heavyweights like PyTorch!
- **Blazing Fast:** Utilizes ONNX for high-throughput inference optimized across hardware platforms.
- **High Accuracy:** Consistently delivers top-tier results, outperforming closed-source models like OpenAI’s `Ada-002`. FastEmbed only includes models that excel in standardized benchmarks such as the MTEB leaderboard.
- **Broad Model Support:** Leverage a variety of models, including multilingual options to address diverse real-world scenarios.
- **Seamless Qdrant Integration:** Designed for plug-and-play vector search, reranking, and multimodal applications.

---

## 🚦 Quickstart & Guides

Explore guided tutorials and resources based on your experience level and use case:

| Level         | Hands-on Guide                                                                                      | What You'll Learn                                                                                 |
|---------------|----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **Beginner**  | [🔗 Generate Text Embeddings](/documentation/fastembed/fastembed-quickstart/index.md)               | Install FastEmbed and generate dense text embeddings                                             |
|               | [🔗 Dense Embeddings + Qdrant](/documentation/fastembed/fastembed-semantic-search/index.md)         | Generate and index dense embeddings for semantic search in Qdrant                                |
| **Advanced**  | [🔗 miniCOIL Sparse Embeddings + Qdrant](/documentation/fastembed/fastembed-minicoil/index.md)      | Use Qdrant’s sparse neural retriever for precise text search                                     |
|               | [🔗 SPLADE Sparse Embeddings + Qdrant](/documentation/fastembed/fastembed-splade/index.md)          | Generate and index sparse neural embeddings                                                      |
|               | [🔗 ColBERT Multivector Embeddings + Qdrant](/documentation/fastembed/fastembed-colbert/index.md)   | Generate and work with multi-vector representations—**ideal for rescoring and custom retrieval** |
|               | [🔗 Reranking with FastEmbed](/documentation/fastembed/fastembed-rerankers/index.md)                | Re-rank top-K search results using FastEmbed cross-encoders                                      |
|               | [🔗 Postprocessing](/documentation/fastembed/fastembed-postprocessing/index.md)                     | Enhance your embeddings after generation with cutting-edge postprocessing techniques              |

---

## 💡 Why Choose FastEmbed?

- **Lightweight:** Minimal external dependencies make FastEmbed perfect for cloud and edge deployments—including AWS Lambda and similar environments.
- **Performance:** ONNX ensures FastEmbed runs at top speed, optimizing your workflows on any hardware.
- **Accuracy First:** Prefer results you can trust. FastEmbed tracks the latest MTEB leaderboard to always bring you leading models—with improved recall and relevance over other solutions.
- **Versatility:** From English to multilingual use cases—and dense, sparse, or multi-vector models—FastEmbed adapts to whatever your project demands.
- **Active Community & Support:** Documentation, guides, and a growing user base make it easy to get help and stay up to date.

---

Ready to supercharge your vector search and machine learning pipelines? **Try FastEmbed now!**
