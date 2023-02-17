import React, { useRef } from "react";
import DraggableListItem from "./draggableListItem";

export default function DraggableList({ items, setItems, itemComponent }) {
  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef(Array(items.length).fill({})).current;
  const setPosition = (i, offset) => (positions[i] = offset);
  const refs = useRef(Array(items.length)).current;

  const findIndex = (mouseY, current) => {
    const n = positions.length;
    const currentCenter =
      positions[current].top + positions[current].height / 2;

    const movingUp = mouseY - currentCenter < 0;

    if (movingUp) {
      if (current === 0) return 0;
      const prevPosition = positions[current - 1];
      const prevCenter = prevPosition.top + prevPosition.height / 2;

      if (mouseY < prevCenter) return current - 1;
    } else {
      if (current === n - 1) return n - 1;
      const nextPosition = positions[current + 1];
      const nextCenter = nextPosition.top + nextPosition.height / 2;

      if (mouseY > nextCenter) return current + 1;
    }

    return current;
  };

  const reorder = (items, fromIndex, toIndex) => {
    const newItems = [...items];
    const itemToMove = newItems[fromIndex];
    newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, itemToMove);

    const tmp = refs[fromIndex];
    refs[fromIndex] = refs[toIndex];
    refs[toIndex] = tmp;

    return newItems;
  };

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const reorderItem = (mouseY, current) => {
    // update position information of all children
    for (let j = 0; j < positions.length; j++) {
      setPosition(j, {
        height: refs[j].offsetHeight,
        top: refs[j].offsetTop,
        bottom: refs[j].offsetTop + refs[j].offsetHeight,
      });
    }

    const targetIndex = findIndex(mouseY, current);
    if (targetIndex !== current) setItems(reorder(items, current, targetIndex));
  };

  return (
    <ul className="list-none">
      {items.map((item, index) => (
        <DraggableListItem
          key={item._id}
          index={index}
          reorderItem={reorderItem}
          ref={(ref) => (refs[index] = ref)}
        >
          {itemComponent(item, index)}
        </DraggableListItem>
      ))}
    </ul>
  );
}
