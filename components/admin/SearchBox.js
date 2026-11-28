"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Updates ?q= in the URL as you type (debounced), keeping other filters.
export default function SearchBox({ placeholder = "Search" }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (q) next.set("q", q);
      else next.delete("q");
      if (next.toString() !== params.toString()) router.replace(`${pathname}?${next.toString()}`);
    }, 300);
    return () => clearTimeout(id);
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="adm-search">
      <i className="fas fa-search" aria-hidden="true" />
      <input type="search" value={q} placeholder={placeholder} aria-label={placeholder} onChange={(e) => setQ(e.target.value)} />
    </div>
  );
}
