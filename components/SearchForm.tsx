import React from 'react'
import Form from "next/form"

import { Search } from 'lucide-react';
import SearchFormReset from '@/components/SearchFormReset';

const SearchForm=({query}:{query?:string})=>{


 
    return(
        <Form action="/" scroll={false} className='max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center '>
            <input 
            name='query'
            defaultValue={query}
            className='flex-1 font-bold placeholder:font-bold placeholder:text-black w-full h-auto outline-none bg-white gap-5'
            placeholder='Search Startups'
            />

            <div className='flex gap-2'>
                {query && <SearchFormReset/>}

                <button type='submit' className='size-[50px] rounded-full bg-black text-white flex justify-center items-center '>
                    <Search className='size-5'/>
                </button>
            </div>
        </Form>
    )
}

export default SearchForm