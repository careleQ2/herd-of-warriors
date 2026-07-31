import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

/**
 * Returns count of events happening in the next 48h from followed organizations.
 * Fallback: if user follows none, counts all events in next 48h.
 */
export function useUpcomingEventsCount() {
  const { user } = useSession();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const now = new Date();
      const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      const { data: events } = await supabase
        .from("events")
        .select("id,organization_id,fecha")
        .gte("fecha", now.toISOString())
        .lte("fecha", in48h.toISOString());
      if (cancel) return;
      let list = events ?? [];
      if (user) {
        const { data: follows } = await supabase
          .from("organization_follows")
          .select("organization_id")
          .eq("user_id", user.id);
        const followed = new Set((follows ?? []).map((f) => f.organization_id));
        if (followed.size > 0) list = list.filter((e) => e.organization_id && followed.has(e.organization_id));
      }
      if (!cancel) setCount(list.length);
    })();
    return () => {
      cancel = true;
    };
  }, [user]);

  return count;
}
