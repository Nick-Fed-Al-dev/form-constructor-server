import ServerlessHttp from "serverless-http";
import main from "./core/server";

main.start()
module.exports.handler = ServerlessHttp(main.server)