import { useState } from "react";
import { storage } from "../storage";

export const usePaginationHook = (initialLimit = 10) => {
  const savedLimit = storage.get<number>("tableLimit");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(savedLimit || initialLimit);

  return {
    page,
    limit,
    setPage,
    setLimit,
    skip: (page - 1) * limit,
  };
};
