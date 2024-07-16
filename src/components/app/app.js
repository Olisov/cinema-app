/* eslint-disable no-unused-vars */
import React from 'react'

import './app.css'
import CardsField from '../cards-field'

// const { Meta } = Card

// const style = { background: '#0092ff', padding: '8px 0' }

function App() {
  return (
    <div className="body body--center">
      <CardsField />
    </div>
  )
}

export default App

// function App() {
//   return (
//     <>
//       <Divider orientation="left">sub-element align center</Divider>
//       <Row justify="center">
//         <Col span={8}>
//           <Card
//             hoverable
//             style={{
//               width: 240,
//             }}
//             cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
//           >
//             <Meta title="Europe Street beat" description="www.instagram.com" />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <div style={style}>col-6</div>
//         </Col>
//       </Row>
//       <Row justify="center">
//         <Col span={8}>
//           <div style={style}>col-6</div>
//         </Col>
//         <Col span={8}>
//           <div style={style}>col-6</div>
//         </Col>
//       </Row>
//       <Row justify="center">
//         <Col span={8}>
//           <div style={style}>col-6</div>
//         </Col>
//         <Col span={8}>
//           <div style={style}>col-6</div>
//         </Col>
//       </Row>
//     </div>
//   )
// }
