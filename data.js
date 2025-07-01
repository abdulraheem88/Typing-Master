// Sample texts for different difficulty levels
const textData = {
    easy: [
        "The quick brown fox jumps over the lazy dog. This is a simple sentence that contains all letters of the alphabet. It is often used for typing practice.",
        "Today is a beautiful day. The sun is shining bright and the birds are singing. I love to walk in the park during such lovely weather.",
        "Learning to type fast is a valuable skill. With practice and patience, anyone can improve their typing speed and accuracy significantly.",
        "Technology has changed our lives in many ways. We use computers and smartphones every day to communicate and work efficiently.",
        "Reading books is one of the best ways to expand your knowledge. Books can take you to different worlds and teach you new things.",
        "Exercise is important for maintaining good health. Regular physical activity helps keep your body strong and your mind sharp.",
        "Cooking is both an art and a science. With the right ingredients and techniques, you can create delicious meals for your family.",
        "Music has the power to bring people together. It can express emotions and create memories that last a lifetime.",
        "Travel opens your mind to new cultures and experiences. Exploring different places helps you understand the world better.",
        "Friendship is one of life's greatest treasures. Good friends support you through both happy and difficult times."
    ],
    medium: [
        "Artificial intelligence represents one of the most significant technological advances of our time. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions with remarkable accuracy. This technology is revolutionizing industries from healthcare to finance, enabling more efficient decision-making and automated processes.",
        "Climate change poses unprecedented challenges for our planet's future. Rising global temperatures, melting ice caps, and extreme weather events are clear indicators that immediate action is required. Sustainable energy solutions, carbon reduction strategies, and international cooperation are essential for addressing this critical issue.",
        "The digital transformation of businesses has accelerated rapidly in recent years. Companies are adopting cloud computing, automation, and data analytics to streamline operations and improve customer experiences. This shift requires organizations to invest in new technologies and retrain their workforce for the digital age.",
        "Quantum computing promises to solve complex problems that are currently impossible for classical computers. By leveraging quantum mechanical phenomena like superposition and entanglement, these systems could revolutionize cryptography, drug discovery, and optimization problems across various scientific fields.",
        "Cybersecurity has become a paramount concern as our dependence on digital systems grows. Organizations must implement robust security measures to protect sensitive data from increasingly sophisticated cyber threats. This includes regular security audits, employee training, and advanced threat detection systems.",
        "Biotechnology innovations are transforming medicine and agriculture. Gene editing technologies like CRISPR allow scientists to modify DNA with unprecedented precision, potentially curing genetic diseases and developing more resilient crops to feed the growing global population.",
        "The Internet of Things connects everyday objects to the internet, creating smart environments that can monitor and respond to user needs. From smart homes to industrial sensors, IoT devices generate massive amounts of data that can be analyzed to improve efficiency and user experiences.",
        "Renewable energy technologies are becoming increasingly cost-effective and efficient. Solar panels, wind turbines, and energy storage systems are making it possible to transition away from fossil fuels while maintaining reliable power generation for communities worldwide.",
        "Virtual and augmented reality technologies are creating immersive experiences that blur the line between digital and physical worlds. These technologies have applications in education, training, entertainment, and remote collaboration, fundamentally changing how we interact with information.",
        "Blockchain technology offers a decentralized approach to data storage and transaction processing. Beyond cryptocurrencies, blockchain has potential applications in supply chain management, voting systems, and digital identity verification, providing transparency and security."
    ],
    advanced: [
        "The paradigmatic shift towards quantum supremacy necessitates a comprehensive reevaluation of computational complexity theory and cryptographic protocols. Quantum algorithms such as Shor's factorization algorithm and Grover's search algorithm demonstrate exponential speedups over their classical counterparts, fundamentally challenging the security assumptions underlying contemporary public-key cryptography. The implementation of fault-tolerant quantum computers requires sophisticated error correction mechanisms and quantum error correction codes to mitigate decoherence and operational errors inherent in quantum systems.",
        "Neuromorphic computing architectures emulate the structural and functional characteristics of biological neural networks, offering unprecedented energy efficiency and parallel processing capabilities. These bio-inspired systems utilize spiking neural networks and memristive devices to implement synaptic plasticity and learning algorithms directly in hardware. The integration of neuromorphic processors with conventional von Neumann architectures presents significant challenges in terms of programming models, memory hierarchies, and inter-processor communication protocols.",
        "The convergence of synthetic biology and artificial intelligence is catalyzing revolutionary advances in biotechnology and pharmaceutical research. Machine learning algorithms can now predict protein folding patterns, optimize metabolic pathways, and design novel biomolecules with specific functional properties. CRISPR-Cas9 gene editing systems, enhanced by AI-driven target identification and off-target prediction models, enable precise genomic modifications with therapeutic applications in treating genetic disorders and developing personalized medicine approaches.",
        "Advanced materials science leverages computational modeling and high-throughput experimentation to discover novel materials with tailored properties for specific applications. Density functional theory calculations, molecular dynamics simulations, and machine learning-based materials discovery platforms accelerate the identification of superconductors, photovoltaic materials, and catalysts. The development of metamaterials with engineered electromagnetic properties enables applications in cloaking devices, perfect absorbers, and negative refractive index materials.",
        "Distributed ledger technologies and consensus mechanisms form the foundation of decentralized autonomous organizations and smart contract platforms. Byzantine fault tolerance algorithms, proof-of-stake protocols, and sharding techniques address scalability and energy efficiency challenges in blockchain networks. The integration of zero-knowledge proofs and homomorphic encryption enables privacy-preserving computations and confidential transactions while maintaining the transparency and immutability properties of distributed ledgers.",
        "Topological quantum computing exploits anyonic quasiparticles and braiding operations to perform quantum computations that are inherently protected from certain types of errors. Majorana fermions in superconductor-semiconductor heterostructures and fractional quantum Hall states provide potential platforms for implementing topological qubits. The non-Abelian statistics of these exotic particles enable fault-tolerant quantum computation without requiring extensive quantum error correction overhead.",
        "Photonic integrated circuits and silicon photonics technologies enable high-bandwidth optical communication systems and quantum information processing applications. Wavelength division multiplexing, coherent detection schemes, and advanced modulation formats increase the capacity and reach of optical networks. The integration of quantum dots, nonlinear optical materials, and plasmonic structures on silicon platforms facilitates the development of on-chip quantum light sources and single-photon detectors.",
        "Computational fluid dynamics simulations utilizing large eddy simulation and direct numerical simulation techniques provide detailed insights into turbulent flow phenomena and heat transfer processes. High-performance computing clusters and graphics processing units accelerate the solution of Navier-Stokes equations for complex geometries and multiphase flows. The coupling of CFD solvers with optimization algorithms enables the design of efficient aerodynamic surfaces, heat exchangers, and propulsion systems.",
        "Epigenetic modifications and chromatin remodeling mechanisms regulate gene expression patterns without altering the underlying DNA sequence. Histone modifications, DNA methylation, and non-coding RNA molecules orchestrate complex regulatory networks that control cellular differentiation and development. Single-cell sequencing technologies and computational methods for analyzing epigenomic data reveal cell-type-specific regulatory programs and their dysregulation in disease states.",
        "Metamaterial-based electromagnetic cloaking devices manipulate the propagation of electromagnetic waves through engineered periodic structures with subwavelength features. Transformation optics principles and effective medium theory guide the design of cloaking shells that render objects invisible to specific frequency ranges. The practical implementation of broadband cloaking requires materials with extreme electromagnetic parameters and sophisticated fabrication techniques at multiple length scales."
    ]
};

// Motivational quotes for end of session
const motivationalQuotes = [
    "The expert in anything was once a beginner.",
    "Practice makes progress, not perfection.",
    "Every keystroke brings you closer to mastery.",
    "Speed comes with accuracy, accuracy comes with practice.",
    "Your fingers are learning to dance on the keyboard.",
    "Consistency is the key to improvement.",
    "Great typists are made, not born.",
    "Focus on accuracy first, speed will follow.",
    "Each mistake is a step towards perfection.",
    "The journey of a thousand words begins with a single keystroke.",
    "Patience and persistence will unlock your potential.",
    "Your typing skills are evolving with every session.",
    "Excellence is not a skill, it's an attitude.",
    "The only way to improve is to keep practicing.",
    "Your dedication today shapes your skills tomorrow."
];

// Achievement messages based on performance
const achievements = {
    newRecord: "🏆 NEW RECORD! Outstanding performance!",
    excellent: "🌟 Excellent! You're typing like a pro!",
    good: "👍 Good job! Keep up the great work!",
    improving: "📈 You're improving! Practice makes perfect!",
    keepTrying: "💪 Keep trying! Every practice session counts!"
};

// Export data for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { textData, motivationalQuotes, achievements };
}