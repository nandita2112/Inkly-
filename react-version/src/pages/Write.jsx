import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import FormField from '../components/FormField.jsx';
import useForm from '../hooks/useForm.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useStories } from '../context/StoriesContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { categories } from '../data/content.js';
import { validateStory } from '../utils/validators.js';

const initialValues = { title: '', category: '', excerpt: '', body: '' };

export default function Write() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addStory } = useStories();
  const { show } = useToast();

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validateStory,
    (submitted) => {
      const story = addStory({ ...submitted, author: user?.name || 'Guest' });
      show('Your story is published');
      navigate(`/article/${story.id}`);
    }
  );

  // Live preview derived from the current text. No extra state is needed.
  const words = values.body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return (
    <>
      <PageHero eyebrow="START WRITING" title={<>Share your <span>perspective.</span></>}>
        Your story appears on Explore and the home page straight away.
      </PageHero>

      <section className="contact-layout">
        <form className="contact-form write-form" onSubmit={handleSubmit} noValidate>
          <FormField label="Title" name="title" placeholder="A clear, specific headline"
            value={values.title} onChange={handleChange} error={errors.title} />

          <FormField label="Category" name="category" as="select"
            value={values.category} onChange={handleChange} error={errors.category}>
            <option value="">Choose a category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </FormField>

          <FormField label="Short summary" name="excerpt" as="textarea"
            placeholder="One or two sentences readers see on the card"
            value={values.excerpt} onChange={handleChange} error={errors.excerpt} />

          <FormField label="Story" name="body" as="textarea"
            placeholder="Write your story. Separate paragraphs with a blank line."
            value={values.body} onChange={handleChange} error={errors.body} />

          <p className="meta">{words} words · about {minutes} min read</p>
          <button type="submit" className="gradient-btn">Publish story →</button>
        </form>

        <aside className="write-tips">
          <small className="eyebrow">TIPS</small>
          <h2>Make it easy to start reading.</h2>
          <p>Open with the one idea you most want the reader to remember.</p>
          <p>Keep paragraphs short. A blank line between them makes the story easier to scan.</p>
          <p>A specific headline does more work than a clever one.</p>
        </aside>
      </section>
    </>
  );
}
