// src/data/portfolioData.ts

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  linkedin: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  dates: string;
  description: string[];
}

export interface Education {
  degree: string;
  university: string;
  year: string;
}

export interface Contact {
    cta: string;
    languages: string[];
    interests: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education;
  certifications: string[];
  contact: Contact;
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Raad Kamal Shoumenn",
    title: "Data Engineer",
    summary: "A meticulous and innovative Data Engineer with a passion for building scalable data pipelines and robust infrastructure. Experienced in cloud technologies and data warehousing, with a knack for turning complex data into actionable insights. Always eager to learn and apply new technologies to solve challenging problems.",
    location: "Neo-Sector 7G, Cyber-District",
    email: "raad.shoumenn.de@protomail.net",
    linkedin: "linkedin.com/in/raad-k-shoumenn",
  },
  skills: [
    {
      category: "Languages",
      items: ["Python", "SQL", "Scala", "Rust"],
    },
    {
      category: "Cloud & Data Tools",
      items: ["AWS (Redshift, Glue, EMR)", "GCP (BigQuery, Dataflow)", "Snowflake", "Databricks"],
    },
    {
      category: "Orchestration",
      items: ["Airflow", "Prefect", "dbt", "Mage"],
    },
    {
      category: "Big Data",
      items: ["Spark", "Hadoop", "Kafka", "Flink"],
    },
    {
        category: "Databases",
        items: ["PostgreSQL", "ScyllaDB", "ClickHouse"],
    },
    {
        category: "DevOps & Infra",
        items: ["Docker", "Kubernetes", "Terraform", "Jenkins"],
    }
  ],
  experience: [
    {
      role: "Senior Data Engineer",
      company: "Cyberdyne Systems",
      dates: "2022 - Present",
      description: [
        "Architected and deployed a new streaming data pipeline using Kafka and Flink, reducing data latency by 90%.",
        "Led the migration of an on-premise data warehouse to Snowflake, resulting in a 40% reduction in operational costs.",
        "Developed and maintained CI/CD pipelines for data infrastructure using Terraform and GitHub Actions.",
      ],
    },
    {
      role: "Data Engineer",
      company: "Weyland-Yutani Corp",
      dates: "2019 - 2022",
      description: [
        "Built and managed ETL processes using Airflow and Python to support business intelligence and reporting.",
        "Collaborated with data scientists to productionize machine learning models on Databricks.",
        "Optimized complex SQL queries, improving report generation time by over 50%.",
      ],
    },
  ],
  education: {
    degree: "B.Sc. in Computer Science",
    university: "Mars University, Olympus Mons Campus",
    year: "2019",
  },
  certifications: [
    "AWS Certified Data Analytics - Specialty",
    "Snowflake SnowPro Core Certification",
    "Certified Kubernetes Application Developer (CKAD)",
  ],
  contact: {
      cta: "Get In Touch",
      languages: ["English (Fluent)", "Binary (Native)"],
      interests: ["Exploring Neural Networks", "Vintage Sci-Fi Holovids", "Quantum Computing Theory"],
  }
};
