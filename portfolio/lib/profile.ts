/**
 * Single source of truth for personal details.
 * Replace the TODO values with your real handles / URLs.
 */
export const profile = {
  firstName: "Chanuka",
  lastName: "Senevirathne",
  title: "data engineer · sliit undergraduate",

  // TODO: put your real GitHub username here (projects are fetched from it).
  githubUser: "chanukas-byte",

  socials: {
    // TODO: replace with your real profile URLs / email.
    github: "https://github.com/chanukas-byte",
    linkedin: "https://www.linkedin.com/in/chanuka-senevirathne-06849b341",
    facebook: "https://web.facebook.com/profile.php?id=100029867582124",
    email: "chanukareachme@gmail.com",
  },
};

export type Academic = { title: string; place: string; period: string; note: string };
export const academics: Academic[] = [
  { title: "BSc (Hons) Information Technology – Data Science", place: "Sri Lanka Institute of Information Technology (SLIIT)", period: "2023 – 2027", note: "Third-year undergraduate, CGPA 3.22 / 4.00. Capstone project on predictive analytics." },
  { title: "GCE Advanced Level – Technology Stream", place: "Rahula College, Matara", period: "2018 – 2021", note: "ICT: C · SFT: B · ET: C. District rank 204, Z-score 1.14." },
  { title: "Certifications", place: "Azure · AWS · Python · ML", period: "2024 – now", note: "Azure Fundamentals, AWS Cloud Practitioner Essentials, Making ETL/ELT Pipelines with Python, Understanding Machine Learning, Intro to NLP & Text Mining, Intro to Docker, Intro to Amazon Redshift, Python for Data Science." },
];

export type Service = { title: string; text: string };
export const services: Service[] = [
  { title: "Data Engineering", text: "Cloud ETL/ELT and real-time CDC pipelines on AWS and Azure: Kafka, Glue, Athena, Data Factory, Redshift." },
  { title: "Data Analytics", text: "Power BI, Tableau and QuickSight dashboards that turn raw data into clear business insight." },
  { title: "Machine Learning", text: "Predictive models and recommender systems with scikit-learn, TensorFlow and NLP, deployed as Streamlit apps." },
];

export type Experience = { role: string; company: string; period: string; points: string[] };
export const experience: Experience[] = [
  { role: "Intern Data Engineer (Cloud)", company: "M3Force Pvt. Ltd", period: "2026", points: ["Build and maintain cloud data pipelines (AWS / Azure / GCP) that move and transform data.", "Automate ETL/ELT flows and manage databases and data warehouses.", "Keep data clean, reliable and accessible for analytics and applications."] },
  { role: "Associate Web Blogger", company: "WordPress", period: "", points: ["Implemented SEO strategies that improved search rankings by over 50%.", "Published and managed blog content for a technical audience."] },
];

export const skills = [
  "python", "sql", "java", "typescript", "react", "node.js", "postgresql", "mongodb",
  "aws glue", "athena", "redshift", "quicksight", "azure data factory", "kafka", "debezium",
  "spark", "hadoop", "docker", "kubernetes", "power bi", "tableau", "scikit-learn", "tensorflow", "pytorch", "nlp",
];
