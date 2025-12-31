import React from "react";
import { TemplateData } from "@/lib/types";
import "./Template7.css";

export const Template7 = ({ data }: { data: TemplateData }) => {
  return (
    <div className="template7-container bg-white text-black font-serif p-12 max-w-[210mm]">
      {/* Header */}
      <div className="text-center border-b border-black pb-6 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">
          {data.personalInfo.fullName}
        </h1>
        <div className="flex justify-center gap-4 text-sm font-sans flex-wrap">
          <span>{data.personalInfo.location}</span>
          <span>|</span>
          <span>{data.personalInfo.phone}</span>
          <span>|</span>
          <span>{data.personalInfo.email}</span>
          <span>|</span>
          <span>{data.personalInfo.website}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 font-sans">
          Professional Summary
        </h2>
        <p className="text-sm leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 font-sans">
          Experience
        </h2>
        <div className="flex flex-col gap-4">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base">{exp.company}</h3>
                <span className="text-sm font-sans">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-2 italic">
                <span className="text-sm">{exp.position}</span>
                <span className="text-sm font-sans"></span>
              </div>
              <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                {exp.description.split('\n').map((desc, j) => (
                  <li key={j}>{desc.replace(/^•\s*/, '')}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Custom Section Logic - Paragraph Types (After Experience) */}
      {data.customSections.filter(section => 
        section.items.length > 0 && section.type === 'paragraph'
      ).map((section) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 font-sans">
            {section.title}
          </h2>
          
          <div className="flex flex-col gap-4">
            {section.items.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  {item.title && (
                    <h3 className="font-bold text-base">{item.title}</h3>
                  )}
                  {(item.startDate || item.endDate) && (
                    <span className="text-sm font-sans">
                      {item.startDate} {item.endDate && `- ${item.endDate}`}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <div className="flex justify-between items-baseline mb-2 italic">
                    <span className="text-sm">{item.subtitle}</span>
                    <span className="text-sm font-sans"></span>
                  </div>
                )}
                {item.description && (
                  <>
                    {item.description.includes('\n') || item.description.includes('•') ? (
                      <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                        {item.description.split('\n').map((line, j) => (
                          line.trim() && <li key={j}>{line.replace(/^•\s*/, '')}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm leading-relaxed">{item.description}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 font-sans">
          Education
        </h2>
        {data.education.map((edu, i) => (
          <div key={i} className="flex justify-between items-baseline mb-3 last:mb-0">
            <div>
              <div className="font-bold text-sm">{edu.school}</div>
              <div className="text-sm italic">{edu.degree}</div>
            </div>
            <div className="text-sm font-sans">
              {edu.startDate} - {edu.endDate}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 font-sans">
          Skills
        </h2>
        <div className="text-sm leading-relaxed">
          {data.skills.join(" • ")}
        </div>
      </div>

      {/* Enhanced Custom Section Logic - List Types (After Skills) */}
      {data.customSections.filter(section => 
        section.items.length > 0 && section.type === 'list'
      ).map((section) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1 font-sans">
            {section.title}
          </h2>
          
          <div className="text-sm leading-relaxed">
            {section.items.map((item, i) => (
              <span key={i}>
                {item.title}
                {i < section.items.length - 1 && " • "}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
