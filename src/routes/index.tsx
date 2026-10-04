import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { getSessionInfo } from "@/lib/auth.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "كيوباي — إدارة متجرك" },
      { name: "description", content: "كيوباي: أدر منتجاتك وطلباتك وعملاءك من لوحة تحكم واحدة." },
      { property: "og:title", content: "كيوباي — إدارة متجرك" },
      { property: "og:description", content: "أدر منتجاتك وطلباتك وعملاءك من لوحة تحكم واحدة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const fetchSession = useServerFn(getSessionInfo);
  useEffect(() => {
    fetchSession()
      .then((res) => window.location.replace(res.email ? "/dashboard" : "/login"))
      .catch(() => window.location.replace("/login"));
  }, [fetchSession]);
  return <div className="hub min-h-screen bg-background" />;
}
