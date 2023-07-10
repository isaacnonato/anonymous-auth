import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()
import dotenv from 'dotenv' 
dotenv.config()

export default async (req, res) => {
  let ok = true;
  const { identifier, password } = req.body
  const userExists = await prisma.user.findFirst({
    where: {
      identifier: identifier,
    },
  }) !== null
  if (!userExists) {
    ok = false;
  }

  if (!ok) {
    res.json({ message: "error happened" })
    return;
  }
}
