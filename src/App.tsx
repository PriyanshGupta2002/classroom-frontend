import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";

import { Layout } from "./components/refine-ui/layout/layout";

import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { BookOpen, Building, Home } from "lucide-react";
import SubjectsList from "./pages/subjects/list";
import Create from "./pages/subjects/create";
import { dataProvider } from "./providers/data";
import ClassList from "./pages/classes/list";
import CreateClass from "./pages/classes/create";
import ShowClassDetails from "./pages/classes/show";
import { authProvider } from "./providers/AuthProvider";
import { SignUpForm } from "./components/refine-ui/form/sign-up-form";
import { SignInForm } from "./components/refine-ui/form/sign-in-form";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              authProvider={authProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "HPffpP-yvGini-hWCUvX",
              }}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Home",
                    icon: <Home />,
                  },
                },
                {
                  name: "subjects",
                  list: "/subjects",
                  create: "/subjects/create",
                  meta: {
                    label: "Subjects",
                    icon: <BookOpen />,
                  },
                },
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Home",
                    icon: <Home />,
                  },
                },
                {
                  name: "classes",
                  list: "/classes",
                  create: "/classes/create",
                  show: "/classes/show/:id",
                  meta: {
                    label: "Classes",
                    icon: <Building />,
                  },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Layout>
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Outlet />
                      </Authenticated>
                    </Layout>
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  {/* <Route path="/subjects" element={<SubjectsList />} /> */}
                  <Route path="/subjects">
                    <Route index element={<SubjectsList />} />
                    <Route path="create" element={<Create />} />
                  </Route>
                  <Route path="/classes">
                    <Route index element={<ClassList />} />
                    <Route path="create" element={<CreateClass />} />
                    <Route path="show/:id" element={<ShowClassDetails />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<SignInForm />} />
                  <Route path="/register" element={<SignUpForm />} />
                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
