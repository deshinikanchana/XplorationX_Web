import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useEffect} from "react";
import {getCrewById} from "../Reducers/crew-reducer.ts";
import {useParams} from "react-router";
import LoadingState from "./Loading.tsx";
import {ArrowLeftIcon} from "@heroicons/react/16/solid";

export default function CrewMember() {

    const dispatch = useDispatch<AppDispatch>();
    const singleCrew = useSelector((state:RootState) => state.crew.crewMember);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getCrewById(id))
    },[id])

    return (
        <>
            {!singleCrew ? (
                <LoadingState />
            ) : (
                <>
                    <section className="max-width py-28 lg:pt-40 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10">
                        <article>
                            <img src={singleCrew.image} alt={singleCrew.name} />
                        </article>
                        <article className="bg-[#8a8a8a30] px-10 py-4 rounded-[5%] flex flex-col items-center justify-center">
                            <h1 className="heading-inner">{singleCrew.name}</h1>
                            <ul className="text-white">
                                <li className="mb-3 mt-3">
                                    Currently at {singleCrew.agency}
                                </li>
                                <li className="mb-1">
                                    {Array.isArray(singleCrew.launches) ? singleCrew.launches.length : 0} launches
                                </li>
                                <li
                                    className={`capitalize ${
                                        singleCrew.status === "active"
                                            ? "bg-green-500 w-max p-1 text-black flex justify-center rounded-[10%]"
                                            : "bg-red-500 w-max p-1 text-black flex justify-center rounded-[10%]"
                                    }`}
                                >
                                    {singleCrew.status}
                                </li>
                            </ul>

                            <ul className="flex flex-row items-center mt-10 gap-5 justify-center align-middle">
                                <li>
                                    <Link to="/crew" className="flex items-center space-x-2 text-white hover:text-lg">
                                        <ArrowLeftIcon className="w-6 h-6" />
                                        <span>Go Back</span>
                                    </Link>
                                </li>
                                <li className="mr-5 pt-5">
                                    <a href={singleCrew.wikipedia} className="btn" target="_blank" rel="noopener noreferrer">
                                        Wikipedia
                                    </a>
                                </li>

                            </ul>
                        </article>
                    </section>
                </>
            )}
        </>
    )
}
