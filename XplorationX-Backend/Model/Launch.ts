interface Fairings {
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ships: string[];
}

interface Links {
    patch: {
        small: string;
        large: string;
    };
    reddit: {
        campaign: string | null;
        launch: string | null;
        media: string | null;
        recovery: string | null;
    };
    flickr: {
        small: string[];
        original: string[];
    };
    presskit: string | null;
    webcast: string;
    youtube_id: string;
    article: string;
    wikipedia: string;
}

interface Failure {
    time: number;
    altitude: number | null;
    reason: string;
}

interface Core {
    core: string;
    flight: number;
    gridfins: boolean;
    legs: boolean;
    reused: boolean;
    landing_attempt: boolean;
    landing_success: boolean | null;
    landing_type: string | null;
    landpad: string | null;
}

interface Payload {
    [key: string]: string;
}

class Launch {
    fairings: Fairings;
    links: Links;
    static_fire_date_utc: string;
    static_fire_date_unix: number;
    net: boolean;
    window: number;
    rocket: string;
    success: boolean;
    failures: Failure[];
    details: string;
    crew: string[];
    ships: string[];
    capsules: string[];
    payloads: Payload[];
    launchpad: string;
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: string;
    upcoming: boolean;
    cores: Core[];
    auto_update: boolean;
    tbd: boolean;
    launch_library_id: string | null;
    id: string;

    constructor(fairings: Fairings,links: Links,static_fire_date_utc: string,static_fire_date_unix: number,net: boolean,window: number,rocket: string,success: boolean,failures: Failure[],details: string,crew: string[],ships: string[],capsules: string[],payloads: Payload[],launchpad: string,flight_number: number,name: string,date_utc: string,date_unix: number,date_local: string,date_precision: string,upcoming: boolean,cores: Core[],auto_update: boolean,tbd: boolean,launch_library_id: string | null,id: string) {
        this.fairings = fairings;
        this.links = links;
        this.static_fire_date_utc = static_fire_date_utc;
        this.static_fire_date_unix = static_fire_date_unix;
        this.net = net;
        this.window = window;
        this.rocket = rocket;
        this.success = success;
        this.failures = failures;
        this.details = details;
        this.crew = crew;
        this.ships = ships;
        this.capsules = capsules;
        this.payloads = payloads;
        this.launchpad = launchpad;
        this.flight_number = flight_number;
        this.name = name;
        this.date_utc = date_utc;
        this.date_unix = date_unix;
        this.date_local = date_local;
        this.date_precision = date_precision;
        this.upcoming = upcoming;
        this.cores = cores;
        this.auto_update = auto_update;
        this.tbd = tbd;
        this.launch_library_id = launch_library_id;
        this.id = id;
    }
}

export default Launch;