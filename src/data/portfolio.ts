export const profile = {
  name: 'Nguyen Tuan Anh',
  displayName: 'Nguyễn Tuấn Anh',
  title: 'Software Engineer / Java Backend Developer',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'tuananh.dev2000@gmail.com',
  phone: '(+84) 915612706',
  linkedin: 'https://www.linkedin.com/in/tuananhnguyen-work/',
  resumeUrl: '/cv-nguyen-tuan-anh-java-backend-developer.pdf',
  portraitUrl: '/portrait-nguyen-tuan-anh.png',
  summary:
    'Backend Software Developer with around 4 years of experience building enterprise applications with Java, Spring Boot, PostgreSQL, Redis, microservices, and cloud-related technologies.',
  impact:
    'Implemented 50+ RESTful APIs, 5 new modules, third-party/internal integrations, and production support across finance, insurance, test management, sales, and loyalty platforms.',
};

export const skills = [
  'Java',
  'Spring Boot',
  'Microservices',
  'RESTful API',
  'PostgreSQL',
  'Redis',
  'RabbitMQ',
  'AWS',
  'Kubernetes',
  'Angular',
  'React',
  'TypeScript',
];

export const featuredProjects = [
  {
    name: 'Sales & Loan Management Platform',
    imageUrl: '/projects/sales-loan-management.png',
    period: 'Jul 2024 - Present',
    role: 'Backend Developer',
    description:
      'Consumer finance platform supporting sales operations, loan packages, loan creation workflows, and products such as consumer loans, two-wheeler loans, shopping loans, and insurance-related products.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Microservices'],
    metrics: ['Finance workflows', 'REST API delivery', 'Production support'],
    details: [
      'Built and maintained backend modules for sales operations, loan packages, and loan creation workflows.',
      'Implemented REST APIs and service integrations across internal systems and third-party partners.',
      'Supported production stability for finance workflows where correctness and traceability matter.',
    ],
  },
  {
    name: 'Test Case Management',
    imageUrl: '/projects/test-case-management.png',
    period: 'Feb 2024 - Jul 2024',
    role: 'Full-stack Software Engineer',
    description:
      'Test management platform for test cases, test runs, reporting views, Jira Marketplace integrations, and team onboarding.',
    stack: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL', 'Jira API'],
    metrics: ['Full-stack delivery', 'Jira Marketplace', 'Team onboarding'],
    details: [
      'Delivered full-stack features for test cases, test runs, analytics views, reporting, and onboarding flows.',
      'Integrated Jira Marketplace workflows to connect test management with existing team processes.',
      'Balanced frontend usability with backend API design for a product used repeatedly by QA teams.',
    ],
  },
  {
    name: 'Insurance Packages Comparison',
    imageUrl: '/projects/insurance-comparison.png',
    period: 'Aug 2023 - Feb 2024',
    role: 'Backend Developer',
    description:
      'White-labeled insurance platform for distribution partners, quotation comparison, customer management, microservice APIs, and production stability.',
    stack: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'REST API', 'AWS'],
    metrics: ['White-label platform', 'Microservice APIs', 'Production fixes'],
    details: [
      'Developed backend APIs for white-labeled insurance quotation and package comparison flows.',
      'Worked on customer management and partner distribution features across microservice boundaries.',
      'Handled production fixes and service stability work for insurance-related user journeys.',
    ],
  },
  {
    name: 'Customer Loyalty App',
    imageUrl: '/projects/customer-loyalty.png',
    period: 'Jul 2022 - Oct 2022',
    role: 'Full-stack Developer / Feature Owner',
    description:
      'Loyalty platform for points, ranking, gift redemption, backend APIs, frontend features, and feature ownership with Product Owner collaboration.',
    stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'REST API'],
    metrics: ['Feature ownership', 'Rewards workflow', 'Product collaboration'],
    details: [
      'Owned features across points, rankings, rewards, and gift redemption workflows.',
      'Built backend APIs and frontend screens while coordinating requirements with the Product Owner.',
      'Shipped user-facing loyalty features from implementation through review and iteration.',
    ],
  },
];

export const metrics = [
  ['4y', 'enterprise experience'],
  ['50+', 'REST APIs delivered'],
  ['5', 'new modules shipped'],
];
