
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { dbPromise } from "@/lib/mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(await dbPromise),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
});
