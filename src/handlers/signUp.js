import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()
import { nanoid } from 'nanoid'
import dotenv from 'dotenv' 
dotenv.config()

export default async (req, res) => {
  console.log('signup called')
  console.log(req.body)
  const { password, name } = req.body
  const identifier = `${nanoid(5)}-${nanoid(5)}-${nanoid(5)}-${nanoid(5)}`.toUpperCase()
  const user = await prisma.user.create({
    data: {
      identifier,
      password,
      name
    }
  })
  console.log(user)
}
