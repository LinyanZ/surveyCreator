import React, { useEffect, useRef } from "react";
import DraggableListItem from "./draggableListItem";

export default function DraggableList({ items, setItems, itemComponent }) {
  // collect an array of height and position data for all of this component's
  // `items` children, used in calculations to decide when a dragging
  // `item` should swap places with its siblings.
  const positions = useRef(Array(items.length).fill({}));
  const setPosition = (i, offset) => (positions.current[i] = offset);
  const refs = useRef(Array(items.length));

  useEffect(() => {
    // update positions length when items length changes
    positions.current = Array(items.length).fill({});
  }, [items.length]);

  const findIndex = (mouseY, current) => {
    const n = positions.current.length;
    const currentCenter =
      positions.current[current].top + positions.current[current].height / 2;

    const movingUp = mouseY - currentCenter < 0;

    if (movingUp) {
      if (current === 0) return 0;
      const prevPosition = positions.current[current - 1];
      const prevCenter = prevPosition.top + prevPosition.height / 2;

      if (mouseY < prevCenter) return current - 1;
    } else {
      if (current === n - 1) return n - 1;
      const nextPosition = positions.current[current + 1];
      const nextCenter = nextPosition.top + nextPosition.height / 2;

      if (mouseY > nextCenter) return current + 1;
    }

    return current;
  };

  const reorder = (items, fromIndex, toIndex) => {
    // reorder items array
    const newItems = [...items];
    const itemToMove = newItems[fromIndex];
    newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, itemToMove);

    // reorder refs
    const tmp = refs.current[fromIndex];
    refs.current[fromIndex] = refs.current[toIndex];
    refs.current[toIndex] = tmp;

    return newItems;
  };

  // find the ideal index for a dragging item based on its position in the array, and the current mouse position.
  // if it's different to its current index, we swap this item with that sibling.
  const reorderItem = (mouseY, current) => {
    // update position information of all children
    for (let j = 0; j < positions.current.length; j++) {
      setPosition(j, {
        height: refs.current[j].offsetHeight,
        top: refs.current[j].offsetTop,
        bottom: refs.current[j].offsetTop + refs.current[j].offsetHeight,
      });
    }

    const targetIndex = findIndex(mouseY, current);
    if (targetIndex !== current) setItems(reorder(items, current, targetIndex));
  };

  return (
    <ul className="list-none">
      {items.map((item, index) => (
        <DraggableListItem
          key={`${item._id} ${items.length}`}
          index={index}
          reorderItem={reorderItem}
          ref={(ref) => (refs.current[index] = ref)}
        >
          {itemComponent(item, index)}
        </DraggableListItem>
      ))}
    </ul>
  );
}
