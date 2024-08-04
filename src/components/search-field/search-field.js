import { React } from 'react'
import { debounce } from 'lodash'

import './search-field.css'

function SearchField(props) {
  const { searchValueChange, curValue } = props
  const debouncedInput = debounce(searchValueChange, 750)
  return (
    <input
      className="search-input search-input--margin"
      defaultValue={curValue}
      onInput={debouncedInput}
      placeholder="Type to search..."
    />
  )
}

export default SearchField
