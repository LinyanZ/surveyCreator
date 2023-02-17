import { ref } from "joi";
import React, { useRef, useEffect } from "react";
import DraggableListItem from "./draggableListItem";

// Prevent rapid reverse swapping
const buffer = 5;

export default function DraggableList({ items, setItems, itemComponent }) {
  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef(Array(items.length).fill({})).current;
  const setPosition = (i, offset) => (positions[i] = offset);
  const refs = useRef(Array(items.length)).current;

  const findIndex = (mouseY) => {
    const n = positions.length;

    // mouse position is above all items, return the first item
    if (mouseY <= positions[0].top) return 0;

    // mouse position is below all items, return the last item
    if (mouseY >= positions[n - 1].bottom) return n - 1;

    for (let i = 0; i < n; i++) {
      const { top, bottom } = positions[i];
      const center = (top + bottom) / 2;
      if (mouseY >= center - buffer && mouseY < center + buffer) return i;
    }

    return null;
  };

  const move = (items, fromIndex, toIndex) => {
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
  const moveItem = (i, mouseY) => {
    // update position information of all children
    for (let j = 0; j < positions.length; j++) {
      setPosition(j, {
        height: refs[j].offsetHeight,
        top: refs[j].offsetTop,
        bottom: refs[j].offsetTop + refs[j].offsetHeight,
      });
    }

    const targetIndex = findIndex(mouseY);
    if (targetIndex !== null && targetIndex !== i)
      setItems(move(items, i, targetIndex));
  };

  return (
    <ul className="list-none">
      {items.map((item, index) => (
        <DraggableListItem
          key={item.uuid}
          index={index}
          moveItem={moveItem}
          ref={(ref) => (refs[index] = ref)}
        >
          {itemComponent(item, index)}
        </DraggableListItem>
      ))}
    </ul>
  );
}
