FROM oven/bun:1.3.14 AS dependencies
WORKDIR /app
COPY package.json bun.lock ./
COPY packages/studio-next/package.json ./packages/studio-next/package.json
RUN bun install --frozen-lockfile

FROM dependencies AS builder
COPY . .
ARG NEXT_PUBLIC_APP_URL=https://app.nafs.tech
ARG NEXT_PUBLIC_SIGN_IN_URL=https://app.nafs.tech/auth/sign-in
ARG NEXT_PUBLIC_CONTACT_EMAIL=hello@nafsos.com
ARG NEXT_PUBLIC_DEMO_URL=/#contact
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_SIGN_IN_URL=$NEXT_PUBLIC_SIGN_IN_URL \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL \
    NEXT_PUBLIC_DEMO_URL=$NEXT_PUBLIC_DEMO_URL \
    NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM node:24.14.1-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000 NEXT_TELEMETRY_DISABLED=1
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/src/content/blog ./src/content/blog
USER node
EXPOSE 3000
CMD ["node", "server.js"]
