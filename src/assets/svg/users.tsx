// React Imports
import type { SVGAttributes } from 'react'

const Users = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <g clipPath='url(#clip0_28204_51553)'>
        <circle cx='12' cy='4.875' r='4.75' fill='var(--primary)' />
        <path
          opacity='0.5'
          d='M21.5 18.5312C21.5 21.4825 21.5 23.875 12 23.875C2.5 23.875 2.5 21.4825 2.5 18.5312C2.5 15.58 6.75329 13.1875 12 13.1875C17.2467 13.1875 21.5 15.58 21.5 18.5312Z'
          fill='var(--primary)'
        />
      </g>
    </svg>
  )
}

export default Users
