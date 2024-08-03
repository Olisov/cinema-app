import React from 'react'

import './rating-ring.css'

function RaringRing({ rating }) {
  let ringColor = 'rating-ring--black'
  const genRating = +String(rating).slice(0, 4)

  if (genRating >= 7) ringColor = 'rating-ring--green'
  else if (genRating >= 5) ringColor = 'rating-ring--yellow'
  else if (genRating >= 3) ringColor = 'rating-ring--orange'
  else if (genRating >= 0) ringColor = 'rating-ring--red'

  return (
    <div className={`rating-ring rating-ring--margin ${ringColor}`}>
      <p className="general-rating">{!Number.isNaN(genRating) ? genRating : '-'}</p>
    </div>
  )
}

export default RaringRing
