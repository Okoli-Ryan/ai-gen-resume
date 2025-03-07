import ResumeDoc from "./components/resume-page";
import { getResumeById } from "./actions/get-resume-by-id-action";
import { ResumeProvider } from "./providers/resume-provider";

const Resume = async ({ params }: { params: Promise<{ id: string }> }) => {
    const resumeId = (await params).id;
    const resume = await getResumeById(resumeId);

    if (resume.error) return <div>{resume.error}</div>;

    return (
        <ResumeProvider resume={resume.data}>
            <ResumeDoc />
        </ResumeProvider>
    );
};

export default Resume;
