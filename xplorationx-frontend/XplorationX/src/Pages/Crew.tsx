import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useEffect} from "react";
import {getcrew} from "../Reducers/crew-reducer.ts";
import LoadingState from "./Loading.tsx";
import {Link} from "react-router-dom";

export default function Crew() {

    const dispatch = useDispatch<AppDispatch>();
    const BigCrew = useSelector((state:RootState) => state.crew.allCrew)
    const isAuthenticated = useSelector((state) => state.sign.isAuthenticated);

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(getcrew());
        }
    }, [isAuthenticated]);

    return (
        <>
            {!BigCrew ? (
                <LoadingState />
            ) : (
                <section className="pages-showcase">
                    <div className="pages-overlay">
                        <h1 className="heading">Crew</h1>

                        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {BigCrew.map(({ name, image, id }) => (
                                <Link to={`/crew/${id}`} key={id}>
                                    <article className="relative">
                                        <img
                                            src={image}
                                            alt={name}
                                            loading="lazy"
                                            className="md:h-64 lg:h-80 w-full object-top object-cover rounded-[10%]"
                                        />
                                        <div className="absolute bottom-3 w-full">
                                            <h2 className="text-white font-bold text-xl bg-[#000000ae] p-2 text-center">{name}</h2>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
