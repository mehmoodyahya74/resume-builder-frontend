import React from "react";
import { TemplateData } from "@/lib/types";
import "./template2.css";

export const Template2 = ({ data }: { data: TemplateData }) => {
  return (
    <div className="template2-simple">
      {/* Header */}
      <div className="template2-header">
        <div className="template2-name-title">
          <h1>{data.personalInfo.fullName}</h1>
          <h2>{data.personalInfo.title}</h2>
        </div>
        <div className="template2-contact">
          <p><strong>Email:</strong> {data.personalInfo.email}</p>
          <p><strong>Phone:</strong> {data.personalInfo.phone}</p>
          <p><strong>Location:</strong> {data.personalInfo.location}</p>
          <p><strong>Website:</strong> {data.personalInfo.website}</p>
        </div>
      </div>

      {/* Two Columns */}
      <div className="template2-content">
        {/* Left Column */}
        <div className="template2-left">
          <div className="template2-section">
            <h3>PROFILE</h3>
            <p>{data.summary}</p>
          </div>

          <div className="template2-section">
            <h3>EXPERIENCE</h3>
            {data.experience.map((job) => (
              <div key={job.id} className="template2-experience">
                <h4>{job.position}</h4>
                <div className="template2-job-meta">
                  <span className="template2-company">{job.company}</span>
                  <span className="template2-dates">{job.startDate} - {job.endDate}</span>
                </div>
                <ul>
                  {job.description.split('\n').map((desc, i) => (
                    <li key={i}>{desc.replace(/^•\s*/, '')}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Enhanced Custom Section Logic - MATCHING Template2's Experience Structure */}
          {data.customSections.filter(section => 
            section.items.length > 0 && section.type === 'paragraph'
          ).map((section) => (
            <div key={section.id} className="template2-section">
              <h3>{section.title.toUpperCase()}</h3>
              
              {section.items.map((item, i) => (
                <div key={i} className="template2-experience">
                  {item.title && <h4>{item.title}</h4>}
                  <div className="template2-job-meta">
                    {item.subtitle && (
                      <span className="template2-company">{item.subtitle}</span>
                    )}
                    {(item.startDate || item.endDate) && (
                      <span className="template2-dates">
                        {item.startDate} {item.endDate && `- ${item.endDate}`}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <>
                      {item.description.includes('\n') || item.description.includes('•') ? (
                        <ul>
                          {item.description.split('\n').map((line, j) => (
                            line.trim() && <li key={j}>{line.replace(/^•\s*/, '')}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="template2-summary-text mt-2">{item.description}</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="template2-right">
          <div className="template2-profile-image">
            <img 
              src={data.personalInfo.imageUrl || "/images/profile.png"} 
              alt={data.personalInfo.fullName} 
            />
          </div>

          <div className="template2-section">
            <h3>EDUCATION</h3>
            {data.education.map((edu) => (
              <div key={edu.id} className="template2-education">
                <h4>{edu.degree}</h4>
                <p className="template2-school">{edu.school}</p>
                <p className="template2-education-dates">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>

          <div className="template2-section">
            <h3>SKILLS</h3>
            <div className="template2-skills">
              {data.skills.map((skill) => (
                <span key={skill} className="template2-skill">{skill}</span>
              ))}
            </div>
          </div>

          {/* Enhanced Custom Section Logic - MATCHING Template2's Skills Structure */}
          {data.customSections.filter(section => 
            section.items.length > 0 && section.type === 'list'
          ).map((section) => (
            <div key={section.id} className="template2-section">
              <h3>{section.title.toUpperCase()}</h3>
              <div className="template2-skills">
                {section.items.map((item, i) => (
                  <span key={i} className="template2-skill">{item.title}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};