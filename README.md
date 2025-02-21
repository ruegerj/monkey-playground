# Monkey Playground

Web-Sandbox for writing, compiling and executing [Monkey](https://monkeylang.org/) code from your browser.

## Contents

- [Requirements & Specification](/docs/requirements.md)
- [Work Journal](/docs/work-journal.md)
- [Changelog](/CHANGELOG.md)

## Development Environment

> Note: please make sure, that you have NodeJS LTS release (_22.x_) installed on your system

[Bun](https://bun.sh/) is used as package manager to develop and run local tasks. However any node package manager (npm, yarn pnpm ...) should be compatible, since all actions are abstracted as "npm-scripts".

In order to setup a local dev environment, check out the repository and install all dependencies:

```bash
bun install
```

Afterwards copy the `.env.example` to `.env` and replace all marked env vars with their corresponding values. Any env var can be customized to preference.

### Dev-Mode

For running the project in development mode with hot-module-reload enabled, use the following command:

```bash
bun run dev
```

### Build & Preview

For creating a local production build and preview it locally, use the following command:

```bash
bun run build
bun run preview
```

## Docker

The project is setup, in order to be runnable as a standalone docker container without any dependencies on other systems. In order to build a new image, use the following command:

```bash
docker build -t ruegerj/monkey-playground:snapshot --platform linux/amd64  .
```

To run the generated image, use the command below while inserting the corresponding values of the env vars:

```bash
docker run -dit \
    -e PUBLIC_MAX_ALLOWED_CHARS=10000 \
    -e GITHUB_CLIENT_ID=<client-id> \
    -e GITHUB_CLIENT_SECRET=<client-secret> \
    -p 5173:5173 \
    -v <host-path>:/db \
    ruegerj/monkey-playground:0.5.0
```
