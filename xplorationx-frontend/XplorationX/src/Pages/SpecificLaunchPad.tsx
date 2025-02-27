import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useEffect} from "react";
import {getLaunchPadById} from "../Reducers/launchPad-reducer.ts";
import {useParams} from "react-router";
import LoadingState from "./Loading.tsx";
import {Link} from "react-router-dom";
import {ArrowLeftIcon} from "@heroicons/react/16/solid";

export default function specificLaunchPad() {

    const dispatch = useDispatch<AppDispatch>();
    const singleLaunchPad = useSelector((state:RootState) => state.launchpad.singleLaunchPad);
    const { id } = useParams();

    console.log("specificLaunchPad Line 15 :",id);
    useEffect(() => {
        dispatch(getLaunchPadById(id));
    },[id])

    return (
        <>
            {!singleLaunchPad ? (
                <LoadingState />
            ) : (
                <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
                    <article className="mb-10 md:mb-0 bg-[#8a8a8a30] px-10 py-4 rounded-[5%]">
                        <div>
                            <h1 className="heading-inner">
                                {singleLaunchPad.full_name}
                            </h1>
                            <h2 className="text-white font-bold text-lg lg:text-2xl">
                                {singleLaunchPad.name}
                            </h2>

                            <article className="mt-5 text-white md:grid grid-cols-2">
                                <ul>
                                    <li className="flex items-center justify-start opacity-75">
                    <span className="font-bold text-lg mr-2">
                      {singleLaunchPad.launches.length}
                    </span>{" "}
                                        Launches Attempts
                                    </li>
                                    <li className="flex items-center justify-start opacity-75">
                    <span className="font-bold text-lg mr-2">
                      {singleLaunchPad.launch_successes}
                    </span>
                                        Successful Launches
                                    </li>
                                    <li
                                        className={`flex items-center justify-start capitalize ${
                                            singleLaunchPad.status === "active"
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        <span className="font-bold text-lg mr-2">Status: </span>
                                        {singleLaunchPad.status}
                                    </li>
                                </ul>

                                <ul>
                                    <li className="font-bold">Location</li>
                                    <li className="opacity-75">
                                        Locality: {singleLaunchPad.locality}
                                    </li>
                                    <li className="opacity-75">
                                        Region: {singleLaunchPad.region}
                                    </li>
                                </ul>
                            </article>

                            <p className="text-white opacity-75 text-sm lg:text-base mt-5">
                                {singleLaunchPad.details}
                            </p>

                            <button className="inline-block mt-5 text-white">
                                <Link to="/launchpads" className="flex items-center space-x-2 text-white hover:text-lg">
                                    <ArrowLeftIcon className="w-6 h-6" />
                                    <span>Go Back</span>
                                </Link>
                            </button>
                        </div>
                    </article>

                    <article>
                        <img
                            src={singleLaunchPad.images.large[0]}
                            alt={singleLaunchPad.name}
                            className="w-full h-72 object-cover md:h-96"
                        />
                    </article>
                </section>
            )}
        </>
    )
}