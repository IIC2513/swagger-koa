// import Koa from "koa";
// import { koaSwagger } from "koa2-swagger-ui";

const Koa = require("koa");
const Router = require("@koa/router");
const { koaSwagger } = require("koa2-swagger-ui");
const yamljs = require("yamljs");

const app = new Koa();

const router = new Router();

// .load loads file from root.
const spec = yamljs.load("./openapi.yml");

// example 1 using router.use()
router.use(koaSwagger({ swaggerOptions: { spec } }));

// example 2 using more explicit .get()
router.get("/test", (ctx, next) => {
  ctx.response.body = "Hello world!";
});

// example 2 using more explicit .get()
router.get(
  "/docs",
  koaSwagger({ routePrefix: false, swaggerOptions: { spec } })
);

app.use(router.routes());
app.listen(8080);
