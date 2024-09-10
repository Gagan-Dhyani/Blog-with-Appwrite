import React, { useId } from 'react'

function Select({
    options,
    label,
    className='',
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''>
        <select ref={ref} 
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-white outline-none focus:bg-gray-500 duration-300 border border-gray-200 w-full ${className}` }
        {...props}
        >
            {options?.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
        </label>}
    </div>
  )
}

export default React.forwardRef(Select)
