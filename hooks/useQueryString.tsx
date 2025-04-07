import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryString() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name?: string, value?: string) => {
      if (name && value) {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get("pi")) params.delete("pi");
        if (params.get("pv")) params.delete("pv");

        params.set(name, value);

        return "?" + params.toString();
      } else {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete("t");
        nextParams.delete("pi");
        nextParams.delete("pv");

        return "";
      }
    },
    [searchParams],
  );

  return createQueryString;
}
