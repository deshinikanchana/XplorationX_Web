import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useEffect} from "react";
import {getlandpads} from "../Reducers/landPad-reducer.ts";
import LoadingState from "./Loading.tsx";
import {Link} from "react-router-dom";

export default function LandPads() {
    const dispatch = useDispatch<AppDispatch>();
    const landPads = useSelector((state:RootState) => state.landpad.allLandPads);

    useEffect(() => {
        dispatch(getlandpads())
    },[])

        return(
    <>
    {!landPads ? (
        <LoadingState />
    ) : (
        <section className="pages-showcase">
            <div className="pages-overlay">
                <h1 className="heading">Landpads</h1>

                <div className="max-width grid grid-cols 1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
                    {landPads.map(
                        ({ images: { large }, type, full_name, details, id }) => (
                            <article className="articles rounded-[10%]">
                                    <img
                                        src={large}
                                        alt={full_name}
                                        className="h-52 w-full rounded-tl-[10%] rounded-tr-[10%]"
                                    />
                                    <div className="p-5">
                                        <h2 className="text-white font-bold text-xl">
                          <span className="opacity-75 text-lg font-normal">
                            {type}
                          </span>
                                            , {full_name}
                                        </h2>
                                        <p className="text-white opacity-75 text-sm">{`${details.substring(
                                            0,
                                            200
                                        )}...`}</p>
                                        <div className="flex items-center justify-center">
                                        <button className="inline-block mt-5 ">
                                            <Link to={`/landpads/${id}`} key={id} className="btn">
                                                Read More
                                            </Link>
                                        </button>
                                        </div>
                                    </div>
                                </article>
                        )
                    )}
                </div>
            </div>
        </section>
    )}
</>
)
}