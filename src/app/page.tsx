"use client";

import Image from "next/image";
import moment from "moment";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    return (
        <main className="relative">
            <div id="bgimg">
                <Image
                    src="/bg.jpg"
                    draggable={false}
                    alt="Background"
                    width={1920}
                    height={1080}
                    className="h-screen w-screen brightness-50"
                />
            </div>
            <div className="absolute w-full my-auto bottom-[45%] flex justify-center">
                <div className="flex flex-col items-center w-full">
                    <div className="my-5 w-4/12 text-center">
                        <h3 className="text-3xl text-center py-4 font-extrabold">
                            Check if Reg claimed his Daily Reward
                        </h3>
                        <p className="font-light">
                            {
                                "Clicking this button will show you if Reg claimed his daily today or not "
                            }
                            {"as well as sending him a notification if he forgot!"}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            fetch("https://reg-daily-reward-api.vercel.app/api/checkPlayer")
                                .then((response) => response.json())
                                .then((data) => {
                                    const lastTimeStamp = moment(
                                        data.lastRewardTimestamp * 1000
                                    ).fromNow();
                                    if (data.result == true) {
                                        toast.success(`He did it ${lastTimeStamp}`, {
                                            position: "bottom-center",
                                            autoClose: false,
                                            hideProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "dark",
                                            transition: Bounce,
                                        });
                                    } else {
                                        toast.error(`He did not! Last time was ${lastTimeStamp}`, {
                                            position: "bottom-center",
                                            autoClose: false,
                                            hideProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "dark",
                                            transition: Bounce,
                                        });
                                    }
                                });
                        }}
                        className="bg-black/50 px-40 backdrop-blur-sm py-6 rounded-lg hover:border-white border-2 border-black/50 animate-pulse"
                    >
                        Query Hypixel
                    </button>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
}
