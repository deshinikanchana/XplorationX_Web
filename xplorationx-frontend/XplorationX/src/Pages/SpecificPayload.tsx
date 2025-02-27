import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useEffect} from "react";
import {getPayloadById} from "../Reducers/payLoad-reducer.ts";
import {useParams} from "react-router";
import LoadingState from "./Loading.tsx";
import {Link} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/16/solid";

export default function SpecificPayload() {

    const dispatch = useDispatch<AppDispatch>();
    const payloads = useSelector((state:RootState) => state.payload.singlePayload);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPayloadById(id));
    },[id])

    return (
        <>
            {!payloads ? (
                <LoadingState />
            ) : (
                <>
                    <section className="max-width py-28 lg:pt-40 flex flex-col justify-center align-center">
                        <article className = "bg-[#8a8a8a30] self-center w-fit px-20 py-4 rounded-[5%] flex flex-col items-left justify-center">
                            <h2 className="heading-inner">
                                {payloads.name}<br/> <span className="text-lg">{payloads.type}</span>
                            </h2>
                            <div className="flex gap-20">
                            <div>
                            <ul className="text-base text-white mt-2">
                                <li>Orbit: <span className="text-[#000000] flex flex-col pl-7">{payloads.orbit}</span></li>
                                <li>Reference System: <span className="text-[#000000] flex flex-col pl-7">{payloads.reference_system}</span></li>
                                <li>Regime : <span className="text-[#000000] flex flex-col pl-7">{payloads.regime ?? '-'}</span></li>
                                <li>Reused: {payloads.reused ? (
                                    <span className="flex flex-col pl-7 font-bold text-[#000000]">Yes</span>
                                ) : (
                                    <span className="flex flex-col pl-7 font-bold text-[#000000]">No</span>
                                )}</li>

                                <li>Mass (kg): <span className="text-[#000000] flex flex-col pl-7">{payloads.mass_kg ?? '-'}</span></li>
                                <li>Mass (lbs): <span className="text-[#000000] flex flex-col pl-7">{payloads.mass_lbs ?? '-'}</span></li>
                                <li>Longitude:<span className="text-[#000000] flex flex-col pl-7">{payloads.longitude ?? '-'}</span></li>
                                <li>Semi Major Axis km: <span className="text-[#000000] flex flex-col pl-7">{payloads.semi_major_axis_km ?? '-'}</span></li>
                                <li>Eccentricity:<span className="text-[#000000] flex flex-col pl-7">{payloads.eccentricity ?? '-'}</span></li>
                                <li>Periapsis km:<span className="text-[#000000] flex flex-col pl-7">{payloads.periapsis_km ?? '-'}</span></li>
                                <li>Apoapsis km:<span className="text-[#000000] flex flex-col pl-7">{payloads.apoapsis_km ?? '-'}</span></li>
                                <li>Inclination Degrees:<span className="text-[#000000] flex flex-col pl-7">{payloads.inclination_deg ?? '-'}</span></li>
                            </ul>
                            </div>
                            <div>
                            <ul className="text-base text-white mt-2">
                                <li>Period Min: <span className="text-[#000000] flex flex-col pl-7">{payloads.period_min ?? '-'}</span></li>
                                <li>Lifespan Years: <span className="text-[#000000] flex flex-col pl-7">{payloads.lifespan_years ?? '-'}</span></li>
                                <li>Epoch:<span className="text-[#000000] flex flex-col pl-7">{payloads.epoch ?? '-'}</span></li>
                                <li>Mean Motion:<span className="text-[#000000] flex flex-col pl-7">{payloads.mean_motion ?? '-'}</span></li>
                                <li>Mean Anomaly:<span className="text-[#000000] flex flex-col pl-7">{payloads.mean_anomaly ?? '-'}</span></li>
                                <li>Raan:<span className="text-[#000000] flex flex-col pl-7">{payloads.raan ?? '-'}</span></li>
                                <li>Arg. Of Pericenter:<span className="text-[#000000] flex flex-col pl-7">{payloads.arg_of_pericenter ?? '-'}</span></li>

                            </ul>

                            <h3 className="text-white font-bold text-base mt-2">
                                Customers:
                            </h3>
                            <ul className="text-[#000000] pl-7">
                                {payloads.customers.map((customer, index) => (
                                    <li key={index}>{customer}</li>
                                ))}
                            </ul>

                            <h3 className="text-white font-bold text-base mt-2">
                                Manufacturers:
                            </h3>
                            <ul className="text-[#000000] pl-7">
                                {payloads.manufacturers.map((manufacturer, index) => (
                                    <li key={index}>{manufacturer}</li>
                                ))}
                            </ul>

                            <h3 className="text-white font-bold text-base mt-2">
                                Countries:
                            </h3>
                            <ul className="text-[#000000] pl-7">
                                {payloads.nationalities.map((nationality, index) => (
                                    <li key={index}>{nationality}</li>
                                ))}
                            </ul>
                            </div>
                            </div>

                            <ul className="flex items-center mt-5">
                                <li>
                                    <Link to="/payloads" className="flex items-center space-x-2 text-white hover:text-lg">
                                        <ArrowLeftIcon className="w-6 h-6" />
                                        <span>Go Back</span>
                                    </Link>
                                </li>
                            </ul>
                        </article>
                    </section>
                </>
            )}
        </>
)
}