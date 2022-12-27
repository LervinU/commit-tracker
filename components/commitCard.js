import React from 'react'

export default function CommitCard(props) {
    return (

        <div class="p-6 mb-4 max-w-2xl mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div class="shrink-0">
                <img class="h-12 w-12" src={props.avatar} alt="Profile picture"/>
            </div>
            <div>
                <div class="text-xl font-medium text-black">{props.authorName}</div>
                <p class="text-slate-500">{props.message}</p>
            </div>
        </div>

    )
}
