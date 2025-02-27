import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";
import { useEffect, useState } from "react";
import { getlaunches } from "../Reducers/launch-reducer.ts";
import LoadingState from "./Loading.tsx";
import { Link } from "react-router-dom";
import * as React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { PencilSquareIcon as PencilSquareOutline } from "@heroicons/react/24/outline";
import {deletefavourite, getFavourites, saveFavourite} from "../Reducers/favourite-reducer.ts";
import {getNotes} from "../Reducers/note-reducer.ts";


const Launches = () => {
    const dispatch = useDispatch();
    const launches = useSelector((state: RootState) => state.launch.allLaunches);
    const favouritesList = useSelector((state: RootState) => state.favourite);
    const filteredNotes = useSelector((state:RootState)=>state.note)
    const currentUserId = localStorage.getItem('currentUserId');

    console.log("My Favourites Count: ", favouritesList.length);

    const [notes, setNotes] = useState<Record<string, string>>({});
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const [showNotedItems, setShowNotedItems] = useState<boolean>(false);
    const [noteModalData, setNoteModalData] = useState<{ id: string; note: string } | null>(null);
    const [favourites, setFavourites] = useState<Record<string, boolean>>({});


    useEffect(() => {
        dispatch(getFavourites());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getlaunches());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);

    useEffect(() => {
        if (favouritesList.length > 0) {
            const updatedFavorites: Record<string, boolean> = {};
            favouritesList.forEach((favourite) => {
                    updatedFavorites[favourite.FavTopic] = true;
            });
            setFavourites(updatedFavorites);
        }
    }, [favouritesList]);


    const handleFavoriteToggle = async (id: string) => {
        const existingFavorite = favouritesList.find(
            (favourite) => favourite.FavTopic === id
        );

        try {
            if (existingFavorite) {
                await dispatch(deletefavourite(existingFavorite.FavId)).unwrap();
                console.log(`Removed launch with ID ${id} from favorites.`);

                setFavourites((prevFavorites) => {
                    const updatedFavorites = { ...prevFavorites };
                    delete updatedFavorites[id];
                    return updatedFavorites;
                });
            } else {
                const newFavorite = {
                    FavTopic: id,
                    UserId: Number(currentUserId),
                };

                await dispatch(saveFavourite(newFavorite)).unwrap();
                console.log(`Added launch with ID ${id} to favorites.`);

                setFavourites((prevFavorites) => ({
                    ...prevFavorites,
                    [id]: true,
                }));
            }
        } catch (error) {
            console.error('Failed to add or remove from favorites:', error);
        }
    };

    const handleNotes = (id: string) => {
        if (notes[id]) {
            setNoteModalData({ id, note: notes[id] });
        } else {
            setNoteModalData({ id, note: "" });
        }
    };

    const handleNoteSaveOrUpdate = () => {
        if (noteModalData) {
            const { id, note } = noteModalData;
            setNotes((prevNotes) => ({
                ...prevNotes,
                [id]: note,
            }));
            setNoteModalData(null);
        }
    };

    const handleNoteCancel = () => {
        setNoteModalData(null);
    };

    const handleNoteDelete = () => {
        if (noteModalData) {
            const { id } = noteModalData;
            setNotes((prevNotes) => {
                const newNotes = { ...prevNotes };
                delete newNotes[id];
                return newNotes;
            });
            setNoteModalData(null);
        }
    };

    const filteredLaunches = launches.filter(({ id }) => {
        if (showFavorites && !favourites[id]) return false;
        if (showNotedItems && !notes[id]) return false;
        return true;
    });

    return (
        <>
            {!launches ? (
                <LoadingState />
            ) : (
                <section className="pages-showcase">
                    <div className="pages-overlay">
                        <h1 className="heading">Launches</h1>
                        <div className="flex justify-start ml-[8%] mb-4 gap-4">
                            <button
                                onClick={() => setShowFavorites(!showFavorites)}
                                className="px-4 py-2 bg-[#20b2aa] text-black rounded-lg hover:bg-[rgb(23 137 131)] hover:text-[#f5f5f5]"
                            >
                                {showFavorites ? "Show All" : "Show Favorites"}
                            </button>
                            <button
                                onClick={() => setShowNotedItems(!showNotedItems)}
                                className="px-4 py-2 bg-[#20b2aa] text-black rounded-lg hover:bg-[rgb(23 137 131)] hover:text-[#f5f5f5]"
                            >
                                {showNotedItems ? "Show All" : "Show Noted Items"}
                            </button>
                        </div>

                        <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
                            {filteredLaunches.map(({ id, details, links, name }) => (
                                <article className="p-5 rounded-[10%] articles" key={id}>
                                    <Link to={`/launches/${id}`}>
                                        <img
                                            className="hover:translate-y-[-5px] transition-transform duration-20"
                                            src={links.patch.large}
                                            alt={name}
                                            loading="lazy"
                                        />
                                        <h2 className="text-white font-bold text-xl my-1">{name}</h2>
                                        {details ? (
                                            <p className="text-white opacity-75 text-sm">
                                                {`${details.substring(0, 50)}...`}
                                            </p>
                                        ) : (
                                            <p></p>
                                        )}
                                    </Link>
                                    <div className="flex mt-3 flex-col items-center">
                                        <button
                                            onClick={() => handleFavoriteToggle(id)}
                                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200"
                                        >
                                            {favourites[id] ? (
                                                <HeartIcon className="w-6 h-6 text-red-500" />
                                            ) : (
                                                <HeartIconOutline className="w-6 h-6 text-gray-500" />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => handleNotes(id)}
                                            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200"
                                        >
                                            {notes[id] ? (
                                                <PencilSquareIcon className="w-6 h-6 text-white/90" />
                                            ) : (
                                                <PencilSquareOutline className="w-6 h-6 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>


                        {noteModalData && (
                            <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                                <div className="bg-white p-6 rounded-lg w-96">
                                    <h2 className="text-xl font-semibold mb-4">Note</h2>
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        rows={4}
                                        value={noteModalData.note}
                                        onChange={(e) => setNoteModalData({
                                            id: "",
                                            ...noteModalData,
                                            note: e.target.value })}
                                    ></textarea>
                                    <div className="flex justify-end mt-4 gap-4">
                                        <button
                                            onClick={handleNoteCancel}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        {notes[noteModalData.id] ? (
                                            <button
                                                onClick={handleNoteDelete}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleNoteSaveOrUpdate}
                                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                                            >
                                                Save
                                            </button>
                                        )}
                                        {notes[noteModalData.id] && (
                                            <button
                                                onClick={handleNoteSaveOrUpdate}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                            >
                                                Update
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default Launches;
