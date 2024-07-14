import React from 'react'
import { Flex, Layout } from 'antd'

import './cards-field.css'
import Card from '../card'

const { Content } = Layout

const layoutStyle = {
  //   borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(50% - 4px)',
  maxWidth: 'calc(50% - 4px)',
}

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
}

function CardsField() {
  return (
    <Flex gap="small" wrap>
      {/* <Layout style={layoutStyle}>
        <Content style={contentStyle}>Content</Content>
      </Layout> */}
      <Card />

      <Layout style={layoutStyle}>
        <Content style={contentStyle}>Content</Content>
      </Layout>

      <Layout style={layoutStyle}>
        <Content style={contentStyle}>Content</Content>
      </Layout>

      <Layout style={layoutStyle}>
        <Content style={contentStyle}>Content</Content>
      </Layout>
    </Flex>
  )
}

export default CardsField
