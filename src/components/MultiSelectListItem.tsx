import clsx from "clsx";

type MultiSelectListItemProps = {
  focusedIndex: number;
  index: number;
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: React.MouseEventHandler<HTMLLIElement>;
}

const MultiSelectListItem = (props: MultiSelectListItemProps) => {
  const isFocused = props.focusedIndex === props.index;

  return (
    <li
      key={props.id}
      role="option"
      aria-selected={props.isSelected}
      value={props.id}
      tabIndex={isFocused ? 1 : -1}
      data-option-index={props.index}
      className={clsx(
        "cursor-pointer p-2 rounded-md hover:bg-gray-100 hover:outline-none",
        isFocused && "bg-gray-100 outline outline-2 outline-gray-400",
      )}
      onClick={props.onSelect}
    >
      {props.label}
    </li>
  )
}

export default MultiSelectListItem;