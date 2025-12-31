import React from "react";
import { TemplateData } from "@/lib/types";
import "./Template8.css";

export const Template8 = ({ data }: { data: TemplateData }) => {
  return (
    <div className="template8-container bg-[#1a1b26] text-[#a9b1d6] font-mono">
      <div className="p-8 h-full">
        <div className="mb-8 border-b border-[#414868] pb-6">
          <div className="flex justify-between items-end mb-4">
            <h1 className="text-4xl font-bold text-[#7aa2f7] tracking-tight">
              <span className="text-[#bb9af7]">&lt;</span>
              {data.personalInfo.fullName}
              <span className="text-[#bb9af7] text-xl"> /&gt;</span>
            </h1>
            <div className="text-[#e0af68] font-bold text-lg">{data.personalInfo.title}</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#565f89]">
            <div>const email = "{data.personalInfo.email}";</div>
            <div className="text-right">const location = "{data.personalInfo.location}";</div>
            <div>const phone = "{data.personalInfo.phone}";</div>
            <div className="text-right">const website = "{data.personalInfo.website}";</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <section className="mb-8">
              <h2 className="text-[#7dcfff] font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-[#565f89]">00.</span> Professional Summary
              </h2>
              <div className="bg-[#24283b] p-4 rounded border border-[#414868]">
                <p className="text-[#c0caf5] text-sm leading-relaxed">
                  {data.summary}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-[#7dcfff] font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-[#565f89]">01.</span> Experience
              </h2>
              <div className="flex flex-col gap-6">
                {data.experience.map((exp, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between text-[#c0caf5] mb-1">
                      <h3 className="font-bold text-lg group-hover:text-[#7aa2f7] transition-colors">
                        {exp.position}
                      </h3>
                      <span className="text-sm opacity-70">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="text-[#9aa5ce] text-sm mb-2">@{exp.company}</div>
                    <ul className="space-y-1">
                      {exp.description.split('\n').map((desc, j) => (
                        <li key={j} className="flex gap-2 text-sm">
                          <span className="text-[#bb9af7] mt-1">▹</span>
                          <span className="leading-relaxed">{desc.replace(/^•\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Enhanced Custom Section Logic - Paragraph Types (Left Column) */}
            {data.customSections.filter(section => 
              section.items.length > 0 && section.type === 'paragraph'
            ).map((section, sectionIndex) => {
              const number = (sectionIndex + 3).toString().padStart(2, '0');
              
              return (
                <section key={section.id} className="mb-8">
                  <h2 className="text-[#7dcfff] font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-[#565f89]">{number}.</span> {section.title}
                  </h2>
                  
                  <div className="flex flex-col gap-6">
                    {section.items.map((item, i) => (
                      <div key={i} className="group">
                        <div className="flex justify-between text-[#c0caf5] mb-1">
                          {item.title && (
                            <h3 className="font-bold text-lg group-hover:text-[#7aa2f7] transition-colors">
                              {item.title}
                            </h3>
                          )}
                          {(item.startDate || item.endDate) && (
                            <span className="text-sm opacity-70">
                              {item.startDate} {item.endDate && `- ${item.endDate}`}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[#9aa5ce] text-sm mb-2">@{item.subtitle}</div>
                        )}
                        {item.description && (
                          <>
                            {item.description.includes('\n') || item.description.includes('•') ? (
                              <ul className="space-y-1">
                                {item.description.split('\n').map((line, j) => (
                                  line.trim() && (
                                    <li key={j} className="flex gap-2 text-sm">
                                      <span className="text-[#bb9af7] mt-1">▹</span>
                                      <span className="leading-relaxed">{line.replace(/^•\s*/, '')}</span>
                                    </li>
                                  )
                                ))}
                              </ul>
                            ) : (
                              <div className="bg-[#24283b] p-4 rounded border border-[#414868]">
                                <p className="text-[#c0caf5] text-sm leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
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
          
          <div className="col-span-1">
            <section className="mb-8">
              <h2 className="text-[#7dcfff] font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-[#565f89]">02.</span> Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-[#24283b] text-[#9aa5ce] px-2 py-1 rounded border border-[#414868] hover:border-[#7aa2f7] hover:text-[#7aa2f7] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-[#7dcfff] font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-[#565f89]">03.</span> Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} className="bg-[#24283b] p-3 rounded border border-[#414868] mb-3 last:mb-0">
                  <div className="text-[#c0caf5] font-bold text-sm">{edu.school}</div>
                  <div className="text-[#9aa5ce] text-xs mt-1">{edu.degree}</div>
                  <div className="text-[#565f89] text-xs mt-2 font-bold">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </section>

            {/* Enhanced Custom Section Logic - List Types (Right Column) */}
            {data.customSections.filter(section => 
              section.items.length > 0 && section.type === 'list'
            ).map((section, sectionIndex) => {
              const number = (sectionIndex + 4).toString().padStart(2, '0');
              
              return (
                <section key={section.id} className="mb-8">
                  <h2 className="text-[#7dcfff] font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-[#565f89]">{number}.</span> {section.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-[#24283b] text-[#9aa5ce] px-2 py-1 rounded border border-[#414868] hover:border-[#7aa2f7] hover:text-[#7aa2f7] transition-colors cursor-default"
                      >
                        {item.title}
                      </span>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};