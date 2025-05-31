import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/index.js'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
export const db = new PrismaClient();
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
