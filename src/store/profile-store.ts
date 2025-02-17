import { TResumeForm } from "@/lib/types";
import { createStore } from "zustand";

interface ProfileState {
    profile: TResumeForm;
    updateProfile: (data: Partial<TResumeForm>) => void;
}

export const useProfileStore = createStore<ProfileState>()((set) => ({
    profile: {} as TResumeForm,
    updateProfile: (data) =>
        set((state) => ({ profile: { ...state.profile, data } })),
}));
