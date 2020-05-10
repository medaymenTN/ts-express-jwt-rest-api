import { createConnection, Connection } from "typeorm";
export const postgresConnect = async (retries = 5) => {
  while (retries) {
    try {
      const connect = await createConnection();

      if (connect) {
        console.log("connected to db..");
      }
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};
