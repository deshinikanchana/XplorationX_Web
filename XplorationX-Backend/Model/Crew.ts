class Crew {
    name: string;
    agency: string;
    image: string;
    wikipedia: string;
    launches: string [];
    status: string;
    id: string;

    constructor(name: string,agency: string,image: string,wikipedia: string,launches: string [],status: string,id: string) {
        this.name = name;
        this.agency = agency;
        this.image = image;
        this.wikipedia = wikipedia;
        this.launches = launches;
        this.status = status;
        this.id = id;
    }
}

export default Crew;