import React, { useState } from "react";
import {
  Mosaic,
  MosaicWindow,
  MosaicNode,
  MosaicPath,
  updateTree,
  getLeaves,
} from "react-mosaic-component";
import { Button } from '@/components/ui/button';
import { Menu, X, Plus } from 'lucide-react';
import * as ContextMenu from "@radix-ui/react-context-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import MapOverlay from '@/components/MapOverlay'

import "react-mosaic-component/react-mosaic-component.css";

export type ViewId = string;

function removeNode<T>(tree: MosaicNode<T>, path: MosaicPath): MosaicNode<T> | null {
  if (path.length === 0) {
    // removing root, return null
    return null;
  }

  const parentPath = path.slice(0, -1);
  const branchKey = path[path.length - 1] === "first" ? "first" : "second";

  return updateTree(tree, [
    {
      path: parentPath,
      spec: {
        $apply: (branchNode: any) => {
          const siblingKey = branchKey === "first" ? "second" : "first";
          return branchNode[siblingKey]; // collapse branch to sibling
        },
      },
    },
  ]);
}

export default function PanelLayout() {
  const [layout, setLayout] = useState<MosaicNode<ViewId>>({
    direction: "row",
    first: "a",
    second: {
      direction: "column",
      first: "b",
      second: "c",
    },
  });

  const [counter, setCounter] = useState(1);

  const addPanelAt = (path: MosaicPath, direction: "up" | "down" | "left" | "right") => {
  const newId = `new${counter}`;
  setCounter(counter + 1);

  // decide split axis
  const isRow = direction === "left" || direction === "right";
  const splitDirection: "row" | "column" = isRow ? "row" : "column";

  // decide order (before/after)
  const putNewFirst = direction === "up" || direction === "left";

  const newLayout = updateTree(layout, [
    {
      path,
      spec: {
        $apply: (oldNode) => ({
          direction: splitDirection,
          first: putNewFirst ? newId : oldNode,
          second: putNewFirst ? oldNode : newId,
        }),
      },
    },
  ]);

  setLayout(newLayout);
};

  const closePanelAt = (path: MosaicPath) => {
    const leaves = getLeaves(layout);
    if (leaves.length <= 1) return; // prevent removing last panel

    const newLayout = removeNode(layout, path);
    if (newLayout) setLayout(newLayout);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Mosaic
        renderTile={(id, path) => (
          <MosaicWindow
            path={path}
            draggable={false}
            title={
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0">
                            <Menu className="text-foreground"/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Set Panel</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => alert("Add panel clicked")}>
                                Set Map
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Add panel clicked")}>
                                Set Industry
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Close panel clicked")}>
                                Set Economics
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Add panel clicked")}>
                                Set Transact
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Add panel clicked")}>
                                Set Orpheus
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                    
                </DropdownMenu>
            }
            toolbarControls={[
              <Button variant="ghost" key="close" className="w-0 h-4 mr-2" onClick={() => closePanelAt(path)}>
                <X/>
              </Button>,
            ]}
          >
            <ContextMenu.Root>
                <ContextMenu.Trigger asChild>
                <div style={{ padding: "0rem", height: "100%", width: "100%" }}>
                    <MapOverlay/>
                </div>
                </ContextMenu.Trigger>

                <ContextMenu.Portal>
                <ContextMenu.Content
                    className="z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                    align="start"
                >
                    <ContextMenu.Label className="px-2 py-1.5 text-sm font-semibold">
                    Panel Actions
                    </ContextMenu.Label>
                    <ContextMenu.Item
                    className="px-2 py-1.5 text-sm outline-none hover:bg-accent cursor-pointer rounded-sm"
                    onClick={() => addPanelAt(path, "up")}
                    >
                    Add Panel Above
                    </ContextMenu.Item>
                    <ContextMenu.Item
                    className="px-2 py-1.5 text-sm outline-none hover:bg-accent cursor-pointer rounded-sm"
                    onClick={() => addPanelAt(path, "down")}
                    >
                    Add Panel Below
                    </ContextMenu.Item>
                    <ContextMenu.Item
                    className="px-2 py-1.5 text-sm outline-none hover:bg-accent cursor-pointer rounded-sm"
                    onClick={() => addPanelAt(path, "left")}
                    >
                    Add Panel Left
                    </ContextMenu.Item>
                    <ContextMenu.Item
                    className="px-2 py-1.5 text-sm outline-none hover:bg-accent cursor-pointer rounded-sm"
                    onClick={() => addPanelAt(path, "right")}
                    >
                    Add Panel Right
                    </ContextMenu.Item>
                </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
          </MosaicWindow>
        )}
        value={layout}
        onChange={(newLayout) => setLayout(newLayout!)}
      />
    </div>
  );
}
