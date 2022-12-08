import StartUp from "./src/StartUp";

const port = process.env.PORT;

StartUp.app.listen(port, () => {
  console.log("App running in port: ", port);
});
