import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/index.js'
import cookiesRouter from './routes/cookies.ts'
import authRouter from './routes/auth.routes.ts'
import postRouter from './routes/posts.routes.ts'
import { cors } from "hono/cors";
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
export const db = new PrismaClient();
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

app.route("/cookies", cookiesRouter);
app.route("/auth", authRouter);
app.route("/post", postRouter);