import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const useUpdatedSessionData = () => {
  const { status, update: updateSessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = async (url: string) => {
      if (url === "/" && status === "authenticated") {
        await updateSessionData();
      }
    };

    const wrappedHandleRouteChange = (url: string) => {
      handleRouteChange(url).catch((error) => {
        console.error("An error occurred during route change:", error);
      });
    };

    router.events.on("routeChangeComplete", wrappedHandleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", wrappedHandleRouteChange);
    };
  }, [status, updateSessionData, router]);
};

export default useUpdatedSessionData;
