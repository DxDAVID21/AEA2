import { H3Event } from 'h3'
import { PrismaClient } from '@prisma/client'

const prismaClientMap = new Map<string, PrismaClient>()

export function usePrisma(event: H3Event): PrismaClient {
  const key = process.server ? 'global' : 'client'
  
  if (!prismaClientMap.has(key)) {
    prismaClientMap.set(key, new PrismaClient())
  }
  
  return prismaClientMap.get(key)!
}