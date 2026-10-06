import {
createRootRoute,
HeadContent,
Outlet,
Scripts,
Link,
} from "@tanstack/react-router";
 
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/app-shell";
 
import appCss from "../styles.css?url";
 
const APP_NAME = "VR-ASI-CO · OdinOS";
 
function NotFound() {
return (
<main className="flex min-h-screen items-center justify-center bg-bg text-fg">
<div className="mx-auto max-w-xl px-6 text-center">
<div className="mb-4 text-8xl font-bold text-primary">
404
</div>
 
<h1 className="mb-3 text-3xl font-semibold">
Page Not Found
</h1>
 
<p className="mb-8 text-muted-foreground">
The page you requested does not exist or has been moved.
</p>
 
<div className="flex flex-wrap justify-center gap-3">
<Link
to="/"
className="rounded-md border px-4 py-2 hover:bg-accent"
>
Home
</Link>
 
<Link
to="/catalog"
className="rounded-md border px-4 py-2 hover:bg-accent"
>
Catalog
</Link>
 
<Link
to="/personas"
className="rounded-md border px-4 py-2 hover:bg-accent"
>
Personas
</Link>
</div>
</div>
</main>
);
}
 
export const Route = createRootRoute({
notFoundComponent: NotFound,
 
head: () => ({
meta: [
{
charSet: "utf-8",
},
{
name: "viewport",
content: "width=device-width, initial-scale=1",
},
{
title: APP_NAME,
},
{
name: "description",
content:
"Adaptive VR-ASI-CO OdinOS command deck for personas, tools, skills, DNA/RNA status, knowledge surfaces, and project workflows.",
},
{
name: "theme-color",
content: "#08090b",
},
],
 
links: [
{
rel: "icon",
type: "image/svg+xml",
href: "/favicon.svg",
},
 
{
rel: "stylesheet",
href: appCss,
},
 
{
rel: "manifest",
href: "/__grok/manifest.webmanifest",
},
 
{
rel: "apple-touch-icon",
href: "/__grok/icon-180.png",
},
 
{
rel: "preconnect",
href: "https://fonts.googleapis.com",
},
 
{
rel: "preconnect",
href: "https://fonts.gstatic.com",
crossOrigin: "anonymous",
},
 
{
rel: "stylesheet",
href:
"https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap",
},
],
}),
 
component: () => (
<html
lang="en"
className="antialiased"
suppressHydrationWarning
>
<head>
<HeadContent />
</head>
 
<body className="bg-bg text-fg">
<PreviewHostBridge />
 
<AuthProvider>
<AppShell>
<Outlet />
</AppShell>
</AuthProvider>
 
<Scripts />
</body>
</html>
),
});