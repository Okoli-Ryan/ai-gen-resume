"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import { PDFViewer } from "@react-pdf/renderer";

import { MyDocument } from "./components/my-document";

const ResumeDoc = () => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return null;

	return (
		<div className="w-screen">
			<PDFViewer className="h-[100dvh]" width={"100%"}>
				<MyDocument />
			</PDFViewer>
		</div>
	);
};

export default ResumeDoc;
