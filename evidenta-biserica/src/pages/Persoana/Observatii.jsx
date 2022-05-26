import { useState, useEffect } from 'react'

function Observatii({ data, dataUpdated }) {
  const [input, setInput] = useState('')

  useEffect(() => {
    dataUpdated({
      observations: input
    })
  }, [input])

  useEffect(() => {
    setInput(data?.observations || '');
  }, [data])



  return (
    <div>
      <h3>Observatii</h3>
      <textarea className='observatii'
        onChange={(e) => setInput(e.target.value)}>
        {input}
      </textarea>
    </div>
  )
}

export default Observatii;
