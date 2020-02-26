import React from 'react'
import EstateItem from './EstateItem'

const EstatesList = (props) => {
            
    if (props.items.length === 0) {
        return <p>There is no estates here</p> 
    }
            
    
    return ( 
        <div>
            estates list
            {props.items.map( item => 
                <EstateItem key={item.id} 
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    address={item.address}
                    location={item.location}
                    creator={item.creator}
                />
            )}
        </div>
     );
}
 
export default EstatesList;