FROM node:lts-jod AS builder
RUN curl -fsSL https://bun.sh/install | bash
WORKDIR /app
COPY . .
RUN ~/.bun/bin/bun install --frozen-lockfile
RUN ~/.bun/bin/bun run build

FROM node:jod-slim
WORKDIR /app
VOLUME [ "/db" ]
EXPOSE 5173
CMD [ "node", "index.js" ]
ENV NODE_ENV=production
ENV ORIGIN=http://localhost:5173
ENV PORT=5173
ENV DATABASE_URL=/db/local.db
COPY --from=builder /app/drizzle drizzle
COPY --from=builder /app/bin bin 
COPY --from=builder /app/build .
COPY --from=builder /app/node_modules node_modules