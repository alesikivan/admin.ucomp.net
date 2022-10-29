import { useState } from 'react'
import '../../assets/styles/css/particles/search.css'

function Search(props) {
  const [inputValue, setInputText] = useState('')

  function onChangeEvent(event) {
    const text = event.target.value
    props.onChangeHandler(text)

    setInputText(text)
  }

  function onClickEvent() {
    props.onClickHandler(inputValue)
  }

  function clearSearch() {
    setInputText('')
    props.onClickHandler('')
  }

  return <div className='page-search'>
    <input
      value={inputValue}
      onChange={onChangeEvent}
      placeholder={props.placeholder} 
      type='text' />
    
    <div className='clear'>
      <span 
        onClick={clearSearch}
        className={inputValue ? 'active' : ''}>
        &times;
      </span>
    </div>
    
    <button onClick={onClickEvent}>Find</button>
  </div>
}

export default Search
