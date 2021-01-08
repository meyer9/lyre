import { useEffect, useState } from "react";

const usePolledQuery = (
  pollFunc: () => void,
  interval: number,
  defaultPolling: boolean = true
) => {
  const [polling, setPolling] = useState(defaultPolling);

  const start = () => setPolling(true);
  const stop = () => setPolling(false);

  useEffect(() => {
    if (!polling) {
      return;
    }

    const i = setInterval(() => {
      pollFunc();
    }, interval);

    return () => clearInterval(i);
  }, [polling]);

  return { start, stop, polling };
};

export default usePolledQuery;
