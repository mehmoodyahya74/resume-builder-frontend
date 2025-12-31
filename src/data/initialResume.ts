import { ResumeData } from "@/lib/types";
import { v4 as uuidv4 } from 'uuid';

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    imageUrl: undefined,
  },
  pages: [
    {
      id: uuidv4(),
      pageNumber: 1,
      summary: "",
      education: [
        {
          id: uuidv4(),
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
        }
      ],
      experience: [
        {
          id: uuidv4(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        }
      ],
      skills: [""],
      customSections: []
    }
  ]
};