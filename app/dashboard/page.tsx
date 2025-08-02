'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { User as UserIcon, Briefcase, Award, Settings, Plus, Edit2, Trash2, GraduationCap, ExternalLink } from 'lucide-react'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('profile')
  const router = useRouter()

  // Profile state
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    summary: ''
  })

  // Work experience state
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: 'Led development of microservices architecture, improving system performance by 40%.'
    }
  ])

  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', category: 'Programming', proficiency: 90 },
    { id: 2, name: 'React', category: 'Programming', proficiency: 85 },
    { id: 3, name: 'Project Management', category: 'Management', proficiency: 80 }
  ])

  const [education, setEducation] = useState([
    {
      id: 1,
      type: 'degree',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2018-09',
      endDate: '2022-05',
      gpa: '3.8',
      description: 'Focused on software engineering and data structures'
    }
  ]);

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-03',
      expiryDate: '2026-03',
      credentialId: 'AWS-SAA-123456',
      credentialUrl: 'https://aws.amazon.com/verification'
    }
  ]);

  const [editingExperience, setEditingExperience] = useState(null)
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  const [editingCertification, setEditingCertification] = useState(null);
  const [newEducation, setNewEducation] = useState({
    type: 'degree',
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: ''
  });
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: ''
  });
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  })
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Programming',
    proficiency: 50
  })

  const [showAddExperience, setShowAddExperience] = useState(false)
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [showAddCertification, setShowAddCertification] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        setProfile(prev => ({
          ...prev,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || ''
        }))
      } else {
        router.push('/')
      }
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        router.push('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const updateProfile = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  // Work experience management functions
  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      const experience = {
        ...newExperience,
        id: Date.now()
      }
      setExperiences([...experiences, experience])
      setNewExperience({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      })
      setShowAddExperience(false)
    }
  }

  const updateExperience = (id, updatedExperience) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, ...updatedExperience } : exp
    ))
    setEditingExperience(null)
  }

  const deleteExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id))
  }

  // Education management functions
  const addEducation = () => {
    if (newEducation.institution && newEducation.field) {
      const education_item = {
        ...newEducation,
        id: Date.now()
      };
      setEducation([...education, education_item]);
      setNewEducation({
        type: 'degree',
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: ''
      });
      setShowAddEducation(false);
    }
  };

  const updateEducation = (id, updatedEducation) => {
    setEducation(education.map(item => 
      item.id === id ? { ...item, ...updatedEducation } : item
    ));
    setEditingEducation(null);
  };

  const deleteEducation = (id) => {
    setEducation(education.filter(item => item.id !== id));
  };

  // Certification management functions
  const addCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      const cert = {
        ...newCertification,
        id: Date.now()
      };
      setCertifications([...certifications, cert]);
      setNewCertification({
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: ''
      });
      setShowAddCertification(false);
    }
  };

  const updateCertification = (id, updatedCert) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, ...updatedCert } : cert
    ));
    setEditingCertification(null);
  };

  const deleteCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  // Skill management functions
  const addSkill = () => {
    if (newSkill.name) {
      const skill = {
        ...newSkill,
        id: Date.now()
      }
      setSkills([...skills, skill])
      setNewSkill({
        name: '',
        category: 'Programming',
        proficiency: 50
      })
      setShowAddSkill(false)
    }
  }

  const updateSkill = (id, updatedSkill) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, ...updatedSkill } : skill
    ))
    setEditingSkill(null)
  }

  const deleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              <p className="text-gray-600">Welcome back, {profile.full_name || user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              <button
                onClick={() => setActiveSection('profile')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-left ${
                  activeSection === 'profile' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <UserIcon className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveSection('experience')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-left ${
                  activeSection === 'experience' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Experience</span>
              </button>
              <button
                onClick={() => setActiveSection('skills')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-left ${
                  activeSection === 'skills' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Award className="w-5 h-5" />
                <span>Skills</span>
              </button>
              <button
                onClick={() => setActiveSection('education')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-left ${
                  activeSection === 'education' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Education</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">

              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.full_name}
                        onChange={(e) => updateProfile('full_name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => updateProfile('phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => updateProfile('location', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="San Francisco, CA"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={profile.linkedin}
                        onChange={(e) => updateProfile('linkedin', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GitHub
                      </label>
                      <input
                        type="url"
                        value={profile.github}
                        onChange={(e) => updateProfile('github', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://github.com/johndoe"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => updateProfile('website', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://johndoe.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Summary
                    </label>
                    <textarea
                      value={profile.summary}
                      onChange={(e) => updateProfile('summary', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Write a brief summary about your professional background and career objectives..."
                    />
                  </div>

                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    Save Profile
                  </button>
                </div>
              )}

              {/* Work Experience Section */}
              {activeSection === 'experience' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
                    <button
                      onClick={() => setShowAddExperience(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="bg-gray-50 p-6 rounded-lg border">
                        {editingExperience === exp.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Job Title"
                              />
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Company"
                              />
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Location"
                              />
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={exp.current}
                                  onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })}
                                  className="rounded"
                                />
                                <label className="text-sm text-gray-700">Current Position</label>
                              </div>
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Start Date"
                              />
                              {!exp.current && (
                                <input
                                  type="month"
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="End Date"
                                />
                              )}
                            </div>
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows="3"
                              placeholder="Job description and achievements..."
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingExperience(null)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingExperience(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                                <p className="text-blue-600 font-medium">{exp.company}</p>
                                <p className="text-gray-600 text-sm">{exp.location}</p>
                                <p className="text-gray-600 text-sm">
                                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                  {' - '}
                                  {exp.current ? 'Present' : (exp.endDate && new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }))}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setEditingExperience(exp.id)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteExperience(exp.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-700 mt-2">{exp.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Experience Modal */}
                  {showAddExperience && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Add Work Experience</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={newExperience.title}
                              onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Job Title"
                            />
                            <input
                              type="text"
                              value={newExperience.company}
                              onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Company"
                            />
                            <input
                              type="text"
                              value={newExperience.location}
                              onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
                              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Location"
                            />
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={newExperience.current}
                                onChange={(e) => setNewExperience({...newExperience, current: e.target.checked, endDate: e.target.checked ? '' : newExperience.endDate})}
                                className="rounded"
                              />
                              <label className="text-sm text-gray-700">Current Position</label>
                            </div>
                            <input
                              type="month"
                              value={newExperience.startDate}
                              onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Start Date"
                            />
                            {!newExperience.current && (
                              <input
                                type="month"
                                value={newExperience.endDate}
                                onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="End Date"
                              />
                            )}
                          </div>
                          <textarea
                            value={newExperience.description}
                            onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="3"
                            placeholder="Job description and achievements..."
                          />
                        </div>
                        <div className="flex justify-end space-x-2 mt-6">
                          <button
                            onClick={() => setShowAddExperience(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={addExperience}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                          >
                            Add Experience
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                    <button
                      onClick={() => setShowAddSkill(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="bg-gray-50 p-4 rounded-lg border">
                        {editingSkill === skill.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Skill name"
                            />
                            <select
                              value={skill.category}
                              onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="Programming">Programming</option>
                              <option value="Design">Design</option>
                              <option value="Management">Management</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Other">Other</option>
                            </select>
                            <div>
                              <label className="block text-sm text-gray-700 mb-1">Proficiency: {skill.proficiency}%</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={skill.proficiency}
                                onChange={(e) => updateSkill(skill.id, { proficiency: parseInt(e.target.value) })}
                                className="w-full"
                              />
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingSkill(null)}
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingSkill(null)}
                                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                                <p className="text-sm text-gray-600">{skill.category}</p>
                              </div>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => setEditingSkill(skill.id)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => deleteSkill(skill.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Proficiency</span>
                                <span>{skill.proficiency}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${skill.proficiency}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Skill Modal */}
                  {showAddSkill && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Add Skill</h3>
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Skill name"
                          />
                          <select
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Management">Management</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Other">Other</option>
                          </select>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Proficiency: {newSkill.proficiency}%</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={newSkill.proficiency}
                              onChange={(e) => setNewSkill({...newSkill, proficiency: parseInt(e.target.value)})}
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-6">
                          <button
                            onClick={() => setShowAddSkill(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={addSkill}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                          >
                            Add Skill
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

          {/* Education Section */}
          {activeSection === 'education' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Education & Certifications</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowAddEducation(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Education</span>
                  </button>
                  <button
                    onClick={() => setShowAddCertification(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>Add Certification</span>
                  </button>
                </div>
              </div>

              {/* Education List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Education
                </h3>
                {education.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    {editingEducation === item.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={item.type}
                              onChange={(e) => updateEducation(item.id, { type: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="degree">Degree</option>
                              <option value="diploma">Diploma</option>
                              <option value="certificate">Certificate</option>
                              <option value="course">Course</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                            <input
                              type="text"
                              value={item.institution}
                              onChange={(e) => updateEducation(item.id, { institution: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="University/School name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Title</label>
                            <input
                              type="text"
                              value={item.degree}
                              onChange={(e) => updateEducation(item.id, { degree: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Bachelor of Science, etc."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                            <input
                              type="text"
                              value={item.field}
                              onChange={(e) => updateEducation(item.id, { field: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                              type="month"
                              value={item.startDate}
                              onChange={(e) => updateEducation(item.id, { startDate: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                              type="month"
                              value={item.endDate}
                              onChange={(e) => updateEducation(item.id, { endDate: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
                            <input
                              type="text"
                              value={item.gpa}
                              onChange={(e) => updateEducation(item.id, { gpa: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="3.8, 4.0, etc."
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => updateEducation(item.id, { description: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="3"
                            placeholder="Relevant coursework, achievements, etc."
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingEducation(null)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingEducation(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {item.degree} {item.degree && item.field && 'in'} {item.field}
                            </h4>
                            <p className="text-blue-600 font-medium">{item.institution}</p>
                            <p className="text-gray-600 text-sm">
                              {item.startDate && new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                              {item.startDate && item.endDate && ' - '}
                              {item.endDate && new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                              {item.gpa && ` • GPA: ${item.gpa}`}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingEducation(item.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteEducation(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-gray-700 mt-2">{item.description}</p>
                        )}
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === 'degree' ? 'bg-blue-100 text-blue-800' :
                            item.type === 'diploma' ? 'bg-green-100 text-green-800' :
                            item.type === 'certificate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Certifications List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Certifications
                </h3>
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    {editingCertification === cert.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="AWS Solutions Architect, PMP, etc."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Amazon Web Services, PMI, etc."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                            <input
                              type="month"
                              value={cert.issueDate}
                              onChange={(e) => updateCertification(cert.id, { issueDate: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                            <input
                              type="month"
                              value={cert.expiryDate}
                              onChange={(e) => updateCertification(cert.id, { expiryDate: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID (Optional)</label>
                            <input
                              type="text"
                              value={cert.credentialId}
                              onChange={(e) => updateCertification(cert.id, { credentialId: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Certificate ID or Badge Number"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL (Optional)</label>
                            <input
                              type="url"
                              value={cert.credentialUrl}
                              onChange={(e) => updateCertification(cert.id, { credentialUrl: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="https://verify.example.com/..."
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingCertification(null)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCertification(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{cert.name}</h4>
                            <p className="text-blue-600 font-medium">{cert.issuer}</p>
                            <p className="text-gray-600 text-sm">
                              Issued: {cert.issueDate && new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                              {cert.expiryDate && (
                                <span> • Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                              )}
                            </p>
                            {cert.credentialId && (
                              <p className="text-gray-600 text-sm">Credential ID: {cert.credentialId}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                                title="View Credential"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            <button
                              onClick={() => setEditingCertification(cert.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteCertification(cert.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {/* Status indicator for expiry */}
                        {cert.expiryDate && (
                          <div className="mt-2">
                            {new Date(cert.expiryDate) > new Date() ? (
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Expired
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Education Modal */}
              {showAddEducation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4">Add Education</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <select
                            value={newEducation.type}
                            onChange={(e) => setNewEducation({...newEducation, type: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="degree">Degree</option>
                            <option value="diploma">Diploma</option>
                            <option value="certificate">Certificate</option>
                            <option value="course">Course</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                          <input
                            type="text"
                            value={newEducation.institution}
                            onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="University/School name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Title</label>
                          <input
                            type="text"
                            value={newEducation.degree}
                            onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Bachelor of Science, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study *</label>
                          <input
                            type="text"
                            value={newEducation.field}
                            onChange={(e) => setNewEducation({...newEducation, field: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Computer Science, Business, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                          <input
                            type="month"
                            value={newEducation.startDate}
                            onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                          <input
                            type="month"
                            value={newEducation.endDate}
                            onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
                          <input
                            type="text"
                            value={newEducation.gpa}
                            onChange={(e) => setNewEducation({...newEducation, gpa: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="3.8, 4.0, etc."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                        <textarea
                          value={newEducation.description}
                          onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="3"
                          placeholder="Relevant coursework, achievements, etc."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                      <button
                        onClick={() => setShowAddEducation(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addEducation}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Add Education
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Certification Modal */}
              {showAddCertification && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4">Add Certification</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name *</label>
                          <input
                            type="text"
                            value={newCertification.name}
                            onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="AWS Solutions Architect, PMP, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization *</label>
                          <input
                            type="text"
                            value={newCertification.issuer}
                            onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Amazon Web Services, PMI, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                          <input
                            type="month"
                            value={newCertification.issueDate}
                            onChange={(e) => setNewCertification({...newCertification, issueDate: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                          <input
                            type="month"
                            value={newCertification.expiryDate}
                            onChange={(e) => setNewCertification({...newCertification, expiryDate: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID (Optional)</label>
                          <input
                            type="text"
                            value={newCertification.credentialId}
                            onChange={(e) => setNewCertification({...newCertification, credentialId: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Certificate ID or Badge Number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL (Optional)</label>
                          <input
                            type="url"
                            value={newCertification.credentialUrl}
                            onChange={(e) => setNewCertification({...newCertification, credentialUrl: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://verify.example.com/..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                      <button
                        onClick={() => setShowAddCertification(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addCertification}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Add Certification
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}