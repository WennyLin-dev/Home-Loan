import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const login = async (credentials: {
  username: string,
  password: string
}) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: credentials.username
      }
    })

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};
export { login }
