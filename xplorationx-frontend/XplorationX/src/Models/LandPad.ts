interface ImageSet {
    large: string[];
}

class LandPad {
    images: ImageSet;
    name: string;
    full_name: string;
    status: string;
    type: string;
    locality: string;
    region: string;
    latitude: number;
    longitude: number;
    landing_attempts: number;
    landing_successes: number;
    wikipedia: string;
    details: string;
    launches: string[];
    id: string;

    constructor(images: ImageSet,name: string,full_name: string,status: string,type: string,locality: string,region: string,latitude: number,longitude: number,landing_attempts: number,landing_successes: number,wikipedia: string,details: string,launches: string[],id: string) {
        this.images = images;
        this.name = name;
        this.full_name = full_name;
        this.status = status;
        this.type = type;
        this.locality = locality;
        this.region = region;
        this.latitude = latitude;
        this.longitude = longitude;
        this.landing_attempts = landing_attempts;
        this.landing_successes = landing_successes;
        this.wikipedia = wikipedia;
        this.details = details;
        this.id = id;
        this.launches = launches;
    }
}

export default LandPad;