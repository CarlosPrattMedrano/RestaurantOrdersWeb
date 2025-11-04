import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import Login from "./pages/Login";
import Tables from "./pages/auth/Tables";
import { getAuthStatus } from "./api/auth";
import { useQuery } from "@tanstack/react-query";
import Order from "./pages/auth/Order";

export function useAuthQuery() {
  return useQuery({
    queryKey: ["authStatus"],
    queryFn: getAuthStatus,
  });
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthStatus();
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthStatus();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    } else {
      throw redirect({ to: "/tables" });
    }
  },
  component: Tables,
});

// export const protectedRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   id: "protected",
//   beforeLoad: async () => {
//     const { isAuthenticated } = await getAuthStatus();
//     console.log(isAuthenticated);
//     if (!isAuthenticated) {
//       throw redirect({ to: "/login" });
//     }
//   },
//   component: () => {
//     return <Outlet />;
//   },
// });

const tablesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tables",
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthStatus();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: Tables,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order/$tableId",
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthStatus();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: Order,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  tablesRoute,
  orderRoute,
  // protectedRoute.addChildren([tablesRoute, orderRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
