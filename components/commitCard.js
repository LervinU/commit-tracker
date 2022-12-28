import React from 'react'

export default function CommitCard(props) {
    return (

        <div className="p-6 mb-4 max-w-2xl mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div className="shrink-0">
                <img className="h-12 w-12" src={props.avatar} alt="Profile picture"/>
            </div>
            <div>
                <div className="text-xl font-medium text-black">{props.authorName}</div>
                <p className="text-slate-500">{props.message}</p>
            </div>
        </div>

    )
}
