import React from "react";
import { TemplateData } from "@/lib/types";
import "./Template4.css";

export const Template4 = ({ data }: { data: TemplateData }) => {
  return (
    <div className="template4-container bg-white text-zinc-800 font-sans relative overflow-hidden">
      {/* Header Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-64 bg-amber-400 z-0 transform -skew-y-2 origin-top-left scale-110"></div>
      
      {/* Header Content */}
      <div className="relative z-10 px-10 pt-12 pb-8 flex items-end gap-8">
        <div className="w-40 h-40 rounded-lg shadow-xl overflow-hidden border-4 border-white bg-white shrink-0">
          <img 
            src={data.personalInfo.imageUrl || "/images/profile.png"} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mb-2">
          <h1 className="text-5xl font-black text-white drop-shadow-md tracking-tight leading-none mb-2">
            {data.personalInfo.fullName.split(' ')[0]}
            <br />
            {data.personalInfo.fullName.split(' ').slice(1).join(' ')}
          </h1>
          <div className="bg-black text-white inline-block px-4 py-1 font-bold uppercase tracking-wider text-sm transform -skew-x-12">
            {data.personalInfo.title}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 px-10 mt-8">
        {/* Left Column - Main Content */}
        <div className="col-span-8 flex flex-col gap-8">
          <section>
            <h2 className="text-2xl font-black uppercase border-b-4 border-amber-400 inline-block mb-4">About Me</h2>
            <p className="text-zinc-600 leading-relaxed font-medium">
              {data.summary}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase border-b-4 border-amber-400 inline-block mb-6">Experience</h2>
            <div className="flex flex-col gap-8">
              {data.experience.map((exp, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-1">
                    <h3 className="text-xl font-bold group-hover:text-amber-500 transition-colors">{exp.position}</h3>
                    <span className="font-mono text-sm text-zinc-400">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-amber-600 font-bold text-sm mb-3 uppercase tracking-wide">{exp.company}</div>
                  <ul className="space-y-2">
                    {exp.description.split('\n').map((desc, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-zinc-300 rounded-full shrink-0"></span>
                        {desc.replace(/^•\s*/, '')}
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
          ).map((section) => (
            <section key={section.id}>
              <h2 className="text-2xl font-black uppercase border-b-4 border-amber-400 inline-block mb-6">
                {section.title}
              </h2>
              
              <div className="flex flex-col gap-8">
                {section.items.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-end mb-1">
                      {item.title && (
                        <h3 className="text-xl font-bold group-hover:text-amber-500 transition-colors">{item.title}</h3>
                      )}
                      {(item.startDate || item.endDate) && (
                        <span className="font-mono text-sm text-zinc-400">
                          {item.startDate} {item.endDate && `- ${item.endDate}`}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <div className="text-amber-600 font-bold text-sm mb-3 uppercase tracking-wide">
                        {item.subtitle}
                      </div>
                    )}
                    {item.description && (
                      <>
                        {item.description.includes('\n') || item.description.includes('•') ? (
                          <ul className="space-y-2">
                            {item.description.split('\n').map((line, j) => (
                              line.trim() && (
                                <li key={j} className="flex items-start gap-2 text-sm text-zinc-600">
                                  <span className="mt-1.5 w-1.5 h-1.5 bg-zinc-300 rounded-full shrink-0"></span>
                                  {line.replace(/^•\s*/, '')}
                                </li>
                              )
                            ))}
                          </ul>
                        ) : (
                          <p className="text-zinc-600 leading-relaxed font-medium">
                            {item.description}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Right Column - Sidebar */}
        <div className="col-span-4 flex flex-col gap-8">
          <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100">
            <h3 className="font-black uppercase mb-4 text-lg">Contact</h3>
            <div className="flex flex-col gap-3 text-sm font-medium text-zinc-600 break-all">
              <p>{data.personalInfo.email}</p>
              <p>{data.personalInfo.phone}</p>
              <p>{data.personalInfo.location}</p>
              <p className="text-amber-600">{data.personalInfo.website}</p>
            </div>
          </div>

          <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <h3 className="font-black uppercase mb-4 text-lg text-amber-400">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="border border-zinc-700 px-2 py-1 rounded text-xs hover:bg-zinc-800 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black uppercase mb-4 text-lg">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} className="border-l-4 border-amber-400 pl-4 py-1">
                <div className="font-bold">{edu.school}</div>
                <div className="text-sm text-zinc-500">{edu.degree}</div>
                <div className="text-xs text-zinc-400 mt-1">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Custom Section Logic - List Types (Right Column) */}
          {data.customSections.filter(section => 
            section.items.length > 0 && section.type === 'list'
          ).map((section) => (
            <div key={section.id} className="bg-zinc-900 text-white p-6 rounded-xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <h3 className="font-black uppercase mb-4 text-lg text-amber-400">
                {section.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {section.items.map((item, i) => (
                  <span key={i} className="border border-zinc-700 px-2 py-1 rounded text-xs hover:bg-zinc-800 transition-colors">
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};