/* =========================================
   DATA — Site content configuration
   ========================================= */

const SITE_DATA = {
    skills: [
        { icon: '🎨', title: 'Frontend Development', items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Responsive Web Design'] },
        { icon: '⚙️', title: 'Backend Development', items: ['Node.js', 'Express.js', 'REST APIs'] },
        { icon: '🗄️', title: 'Database', items: ['MongoDB'] },
        { icon: '💻', title: 'Programming Languages', items: ['Python', 'Java', 'C'] },
        { icon: '🛠️', title: 'Tools & Platforms', items: ['Git & GitHub', 'VS Code', 'Postman', 'MongoDB Atlas'] },
    ],

    timeline: [
        {
            title: 'Web Development Virtual Internship',
            desc: [
                'Completed a virtual internship focused on web development fundamentals and project-based learning.',
                'Applied frontend development concepts to build responsive web interfaces.',
            ]
        },
        {
            title: 'Hackathons',
            desc: [
                'Participated in a Hackathon at the National Institute of Technology (NIT).',
                'Collaborated with team members to design and present innovative solutions under time constraints.',
            ]
        },
        {
            title: 'MERN Stack + AI Workshop',
            desc: [
                'Gained hands-on experience in building full-stack applications using the MERN stack.',
                'Explored AI integration techniques for modern web applications.',
            ]
        },
        {
            title: 'Competitive Programming',
            desc: [
                'Participated in 50+ CodeChef coding contests.',
                'Strengthened problem-solving, algorithmic thinking, and debugging skills through regular contest participation.',
            ]
        },
        {
            title: 'IEEE Technical Activities',
            desc: [
                'Participated in an IEEE Quiz Competition, enhancing technical knowledge and analytical thinking.',
            ]
        },
        {
            title: 'Community Service Projects',
            desc: [
                'Conducted field surveys and awareness programs on Nutrition and Food Habits in Tadepalligudem.',
                'Conducted an awareness campaign on Online Cyber Crimes in Chikkala village.',
                'Developed communication, survey analysis, and public engagement skills.',
            ]
        },
        {
            title: 'Technical Workshops',
            desc: [
                'Attended technical workshops focused on emerging technologies and software development practices.',
                'Engaged in collaborative learning and hands-on activities.',
            ]
        },
    ],

    projects: [
        {
            featured: true,
            title: 'Personal Portfolio',
            desc: 'A premium, fully responsive portfolio website built with HTML, CSS, and JavaScript featuring glassmorphism design, animations, and dynamic content loading.',
            image: 'https://images.unsplash.com/photo-1467232004584-2412417e093c?w=800&q=80',
            tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
            github: 'https://github.com/geethika-nandamuri',
            demo: '#home',
        },
        {
            title: 'Task Manager App',
            desc: 'A full-stack task management application with user authentication, CRUD operations, and a clean, intuitive interface.',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
            tags: ['React', 'Node.js', 'MongoDB'],
            github: 'https://github.com/geethika-nandamuri',
            demo: null,
        },
        {
            title: 'REST API Backend',
            desc: 'Scalable RESTful API built with Express.js and MongoDB, featuring JWT authentication and comprehensive error handling.',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
            tags: ['Node.js', 'Express', 'REST API'],
            github: 'https://github.com/geethika-nandamuri',
            demo: null,
        },
        {
            title: 'Weather Dashboard',
            desc: 'Real-time weather dashboard fetching data from external APIs with location search and responsive data visualization.',
            image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
            tags: ['JavaScript', 'API', 'CSS'],
            github: 'https://github.com/geethika-nandamuri',
            demo: null,
        },
        {
            title: 'E-Commerce Frontend',
            desc: 'Modern e-commerce product listing page with filtering, cart functionality, and mobile-first responsive design.',
            image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
            tags: ['React', 'CSS', 'JavaScript'],
            github: 'https://github.com/geethika-nandamuri',
            demo: null,
        },
    ],

    achievements: [
        { icon: '🏆', title: '50+ CodeChef Coding Contests', desc: 'Consistent participation in competitive programming contests.' },
        { icon: '🏆', title: 'Diamond and Silver Badges', desc: 'Earned prestigious badges on CodeChef for problem-solving excellence.' },
        { icon: '🏆', title: 'NIT Hackathon Participant', desc: 'Contributed innovative ideas and solutions in a national hackathon.' },
        { icon: '🏆', title: 'MERN Stack + AI Workshop', desc: 'Completed intensive workshop on MERN stack and AI applications.' },
        { icon: '🏆', title: 'IEEE Quiz Competition', desc: 'Participated in IEEE organized technical quiz competition.' },
        { icon: '🏆', title: 'Multiple Full Stack Projects', desc: 'Built and deployed several full-stack web applications.' },
    ],

    profiles: [
        {
            icon: '🎯',
            title: 'CodeChef',
            items: ['50+ contests participated', 'Diamond badges earned', 'Active competitive programmer'],
            link: 'https://www.codechef.com/users/geethikanandam',
        },
        {
            icon: '💻',
            title: 'GitHub',
            items: ['Full stack projects', 'Open-source learning journey', 'Continuous improvement'],
            link: 'https://github.com/geethika-nandamuri',
        },
    ],

    learning: [
        { icon: '☁️', title: 'Cloud Computing', desc: 'AWS fundamentals and cloud-native architecture.' },
        { icon: '🌐', title: 'MERN Stack Development', desc: 'Advanced MongoDB, Express, React, and Node.js patterns.' },
        { icon: '🤖', title: 'AI Applications', desc: 'Integrating AI tools and APIs into web applications.' },
        
    ],

    stats: [
        { value: 50, suffix: '+', label: 'Coding Contests' },
        { value: 10, suffix: '+', label: 'Technical Certifications' },
        { value: 5, suffix: '+', label: 'Web Projects' },
        { value: 2, suffix: '+', label: 'Hackathons' },
        { value: 3, suffix: '+', label: 'Years of Programming' },
    ],
};
