export interface Poll {
    id: number // 12
    question: string // Which days of week you like most?
    results: number[] // [0,0,0,5,3,1]
    options: string[] // ["Monday", "Tuesday", "Wednesday"]
    thumbnail: string // https://image.png
}

export interface Voter {
    id: string // 0xF9SD789DF99...
    voted: number[] // [12]
}
