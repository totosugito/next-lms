import React from "react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const HomePage = () => {
    return (
        <div className="flex flex-col gap-6">
            <section className="flex flex-col items-center justify-center h-full container gap-6 pt-10 md:pt-24 lg:pt-36">
                <h1 className="font-bold text-2xl max-w-none sm:text-3xl sm:max-w-3xl md:text-4xl md:max-w-4xl lg:text-6xl lg:max-w-6xl text-center">
                    Teaching in the Internet age means we must teach{" "}
                    <span className="text-primary">tomorrow&apos;s</span> skills today
                </h1>
                <p className="text-muted-foreground text-sm md:text-base max-w-3xl text-center font-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi a
                    asperiores dolorem temporibus assumenda placeat fugit nobis eaque
                    neque aperiam, earum, aliquid dignissimos aspernatur enim.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <Link className={cn(buttonVariants({ size: "lg" }), "duration-300 transition-all")} href="/sign-up">
                        Sign up
                    </Link>
                    <Link className={cn(buttonVariants({ size: "lg", variant: 'success' }), "duration-300 transition-all")} href="/sign-in">
                        Sign in
                    </Link>
                </div>
            </section>
        </div>
);
};

export default HomePage;