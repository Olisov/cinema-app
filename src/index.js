import React, { useState } from 'react'
import { DatePicker, message } from 'antd'
import { createRoot } from 'react-dom/client'

import './index.css'

function App() {
  const [date, setDate] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()
  const handleChange = (value) => {
    messageApi.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`)
    setDate(value)
  }
  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <DatePicker onChange={handleChange} />
      <div style={{ marginTop: 16 }}>Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}</div>
      {contextHolder}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
