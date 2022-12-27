import React from 'react'
import useSWR from 'swr'
import CommitCard from './commitCard';
// import constants from '../utils/constants'

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function CommitList() { 
    const { data, error, isLoading } = useSWR(`http://localhost:4000/commits?page=4`, fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <div>
            {data.map(commit => {
                return (
                    <div>
                        <CommitCard key={commit.sha} avatar={commit.avatar_url} authorName={commit.author.name} message={commit.message}/>
                    </div>
                )
            })}
            
        </div>
    )
}
