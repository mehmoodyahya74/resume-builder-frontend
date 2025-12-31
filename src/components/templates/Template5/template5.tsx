import React from "react";
import { TemplateData } from "@/lib/types";
import "./Template5.css";

export const Template5 = ({ data }: { data: TemplateData }) => {
  // Languages array (your system doesn't have this, so we'll use skills or hardcode)
  const languages = ["English", "Spanish", "French"]; // You can customize these
  
  // Helper function for progress bar width (consistent with Template1 logic)
  const getProgressWidth = (index: number) => {
    return `${Math.min(100, 70 + (index * 10))}%`;
  };
  
  // Helper function for section letters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  return (
    <div className="template5-container bg-white text-slate-800 font-serif">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white p-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide font-sans mb-1">
            {data.personalInfo.fullName}
          </h1>
          <p className="text-slate-300 tracking-widest text-sm font-sans uppercase">
            {data.personalInfo.title}
          </p>
        </div>
        <div className="text-right text-sm text-slate-300 font-sans leading-relaxed">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-[240px_1fr] h-full min-h-[calc(297mm-120px)]">
        {/* Sidebar */}
        <div className="bg-slate-100 p-6 border-r border-slate-200">
          <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-200 shadow-inner">
            <img 
              src={data.personalInfo.imageUrl || "/images/profile.png"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mb-8">
            <h3 className="font-sans font-bold text-slate-900 uppercase text-sm border-b-2 border-slate-300 pb-1 mb-3">
              Education
            </h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="font-bold text-sm">{edu.school}</div>
                <div className="text-xs text-slate-600">{edu.degree}</div>
                <div className="text-xs text-slate-500">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="font-sans font-bold text-slate-900 uppercase text-sm border-b-2 border-slate-300 pb-1 mb-3">
              Skills
            </h3>
            <ul className="text-sm space-y-2">
              {data.skills.map((skill, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{skill}</span>
                  <div className="w-12 h-1 bg-slate-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-600" 
                      style={{ width: getProgressWidth(index) }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Custom Section Logic - List Types (Sidebar) */}
          {data.customSections.filter(section => 
            section.items.length > 0 && section.type === 'list'
          ).map((section, sectionIndex) => (
            <div key={section.id} className="mb-8">
              <h3 className="font-sans font-bold text-slate-900 uppercase text-sm border-b-2 border-slate-300 pb-1 mb-3">
                {section.title}
              </h3>
              
              <ul className="text-sm space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>{item.title}</span>
                    <div className="w-12 h-1 bg-slate-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-600" 
                        style={{ width: `${Math.min(100, 60 + (i * 15))}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-sans font-bold text-slate-900 uppercase text-sm border-b-2 border-slate-300 pb-1 mb-3">
              Languages
            </h3>
            <ul className="text-sm space-y-1 text-slate-700">
              {languages.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <section className="mb-8">
            <h2 className="font-sans font-bold text-xl text-slate-800 uppercase tracking-wide mb-4 flex items-center">
              <span className="bg-slate-800 text-white w-6 h-6 flex items-center justify-center rounded text-xs mr-2">
                P
              </span>
              Profile
            </h2>
            <p className="text-slate-600 leading-relaxed border-l-4 border-slate-200 pl-4 italic">
              {data.summary}
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-xl text-slate-800 uppercase tracking-wide mb-6 flex items-center">
              <span className="bg-slate-800 text-white w-6 h-6 flex items-center justify-center rounded text-xs mr-2">
                E
              </span>
              Experience
            </h2>
            
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-slate-900">{exp.position}</h3>
                    <span className="font-sans text-sm font-semibold text-slate-500">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="font-sans text-sm text-slate-600 uppercase tracking-wide mb-2">
                    {exp.company}
                  </div>
                  <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                    {exp.description.split('\n').map((desc, j) => (
                      <li key={j}>{desc.replace(/^•\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Custom Section Logic - Paragraph Types (Main Content) */}
          {data.customSections.filter(section => 
            section.items.length > 0 && section.type === 'paragraph'
          ).map((section, sectionIndex) => {
            const letter = sectionIndex < alphabet.length ? alphabet[sectionIndex + 2] : "X";
            
            return (
              <section key={section.id} className="mt-8">
                <h2 className="font-sans font-bold text-xl text-slate-800 uppercase tracking-wide mb-6 flex items-center">
                  <span className="bg-slate-800 text-white w-6 h-6 flex items-center justify-center rounded text-xs mr-2">
                    {letter}
                  </span>
                  {section.title}
                </h2>
                
                <div className="space-y-6">
                  {section.items.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-baseline mb-1">
                        {item.title && (
                          <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                        )}
                        {(item.startDate || item.endDate) && (
                          <span className="font-sans text-sm font-semibold text-slate-500">
                            {item.startDate} {item.endDate && `- ${item.endDate}`}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <div className="font-sans text-sm text-slate-600 uppercase tracking-wide mb-2">
                          {item.subtitle}
                        </div>
                      )}
                      {item.description && (
                        <>
                          {item.description.includes('\n') || item.description.includes('•') ? (
                            <ul className="list-disc ml-5 text-sm text-slate-700 space-y-1">
                              {item.description.split('\n').map((line, j) => (
                                line.trim() && <li key={j}>{line.replace(/^•\s*/, '')}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-slate-600 leading-relaxed border-l-4 border-slate-200 pl-4 italic">
                              {item.description}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
