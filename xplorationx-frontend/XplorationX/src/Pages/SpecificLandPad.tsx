import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useParams} from "react-router";
import {useEffect} from "react";
import {getLandPadById} from "../Reducers/landPad-reducer.ts";
import LoadingState from "./Loading.tsx";
import {Link} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/16/solid";

export default function SpecificLandPad() {
    const dispatch = useDispatch<AppDispatch>();
    const SingleLandPad = useSelector((state:RootState)=>state.landpad.singleLandPad)
    const { id } = useParams();

    useEffect(() => {
        dispatch(getLandPadById(id))
    },[id])

    return (
        <>
            {!SingleLandPad ? (
                <LoadingState />
            ) : (
                <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
                    <article className="mb-10 md:mb-0 bg-[#8a8a8a30] px-10 py-4 rounded-[5%]">
                        <div>
                            <h1 className="heading-inner">
                                {SingleLandPad.full_name}
                            </h1>
                            <h2 className="opacity-75 text-white font-bold text-lg lg:text-2xl">
                                {SingleLandPad.name}
                            </h2>

                            <article className="mt-5 text-white md:grid grid-cols-2">
                                <ul>
                                    <li className="flex items-center justify-start opacity-75">
                    <span className="font-bold text-lg mr-2">
                      {SingleLandPad.launches.length}
                    </span>{" "}
                                        Launches
                                    </li>
                                    <li className="flex items-center justify-start opacity-75">
                    <span className="font-bold text-lg mr-2">
                      {SingleLandPad.landing_successes}
                    </span>
                                        Successful Landings
                                    </li>
                                    <li
                                        className={`flex items-center justify-start capitalize ${
                                            SingleLandPad.status === "active"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        <span className="font-bold text-lg mr-2">Status: </span>
                                        {SingleLandPad.status}
                                    </li>
                                </ul>

                                <ul>
                                    <li className="font-bold">Location</li>
                                    <li className="opacity-75">
                                        Locality: {SingleLandPad.locality}
                                    </li>
                                    <li className="opacity-75">Region: {SingleLandPad.region}</li>
                                </ul>
                            </article>

                            <p className="mt-5 opacity-75 text-white">
                                {SingleLandPad.details}
                            </p>
                        </div>
                        <ul className="flex flex-col items-center mt-5">
                            <li className="mr-5">
                                <a href={SingleLandPad.wikipedia} className="btn" target="_blank" rel="noopener noreferrer">
                                    Wikipedia
                                </a>
                            </li>
                            <li>
                                <Link to="/landpads" className="flex items-center space-x-2 text-white hover:text-lg">
                                    <ArrowLeftIcon className="w-6 h-6" />
                                    <span>Go Back</span>
                                </Link>
                            </li>
                        </ul>
                    </article>

                    <article>
                        <img
                            src={SingleLandPad.images.large[0]}
                            alt={SingleLandPad.name}
                            className="h-full object-cover"
                        />
                    </article>
                </section>
            )}
        </>
    )
}
