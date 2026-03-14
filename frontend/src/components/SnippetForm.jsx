import { useState } from 'react';

const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
  'HTML/CSS',
  'Shell',
];

const SnippetForm = ({
  onSubmit,
  loading,
  error,
  initialData = {},
  submitLabel = 'Create Snippet',
}) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    language: initialData.language || '',
    tags: Array.isArray(initialData.tags)
      ? initialData.tags.join(', ')
      : initialData.tags || '',
    code: initialData.code || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim() || form.title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters.';
    }
    if (!form.description.trim() || form.description.trim().length < 10) {
      errs.description = 'Description must be at least 10 characters.';
    }
    if (!form.language) {
      errs.language = 'Please select a programming language.';
    }
    if (!form.code.trim() || form.code.trim().length < 10) {
      errs.code = 'Code must be at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      language: form.language,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      code: form.code.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── TITLE FIELD ── */}
      <div>
        <label className="label">Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Debounce Hook"
          className={`input ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && (
          <p className="text-red-400 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* ── DESCRIPTION FIELD ── */}
      <div>
        <label className="label">Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief description of what this snippet does..."
          rows={3}
          className={`textarea ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* ── LANGUAGE FIELD ── */}
      <div>
        <label className="label">Language *</label>
        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          className={`input ${errors.language ? 'border-red-500' : ''}`}
        >
          <option value="">Select a language</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        {errors.language && (
          <p className="text-red-400 text-sm mt-1">{errors.language}</p>
        )}
      </div>

      {/* ── TAGS FIELD ── */}
      <div>
        <label className="label">Tags (optional)</label>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="hooks, utility, async"
          className="input"
        />
        <p className="text-slate-500 text-xs mt-1">
          Separate tags with commas. e.g. hooks, utility, async
        </p>
      </div>

      {/* ── CODE FIELD ── */}
      <div>
        <label className="label">Code *</label>
        <textarea
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Paste your code snippet here..."
          rows={12}
          className={`textarea font-mono ${errors.code ? 'border-red-500' : ''}`}
        />
        <p className="text-slate-500 text-xs mt-1">
          {form.code.length} characters
        </p>
        {errors.code && (
          <p className="text-red-400 text-sm mt-1">{errors.code}</p>
        )}
      </div>

      {/* ── API ERROR ── */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* ── SUBMIT BUTTON ── */}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
};

export default SnippetForm;
