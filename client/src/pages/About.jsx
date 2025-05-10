import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Flavor<span>Atlas</span></h1>
        <p className="about-description">
          Welcome to <strong>FlavorAtlas</strong>, your ultimate destination for discovering, sharing, and enjoying recipes from around the world! 
          Our platform is built for food enthusiasts, home chefs, and anyone with a passion for cooking.
        </p>
        <p className="about-mission">
          <strong>Our Mission:</strong> To connect people through the love of food, making it easy to find, create, and share delightful recipes.
          Whether you’re a beginner or a seasoned cook, FlavorAtlas offers something special for everyone.
        </p>
        <p className="about-features">
          On FlavorAtlas, you can:
          <ul>
            <li>📖 Explore a variety of recipes categorized by cuisine, diet preferences, and meal types.</li>
            <li>✍️ Share your own unique recipes and inspire others.</li>
            <li>🔍 Search and filter recipes based on your preferences.</li>
            <li>❤️ Like, comment, and interact with other food lovers.</li>
          </ul>
        </p>
        <p className="about-join">
          Join our community today and start your flavorful journey with us!
        </p>
      </div>
    </div>
  );
};

export default About;
