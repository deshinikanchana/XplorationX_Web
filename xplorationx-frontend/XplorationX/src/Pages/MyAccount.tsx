// import {Button} from "@mui/material";
// import logo from "../assets/Logo.png";
// import * as React from "react";
// import {useDispatch} from "react-redux";
// import {logOutUser} from "../Reducers/sign-reducer.ts";
//
// export default function MyAccount() {
//     const dispatch = useDispatch();
//
//     const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
//
//     const [username, setUsername] = React.useState("Sample Name");
//     const [email, setEmail] = React.useState("Sample Email");
//     const [currentPassword, setCurrentPassword] = React.useState("******");
//     const [newPassword, setNewPassword] = React.useState("");
//     const [confirmPassword, setConfirmPassword] = React.useState("");
//
//     const [deletePassword, setDeletePassword] = React.useState("");
//     const [deleteError, setDeleteError] = React.useState("");
//
//     const [editError, setEditError] = React.useState("");
//     const [isProfileUpdated, setIsProfileUpdated] = React.useState(false);
//
//     const predefinedPassword = "12345";
//
//     const handleEditProfile = () => {
//         if (newPassword !== confirmPassword) {
//             setEditError("New password and confirm password do not match");
//             return;
//         }
//
//         if (newPassword !== predefinedPassword) {
//             setEditError("Current password is incorrect");
//             return;
//         }
//
//         setUsername(username);
//         setEmail(email);
//         setCurrentPassword("******");
//         setNewPassword("");
//         setConfirmPassword("");
//         setIsProfileUpdated(true);
//         setEditError("");
//         setIsEditModalOpen(false);
//
//         if(isProfileUpdated){
//             alert("Profile Updated Successfully");
//         }
//     };
//
//     const handleDeleteAccount = () => {
//         if (deletePassword !== predefinedPassword) {
//             setDeleteError("Password is incorrect");
//             return;
//         }
//
//         alert("Account has been deleted");
//         setIsDeleteModalOpen(false);
//     };
//
//     return (
//         <>
//             <section className="max-width py-28 flex flex-col justify-center align-center">
//                 <article>
//                     <h2 className="heading">Profile</h2>
//                     <div className="bg-[#8a8a8a30] self-center w-full py-10 flex flex-col items-center justify-center">
//                         <div>
//                             <ul className="font-bold text-white text-lg mt-2">
//                                 <img className="w-[150px] h-[150px] rounded-[30%] mb-5 mx-10" src={logo} alt="Logo" />
//                                 <li>User Name : <span className="text-[#000000] pl-7">{username}</span></li>
//                                 <li>Email : <span className="text-[#000000] pl-7">{email}</span></li>
//                                 <li>Password : <span className="text-[#000000] pl-7">******</span></li>
//                             </ul>
//                         </div>
//                         <div className="flex flex-row items-center justify-center pt-7">
//                             <button
//                                 onClick={() => setIsEditModalOpen(true)}
//                                 className="py-1 px-5 rounded-md mb-5 bg-[#d7b21e] mx-5 inline-block text-black hover:text-white hover:bg-[#6d5b0f]"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => setIsDeleteModalOpen(true)}
//                                 className="py-1 px-5 rounded-md mb-5 bg-[#e1591f] mx-5 inline-block text-black hover:text-white hover:bg-[#8b3713]"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                         <Button onClick={()=>dispatch(logOutUser())}>Log Out</Button>
//                     </div>
//                 </article>
//             </section>
//
//             {/* Edit Modal */}
//             {isEditModalOpen && (
//                 <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
//                     <div className="bg-white p-6 rounded-lg w-96">
//                         <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
//                         <div>
//                             <label htmlFor="username" className="block mb-2">Username:</label>
//                             <input
//                                 id="username"
//                                 type="text"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//                             />
//
//                             <label htmlFor="email" className="block mb-2">Email :</label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 value={email}
//                                 readOnly
//                                 className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//                             />
//
//                             <label htmlFor="current-password" className="block mb-2">Current Password:</label>
//                             <input
//                                 id="current-password"
//                                 type="password"
//                                 value={currentPassword}
//                                 onChange={(e) => setCurrentPassword(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//                             />
//
//                             <label htmlFor="new-password" className="block mb-2">New Password:</label>
//                             <input
//                                 id="new-password"
//                                 type="password"
//                                 value={newPassword}
//                                 onChange={(e) => setNewPassword(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//                             />
//
//                             <label htmlFor="confirm-password" className="block mb-2">Confirm New Password:</label>
//                             <input
//                                 id="confirm-password"
//                                 type="password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//                             />
//
//                             {editError && <p className="text-red-500 text-sm">{editError}</p>}
//
//                             <div className="flex justify-end gap-4 mt-4">
//                                 <button
//                                     onClick={handleEditProfile}
//                                     className="py-1 px-5 rounded-md mb-5 bg-[#d7b21e] inline-block text-black hover:text-white hover:bg-[#6d5b0f]"
//                                 >
//                                     Update
//                                 </button>
//                                 <button
//                                     onClick={() => setIsEditModalOpen(false)}
//                                     className="btn"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//             {/* Delete Modal */}
//             {isDeleteModalOpen && (
//                 <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
//                     <div className="bg-white p-6 rounded-lg w-96">
//                         <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete your account?</h2>
//                         <input
//                             type="password"
//                             value={deletePassword}
//                             onChange={(e) => setDeletePassword(e.target.value)}
//                             placeholder="Enter your password"
//                             className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//                         />
//                         {deleteError && <p className="text-red-500 text-sm">{deleteError}</p>}
//
//                         <div className="flex justify-end gap-4 mt-4">
//                             <button
//                                 onClick={handleDeleteAccount}
//                                 className="py-1 px-5 rounded-md mb-5 bg-[#e1591f] inline-block text-black hover:text-white hover:bg-[#8b3713]"
//                             >
//                                 Yes, Delete
//                             </button>
//                             <button
//                                 onClick={() => setIsDeleteModalOpen(false)}
//                                 className="btn"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }


import { Button } from "@mui/material";
import logo from "../assets/Logo.png";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logOutUser } from "../Reducers/sign-reducer";
import { deleteUser, updateUser, getUserByEmail } from "../Reducers/user-reducer";
import { useEffect, useState } from "react";

export default function MyAccount() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const loading = useSelector((state: RootState) => state.user);
    const error = useSelector((state: RootState) => state.user);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [deletePassword, setDeletePassword] = useState("");
    const [deleteError, setDeleteError] = useState("");

    const [editError, setEditError] = useState("");
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const currentEmail = localStorage.getItem("currentUserEmail");

    const userId = user?.id;

    useEffect(() => {
        if (currentEmail !== null) {
            dispatch(getUserByEmail(currentEmail));
        }
    }, [dispatch, currentEmail]);

    useEffect(() => {
        if (user) {
            setUsername(user.Name);
            setEmail(user.Email);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    }, [isEditModalOpen, user]);

    const handleEditProfile = () => {
        if (newPassword !== confirmPassword) {
            setEditError("New password and confirm password do not match");
            return;
        }

        // Update profile
        if (currentEmail) {
            const updatedData = {
                UserId:user?.UserId,
                Name:username,
                Email:currentEmail,
                password: newPassword || currentPassword,
            };
            dispatch(updateUser(updatedData));  // Dispatch update action
            setIsProfileUpdated(true);
            setEditError("");
            setIsEditModalOpen(false);
            if (isProfileUpdated) {
                alert("Profile Updated Successfully");
            }
        }
    };

    const handleDeleteAccount = () => {
        if (deletePassword !== user?.password) {
            setDeleteError("Password is incorrect");
            return;
        }

        if (currentEmail) {
            dispatch(deleteUser(user?.UserId));  // Dispatch delete action
            alert("Account has been deleted");
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <>
            <section className="max-width py-28 flex flex-col justify-center align-center">
                <article>
                    <h2 className="heading">Profile</h2>
                    <div className="bg-[#8a8a8a30] self-center w-full py-10 flex flex-col items-center justify-center">
                        <div>
                            <ul className="font-bold text-white text-lg mt-2">
                                <img className="w-[150px] h-[150px] rounded-[30%] mb-5 mx-10" src={logo} alt="Logo" />
                                <li>User Name: <span className="text-[#000000] pl-7">{user?.Name}</span></li>
                                <li>Email: <span className="text-[#000000] pl-7">{user?.Email}</span></li>
                                <li>Password: <span className="text-[#000000] pl-7">******</span></li>
                            </ul>
                        </div>
                        <div className="flex flex-row items-center justify-center pt-7">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="py-1 px-5 rounded-md mb-5 bg-[#d7b21e] mx-5 inline-block text-black hover:text-white hover:bg-[#6d5b0f]"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="py-1 px-5 rounded-md mb-5 bg-[#e1591f] mx-5 inline-block text-black hover:text-white hover:bg-[#8b3713]"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </article>
            </section>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                        <div>
                            <label htmlFor="username" className="block mb-2">Username:</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            />

                            <label htmlFor="email" className="block mb-2">Email:</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            />

                            <label htmlFor="current-password" className="block mb-2">Current Password:</label>
                            <input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            />

                            <label htmlFor="new-password" className="block mb-2">New Password:</label>
                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            />

                            <label htmlFor="confirm-password" className="block mb-2">Confirm New Password:</label>
                            <input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            />

                            {editError && <p className="text-red-500 text-sm">{editError}</p>}

                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    onClick={handleEditProfile}
                                    className="py-1 px-5 rounded-md mb-5 bg-[#d7b21e] inline-block text-black hover:text-white hover:bg-[#6d5b0f]"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete your account?</h2>
                        <input
                            type="password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        />
                        {deleteError && <p className="text-red-500 text-sm">{deleteError}</p>}

                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={handleDeleteAccount}
                                className="py-1 px-5 rounded-md mb-5 bg-[#e1591f] inline-block text-black hover:text-white hover:bg-[#8b3713]"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="btn"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
