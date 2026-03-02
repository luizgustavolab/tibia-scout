'use client';

import * as React from 'react';
import * as ResizablePrimitive from 'react-resizable-panels';
import { cn } from '@/lib/utils';

// Forçamos a biblioteca inteira a ser tratada como 'any'
const Root = ResizablePrimitive as any;

const ResizablePanelGroup = ({ className, ...props }: any) => (
  <Root.PanelGroup
    className={cn(
      'flex h-full w-full data-[direction=vertical]:flex-col',
      className,
    )}
    {...props}
  />
);

const ResizablePanel = Root.Panel;

const ResizableHandle = ({ withHandle, className, ...props }: any) => (
  <Root.PanelResizeHandle
    className={cn(
      'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-1 data-[direction=vertical]:after:w-full data-[direction=vertical]:after:-translate-y-1/2 data-[direction=vertical]:after:translate-x-0 [&[data-dragged]>div]:bg-border',
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <div className="h-2.5 w-px bg-foreground/20" />
      </div>
    )}
  </Root.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
