# ADR-0001: Use GitHub Actions over Jenkins for CI/CD

- **Status:** Accepted
- **Date:** 2026-10-02
- **Deciders:** Ahmad Fadil Fatan

## Context

**launchpad** needs a CI/CD system that lints, tests, and (eventually) builds
and publishes a Docker image on every push. The system should be reliable,
low-maintenance, and demonstrate modern DevOps practices.

## Decision

Use **GitHub Actions** as the CI/CD platform.

## Consequences

### Positive
- Zero infrastructure to maintain — no Jenkins master or agents to patch
- Native integration with the repository (triggers, secrets, PR checks)
- Free tier is more than sufficient for a portfolio
- Large ecosystem of reusable actions (`actions/setup-node`, `docker/build-push-action`)
- Workflow-as-code lives next to the application code

### Negative
- Vendor lock-in to GitHub
- Less flexible than Jenkins for exotic pipelines
- Debugging complex workflows is harder than a local Jenkinsfile
- YAML-based DSL can become verbose

### Neutral
- Secrets management via GitHub Secrets is adequate at this scale

## Alternatives Considered

- **Jenkins (self-hosted):** Too much operational overhead for this project.
  Would require EC2, backups, and plugin maintenance.
- **GitLab CI:** Viable, but the code lives on GitHub. Splitting platforms
  adds friction.
- **CircleCI / Travis CI:** Third-party dependency with no clear advantage
  over Actions for a GitHub-hosted repo.
- **Drone CI:** Great, but requires self-hosting and a runner.

## References

- https://docs.github.com/en/actions
- https://docs.github.com/en/actions/using-workflows
