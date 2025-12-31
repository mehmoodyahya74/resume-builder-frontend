import React from "react";
import { TemplateData } from "@/lib/types";
import { MapPin, Mail, Phone, Globe } from "lucide-react";
import "./Template3.css";

interface Template3Props {
  data: TemplateData;
}

export const Template3 = ({ data }: Template3Props) => {
  return (
    <div className="template3-container grid grid-cols-[30%_70%] h-full text-slate-800 font-sans">
      {/* Sidebar */}
      <div className="bg-slate-100 p-8 flex flex-col gap-8 h-full print:h-auto">
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img 
              src={data.personalInfo.imageUrl || "/images/profile.png"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <h3 className="uppercase tracking-widest text-slate-900 font-bold text-xs border-b border-slate-300 pb-2 mb-2">Contact</h3>
          
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-slate-500" />
            <span className="truncate">{data.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-slate-500" />
            <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span>{data.personalInfo.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-slate-500" />
            <span className="truncate">{data.personalInfo.website}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="uppercase tracking-widest text-slate-900 font-bold text-xs border-b border-slate-300 pb-2 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-white px-2 py-1 rounded text-xs shadow-sm border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="uppercase tracking-widest text-slate-900 font-bold text-xs border-b border-slate-300 pb-2 mb-2">Education</h3>
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="font-bold text-sm">{edu.school}</div>
              <div className="text-xs text-slate-600">{edu.degree}</div>
              <div className="text-xs text-slate-500 italic">
                {edu.startDate} - {edu.endDate}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Custom Section Logic - List Types (Sidebar) */}
        {data.customSections.filter(section => 
          section.items.length > 0 && section.type === 'list'
        ).map((section) => (
          <div key={section.id} className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-slate-900 font-bold text-xs border-b border-slate-300 pb-2 mb-2">
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {section.items.map((item, i) => (
                <span key={i} className="bg-white px-2 py-1 rounded text-xs shadow-sm border border-slate-200">
                  {item.title}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-10 flex flex-col gap-8 bg-white h-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900">{data.personalInfo.fullName}</h1>
          <p className="text-xl text-slate-500 font-light uppercase tracking-widest">{data.personalInfo.title}</p>
        </div>

        <div>
          <h3 className="uppercase tracking-widest text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
            <span className="w-8 h-1 bg-slate-900 block"></span> Profile
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            {data.summary}
          </p>
        </div>

        <div>
          <h3 className="uppercase tracking-widest text-slate-900 font-bold text-sm mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-slate-900 block"></span> Experience
          </h3>
          
          <div className="flex flex-col gap-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="flex flex-col gap-2 relative pl-4 border-l-2 border-slate-100">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-lg text-slate-800">{exp.position}</h4>
                  <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="text-slate-500 font-medium text-sm mb-2">{exp.company}</div>
                <ul className="list-disc list-outside ml-4 text-sm text-slate-600 flex flex-col gap-1">
                  {exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line.replace(/^•\s*/, '')}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Custom Section Logic - Paragraph Types (Main Content) */}
        {data.customSections.filter(section => 
          section.items.length > 0 && section.type === 'paragraph'
        ).map((section) => (
          <div key={section.id}>
            <h3 className="uppercase tracking-widest text-slate-900 font-bold text-sm mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-slate-900 block"></span> {section.title}
            </h3>
            
            <div className="flex flex-col gap-8">
              {section.items.map((item, i) => (
                <div key={i} className="flex flex-col gap-2 relative pl-4 border-l-2 border-slate-100">
                  <div className="flex justify-between items-baseline">
                    {item.title && (
                      <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                    )}
                    {(item.startDate || item.endDate) && (
                      <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">
                        {item.startDate} {item.endDate && `- ${item.endDate}`}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <div className="text-slate-500 font-medium text-sm mb-2">{item.subtitle}</div>
                  )}
                  {item.description && (
                    <>
                      {item.description.includes('\n') || item.description.includes('•') ? (
                        <ul className="list-disc list-outside ml-4 text-sm text-slate-600 flex flex-col gap-1">
                          {item.description.split('\n').map((line, i) => (
                            line.trim() && <li key={i}>{line.replace(/^•\s*/, '')}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};