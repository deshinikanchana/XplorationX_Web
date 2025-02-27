import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {getcompany} from "../Reducers/home-reducer.ts";
import LoadingState from "./Loading.tsx";
import '../index.css';
import home from "../Models/Home.ts";
import millify from "millify";

function Homepage () {

    const dispatch = useDispatch<AppDispatch>();
    const company = useSelector((state: RootState) => state.home);
    const isAuthenticated = useSelector((state) => state.sign.isAuthenticated);


    useEffect(() => {
        if(isAuthenticated) {
            dispatch(getcompany());
        }
    }, [isAuthenticated]);


        if (!company || !company.headquarters) {
            return <LoadingState/>
        }

    return (
        <>
            <section className="showcase p-0">
                <div className="overlay">
                    <h1 className="heading">
                        XplorationX<br/>
                        <span className="block mt-2 mb-2 opacity-50">
              Stay informed about SpaceX missions
            </span>
                    </h1>

                    {!home ? (
                        <LoadingState />
                    ) : (
                        <>
                            <div className="flex flex-col justify-center md:flex-row bg-[#000000e3] p-4">
                                <article className="mt-5 mb-5 sm:mt-0 md:mr-10 lg:mr-20">
                                    <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                                        About
                                    </h2>
                                    <ul>
                                        <li className="text-sm text-white opacity-75 mb-1">
                                            Founded in {company.founded} by {company.founder}
                                        </li>
                                        <li className="text-sm text-white opacity-75 mb-1">
                                            Has {company.employees} employees,
                                        </li>
                                        <li className="text-sm text-white opacity-75 mb-1">
                                            {company.vehicles} space vehicles,
                                        </li>
                                        <li className="text-sm text-white opacity-75 mb-1">
                                            {company.vehicles} launch sites,
                                        </li>
                                        <li className="text-sm text-white opacity-75 mb-1">
                                            and {company.test_sites} test sites,
                                        </li>
                                        <li className="text-sm text-white opacity-75 mb-1">
                                            Valued at {`$ ${millify(company.valuation!)}`}.
                                        </li>
                                    </ul>
                                </article>

                                <article className="mb-5 md:mr-10 lg:mr-20">
                                    <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                                        Headquarters
                                    </h2>
                                    <ul>
                                        <li className="text-sm text-white opacity-75 mb-1">
                                            {company?.headquarters?.address || 'Address not available'},
                                        </li>
                                        <li className="text-sm text-white opacity-75 mb-1">
                                            {company.headquarters.city}, {company.headquarters.state}
                                        </li>
                                    </ul>
                                </article>

                                <article>
                                    <h2 className="border-b border-white font-semibold text-white uppercase tracking-wide mb-3">
                                        Social Media
                                    </h2>
                                    <ul>
                                        <li className="text-sm text-white opacity-75 mb-1 hover:text-[#0a9b8a]">
                                            <a href={company.links.website} target="_blank" rel="noopener noreferrer">Website</a>
                                        </li>
                                        <li className="text-sm text-white opacity-75 mb-1 hover:text-[#0a9b8a]">
                                            <a href={company.links.flickr} target="_blank" rel="noopener noreferrer">Flickr</a>
                                        </li>
                                        <li className="text-sm text-white opacity-75 mb-1 hover:text-[#0a9b8a]">
                                            <a href={company.links.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                                        </li>
                                        <li className="text-sm text-white opacity-75 mb-1 hover:text-[#0a9b8a]">
                                            <a href={company.links.elon_twitter} target="_blank" rel="noopener noreferrer">Elon Musk Twitter</a>
                                        </li>
                                    </ul>
                                </article>
                            </div>

                            <div className="text-center">
                                <p className="text-white mt-10 sm:max-w-7xl md:max-w-5xl lg:max-w-2xl bg-[#000000b4] p-4">
                                    {company.summary}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Homepage;
