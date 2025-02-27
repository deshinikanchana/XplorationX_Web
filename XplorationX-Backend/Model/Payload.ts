interface Dragon {
    capsule: string | null;
    mass_returned_kg: number | null;
    mass_returned_lbs: number | null;
    flight_time_sec: number | null;
    manifest: string | null;
    water_landing: boolean | null;
    land_landing: boolean | null;
}

class Payload {
    dragon: Dragon;
    name: string;
    type: string;
    reused: boolean;
    launch: string;
    customers: string[];
    norad_ids: string[];
    nationalities: string[];
    manufacturers: string[];
    mass_kg: number;
    mass_lbs: number;
    orbit: string;
    reference_system: string;
    regime: string;
    longitude: number | null;
    semi_major_axis_km: number | null;
    eccentricity: number | null;
    periapsis_km: number;
    apoapsis_km: number;
    inclination_deg: number;
    period_min: number | null;
    lifespan_years: number | null;
    epoch: string | null;
    mean_motion: number | null;
    raan: number | null;
    arg_of_pericenter: number | null;
    mean_anomaly: number | null;
    id: string;

    constructor(    dragon: Dragon,name: string,type: string,reused: boolean,launch: string,customers: string[],norad_ids: string[],nationalities: string[],manufacturers: string[],mass_kg: number,mass_lbs: number,orbit: string,reference_system: string,regime: string,longitude: number | null,semi_major_axis_km: number | null,eccentricity: number | null,periapsis_km: number,apoapsis_km: number,inclination_deg: number,period_min: number | null,lifespan_years: number | null,epoch: string | null,mean_motion: number | null,raan: number | null,arg_of_pericenter: number | null,mean_anomaly: number | null,id: string) {
        this.dragon = dragon;
        this.name = name;
        this.type = type;
        this.reused = reused;
        this.launch = launch;
        this.customers = customers;
        this.norad_ids = norad_ids;
        this.nationalities = nationalities;
        this.manufacturers = manufacturers;
        this.mass_kg = mass_kg;
        this.mass_lbs = mass_lbs;
        this.orbit = orbit;
        this.reference_system = reference_system;
        this.regime = regime;
        this.longitude = longitude;
        this.semi_major_axis_km = semi_major_axis_km;
        this.eccentricity = eccentricity;
        this.periapsis_km = periapsis_km;
        this.apoapsis_km = apoapsis_km;
        this.inclination_deg = inclination_deg;
        this.period_min = period_min;
        this.lifespan_years = lifespan_years;
        this.epoch = epoch;
        this.mean_motion = mean_motion;
        this.raan = raan;
        this.arg_of_pericenter = arg_of_pericenter;
        this.mean_anomaly = mean_anomaly;
        this.id = id;
    }
}

export default Payload;
