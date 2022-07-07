export interface iProfesional {
    _id?: string;
    avatar: string;
    name: string;
    profesion: string;
    info: {
        description: string;
        price: number;
        img: string;
        video: string;
    };
}

export interface iUser {
    _id?: string;
    avatar: string;
    userName: string;
    email: string;
    passwd: string;
    favorites: iProfesional[];
}

export interface iReview {
    _id?: string;
    worker: iProfesional;
    client: iUser;
    date: string;
    reviews: [
        {
            img: string[];
            video: string[];
            comment: string;
            score: number;
        }
    ];
}
