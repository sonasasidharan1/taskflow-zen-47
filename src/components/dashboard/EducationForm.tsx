import React, { useState } from "react";
import {
  EducationData,
  EducationItem,
  CertificationItem,
  updatePortfolioSection,
} from "@/services/portfolioService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

const emptyEducationItem = (): EducationItem => ({
  degree: "",
  institution: "",
  year: "",
  gpa: "",
  achievements: [],
  description: "",
});

const emptyCertification = (): CertificationItem => ({
  name: "",
  issuer: "",
  year: "",
  credentialId: "",
});

const achievementsToText = (a: string[]) => a.join("\n");
const textToAchievements = (t: string) =>
  t
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

interface EducationFormProps {
  initialData: EducationData;
}

const EducationForm: React.FC<EducationFormProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<EducationData>(() => {
    const merged: EducationData = {
      heading: "",
      description: "",
      education: [],
      certifications: [],
      ...initialData,
    };
    if (!merged.education.length) merged.education = [emptyEducationItem()];
    if (!merged.certifications.length)
      merged.certifications = [emptyCertification()];
    return merged;
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleField = (field: keyof EducationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateEdu = (index: number, patch: Partial<EducationItem>) => {
    setFormData((prev) => {
      const education = [...prev.education];
      education[index] = { ...education[index], ...patch };
      return { ...prev, education };
    });
  };

  const updateCert = (index: number, patch: Partial<CertificationItem>) => {
    setFormData((prev) => {
      const certifications = [...prev.certifications];
      certifications[index] = { ...certifications[index], ...patch };
      return { ...prev, certifications };
    });
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, emptyEducationItem()],
    }));
  };

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addCert = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, emptyCertification()],
    }));
  };

  const removeCert = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload: EducationData = {
      ...formData,
      education: formData.education.filter(
        (e) => e.degree.trim() || e.institution.trim()
      ),
      certifications: formData.certifications.filter(
        (c) => c.name.trim() || c.issuer.trim()
      ),
    };
    try {
      await updatePortfolioSection("education", payload);
      toast({
        title: "Saved",
        description: "Education section updated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save education.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education & Certifications</CardTitle>
        <CardDescription>
          This content is shown on the public Education section. Save to write
          to Firestore under <code className="text-xs">portfolio/main</code>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="edu-heading">Section heading</Label>
            <Input
              id="edu-heading"
              value={formData.heading}
              onChange={(e) => handleField("heading", e.target.value)}
              placeholder="Education & Certifications"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edu-desc">Section description</Label>
            <Textarea
              id="edu-desc"
              value={formData.description}
              onChange={(e) => handleField("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">Education entries</Label>
              <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                Add entry
              </Button>
            </div>
            {formData.education.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEdu(index, { degree: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) =>
                        updateEdu(index, { institution: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Years</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) => updateEdu(index, { year: e.target.value })}
                      placeholder="2018 - 2020"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEdu(index, { gpa: e.target.value })}
                      placeholder="3.9/4.0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) =>
                      updateEdu(index, { description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Achievements (one per line)</Label>
                  <Textarea
                    value={achievementsToText(edu.achievements)}
                    onChange={(e) =>
                      updateEdu(index, {
                        achievements: textToAchievements(e.target.value),
                      })
                    }
                    rows={3}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">Certifications</Label>
              <Button type="button" variant="outline" size="sm" onClick={addCert}>
                Add certification
              </Button>
            </div>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Name</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCert(index, { name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuer</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCert(index, { issuer: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      value={cert.year}
                      onChange={(e) => updateCert(index, { year: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Credential ID</Label>
                    <Input
                      value={cert.credentialId}
                      onChange={(e) =>
                        updateCert(index, { credentialId: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeCert(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save education"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EducationForm;
