import type { Route } from "./+types/host";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Match Game Host View" },
  ];
}

export default function Host() {
  return(
    <div>
        Host View omg
    </div>
  )
}