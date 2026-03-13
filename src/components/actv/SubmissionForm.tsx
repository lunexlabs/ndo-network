"use client";

import { useState } from "react";

type SubmissionData = {
  season: string;
  island_name: string;
  dream_address: string;
  theme: string;
  custom_theme: string;
  description: string;
  creator_name: string;
  discord: string;
  email: string;
};

const MAX_CHARS = 500;
const MAX_IMAGES = 3;

export default function SubmissionForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [duplicateStatus, setDuplicateStatus] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [form, setForm] = useState<SubmissionData>({
    season: "",
    island_name: "",
    dream_address: "",
    theme: "",
    custom_theme: "",
    description: "",
    creator_name: "",
    discord: "",
    email: "",
  });

  /* -------------------------------
     DREAM ADDRESS AUTO FORMAT
  ------------------------------- */
  const formatDreamAddress = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 12);
    const parts = numbers.match(/.{1,4}/g);
    return parts ? "DA-" + parts.join("-") : "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "dream_address") {
      setForm({ ...form, dream_address: formatDreamAddress(value) });
      return;
    }

    if (name === "description" && value.length > MAX_CHARS) return;

    setForm({ ...form, [name]: value });
  };

  /* -------------------------------
     FILE HANDLING
  ------------------------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);

    if (selected.length + files.length > MAX_IMAGES) {
      setError("Maximum 3 screenshots allowed.");
      return;
    }

    setError("");
    setFiles([...files, ...selected]);
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  /* -------------------------------
     VALIDATION
  ------------------------------- */
const validateStep1 = () => {
  if (!form.season) return "Please select a season.";
  if (!form.island_name.trim()) return "Island name is required.";
  if (!form.dream_address.match(/^DA-\d{4}-\d{4}-\d{4}$/))
    return "Dream Address must be complete.";
  if (!form.theme) return "Island theme is required.";
  if (form.theme === "Other" && !form.custom_theme.trim())
    return "Please enter your custom theme.";
  if (files.length === 0)
    return "At least one screenshot is required.";
  return "";
};

  const validateStep2 = () => {
    if (!form.description.trim()) return "Story is required.";
    return "";
  };

  const validateStep3 = () => {
    if (!form.creator_name.trim()) return "Your name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!form.discord.trim()) return "Discord username is required.";
    return "";
  };

  const nextStep = () => {
    let err = "";
    if (step === 1) err = validateStep1();
    if (step === 2) err = validateStep2();

    if (err) {
      setError(err);
      return;
    }

    setError("");
    setStep(step + 1);
  };

  /* -------------------------------
     SUBMIT WITH DUPLICATE CHECK
  ------------------------------- */
  const handleSubmit = async () => {
    const err = validateStep3();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError("");
    setDuplicateStatus(null);

    try {
      // 1️⃣ PRE-CHECK
      const checkRes = await fetch("/api/actv-submission/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          season: form.season,
          email: form.email,
        }),
      });

      const checkResult = await checkRes.json();

      if (checkResult.exists) {
        setLoading(false);
        setDuplicateStatus(checkResult.status);
        return;
      }

      // 2️⃣ ACTUAL SUBMISSION
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (form.theme === "Other") {
        formData.set("theme", form.custom_theme);
      }

      files.forEach((file) => {
        formData.append("screenshots", file);
      });

      const res = await fetch("/api/actv-submission", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      setLoading(false);

      if (!res.ok) {
        setError(result.error || "Submission failed.");
        return;
      }

      setSuccess(true);

    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  /* -------------------------------
     SUCCESS STATE
  ------------------------------- */
  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          🎉 Submission Received
        </h2>
        <p className="text-white/70">
          Your island is now under review.</p>
          <p className="text-white/70">
          Check your email and or spam folder for confirmation and further updates.
        </p>
        <p className="text-white/50 text-sm mt-3">
          Status: PENDING
        </p>
      </div>
    );
  }

  /* -------------------------------
     DUPLICATE STATE
  ------------------------------- */
  if (duplicateStatus) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-white/5 border border-amber-500/40 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-amber-400 mb-4">
          Submission Already Received
        </h2>
        <p className="text-white/70">
          We’ve already received your island for this season.
        </p>
        <p className="text-white/50 text-sm mt-3">
          Current Status: {duplicateStatus}
        </p>
      </div>
    );
  }

  const stepTitles = [
    "Island Information",
    "Tell Your Story",
    "Creator Information",
  ];

  return (
    <div className="max-w-2xl mx-auto">

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-amber-400">
          {stepTitles[step - 1]}
        </h2>
        <p className="text-white/40 text-sm mt-2">
          Step {step} of 3
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 space-y-6">

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 p-3 rounded">
            {error}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <Select
              label="Season Applying For * (Required)"
              name="season"
              value={form.season}
              onChange={handleChange}
              options={["Season 1 - Island Edition"]}
            />

            <Input label="Island Name * (Required)" name="island_name" value={form.island_name} onChange={handleChange} />

            <Input
              label="Dream Address * (Required) (Numbers Only)"
              name="dream_address"
              value={form.dream_address}
              onChange={handleChange}
              placeholder="DA-0000-0000-0000"
            />

            <Select
              label="Island Theme * (Required)"
              name="theme"
              value={form.theme}
              onChange={handleChange}
              options={[
                "Cottage Core",
                "Fantasy Core",
                "Modern",
                "City Core",
                "Normal Core",
                "Other",
              ]}
            />

            {form.theme === "Other" && (
              <Input
                label="Enter Your Theme *"
                name="custom_theme"
                value={form.custom_theme}
                onChange={handleChange}
              />
            )}

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Upload Screenshots (Max 3) * (Required)
              </label>
              <input
                title="Upload Screenshots"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="text-sm text-white"
              />

              <div className="flex gap-4 mt-4">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      title={file.name}
                      src={URL.createObjectURL(file)}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={nextStep}>Continue</Button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/20 p-3 rounded-lg h-32 focus:border-amber-400"
              placeholder="Tell us your island story..."
            />
            <div className="text-right text-xs text-white/40">
              {MAX_CHARS - form.description.length} characters remaining
            </div>

            <div className="flex justify-between">
              <GhostButton onClick={() => setStep(1)}>Back</GhostButton>
              <Button onClick={nextStep}>Continue</Button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <Input label="Your Name *" name="creator_name" value={form.creator_name} onChange={handleChange} />
            <Input label="Email *" name="email" type="email" value={form.email} onChange={handleChange} />
            <Input label="Discord Username *" name="discord" value={form.discord} onChange={handleChange} />

            <div className="flex justify-between">
              <GhostButton onClick={() => setStep(2)}>Back</GhostButton>
              <Button onClick={handleSubmit} loading={loading}>
                Submit Island
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-2">{label}</label>
      <input
        {...props}
        className="w-full bg-black/50 border border-white/20 p-3 rounded-lg focus:outline-none focus:border-amber-400 transition"
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-2">{label}</label>
      <select
        {...props}
        className="w-full bg-black/50 border border-white/20 p-3 rounded-lg focus:border-amber-400"
      >
        <option value="">Select option</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Button({ children, onClick, loading }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="w-full bg-amber-600 hover:bg-amber-500 py-3 rounded-lg font-semibold transition disabled:opacity-50"
    >
      {loading ? "Submitting..." : children}
    </button>
  );
}

function GhostButton({ children, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-3 border border-white/20 rounded-lg text-white/70 hover:border-white/40 transition"
    >
      {children}
    </button>
  );
}