import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useEffect} from "react";
import {getpayloads} from "../Reducers/payLoad-reducer.ts";
import LoadingState from "./Loading.tsx";
import {Link} from "react-router-dom";

export default function PayLoads() {
   const dispatch = useDispatch<AppDispatch>();
   const payloads = useSelector((state:RootState) => state.payload.allPayloads);

   useEffect(() => {
       dispatch(getpayloads());
   },[])

    return (
        <>
            {!payloads ? (
                <LoadingState />
            ) : (
                <section className="pages-showcase">
                    <div className="pages-overlay">
                        <h1 className="heading">Payloads</h1>

                        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10">
                            {payloads.map(
                                ({
                                     id,
                                     reference_system,
                                     orbit,
                                     name,
                                     type,
                                     customers,
                                     nationalities,
                                     manufacturers,
                                 }) => (
                                     <Link to={`/payloads/${id}`} key={id}>
                                    <article className="p-5 rounded-[10%] articles hover:bg-[#000000b3] hover:translate-y-[-5px] transition-transform duration-20" key={id}>
                                        <h2 className="text-white font-bold text-xl my-1">
                                            {name}, <span className="opacity-75 text-lg">{type}</span>
                                        </h2>

                                        <ul className="text-sm text-white opacity-75 mt-2">
                                            <li>Orbit: {orbit}</li>
                                            <li>Reference System: {reference_system}</li>
                                        </ul>

                                        <h3 className="text-white font-bold text-base mt-2">
                                            Customers:
                                        </h3>
                                        <ul className="text-sm text-white opacity-75">
                                            {customers.map((customer, index) => (
                                                <li key={index}>{customer}</li>
                                            ))}
                                        </ul>

                                        <h3 className="text-white font-bold text-base mt-2">
                                            Manufacturers:
                                        </h3>
                                        <ul className="text-sm text-white opacity-75">
                                            {manufacturers.map((manufacturer, index) => (
                                                <li key={index}>{manufacturer}</li>
                                            ))}
                                        </ul>

                                        <h3 className="text-white font-bold text-base mt-2">
                                            Countries:
                                        </h3>
                                        <ul className="text-sm text-white opacity-75">
                                            {nationalities.map((nationality, index) => (
                                                <li key={index}>{nationality}</li>
                                            ))}
                                        </ul>
                                    </article>
                                     </Link>
                                )
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}