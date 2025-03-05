
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">About Skill Links</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to Skill Links, the premier platform connecting skilled professionals with customers who need their expertise. Founded in 2023, we've made it our mission to transform how people find and hire local talent.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            At Skill Links, we believe everyone deserves access to reliable, skilled professionals for their projects and needs. We're dedicated to creating a trusted marketplace where quality work meets fair opportunity, empowering both service providers and customers.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
          <p>
            We envision a world where finding the right skilled professional is as easy as a few clicks, where talent is recognized regardless of background, and where communities thrive through local service exchange. Skill Links aims to be the bridge that connects needs with solutions, creating economic opportunities and fostering community growth.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
          <p>
            Skill Links was born from a simple frustration: the founders struggled to find reliable professionals for home repairs. After one too many disappointing experiences with unreliable contractors, expensive agencies, and opaque pricing, they realized there had to be a better way.
          </p>
          <p className="mt-4">
            The idea was straightforward – create a platform where skilled professionals could showcase their work, where reviews were honest and verified, and where the process of finding and booking services was transparent and straightforward. From that idea, Skill Links was born.
          </p>
          <p className="mt-4">
            Starting with just a handful of service categories in a single city, we've grown to cover dozens of professional skills across multiple regions. Our journey has been guided by constant feedback from our users – both the professionals who offer their services and the customers who hire them.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <h3 className="text-xl font-medium mt-6 mb-2">Trust and Transparency</h3>
          <p>
            We believe in complete transparency in all our operations. From our verification processes to our review systems, we ensure that all interactions on our platform are trustworthy and honest.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2">Quality and Excellence</h3>
          <p>
            We are committed to maintaining the highest standards of quality. We regularly review our professionals and encourage continuous improvement through our platform.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2">Community and Support</h3>
          <p>
            We believe in the power of community. We actively support local economies by connecting local professionals with local needs, and we provide comprehensive support to all our users.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2">Innovation and Adaptation</h3>
          <p>
            We are constantly innovating and adapting to meet the changing needs of our users. We embrace new technologies and approaches to make our platform more efficient and user-friendly.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p>
            Behind Skill Links is a dedicated team of professionals committed to our mission. Our diverse team brings together expertise in technology, customer service, marketing, and industry-specific knowledge to create a platform that truly serves our users' needs.
          </p>
          <p className="mt-4">
            Our leadership team combines years of experience in technology startups, service industries, and community building. They guide our strategic direction with a shared vision of empowering skilled professionals and providing exceptional service to customers.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Approach</h2>
          <h3 className="text-xl font-medium mt-6 mb-2">Rigorous Verification</h3>
          <p>
            Every professional on our platform undergoes a thorough verification process. We check credentials, experience, and background to ensure that all professionals meet our high standards.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2">User-Centered Design</h3>
          <p>
            Our platform is designed with our users in mind. We regularly gather feedback and make improvements to ensure that both professionals and customers have a seamless experience.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2">Fair Pricing</h3>
          <p>
            We believe in fair compensation for quality work. Our platform helps professionals set competitive rates while ensuring customers receive value for their money.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-2">Continuous Improvement</h3>
          <p>
            We are never satisfied with the status quo. We continuously seek ways to improve our platform, our processes, and our service to our users.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us</h2>
          <p>
            Whether you're a skilled professional looking to grow your business or a customer seeking quality service, we invite you to join the Skill Links community. Be part of a movement that's transforming how services are discovered, booked, and delivered.
          </p>
          <p className="mt-4">
            At Skill Links, we're not just building a platform – we're building a community. A community where skills are valued, where quality work is recognized, and where needs meet solutions. We're excited to have you be part of this journey.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Impact</h2>
          <p>
            Since our inception, Skill Links has facilitated thousands of successful service connections. We've helped professionals grow their businesses, customers find reliable service providers, and communities thrive through local service exchange.
          </p>
          <p className="mt-4">
            We're proud of the positive impact we've had on the lives of our users. From the professional who was able to quit their day job to focus on their passion full-time, to the customer who finally found a reliable plumber after years of disappointment, each success story fuels our commitment to our mission.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Looking Forward</h2>
          <p>
            As we look to the future, we're excited about the possibilities. We're constantly exploring new ways to enhance our platform, expand our reach, and better serve our users. From integrating new technologies to entering new markets, our journey is just beginning.
          </p>
          <p className="mt-4 mb-8">
            Thank you for being part of the Skill Links story. Together, we're building a future where skills are valued, quality work is recognized, and communities thrive through service exchange. Welcome to Skill Links – where skills connect.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
