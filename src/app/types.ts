export interface PollForm {
    question: string // Which days of week you like most?
    options: string[] // ["Monday", "Tuesday", "Wednesday"]
    thumbnail: string // https://image.png
}

export interface Poll extends PollForm{
    id: number // 12
    results: number[] // [0,0,0,5,3,1]
    voted: boolean
}

export interface PollVote {
    id: number
    vote: number
}



export interface Voter {
    id: string // 0xF9SD789DF99...
    voted: number[] // [12]
}


