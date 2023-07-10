import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

export default async (req, res) => {
  const {identifier, password} = req.body;
  const user = await prisma.user.findUnique({
    where : {
      identifier : identifier,
    },
    select : {name : true, passwordHash : true},
  });
  if (!user) {
    res.status(401).json({error: "user does not exist"})
    return
  }
  const pass = await bcrypt.compare(password, user.passwordHash);
  if (!pass) {
    res.json({error : 'Incorrect credentials'});
    return;
  }
  const token = jwt.sign({user_id : identifier}, process.env.JWT_KEY, {
    expiresIn : '2h',
  });
  res.json({ token })
};
