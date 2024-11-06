export interface UserInterface {
    id: number, 
    email: string, 
    first_name: string,
    family_name: string,
    username: string
}

export interface bookSmall {
    id:number,
    title: string, 
    authors: string | null,
    image: string, 
    status: string,
    reading_progress: string | null
}

export const bookSmallEmpty:bookSmall = {
    id: 0,
    title: '', 
    authors: '',
    image: '', 
    status: '',
    reading_progress: ''
}

export interface bookExpanded {
    authors: string | null,
    booktype: string | null,
    categories: string | null,
    date_finish: string | null,
    date_start: string | null,
    description: string | null,
    id: number,
    image: string,
    isbn: string | null,
    language: string | null,
    pagecount: number | null,
    pagetype: string | null,
    publisher: string | null,
    reading_progress: number | null,
    score: number | null,
    status: string | null,
    title: string | null,
}

export const emptyBookExpanded: bookExpanded= {
    authors: null,
    booktype: null,
    categories: null,
    date_finish: null,
    date_start: null,
    description: null,
    id: 0,
    image: '',
    isbn:  null,
    language: null,
    pagecount: null,
    pagetype:  null,
    publisher:  null,
    reading_progress: null,
    score: null,
    status: null,
    title: null,
}