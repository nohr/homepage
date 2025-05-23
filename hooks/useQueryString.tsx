import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryString() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name?: string, value?: string) => {
      if (name && value) {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get("p")) params.delete("p");
        params.set(name, value);

        return "?" + params.toString();
      } else {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete("t");
        nextParams.delete("p");

        return "";
      }
    },
    [searchParams],
  );

  return createQueryString;
}
