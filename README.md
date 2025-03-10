# Monkey Playground

[![CI](https://github.com/ruegerj/monkey-playground/actions/workflows/ci.yaml/badge.svg)](https://github.com/ruegerj/monkey-playground/actions/workflows/ci.yaml)
[![CD](https://github.com/ruegerj/monkey-playground/actions/workflows/cd.yaml/badge.svg)](https://github.com/ruegerj/monkey-playground/actions/workflows/cd.yaml)

Web-Sandbox for writing, compiling and executing [Monkey](https://monkeylang.org/) code from your browser.

## Contents

- [Changelog](/CHANGELOG.md)
- [Code Samples](/docs/samples/)
- [Documentation](/docs/documentation.md)
- [Requirements & Specification](/docs/requirements.md)
- [Screenshots](/docs/screenshots/screenshots.md)
- [Work Journal](/docs/work-journal.md)

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

Instead of building a new image from source, you can simply just use the one from the latest release: [monkey-playground:latest](https://github.com/ruegerj/monkey-playground/pkgs/container/monkey-playground):

```bash
docker pull ghcr.io/ruegerj/monkey-playground:latest
```

To run the latest image of the app, use the command below while inserting the corresponding values of the env vars:

```bash
docker run -dit \
    -e PUBLIC_MAX_ALLOWED_CHARS=10000 \
    -e GITHUB_CLIENT_ID=<client-id> \
    -e GITHUB_CLIENT_SECRET=<client-secret> \
    -p 5173:5173 \
    -v <host-path>:/db \
    ghcr.io/ruegerj/monkey-playground:latest
```
