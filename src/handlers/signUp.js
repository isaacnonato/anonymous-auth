import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {customAlphabet} from 'nanoid';

const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5);

export default async (req, res) => {
  const {password, name} = req.body;
  let errors = [];
  if (!password || !name) {
    errors += 'invalid form submission';
  }
  const getIdentifier = async () => {
    let identifier = `${nanoid()}-${nanoid()}-${nanoid()}-${nanoid()}`;
    if (await prisma.user.findFirst({where : {identifier}})) {
      identifier = getIdentifier();
    }
    return identifier;
  };
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data : {
      identifier : await getIdentifier(),
      passwordHash,
      name,
    },
  });
  res.json(user);
};
