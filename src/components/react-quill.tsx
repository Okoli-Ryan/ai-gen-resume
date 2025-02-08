"use client"

import dynamic from "next/dynamic";
import { Suspense, useLayoutEffect } from "react";

const ReactQuillNew = dynamic(() => import("react-quill-new"), { ssr: false });

type RQProps = React.ComponentProps<typeof ReactQuillNew>


export const ReactQuill = (props: RQProps) => {

	useLayoutEffect(() => {
		require("react-quill-new/dist/quill.snow.css")
	}, [])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReactQuillNew {...props}/>
        </Suspense>
    );
};
