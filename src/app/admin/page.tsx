"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  Beaker,
  FileText,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import imageCompression from "browser-image-compression";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  institution: string;
  bio: string;
  avatarUrl?: string | null;
  linkedinUrl?: string | null;
  googleScholar?: string | null;
  order: number;
  isActive: boolean;
}

interface ResearchProject {
  id: string;
  title: string;
  abstract: string;
  coverImage?: string | null;
  status: string;
  date: string;
  order: number;
}

interface Publication {
  id: string;
  title: string;
  authors: string;
  journalName: string;
  publicationDate: string;
  doiLink?: string | null;
  abstract?: string | null;
  order: number;
}

interface Gallery {
  id: string;
  imageUrl: string;
  caption?: string | null;
  order: number;
  isActive: boolean;
}

type Tab = "team" | "projects" | "publications" | "settings" | "gallery";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("team");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (!data.user) {
        router.push("/admin/login");
      } else {
        setUser(data.user);
        fetchData();
      }
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [membersRes, projectsRes, pubsRes, galleryRes] = await Promise.all([
        fetch("/api/team-members"),
        fetch("/api/research-projects"),
        fetch("/api/publications"),
        fetch("/api/gallery"),
      ]);

      const [membersData, projectsData, pubsData, galleryData] = await Promise.all([
        membersRes.json(),
        projectsRes.json(),
        pubsRes.json(),
        galleryRes.json(),
      ]);

      setTeamMembers(membersData);
      setProjects(projectsData);
      setPublications(pubsData);
      setGallery(galleryData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSave = async (type: string, data: any) => {
    setSaving(true);
    try {
      const url = data.id ? `/api/${type}/${data.id}` : `/api/${type}`;
      const method = data.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        fetchData();
        setEditingItem(null);
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#39FF14]" />
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: "team" as Tab, label: "Team Members", icon: Users },
    { id: "projects" as Tab, label: "Research Projects", icon: Beaker },
    { id: "publications" as Tab, label: "Publications", icon: FileText },
    { id: "gallery" as Tab, label: "Gallery", icon: ImageIcon },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-[#1D7018]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Asrofi Lab Logo"
              width={36}
              height={36}
            />
            <h1 className="text-xl font-bold">Asrofi Lab CMS</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg
                       hover:bg-red-500/30 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                ${
                  activeTab === tab.id
                    ? "bg-[#1D7018] text-white"
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
                }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-900/50 rounded-xl border border-[#1D7018]/20 p-6">
          {/* Team Members Tab */}
          {activeTab === "team" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Team Members</h2>
                <button
                  onClick={() =>
                    setEditingItem({ type: "team-members", data: {} })
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-[#1D7018] rounded-lg
                           hover:bg-[#2E8B57] transition-colors"
                >
                  <Plus size={18} />
                  Add Member
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">
                        Role
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">
                        Institution
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="border-b border-gray-800/50 hover:bg-gray-800/30"
                      >
                        <td className="py-3 px-4">{member.name}</td>
                        <td className="py-3 px-4 text-gray-400">
                          {member.role}
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {member.institution}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              member.isActive
                                ? "bg-[#39FF14]/20 text-[#39FF14]"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {member.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                setEditingItem({
                                  type: "team-members",
                                  data: member,
                                })
                              }
                              className="p-2 hover:bg-gray-700 rounded transition-colors"
                            >
                              <Edit size={16} className="text-[#39FF14]" />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete("team-members", member.id)
                              }
                              className="p-2 hover:bg-gray-700 rounded transition-colors"
                            >
                              <Trash2 size={16} className="text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Research Projects</h2>
                <button
                  onClick={() =>
                    setEditingItem({ type: "research-projects", data: {} })
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-[#1D7018] rounded-lg
                           hover:bg-[#2E8B57] transition-colors"
                >
                  <Plus size={18} />
                  Add Project
                </button>
              </div>

              <div className="grid gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-800/30 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{project.title}</h3>
                          <span
                            className={`px-2 py-0.5 rounded text-xs ${
                              project.status === "ONGOING"
                                ? "bg-[#39FF14]/20 text-[#39FF14]"
                                : "bg-[#1D7018]/20 text-[#1D7018]"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {project.abstract}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() =>
                            setEditingItem({
                              type: "research-projects",
                              data: project,
                            })
                          }
                          className="p-2 hover:bg-gray-700 rounded transition-colors"
                        >
                          <Edit size={16} className="text-[#39FF14]" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete("research-projects", project.id)
                          }
                          className="p-2 hover:bg-gray-700 rounded transition-colors"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publications Tab */}
          {activeTab === "publications" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Publications</h2>
                <button
                  onClick={() =>
                    setEditingItem({ type: "publications", data: {} })
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-[#1D7018] rounded-lg
                           hover:bg-[#2E8B57] transition-colors"
                >
                  <Plus size={18} />
                  Add Publication
                </button>
              </div>

              <div className="grid gap-4">
                {publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="bg-gray-800/30 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{pub.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {pub.authors}
                        </p>
                        <p className="text-[#1D7018] text-sm">
                          {pub.journalName}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() =>
                            setEditingItem({ type: "publications", data: pub })
                          }
                          className="p-2 hover:bg-gray-700 rounded transition-colors"
                        >
                          <Edit size={16} className="text-[#39FF14]" />
                        </button>
                        <button
                          onClick={() => handleDelete("publications", pub.id)}
                          className="p-2 hover:bg-gray-700 rounded transition-colors"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gallery Photos</h2>
                <button
                  onClick={() => setEditingItem({ type: "gallery", data: {} })}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1D7018] rounded-lg
                           hover:bg-[#2E8B57] transition-colors"
                >
                  <Plus size={18} />
                  Add Photo
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gallery.map((img) => (
                  <div key={img.id} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden group flex flex-col">
                    <div className="aspect-square relative bg-black/50 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.imageUrl} alt={img.caption || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <p className="text-sm text-gray-300 line-clamp-2 mb-3">{img.caption || 'No caption'}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                            img.isActive ? "bg-[#39FF14]/20 text-[#39FF14]" : "bg-red-500/20 text-red-400"
                        }`}>
                          {img.isActive ? "Active" : "Hidden"}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingItem({ type: 'gallery', data: img })}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Edit size={14} className="text-[#39FF14]" />
                          </button>
                          <button
                            onClick={() => handleDelete('gallery', img.id)}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                          >
                            <Trash2 size={14} className="text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && <SettingsPanel />}
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <EditModal
          type={editingItem.type}
          data={editingItem.data}
          onSave={handleSave}
          onClose={() => setEditingItem(null)}
          saving={saving}
        />
      )}
    </div>
  );
}

function SettingsPanel() {
  const [settings, setSettings] = useState({
    siteName: "",
    heroTitle: "",
    heroSubtitle: "",
    aboutText: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings({
        siteName: data.siteName || "",
        heroTitle: data.heroTitle || "",
        heroSubtitle: data.heroSubtitle || "",
        aboutText: data.aboutText || "",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Site Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-[#1D7018] rounded-lg
                   hover:bg-[#2E8B57] transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) =>
              setSettings({ ...settings, siteName: e.target.value })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                     focus:border-[#39FF14] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Hero Title</label>
          <input
            type="text"
            value={settings.heroTitle}
            onChange={(e) =>
              setSettings({ ...settings, heroTitle: e.target.value })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                     focus:border-[#39FF14] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Hero Subtitle</label>
          <input
            type="text"
            value={settings.heroSubtitle}
            onChange={(e) =>
              setSettings({ ...settings, heroSubtitle: e.target.value })
            }
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                     focus:border-[#39FF14] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">About Text</label>
          <textarea
            value={settings.aboutText}
            onChange={(e) =>
              setSettings({ ...settings, aboutText: e.target.value })
            }
            rows={4}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                     focus:border-[#39FF14] focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function EditModal({
  type,
  data,
  onSave,
  onClose,
  saving,
}: {
  type: string;
  data: any;
  onSave: (type: string, data: any) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [formData, setFormData] = useState(data);

  const fields = {
    "team-members": [
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "institution", label: "Institution", type: "text" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "avatarUrl", label: "Avatar Image", type: "image" },
      { name: "linkedinUrl", label: "LinkedIn URL", type: "text" },
      { name: "googleScholar", label: "Google Scholar URL", type: "text" },
      { name: "order", label: "Order", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" },
    ],
    "research-projects": [
      { name: "title", label: "Title", type: "text" },
      { name: "abstract", label: "Abstract", type: "textarea" },
      { name: "coverImage", label: "Cover Image", type: "image" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["ONGOING", "COMPLETED"],
      },
      { name: "date", label: "Date", type: "date" },
      { name: "order", label: "Order", type: "number" },
    ],
    publications: [
      { name: "title", label: "Title", type: "text" },
      { name: "authors", label: "Authors", type: "text" },
      { name: "journalName", label: "Journal Name", type: "text" },
      { name: "publicationDate", label: "Publication Date", type: "date" },
      { name: "doiLink", label: "DOI Link", type: "text" },
      { name: "abstract", label: "Abstract", type: "textarea" },
      { name: "order", label: "Order", type: "number" },
    ],
    gallery: [
      { name: "imageUrl", label: "Upload Photo", type: "image" },
      { name: "caption", label: "Photo Caption", type: "text" },
      { name: "order", label: "Display Order", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" },
    ],
  };

  const currentFields = fields[type as keyof typeof fields] || [];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-xl border border-[#1D7018]/30 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">
            {data.id ? "Edit" : "Add New"} {type.replace("-", " ").slice(0, -1)}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {currentFields.map((field) => (
            <div key={field.name}>
              <label className="block text-gray-400 mb-2">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                           focus:border-[#39FF14] focus:outline-none transition-colors resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                           focus:border-[#39FF14] focus:outline-none transition-colors"
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[field.name] ?? true}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.name]: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-700 bg-gray-800 
                             checked:bg-[#1D7018] checked:border-[#39FF14]"
                  />
                  <span className="text-gray-300">Active</span>
                </label>
              ) : field.type === "image" ? (
                <ImageUploadField
                  value={formData[field.name] || ""}
                  onChange={(val) =>
                    setFormData({ ...formData, [field.name]: val })
                  }
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.name]:
                        field.type === "number"
                          ? parseInt(e.target.value) || 0
                          : e.target.value,
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3
                           focus:border-[#39FF14] focus:outline-none transition-colors"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(type, formData)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#1D7018] rounded-lg
                     hover:bg-[#2E8B57] transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 0.1, // Max ~100KB
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      // Convert to Base64 Data URI
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        onChange(base64data);
      };
    } catch (error) {
      console.error("Error compressing image:", error);
      alert("Failed to compress image.");
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer group">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      {isCompressing ? (
        <div className="flex flex-col items-center gap-2 text-gray-400 py-8">
          <Loader2 size={24} className="animate-spin text-[#39FF14]" />
          <span className="text-sm">Compressing to save space...</span>
        </div>
      ) : value ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-black/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Upload size={24} className="text-white mb-2" />
            <span className="text-sm text-white">Click or drag to replace</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-400 py-8">
          <Upload size={24} />
          <span className="text-sm font-medium">Click or Drag image here</span>
          <span className="text-xs text-gray-500">
            Auto-compressed to &lt;100KB
          </span>
        </div>
      )}
    </div>
  );
}
