import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useParams} from "react-router";
import {useEffect} from "react";
import {getLaunchById} from "../Reducers/launch-reducer.ts";
import {Link} from "react-router-dom";
import LoadingState from "./Loading.tsx";
import { format } from "date-fns"
import {ArrowLeftIcon} from "@heroicons/react/16/solid";

export default function SpecificLaunch() {
    const dispatch = useDispatch<AppDispatch>();
    const singleLaunch = useSelector((state:RootState)=>state.launch.singleLaunch);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getLaunchById(id))
    },[id])

    return (
        <>
            {!singleLaunch ? (
                <LoadingState />
            ) : (
                <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
                    <article>
                        <img src={singleLaunch.links.patch.large} alt={singleLaunch.name} />
                    </article>

                    <article className="bg-[#8a8a8a30] px-10 py-4 rounded-[5%]">
                        <h1 className="heading-inner">{singleLaunch.name}</h1>
                        <h2 className="text-white text-xl mb-5 font-bold">
                            Launch Date:{" "}
                            {format(new Date(singleLaunch.date_utc), "dd MMMM yyyy")},{" "}
                            {singleLaunch.success ? (
                                <span className="text-black font-bold text-sm bg-green-500 p-3 p-1 rounded-[10%]">Successful</span>
                            ) : (
                                <span className="text-black font-bold text-sm bg-red-500 p-1 rounded-[10%]">Failed</span>
                            )}
                        </h2>

                        {singleLaunch.details ? (
                            <p className="text-white text-sm lg:text-base mb-5">
                                {singleLaunch.details}
                            </p>
                        ) : (
                            <p></p>
                        )}

                        <ul className="text-white">
                            <li>
                                Fairings:{" "}
                                {singleLaunch.fairings
                                    ? `${singleLaunch.fairings.reused ? "Reused" : "Not Reused"}`
                                    : "No Fairings Used"}
                            </li>
                            <li>
                                Recovered:{" "}
                                {singleLaunch.fairings
                                    ? `${
                                        singleLaunch.fairings.recovered
                                            ? "Fairings Recovered"
                                            : "Fairings Not Recovered"
                                    }`
                                    : "No Fairings Used"}
                            </li>
                        </ul>

                        <ul className="mt-5 flex flex-col ">
                            <li className="mr-2 mb-2 md:mb-0">
                                <a href={singleLaunch.links.article} className="btn" target="_blank" rel="noopener noreferrer">
                                    Read Article
                                </a>
                            </li>
                            <li className="mb-2 md:mb-0">
                                <a href={singleLaunch.links.wikipedia} className="btn" target="_blank" rel="noopener noreferrer">
                                    Wikipedia
                                </a>
                            </li>
                            <li className="mb-2 md:mb-0">
                            <a href={singleLaunch.links.webcast} className="btn" target="_blank" rel="noopener noreferrer">
                                Watch Launch on YouTube
                            </a>
                            </li>
                    </ul>
                        <button className="text-white mt-5 hover:text-lg">
                            <Link to="/launches" className="flex items-center space-x-2 text-white hover:text-lg">
                                    <ArrowLeftIcon className="w-6 h-6" />
                                    <span>Go Back</span>
                            </Link>
                        </button>
                    </article>
                </section>
            )}
        </>
    )
}