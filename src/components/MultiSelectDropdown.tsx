import { useEffect, useState } from "react";
import clsx from "clsx";
import Fuse from 'fuse.js'

import arrowDown from "../assets/arrow-down.svg";
import xMark from "../assets/x-mark.svg";
import { SelectedEvent } from "../events";
import SelectedEvents from "./SelectedEvents";
import MultiSelectListItem from "./MultiSelectListItem";

/**
 * TODO:
 * - Add click away functionality.
 * - Make keyboard navigation work nicely with hover functionality.
 * - Add search input.
 * - Search input should filter options as user types.
 */

const fuseOptions = {
  keys: ['label'],
}

type MultiSelectDropdownProps<Option extends { id: string; label: string }> = {
  id: string;
  label: string;
  options: Option[];
  selected: SelectedEvent[]
  setSelected: React.Dispatch<React.SetStateAction<SelectedEvent[]>>;
}

function MultiSelectDropdown<Option extends { id: string; label: string }>(props: MultiSelectDropdownProps<Option>) {
  const fuse = new Fuse(props.options, fuseOptions);

  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [searchInput, setSearchInput] = useState("");

  const filteredSearchResults = fuse.search(searchInput);

  useEffect(() => {
    if (!open) {
      setFocusedIndex(-1);
    };
  }, [open]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  }

  const isSelected = (id: string) => props.selected.some((event) => event.id === id);

  const handleSelect = (id: string, label: string) => (event?: React.MouseEvent<HTMLLIElement>) => {
    event?.preventDefault();

    if (isSelected(id)) {
      props.setSelected((prev) => prev.filter((event) => event.id !== id));
    } else {
      props.setSelected((prev) => [...prev, { id, label }]);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!open) return;

    switch (event.key) {
      case "Escape":
        if (focusedIndex >= 0) {
          setFocusedIndex(-1);
          break
        }

        setOpen(false);
        break;
      case "ArrowDown":
        setFocusedIndex(prev => (prev < props.options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : props.options.length - 1));
        break;
      case "Enter":
        event.preventDefault();

        if (focusedIndex >= 0) {
          const option = props.options[focusedIndex];
          handleSelect(option.id, option.label)();
        }
        break;
    }
  };

  const handleClear = () => {
    props.setSelected([]);
  }

  const handleRemove = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    props.setSelected((prev) => prev.filter((event) => event.id !== id));
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }

  return (
    <div className="relative w-fit min-w-80">
      <div className="space-y-1 w-full">
        <label htmlFor={props.id} className="font-medium">{props.label}</label>
        <button
          id={props.id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className="w-full flex items-center justify-between border border-gray-300 rounded-md p-2 cursor-pointer outline-gray-400"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}>
          <SelectedEvents selected={props.selected} onRemove={handleRemove} />
          <span className="flex items-center pl-6 gap-x-2">
            {props.selected.length > 0 && (
              <span role="button" className="icon-button" onClick={handleClear}>
                <img src={xMark} alt="Clear all" className="w-4 h-4" />
              </span>
            )}
            <span className="icon-button" aria-hidden="true">
              <img src={arrowDown} alt={open ? "Close" : "Open"} className={clsx("w-4 h-4", open && "rotate-180")} />
            </span>
          </span>
        </button>
      </div>
      <ul
        role="listbox"
        aria-multiselectable={true}
        tabIndex={-1}
        className={clsx(
          "select-dropdown",
          open ? "block" : "hidden",
          props.selected.length > 0 && "contains-selected",
        )}
      >
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearch}
        />
        {filteredSearchResults.length > 0 ? filteredSearchResults.map((filteredResult, index) => (
          <MultiSelectListItem
            key={filteredResult.item.id}
            index={index}
            id={filteredResult.item.id}
            label={filteredResult.item.label}
            isSelected={isSelected(filteredResult.item.id)}
            onSelect={handleSelect(filteredResult.item.id, filteredResult.item.label)}
            focusedIndex={focusedIndex}
          />
        )) : props.options.map((option, index) => (
          <MultiSelectListItem
            key={option.id}
            index={index}
            id={option.id}
            label={option.label}
            isSelected={isSelected(option.id)}
            onSelect={handleSelect(option.id, option.label)}
            focusedIndex={focusedIndex}
          />
        ))}
      </ul>
    </div>
  )
}

export default MultiSelectDropdown;