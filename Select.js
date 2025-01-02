import React from 'react'
import { Form } from 'react-bootstrap'

function Select(props) {
    const { value="", selectedValue, onChange} = props
    // console.log(value)
  return (
    <div className="flex justify-center items-center m-4">
      <div className="w-64">
        <select
          id="userRole"
          className="w-full border rounded-lg px-4 py-2 text-gray-700"
          value={selectedValue}
          onChange={onChange}
        >
          <option value="">
            Select User role
          </option>
          {value.map((option) => (
            <option
             key={option.RoleName}
            value={option.RoleName}
            >
              {option.RoleName}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Select
