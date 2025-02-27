import crewReducer from "../Reducers/crew-reducer.ts";
import favouriteReducer from "../Reducers/favourite-reducer.ts";
import landPadReducer from "../Reducers/landPad-reducer.ts";
import launchReducer from "../Reducers/launch-reducer.ts";
import launchPadReducer from "../Reducers/launchPad-reducer.ts";
import noteReducer from "../Reducers/note-reducer.ts";
import payLoadReducer from "../Reducers/payLoad-reducer.ts";
import homeReducer from "../Reducers/home-reducer.ts";
import {configureStore} from "@reduxjs/toolkit";
import signReducer from "../Reducers/sign-reducer.ts";
import userReducer from "../Reducers/user-reducer.ts";

export const store = configureStore({
    reducer: {
        sign: signReducer,
        crew:crewReducer,
        favourite: favouriteReducer,
        landpad:landPadReducer,
        launch: launchReducer,
        launchpad: launchPadReducer,
        notes: noteReducer,
        payload:payLoadReducer,
        home:homeReducer,
        user:userReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch