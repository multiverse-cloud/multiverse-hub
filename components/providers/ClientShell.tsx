"use client";

import dynamic from "next/dynamic";

const ScrollToTopButton = dynamic(
  () => import("@/components/layout/ScrollToTopButton"),
  { ssr: false },
);
const AppToaster = dynamic(() => import("@/components/providers/AppToaster"), {
  ssr: false,
});
const NavigationRecovery = dynamic(
  () => import("@/components/providers/NavigationRecovery"),
  { ssr: false },
);
const NavigationProgress = dynamic(
  () => import("@/components/providers/NavigationProgress"),
  { ssr: false },
);
const MobileBottomNav = dynamic(
  () => import("@/components/layout/MobileBottomNav"),
  { ssr: false },
);

export default function ClientShell() {
  return (
    <>
      <NavigationProgress />
      <NavigationRecovery />
      <MobileBottomNav />
      <ScrollToTopButton />
      <AppToaster />
    </>
  );
}
