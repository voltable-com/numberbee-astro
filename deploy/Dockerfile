# syntax=docker/dockerfile:1
# Numberbee: static Astro PWA. A node:24 stage runs the pnpm build (toolchain
# never ships); the runtime is a rootless Caddy serving the bundle from
# /srv/game/numberbee on :8080. The public URL path is /game/numberbee/ — the
# TLS front mounts this container under that prefix; the container's own `/`
# 301s to it (see deploy/Caddyfile).
#
# Build context MUST be the repo root:
#   docker build -f deploy/Dockerfile -t mini.local/registry/numberbee-web:<tag> .

# --- build: pnpm install + astro build (dist) ---
FROM node:24-bookworm-slim AS build
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable
WORKDIR /app
# Manifest layer first: the frozen lockfile + pnpm-workspace.yaml (build-script
# allowlist for esbuild/sharp) rarely change, so deps stay cached across src edits.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json astro.config.mjs ./
COPY utils ./utils
RUN pnpm install --frozen-lockfile
COPY src ./src
COPY public ./public
RUN pnpm build

# --- run: static files behind a rootless listener ---
FROM caddy:2-alpine AS run
RUN addgroup -S caddy && adduser -S -D -H -G caddy caddy \
  && chown -R caddy:caddy /config /data
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build --chown=caddy:caddy /app/dist /srv/game/numberbee
USER caddy
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:8080/game/numberbee/" || exit 1
