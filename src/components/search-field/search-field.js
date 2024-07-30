import { React } from 'react'
import { debounce } from 'lodash'

import './search-field.css'

function onInput(value) {
  console.log(value.target.value)
}

// const debouncedInput = debounce(onInput, 750)

function SearchField(props) {
  const { searchValueChange } = props
  const debouncedInput = debounce(searchValueChange, 750)
  return <input className="searchInput searchInput--margin" onInput={debouncedInput} placeholder="Type to search..." />
}

export default SearchField
