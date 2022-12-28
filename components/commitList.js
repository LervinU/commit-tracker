import React, { useState, useRef } from 'react'
import useSWR from 'swr'
import CommitCard from './commitCard';
import SearchBar from './searchBar';
// import constants from '../utils/constants'

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function CommitList() { 
    const [page, setPage] = useState(1);
    const [author, setAuthor] = useState('LervinU');
    const [repo, setRepo] = useState('commit-tracker');
    const { data, error, isLoading } = useSWR(`http://localhost:4000/commits?page=${page}&perPage=10&author=${author}&repoName=${repo}`, fetcher);

    const handleNewerCommits = () => {
        if(page > 1) {
            setPage((currentPage) => currentPage - 1);
        }
    }

    const handleOlderCommits = () => { 
        setPage((currentPage) => currentPage + 1);
    }

    const onSearch = (ref) => {
        const repoUrl = ref.current.value;
        const repoUrlArr = repoUrl && repoUrl.split('/');
        setRepo(repoUrlArr[repoUrlArr.length - 1])
        setAuthor(repoUrlArr[repoUrlArr.length - 2])
    }

    if (error) return <div className="text-lg flex items-center justify-center h-screen">Failed to load</div>
    if (isLoading) return <div className="text-lg flex items-center justify-center h-screen">Loading...</div>
    if (data.length === 0) return <div className="text-lg flex items-center justify-center h-screen">No more commits</div>

    return (
        <div className="mt-8 mx-auto">
            <SearchBar onSearch={onSearch}/>
            <div>
            {data.map(commit => {
                return (
                    <div>
                        <CommitCard key={commit.sha} avatar={commit.avatar_url} authorName={commit.author.name} message={commit.message}/>
                    </div>
                )
            })}
            </div>
            <div className="flex items-center justify-center mb-8 mt-2">
                <button onClick={handleNewerCommits} className="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l">
                    Newer
                </button>
                <button onClick={handleOlderCommits} className="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-r">
                    Older
                </button>
            </div>
        </div>
    )
}
