"use client";

import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export default function ToolOptionsSheet({
  title = "Options",
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 text-sm font-bold text-slate-700 transition active:scale-[0.98] dark:bg-slate-800 dark:text-slate-100",
            className,
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Options
        </button>
      </DrawerTrigger>
      <DrawerContent
        data-tool-shell="true"
        className="max-h-[82vh] rounded-t-2xl border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
      >
        <DrawerHeader className="px-4 pb-2 pt-4 text-left">
          <DrawerTitle className="font-display text-base font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
            {title}
          </DrawerTitle>
        </DrawerHeader>
        <div className="custom-scrollbar max-h-[58vh] overflow-auto px-4 pb-3">
          {children}
        </div>
        <DrawerFooter className="border-t border-slate-200 px-4 py-3 dark:border-slate-800">
          <DrawerClose asChild>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-bold text-white transition active:scale-[0.98] dark:bg-white dark:text-slate-950"
            >
              Apply options
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
