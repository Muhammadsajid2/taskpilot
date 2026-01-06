"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const PUBLIC_ROUTES = ["/login", "/signup"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authCheck = () => {
      const token = localStorage.getItem("token");
      if (!token && !PUBLIC_ROUTES.includes(pathname)) {
        setAuthorized(false);
        router.push("/login");
      } else {
        setAuthorized(true);
      }
    };

    authCheck();
  }, [pathname, router]);

  if (!authorized && !PUBLIC_ROUTES.includes(pathname)) {
    return null; // Or a loading spinner
  }

  return children;
}
