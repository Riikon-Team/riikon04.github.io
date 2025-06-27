import HeroSection from '../components/HeroSection';

function AboutUsPage() {
  return (
    <div className="about-us-page">
      <HeroSection 
        title="About Us" 
        subtitle="Learn more about our team"
      />
      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="about-content">
            <div className="about-text">
              {/* <p>
                Our team was formed with a shared passion for technology and creativity.
                We started as a small group of friends who enjoyed collaborating on
                different projects and learning from each other.
              </p>
              <p>
                Over time, our community grew, and we established a presence online 
                through our Discord server. This allowed us to connect with more like-minded
                individuals and expand our collaborative efforts.
              </p>
              <p>
                Today, we work on a variety of projects ranging from web development to
                game design, always with the goal of learning, growing, and creating
                something meaningful together.
              </p> */}
            </div>
            <div className="about-values">
              {/* <h3>Our Values</h3>
              <ul>
                <li><strong>Collaboration:</strong> We believe in the power of working together.</li>
                <li><strong>Learning:</strong> We're always seeking to improve and learn new skills.</li>
                <li><strong>Creativity:</strong> We encourage innovative ideas and unique approaches.</li>
                <li><strong>Community:</strong> We value building a supportive and inclusive environment.</li> */}
              {/* </ul> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;
