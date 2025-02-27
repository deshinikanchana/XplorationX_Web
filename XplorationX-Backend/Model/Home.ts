interface Headquarters {
    address: string;
    city: string;
    state: string;
}

interface Links {
    website: string;
    flickr: string;
    twitter: string;
    elon_twitter: string;
}

class Home {
    headquarters: Headquarters;
    links: Links;
    name: string;
    founder: string;
    founded: number;
    employees: number;
    vehicles: number;
    launch_sites: number;
    test_sites: number;
    ceo: string;
    cto: string;
    coo: string;
    cto_propulsion: string;
    valuation: number;
    summary: string;
    id: string;

    constructor(headquarters: Headquarters,links: Links,name: string,founder: string,founded: number,employees: number,vehicles: number,launch_sites: number,test_sites: number,ceo: string,cto: string,coo: string,cto_propulsion: string,valuation: number,summary: string,id: string) {
        this.headquarters = headquarters;
        this.links = links;
        this.name = name;
        this.founder = founder;
        this.founded = founded;
        this.employees = employees;
        this.vehicles = vehicles;
        this.launch_sites = launch_sites;
        this.test_sites = test_sites;
        this.ceo = ceo;
        this.cto = cto;
        this.coo = coo;
        this.cto_propulsion = cto_propulsion;
        this.valuation = valuation;
        this.summary = summary;
        this.id = id;
    }
}

export default Home;