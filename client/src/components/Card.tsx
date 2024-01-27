import React from 'react'

export default function Card({items}: any) {
    console.log(items);
    
  return (
    <div className='p-4 border border-solid border-black'>
        <div className='flex flex-col items-center justify-between'>
            {
                items.billItems.map((item: any) => (
                    <span key={item._id} className='flex items-center justify-between'>
                        <p>
                        {item.name}
                        </p>
                        <p>
                        {item.amount}
                        </p>
                    </span>
                ))
            }
        </div>
        <span>
            Total: {items.amount}
        </span>
    </div>
  )
}
