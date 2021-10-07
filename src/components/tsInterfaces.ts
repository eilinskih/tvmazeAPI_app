export interface IMovieItem {
    id: number,
    url: string,
    name: string,
    type: string,
    language: string,
    genres: string[],
    status: string,
    isFavourite: boolean,
    runtime: number,
    averageRuntime: number,
    premiered:string,
    ended: string,
    officialSite: string,
    schedule: {time: string, days: string[]},
    rating: {average: number},
    weight: number,
    network: {
        id: number,
        name: string,
        country: {
            name: string,
            code: string,
            timezone: string
        }
    },
    webChannel: null |string,
    dvdCountry: null |string,
    externals: {
        tvrage: number,
        thetvdb: number,
        imdb: string
    },
    image: {
        medium: string,
        original: string
    },
    summary: string,
    updated: number,
    _links: {
        self: {href: string},
        previousepisode: {href: string}
    }
}

export interface ISorts {
    genre: string,
    lang: string
}