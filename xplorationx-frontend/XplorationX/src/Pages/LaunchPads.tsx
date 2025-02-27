import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useEffect} from "react";
import {getlaunchpads} from "../Reducers/launchPad-reducer.ts";
import {Link} from "react-router-dom";
import LoadingState from "./Loading.tsx";

export default function LaunchPads() {
    const dispatch = useDispatch<AppDispatch>();
    const launchPads = useSelector((state:RootState) => state.launchpad.allLaunchPads);

    useEffect(() => {
        dispatch(getlaunchpads());
    },[])

    return (
        <>
            {!launchPads ? (
                <LoadingState />
            ) : (
                <section className="pages-showcase">
                    <div className="pages-overlay">
                        <h1 className="heading">Launchpads</h1>

                        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
                            {launchPads.map(({ id, name, details, images }) => (
                                    <article className="articles rounded-[10%]">
                                        <img
                                            src={images.large[0]}
                                            alt={name}
                                            loading="lazy"
                                            className="h-52 w-full object-cover md:h-72 rounded-tl-[10%] rounded-tr-[10%]"
                                        />
                                        <div className="p-5">
                                            <h2 className="text-white font-bold text-xl my-1">
                                                {name}
                                            </h2>
                                            <p className="text-white opacity-75 text-sm mb-5">
                                                {`${details.substring(0, 100)}...`}
                                            </p>
                                            <div className="flex items-center justify-center">
                                            <Link to={`/launchpads/${id}`} key={id} className="btn">
                                                Learn more
                                            </Link>
                                            </div>
                                        </div>
                                    </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}