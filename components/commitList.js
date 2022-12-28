import React, { useState } from 'react'
import useSWR from 'swr'
import CommitCard from './commitCard';
// import constants from '../utils/constants'

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function CommitList() { 
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useSWR(`http://localhost:4000/commits?page=${page}&perPage=10`, fetcher);

    const handleNewerCommits = () => {
        if(page > 1) {
            setPage((currentPage) => currentPage - 1);
        }
    }

    const handleOlderCommits = () => { 
        setPage((currentPage) => currentPage + 1);
    }

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <div class="mt-8 mx-auto">
            {data.map(commit => {
                return (
                    <div>
                        <CommitCard key={commit.sha} avatar={commit.avatar_url} authorName={commit.author.name} message={commit.message}/>
                    </div>
                )
            })}
            <div class="flex items-center justify-center mb-8 mt-2">
                <button onClick={handleNewerCommits} class="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l">
                    Newer
                </button>
                <button onClick={handleOlderCommits} class="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-r">
                    Older
                </button>
            </div>
        </div>
    )
}
