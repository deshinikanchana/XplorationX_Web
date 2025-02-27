interface Images {
    large: string[];
}

class LaunchPad {
    images: Images;
    name: string;
    full_name: string;
    locality: string;
    region: string;
    latitude: number;
    longitude: number;
    launch_attempts: number;
    launch_successes: number;
    rockets: string[];
    timezone: string;
    launches: string[];
    status: string;
    details: string;
    id: string;

    constructor( images: Images,name: string,full_name: string,locality: string,region: string,latitude: number,longitude: number,launch_attempts: number,launch_successes: number,rockets: string[],timezone: string,launches: string[],status: string,details: string,id: string) {
        this.images = images;
        this.name = name;
        this.full_name = full_name;
        this.locality = locality;
        this.region = region;
        this.latitude = latitude;
        this.longitude = longitude;
        this.launch_attempts = launch_attempts;
        this.launch_successes = launch_successes;
        this.rockets = rockets;
        this.timezone = timezone;
        this.launches = launches;
        this.status = status;
        this.details = details;
        this.id = id;

    }
}

export default LaunchPad;