"use client";

import moment from "moment";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from 'react-confetti'

import {
    useWindowSize,
} from '@react-hook/window-size';
import {useState} from "react";

export default function Home() {
    const [width, height] = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);

    return (
        <>
            <Confetti width={width} height={height} run={showConfetti} recycle={false} onConfettiComplete={() => setShowConfetti(false)} />
        <main className={"reg_customBg w-screen h-screen flex justify-center items-center"}>
            <div className={"w-full bg-black/70 flex justify-center py-10 backdrop-blur-sm"}>
                <div className={"w-10/12 md:w-8/12 lg:w-4/12 flex flex-col items-center"}>
                    <h3 className="text-3xl text-center pb-4 font-extrabold">
                        Check if Reg claimed his Daily Reward
                    </h3>
                    <p className="font-light text-center">
                        {"Clicking this button will show you whether Reg claimed his daily today or not "}
                        {"as well as sending him a notification in case he forgot!"}
                    </p>

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
                                        setShowConfetti(true);
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
                        className="mt-5 bg-amber-500/90 w-3/5 py-5 rounded-tl-2xl rounded-tr-md rounded-bl-md rounded-br-2xl hover:border-white border-2 border-black/50 animate-pulse backdrop-blur-sm"
                    >
                        Query Hypixel
                    </button>
                </div>
            </div>
            <ToastContainer />
        </main>
        </>
    );
}
