import React from 'react'
import '../styles/About.css'

export default function About() {
  return (
    <section class="about-wrapper">
        <div class="about-content">
            <h1 class="about-title">Welcome to FlavorAtlas</h1>
            <p class="about-description">
                FlavorAtlas is a vibrant community of food lovers where everyone can share their unique and delicious recipes.
                Whether you're a professional chef or a home cook, our platform is designed to bring together creativity and passion for cooking.
            </p>

            <h2 class="about-subheading">Why Choose FlavorAtlas?</h2>
            <ul class="about-list">
                <li class="about-list-item"><strong>📖 Share & Discover:</strong> Post your recipes and explore a variety of global cuisines.</li>
                <li class="about-list-item"><strong>👨‍🍳 Learn from Others:</strong> Get tips, tricks, and feedback from fellow food enthusiasts.</li>
                <li class="about-list-item"><strong>🍽️ Community & Culture:</strong> Connect with people who share your love for food.</li>
            </ul>

            <p class="about-vision">
                Our vision is to create a digital space where food brings people together. Whether you're experimenting with flavors
                or sharing a family secret recipe, FlavorAtlas is here to celebrate your love for cooking.
            </p>

            <p class="about-closing">
                Join us today and become part of the ultimate recipe-sharing experience! 🍜✨
            </p>
        </div>
    </section>
  )
}
