import React, { Component } from 'react'
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss'
import SECTIONS from './directory.data'
class Directory extends Component {
    constructor(){
        super();

        this.state = {
            sections: SECTIONS
        }
    }

    render(){
        return(
            <div className="directory-menu">
                {
                    this.state.sections.map(({id, ...otherSectionProps}) => (
                        <MenuItem key={id} {...otherSectionProps}/>
                    ))
                }
            </div>
        )
    }
}

export default Directory;