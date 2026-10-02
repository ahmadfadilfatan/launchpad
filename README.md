# launchpad

> A production-grade CI/CD pipeline: **Node.js → GitHub Actions → (Docker, coming soon)**

[![CI](https://github.com/ahmadfadilfatan/launchpad/actions/workflows/ci.yml/badge.svg)](https://github.com/ahmadfadilfatan/launchpad/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](package.json)

## Overview

**launchpad** is a minimal Node.js service wrapped in a production-grade
delivery pipeline. Every push to `main` and every pull request automatically:

1. Installs dependencies deterministically (`npm ci`)
2. Runs the linter (`eslint`)
3. Runs the test suite with coverage (`jest`)

If any step fails, the PR is blocked. This is the foundation that the
`shipyard` (Terraform) and `tuner` (Ansible) projects will build on.

## Architecture

```
┌────────────┐   push / PR   ┌──────────────────┐   triggers   ┌──────────────────┐
│ Developer  │ ────────────► │ GitHub Repository│ ───────────► │ GitHub Actions   │
└────────────┘               └──────────────────┘              └────────┬─────────┘
                                                                        │
                                                                        ▼
                                                              ┌─────────────────────┐
                                                              │  Lint & Test job    │
                                                              │  ─ npm ci           │
                                                              │  ─ npm run lint     │
                                                              │  ─ npm test         │
                                                              └─────────────────────┘
```

## Pipeline Stages

| Stage | Trigger | What it does |
|---|---|---|
| **Lint & Test** | Every push, every PR to `main` | ESLint + Jest with coverage |

Docker build & push to a registry is planned (see [Roadmap](#roadmap)).

## Quickstart (local)

```bash
# Install dependencies
npm ci

# Run tests with coverage
npm test

# Run the linter
npm run lint

# Start the service
npm start           # → http://localhost:3000
```

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/` | Service metadata |
| GET | `/health` | Liveness probe |
| GET | `/ready` | Readiness probe |

## Test Coverage

```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 app.js   |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```

## Engineering Decisions

- [ADR-0001: Use GitHub Actions over Jenkins](docs/adr/0001-use-github-actions.md)

## Repository Structure

```
.
├── .github/workflows/ci.yml     # CI pipeline
├── docs/
│   └── adr/                     # Architecture Decision Records
├── src/
│   ├── app.js                   # Express app
│   └── server.js                # Entrypoint + graceful shutdown
├── tests/
│   └── app.test.js              # Jest + Supertest tests
├── .dockerignore
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── LICENSE
└── package.json
```

## Roadmap

- [x] **v1.0.0** — CI pipeline with lint + test
- [ ] **v1.1.0** — Dockerfile with multi-stage build
- [ ] **v1.2.0** — Push image to Docker Hub
- [ ] **v1.3.0** — Trivy image vulnerability scanning
- [ ] **v2.0.0** — Deploy to AWS (see `shipyard` + `tuner`)

## License

[MIT](LICENSE)
