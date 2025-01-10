## Event Selector

This is a multi-select dropdown component that allows users to select multiple events.

* Users can select none, one, or multiple events.
* When the form is submitted, an alert is shown with the selected event ids. This can be used to make an API call for the selected events.
* Added a search input to filter the options. This could be shown conditionally based on the number of options.

User experience considerations:
* Clear label for the dropdown.
* Placeholder text for the dropdown.
* Keyboard navigation for the dropdown.
* Scannable list of options (sufficient spacing between options).
* Search input has been added to filter options. Can be useful in situations where there are hundreds of options.
* Selected options can all be removed at once or individually.
* Clicking outside of the dropdown component closes it.
