import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { ResumeData } from '@/lib/types';

interface ATSScoreFactor {
  name: string;
  score: number;
  maxScore: number;
  passed: boolean;
  description: string;
}

interface ATSScore {
  totalScore: number;
  factors: ATSScoreFactor[];
  recommendations: string[];
}

export function ATSScoreChecker({ data }: { data: ResumeData }) {
  const [atsScore, setAtsScore] = useState<ATSScore>({
    totalScore: 0,
    factors: [],
    recommendations: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const calculateScore = async () => {
      setLoading(true);
      const score = await calculateATSScore(data);
      setAtsScore(score);
      setLoading(false);
    };
    
    calculateScore();
  }, [data]);

  const calculateATSScore = async (resumeData: ResumeData): Promise<ATSScore> => {
    const factors: ATSScoreFactor[] = [];
    const recommendations: string[] = [];
    let totalScore = 0;
    const maxTotal = 100;

    const allSummary = resumeData.pages.map(p => p.summary).join(' ');
    const allExperience = resumeData.pages.flatMap(p => p.experience);
    const allEducation = resumeData.pages.flatMap(p => p.education);
    const allSkills = resumeData.pages.flatMap(p => p.skills);
    const allCustomSections = resumeData.pages.flatMap(p => p.customSections);

    const validExperience = allExperience.filter(e => e.position?.trim() || e.company?.trim());
    const validEducation = allEducation.filter(e => e.school?.trim() || e.degree?.trim());
    const validSkills = allSkills.filter(s => s.trim());
    
    const hasContent = allSummary.trim() ||
                       validExperience.length > 0 ||
                       validEducation.length > 0 ||
                       validSkills.length > 0;

    if (!hasContent) {
      return {
        totalScore: 0,
        factors: [],
        recommendations: ["Start adding content to your resume to generate an ATS score."]
      };
    }

    const summaryAnalysis = analyzeSummaryForATS(allSummary);
    factors.push({
      name: 'Professional Summary',
      score: summaryAnalysis.score,
      maxScore: 15,
      passed: summaryAnalysis.score >= 10,
      description: summaryAnalysis.description,
    });
    totalScore += summaryAnalysis.score;

    if (summaryAnalysis.recommendations.length > 0) {
      recommendations.push(...summaryAnalysis.recommendations);
    }

    const experienceAnalysis = analyzeExperienceForATS(validExperience);
    factors.push({
      name: 'Work Experience',
      score: experienceAnalysis.score,
      maxScore: 30,
      passed: experienceAnalysis.score >= 18,
      description: experienceAnalysis.description,
    });
    totalScore += experienceAnalysis.score;

    if (experienceAnalysis.recommendations.length > 0) {
      recommendations.push(...experienceAnalysis.recommendations);
    }

    const educationScore = calculateEducationScore(validEducation);
    factors.push({
      name: 'Education',
      score: educationScore.score,
      maxScore: 20,
      passed: educationScore.score >= 13,
      description: `${validEducation.length} degree(s)`,
    });
    totalScore += educationScore.score;

    if (educationScore.recommendations.length > 0) {
      recommendations.push(...educationScore.recommendations);
    }

    const skillsAnalysis = await analyzeSkillsForATS(validSkills, { ...resumeData, summary: allSummary });
    factors.push({
      name: 'Skills',
      score: skillsAnalysis.score,
      maxScore: 25,
      passed: skillsAnalysis.score >= 15,
      description: skillsAnalysis.description,
    });
    totalScore += skillsAnalysis.score;

    if (skillsAnalysis.recommendations.length > 0) {
      recommendations.push(...skillsAnalysis.recommendations);
    }

    const keywordScore = calculateKeywordScore({ 
      ...resumeData, 
      summary: allSummary, 
      experience: allExperience, 
      education: allEducation, 
      skills: allSkills, 
      customSections: allCustomSections 
    });
    factors.push({
      name: 'Keywords & Formatting',
      score: keywordScore.score,
      maxScore: 10,
      passed: keywordScore.score >= 7,
      description: keywordScore.description,
    });
    totalScore += keywordScore.score;

    if (keywordScore.recommendations.length > 0) {
      recommendations.push(...keywordScore.recommendations);
    }

    return {
      totalScore: Math.min(totalScore, maxTotal),
      factors,
      recommendations: Array.from(new Set(recommendations)).slice(0, 5),
    };
  };

  const analyzeSummaryForATS = (summary: string): {
    score: number;
    description: string;
    recommendations: string[];
  } => {
    const trimmedSummary = summary.trim();
    const recommendations: string[] = [];
    
    if (!trimmedSummary) {
      return {
        score: 0,
        description: 'Missing',
        recommendations: ['Add a professional summary section']
      };
    }

    const wordCount = trimmedSummary.split(/\s+/).length;
    let lengthScore = 0;
    
    if (wordCount >= 40 && wordCount <= 80) {
      lengthScore = 5;
      recommendations.push('Optimal length for ATS');
    } else if (wordCount >= 20 && wordCount < 40) {
      lengthScore = 3;
      recommendations.push('Expand summary to 40-80 words for better ATS parsing');
    } else if (wordCount > 80 && wordCount <= 120) {
      lengthScore = 4;
    } else if (wordCount > 120) {
      lengthScore = 2;
      recommendations.push('Condense summary to 40-80 words for better ATS results');
    } else {
      lengthScore = 1;
      recommendations.push('Expand summary significantly (40-80 words ideal)');
    }

    const industryKeywords = [
      'experienced', 'skilled', 'proficient', 'expert', 'specialized',
      'qualified', 'certified', 'accomplished', 'proven', 'results',
      'managed', 'led', 'developed', 'implemented', 'achieved',
      'improved', 'increased', 'reduced', 'optimized', 'created'
    ];
    
    const foundKeywords = industryKeywords.filter(keyword => 
      new RegExp(`\\b${keyword}\\b`, 'i').test(trimmedSummary)
    ).length;
    
    let keywordScore = 0;
    if (foundKeywords >= 5) {
      keywordScore = 5;
      recommendations.push('Excellent keyword usage for ATS');
    } else if (foundKeywords >= 3) {
      keywordScore = 3;
      recommendations.push('Add 2-3 more industry keywords');
    } else {
      keywordScore = 1;
      recommendations.push('Add more action verbs and quantifiable terms');
    }

    let structureScore = 0;
    const sentences = trimmedSummary.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const hasStrongStart = /^(Experienced|Results-driven|Skilled|Proficient|Qualified)/i.test(trimmedSummary);
    const hasNumbers = /\d+/.test(trimmedSummary);
    
    if (hasStrongStart && hasNumbers && sentences.length >= 2) {
      structureScore = 5;
      recommendations.push('Perfect ATS-friendly structure');
    } else if (hasStrongStart && sentences.length >= 2) {
      structureScore = 3;
      if (!hasNumbers) recommendations.push('Add quantifiable achievements (numbers)');
    } else {
      structureScore = 1;
      recommendations.push('Start with strong action word and add measurable results');
    }

    const totalScore = lengthScore + keywordScore + structureScore + 1;
    
    return {
      score: totalScore,
      description: `${wordCount} words, ${foundKeywords} keywords, ${sentences.length} sentences`,
      recommendations: Array.from(new Set(recommendations)).slice(0, 3)
    };
  };

  const analyzeExperienceForATS = (experience: any[]): {
    score: number;
    description: string;
    recommendations: string[];
  } => {
    const recommendations: string[] = [];
    
    if (experience.length === 0) {
      return {
        score: 0,
        description: 'No experience',
        recommendations: ['Add work experience entries']
      };
    }

    let totalExperienceScore = 0;
    let jobCount = experience.length;
    
    const jobAnalyses = experience.map((job, index) => {
      return analyzeJobBulletPoints(job, index + 1);
    });

    const totalBulletPoints = jobAnalyses.reduce((sum, job) => sum + job.bulletCount, 0);
    const totalStrongBullets = jobAnalyses.reduce((sum, job) => sum + job.strongBullets, 0);
    const totalNumbersUsed = jobAnalyses.reduce((sum, job) => sum + job.numbersUsed, 0);
    
    let baseScore = 0;
    if (jobCount >= 3) {
      baseScore = 12;
    } else if (jobCount === 2) {
      baseScore = 9;
    } else if (jobCount === 1) {
      baseScore = 8;
    }
    
    let bulletScore = 0;
    const avgBulletsPerJob = totalBulletPoints / jobCount;
    
    if (avgBulletsPerJob >= 4) {
      bulletScore = 10;
      recommendations.push('Good number of bullet points per job');
    } else if (avgBulletsPerJob >= 3) {
      bulletScore = 7;
      recommendations.push('Consider adding 1-2 more bullet points per job');
    } else if (avgBulletsPerJob >= 2) {
      bulletScore = 5;
      recommendations.push('Aim for 3-5 bullet points per job position');
    } else {
      bulletScore = 2;
      recommendations.push('Add more detailed bullet points for each job');
    }
    
    let actionVerbScore = 0;
    const strongBulletPercentage = totalBulletPoints > 0 ? (totalStrongBullets / totalBulletPoints) * 100 : 0;
    
    if (strongBulletPercentage >= 70) {
      actionVerbScore = 8;
      recommendations.push('Excellent use of action verbs and impact statements');
    } else if (strongBulletPercentage >= 50) {
      actionVerbScore = 6;
      recommendations.push('Good start, strengthen more bullet points with action verbs');
    } else if (strongBulletPercentage >= 30) {
      actionVerbScore = 4;
      recommendations.push('Use more action verbs at start of bullet points');
    } else {
      actionVerbScore = 2;
      recommendations.push('Most bullet points should start with action verbs');
    }
    
    const totalScore = baseScore + bulletScore + actionVerbScore + 2;
    
    jobAnalyses.forEach(job => {
      if (job.recommendations.length > 0) {
        recommendations.push(...job.recommendations);
      }
    });
    
    const finalScore = Math.min(totalScore, 30);
    
    return {
      score: finalScore,
      description: `${jobCount} jobs, ${totalBulletPoints} bullets, ${totalNumbersUsed} metrics`,
      recommendations: Array.from(new Set(recommendations)).slice(0, 4)
    };
  };

  const analyzeJobBulletPoints = (job: any, jobNumber: number): {
    bulletCount: number;
    strongBullets: number;
    numbersUsed: number;
    recommendations: string[];
  } => {
    const recommendations: string[] = [];
    const description = job.description || '';
    
    const bulletPoints = description
      .split(/\n|•|\*|■|- (?=\w)/)
      .map(bp => bp.trim())
      .filter(bp => bp.length > 0);
    
    const bulletCount = bulletPoints.length;
    let strongBullets = 0;
    let numbersUsed = 0;
    
    bulletPoints.forEach((bullet: string, index: number) => {
      const strongActionVerbs = [
        'managed', 'led', 'developed', 'created', 'implemented',
        'achieved', 'increased', 'reduced', 'improved', 'optimized',
        'designed', 'built', 'established', 'executed', 'delivered'
      ];
      
      const firstWord = bullet.toLowerCase().split(/\s+/)[0];
      const startsWithActionVerb = strongActionVerbs.some(verb => 
        firstWord.startsWith(verb) || firstWord === verb
      );
      
      if (startsWithActionVerb) {
        strongBullets++;
      } else if (index === 0) {
        recommendations.push(`Job ${jobNumber}: Start first bullet with action verb (managed, led, etc.)`);
      }
      
      const hasNumbers = /\d+/.test(bullet);
      const hasPercentages = /%\s*increase|%\s*decrease|%\s*improvement|\d+%/i.test(bullet);
      const hasMoney = /\$|USD|EUR|GBP|\d+[kKmMbB]/.test(bullet);
      
      if (hasNumbers || hasPercentages || hasMoney) {
        numbersUsed++;
      } else if (bullet.length > 20) {
        recommendations.push(`Job ${jobNumber}: Add quantifiable results to bullet points`);
      }
      
      const wordCount = bullet.split(/\s+/).length;
      if (wordCount > 30) {
        recommendations.push(`Job ${jobNumber}: Bullet point too long (${wordCount} words), keep under 25`);
      } else if (wordCount < 5) {
        recommendations.push(`Job ${jobNumber}: Bullet point too short (${wordCount} words), add more detail`);
      }
    });
    
    if (bulletCount === 0) {
      recommendations.push(`Job ${jobNumber}: Add bullet points with specific achievements`);
    } else if (bulletCount < 3) {
      recommendations.push(`Job ${jobNumber}: Add more bullet points (aim for 3-5)`);
    }
    
    return {
      bulletCount,
      strongBullets,
      numbersUsed,
      recommendations: Array.from(new Set(recommendations))
    };
  };

  const analyzeSkillsForATS = async (skills: string[], resumeData: any): Promise<{
    score: number;
    description: string;
    recommendations: string[];
  }> => {
    const recommendations: string[] = [];
    
    if (skills.length === 0) {
      return {
        score: 0,
        description: 'No skills listed',
        recommendations: ['Add relevant skills to your resume']
      };
    }

    const uniqueSkills = Array.from(new Set(skills.map(s => s.trim())));
    const skillCount = uniqueSkills.length;
    
    let aiAnalysis;
    try {
      aiAnalysis = await getAISkillAnalysis(uniqueSkills, resumeData);
    } catch (error) {
      aiAnalysis = performFallbackAnalysis(uniqueSkills, resumeData);
    }
    
    let quantityScore = 0;
    if (skillCount >= 10 && skillCount <= 15) {
      quantityScore = 8;      
      recommendations.push('Excellent number of skills listed');
    } else if (skillCount > 15) {
      quantityScore = 6;   
      recommendations.push('Consider reducing skills to 10-15 most relevant');
    } else if (skillCount >= 5) {
      quantityScore = 4;     
      recommendations.push('Add more skills (aim for 10-15 total)');
    } else {
      quantityScore = 2;     
      recommendations.push('Significantly increase number of skills');
    }

    let specificityScore = Math.min(Math.round(aiAnalysis.specificity * 6), 6);
    if (aiAnalysis.specificityFeedback) {
      recommendations.push(aiAnalysis.specificityFeedback);
    }
    
    let balanceScore = 0;
    const categoryCount = Object.keys(aiAnalysis.categories).filter(key => 
      aiAnalysis.categories[key] && aiAnalysis.categories[key].length > 0
    ).length;
    
    if (categoryCount >= 4) {
      balanceScore = 6;
      recommendations.push('Excellent balance across skill categories');
    } else if (categoryCount >= 3) {
      balanceScore = 4;
      recommendations.push('Good category coverage');
    } else if (categoryCount >= 2) {
      balanceScore = 2;
      recommendations.push('Add more variety to skill categories');
    } else {
      balanceScore = 1;
      recommendations.push('Skills are too narrowly focused');
    }
    
    let relevanceScore = Math.min(Math.round(aiAnalysis.relevance * 5), 5);
    if (aiAnalysis.missingSkills && aiAnalysis.missingSkills.length > 0) {
      recommendations.push(`Add: ${aiAnalysis.missingSkills.slice(0, 3).join(', ')}`);
    }
    
    const totalScore = quantityScore + specificityScore + balanceScore + relevanceScore + 2;
    
    return {
      score: Math.min(totalScore, 25),
      description: `${skillCount} skills, ${categoryCount} categories, ${aiAnalysis.industry}`,
      recommendations: Array.from(new Set(recommendations)).slice(0, 3)
    };
  };

  const getAISkillAnalysis = async (skills: string[], resumeData: any) => {
    const industry = detectIndustryFromExperience(resumeData.experience || []);
    
    try {
      const response = await fetch('/api/ats/skills-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: skills,
          jobTitle: resumeData.personalInfo?.title || 'Professional',
          industry: industry,
          context: {
            experience: (resumeData.experience || []).map((e: any) => ({
              position: e.position,
              company: e.company,
              description: e.description
            })),
            summary: resumeData.summary
          }
        })
      });
      
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      return data.analysis;
    } catch (error) {
      return performFallbackAnalysis(skills, resumeData);
    }
  };

  const performFallbackAnalysis = (skills: string[], resumeData: any) => {
    const specificSkills = skills.filter(skill => {
      const wordCount = skill.split(' ').length;
      const isVague = /(basics|beginner|novice|familiar|some|aware)/i.test(skill);
      return wordCount <= 3 && !isVague;
    });
    
    const specificity = specificSkills.length / skills.length;
    
    const categories = {
      technical: skills.filter(s => /(python|java|javascript|react|sql|aws|docker|git|html|css|machine learning|ai)/i.test(s)),
      soft: skills.filter(s => /(communication|leadership|teamwork|problem solving|adaptability|creativity|time management)/i.test(s)),
      tools: skills.filter(s => /(excel|jira|trello|slack|figma|photoshop|salesforce|tableau)/i.test(s)),
      industry: skills.filter(s => !/(python|java|javascript|react|sql|aws|docker|git|html|css|machine learning|ai|communication|leadership|teamwork|problem solving|adaptability|creativity|time management|excel|jira|trello|slack|figma|photoshop|salesforce|tableau)/i.test(s))
    };
    
    const industry = detectIndustryFromExperience(resumeData.experience || []);
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const skillsInText = skills.filter(skill => 
      resumeText.includes(skill.toLowerCase())
    ).length;
    
    let relevance = 0.5 + (skillsInText / skills.length) * 0.3;
    
    return {
      specificity,
      categories,
      relevance: Math.min(relevance, 1),
      missingSkills: [],
      industry,
      specificityFeedback: specificity > 0.7 ? 'Skills are specific' : 'Use more specific skill names'
    };
  };

  const detectIndustryFromExperience = (experience: any[]): string => {
    const industryKeywords = {
      'software': /software|developer|engineer|programming|coding|tech|full.?stack|front.?end|back.?end/i,
      'data': /data|analyst|analytics|science|machine learning|ai|business intelligence/i,
      'marketing': /marketing|digital|seo|social media|brand|advertising|content/i,
      'finance': /finance|banking|investment|accounting|financial|wealth|risk/i,
      'design': /design|ux|ui|creative|graphic|visual|artist|illustrator/i,
      'sales': /sales|business development|account executive|revenue|growth/i,
      'product': /product|manager|owner|strategy|roadmap|feature|agile/i,
      'healthcare': /healthcare|medical|nursing|clinical|patient|hospital/i,
      'education': /education|teacher|professor|instructor|training/i,
      'general': /./
    };
    
    let maxMatches = 0;
    let detectedIndustry = 'general';
    
    experience.forEach((job: any) => {
      const text = `${job.position || ''} ${job.company || ''} ${job.description || ''}`.toLowerCase();
      
      Object.entries(industryKeywords).forEach(([industry, pattern]) => {
        if (pattern.test(text)) {
          const matches = (text.match(pattern) || []).length;
          if (matches > maxMatches) {
            maxMatches = matches;
            detectedIndustry = industry;
          }
        }
      });
    });
    
    return detectedIndustry;
  };

  const calculateEducationScore = (
    education: any[]
  ): { score: number; recommendations: string[] } => {
    let score = 0;
    const recommendations: string[] = [];

    if (education.length >= 2) score = 20;
    else if (education.length === 1) score = 19;
    else {
      recommendations.push('Add at least one education entry');
    }

    return { score, recommendations };
  };

  const calculateKeywordScore = (
    resumeData: any
  ): { score: number; description: string; recommendations: string[] } => {
    let score = 7;
    const recommendations: string[] = [];
    const fullText = JSON.stringify(resumeData).toLowerCase();

    const keywords = [
      'managed', 'led', 'developed', 'implemented', 'achieved',
      'improved', 'increased', 'reduced', 'optimized',
    ];
    const foundKeywords = keywords.filter(k => fullText.includes(k)).length;

    if (foundKeywords >= 6) score = 10;
    else if (foundKeywords >= 3) score = 9;
    else {
      recommendations.push('Use action verbs (managed, led, developed, etc.)');
    }

    return {
      score,
      description: `${foundKeywords}/9 action verbs found`,
      recommendations,
    };
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-blue-50 border-blue-200';
    if (score >= 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card className={`${getScoreBgColor(atsScore.totalScore)} border`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-5 w-5 ${getScoreColor(atsScore.totalScore)}`} />
            <CardTitle className="text-lg">ATS Score</CardTitle>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(atsScore.totalScore)}`}>
            {loading ? '...' : `${atsScore.totalScore}/100`}
          </div>
        </div>
      </CardHeader>
      {!loading && atsScore.factors.length > 0 && (
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {atsScore.factors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-2">
                    {factor.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <div className="text-sm">
                      <div className="font-medium">{factor.name}</div>
                      <div className="text-xs text-gray-500">{factor.description}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold">
                    {factor.score}/{factor.maxScore}
                  </div>
                </div>
              ))}
            </div>
            
            {atsScore.recommendations.length > 0 && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
                <ul className="space-y-1">
                  {atsScore.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}