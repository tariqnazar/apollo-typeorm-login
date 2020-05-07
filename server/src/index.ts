import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnections } from "typeorm";
import { verify } from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "./entity/User";
import { createAccessToken } from "./Token";

(async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );

  app.use(cookieParser());

  app.get("/", (_req, res) => {
    res.send("HELLO!");
  });

  app.post("/refresh_token", async (req, res) => {
    const refreshToken = req.cookies.jid;
    if (!refreshToken) {
      res.sendStatus(404);
    }
    let payload: any = null;
    try {
      payload = await verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      res.send(err);
    }

    //CLEAN THIS UP

    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      res.sendStatus(404);
    }
    const accessToken = createAccessToken(user as User);
    res.send({ accessToken });
  });

  await createConnections();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Listening on port 4000...");
  });
})();

// createConnection()
//   .then(async connection => {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch(error => console.log(error));
