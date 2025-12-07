import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    route("host", "./routes/host.tsx"),
    route("lectern", "./routes/lectern.tsx"),
    route("sfx", "./routes/sfx.tsx"),
    route("play/:playerId", "./routes/play.tsx"),
    route("display/:playerId", "./routes/display.tsx")
] satisfies RouteConfig;
