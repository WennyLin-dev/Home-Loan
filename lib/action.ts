// import bcrypt from "bcrypt";
// import { prisma } from "@/lib/prisma";

const login = async () => {
    try {
      // const user = await prisma
      
      // ({ username: credentials.username });
  
      // if (!user || !user.isAdmin) throw new Error("Wrong credentials!");
  
      // const isPasswordCorrect = await bcrypt.compare(
      //   credentials.password,
      //   user.password
      // );
  
      // if (!isPasswordCorrect) throw new Error("Wrong credentials!");
  
      return true;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to login!");
    }
  };
  export {login}
