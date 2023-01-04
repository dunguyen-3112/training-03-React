import React from 'react'
import PropTypes from 'prop-types'
import '../base.sass'

import classes from './TextArea.module.sass'

function TextArea({ label }, ref) {

  const classList = ['form-group', classes['text-Area']]
  return (
    <label className={classList.join(' ')}>
      <span>{label}</span>
      <textarea cols="30" rows="5" ></textarea>
    </label>
  )
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
}

export default TextArea
