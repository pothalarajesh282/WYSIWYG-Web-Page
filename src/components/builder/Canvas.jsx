import React from "react";
import { useDrop } from "react-dnd";
import CanvasNode from "./CanvasNode.jsx";
import { ItemTypes } from "../../components/common/constants.js";

export default function Canvas({
  nodes,
  addNodeAt,
  moveNode,
  updateNodeProps,
  selectedId,
  setSelectedId,
  preview,
  canvasBg,
  theme,
  editingId,
  setEditingId,
}) {
  const ref = React.useRef(null);

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.TOOL],
      drop: (item, monitor) => {
        const client = monitor.getClientOffset();
        if (!ref.current || !client) return;
        const bounds = ref.current.getBoundingClientRect();
        const x = Math.round(client.x - bounds.left);
        const y = Math.round(client.y - bounds.top);
        addNodeAt(item.kind, x, y);
      },
    }),
    [addNodeAt]
  );

  drop(ref);

  return (
    <main className="col-span-7 rounded-2xl p-3">
      <div
        ref={ref}
        onClick={() => setSelectedId(null)}
        className="relative h-full w-full overflow-hidden rounded-2xl border"
        style={{
          backgroundColor: canvasBg,
          borderColor: theme === "dark" ? "rgba(255,255,255,0.06)" : undefined,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              theme === "dark"
                ? "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)"
                : "linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {nodes.map((n) => (
          <CanvasNode
            key={n.id}
            node={n}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            moveNode={moveNode}
            updateNodeProps={updateNodeProps}
            preview={preview}
            theme={theme}
            editingId={editingId}
            setEditingId={setEditingId}
            
          />
        ))}
      </div>
    </main>
  );
}
