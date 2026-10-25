import PageHero from '../components/PageHero.jsx';
import { Link } from 'react-router-dom';
import { values } from '../data/content.js';

export default function About() {
  return (
    <>
      <PageHero eyebrow="ABOUT INKLY" title={<>Stories have the power<br />to <span>change perspectives.</span></>}>
        Inkly is a place where curious minds come together to write, read and share meaningful ideas.
      </PageHero>

      <section className="about-intro">
        <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=85" alt="Open notebook on a desk" />
        <div>
          <small className="eyebrow">OUR STORY</small>
          <h2>A home for curious minds.</h2>
          <p>We created Inkly because great ideas deserve more than a social media post.</p>
          <p>From technology and design to travel, productivity and creativity, Inkly gives writers a beautiful place to share what they know.</p>
        </div>
      </section>

      <section className="mission">
        <small className="eyebrow">OUR MISSION</small>
        <h2>Make the internet a little more <span>thoughtful.</span></h2>
        <p>We believe the best stories make us stop, think and see the world differently.</p>
      </section>

      <section className="values">
        <small className="eyebrow">WHAT WE BELIEVE</small>
        <h2>Built around great ideas.</h2>
        <div className="values-grid">
          {values.map((value) => (
            <div key={value.title} className="value-card">
              <span>{value.icon}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h2>Have a story to tell?</h2>
        <p>Join Inkly and share it with the world.</p>
        <Link className="gradient-btn" to="/explore">Explore Stories →</Link>
      </section>
    </>
  );
}
