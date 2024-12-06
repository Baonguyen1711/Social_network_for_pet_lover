import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import clsx from 'clsx'
import style from './SearchBar.module.css'

interface SearchBarProps {
    placeHolderString: string;
}

const SearchBar: React.FC<SearchBarProps>= ({ placeHolderString }) => {
    return (
        <div className={style.container}>
            <SearchIcon className={clsx(style.searchicon)}/>
            <input 
                type="text"
                placeholder={placeHolderString}
                className={clsx(style.inputText)}
            />
        </div>
    );
}


export default SearchBar
