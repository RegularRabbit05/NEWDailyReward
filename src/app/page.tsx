"use client";

import moment from "moment";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confetti from "canvas-confetti";
import Triangle from "@/components/Triangle";

export default function Home() {
    const confettiClick = () => {
        const end = Date.now() + 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 5,
                angle: 55,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
            });
            confetti({
                particleCount: 5,
                angle: 125,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
            });
            confetti({
                particleCount: 5,
                angle: -90,
                spread: 250,
                startVelocity: 20,
                origin: { x: 0.5, y: 0 },
            });

            requestAnimationFrame(frame);
        };

        frame();
    };

    return (
        <>
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
                                            confettiClick();
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
                <div className="absolute bottom-0 right-0 flex">
                    <Triangle color={"#000"} className={"triangle-filter -mr-0"} />
                    <div className="bg-black/70 backdrop-blur-sm p-4 text-xs text-gray-500">
                        <a href={"https://github.com/RegularRabbit05"}>This website is not affiliated with Hypixel or Minecraft</a>
                    </div>
                </div>
                <ToastContainer/>
            </main>
        </>
    );
}
