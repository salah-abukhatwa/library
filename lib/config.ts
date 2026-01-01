// lib/config.ts
const config = {
  env: {
    appUrl:
      process.env.APP_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),

    apiEndpoint:
      process.env.NEXT_PUBLIC_API_ENDPOINT ?? "http://localhost:3000/api",

    prodApiEndpoint: process.env.NEXT_PUBLIC_prod_API_ENDPOINT ?? "",

    imageKit: {
      // client-safe
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "",
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "",

      // server-only
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "",
    },

    databaseUrl: process.env.DATABASE_URL ?? "",

    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL ?? "",
      redisToken: process.env.UPSTASH_REDIS_TOKEN ?? "",
      qstashUrl: process.env.QSTASH_URL ?? "https://qstash.upstash.io",
      qstashToken: process.env.QSTASH_TOKEN ?? "",
    },

    resend: {
      apiKey: process.env.RESEND_API_KEY ?? "",
      from: process.env.RESEND_FROM ?? "",
    },
  },
};

export default config;
