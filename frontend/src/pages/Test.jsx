import React from 'react'
import { faker } from '@faker-js/faker';



const Test = () => {
  const products = [...Array(20)].map(() => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(100, 200, 0),
    img: faker.image.food(1234, 2345),
    desc: faker.commerce.productDescription(),
  }))
  console.log(products)
  return (
    <div>

    </div>
  )
}

export default Test