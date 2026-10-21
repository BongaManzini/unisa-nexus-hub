// Initial application data and state
export const initialUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'Owner/Admin', name: 'John Smith' },
  { id: 2, username: 'sync', password: 'sync123', role: 'Sync Manager', name: 'Sarah Johnson' },
  { id: 3, username: 'marketing', password: 'marketing123', role: 'Marketing Manager', name: 'Mike Davis' }
];

export const initialVaultFiles = [
  {
    id: 1,
    name: 'Project Proposal Q1.docx',
    type: 'document',
    size: '2.4 MB',
    encrypted: true,
    content: 'Confidential project proposal for Q1 2024...',
    projectType: 'Research',
    githubLink: 'https://github.com/unisa/project-q1',
    ssdlc: true,
    lbc: false,
    lastModified: '2024-01-15'
  },
  {
    id: 2,
    name: 'Financial Report 2023.xlsx',
    type: 'spreadsheet',
    size: '5.1 MB',
    encrypted: true,
    content: 'Annual financial summary and projections...',
    projectType: 'Business',
    githubLink: null,
    ssdlc: false,
    lbc: true,
    lastModified: '2024-01-10'
  },
  {
    id: 3,
    name: 'Mars Rover Code v2.py',
    type: 'code',
    size: '156 KB',
    encrypted: false,
    content: 'def initialize_rover():\n    # Rover initialization code\n    pass',
    projectType: 'Mars Rover',
    githubLink: 'https://github.com/unisa/mars-rover',
    ssdlc: true,
    lbc: true,
    lastModified: '2024-01-20'
  },
  {
    id: 4,
    name: 'Marketing Strategy.pdf',
    type: 'document',
    size: '3.8 MB',
    encrypted: false,
    content: 'Marketing campaign strategy for 2024...',
    projectType: 'Marketing',
    githubLink: null,
    ssdlc: false,
    lbc: false,
    lastModified: '2024-01-18'
  }
];

export const initialMeetings = [
  {
    id: 1,
    title: 'Q1 Strategy Meeting',
    date: '2024-01-10',
    participants: ['John Smith', 'Sarah Johnson', 'Mike Davis'],
    notes: 'Discussed quarterly objectives and KPIs',
    attachments: ['agenda.pdf', 'presentation.pptx']
  },
  {
    id: 2,
    title: 'Mars Rover Project Review',
    date: '2024-01-15',
    participants: ['John Smith', 'Sarah Johnson'],
    notes: 'Technical review of rover navigation system',
    attachments: ['technical_specs.pdf', 'code_review.md']
  },
  {
    id: 3,
    title: 'Marketing Campaign Kickoff',
    date: '2024-01-18',
    participants: ['John Smith', 'Mike Davis'],
    notes: 'Launched new marketing campaign for spring semester',
    attachments: ['campaign_brief.pdf', 'creative_assets.zip']
  }
];

export const initialAds = [
  {
    id: 1,
    type: 'text',
    content: 'Welcome to UNISA Collaboration Platform - Secure, Fast, Efficient',
    active: true,
    backgroundColor: '#003366',
    textColor: '#FFC300'
  },
  {
    id: 2,
    type: 'text',
    content: 'New Feature: End-to-End Encryption now available for all files!',
    active: true,
    backgroundColor: '#D35400',
    textColor: '#FFFFFF'
  },
  {
    id: 3,
    type: 'image',
    content: 'https://via.placeholder.com/728x90/003366/FFC300?text=UNISA+Collaboration',
    active: true,
    backgroundColor: '#003366',
    textColor: '#FFFFFF'
  }
];

export const initialTeams = {
  coreLeadership: [
    { id: 1, name: 'John Smith', role: 'Owner/Admin', email: 'john.smith@unisa.ac.za' },
    { id: 2, name: 'Sarah Johnson', role: 'Sync Manager', email: 'sarah.johnson@unisa.ac.za' },
    { id: 3, name: 'Mike Davis', role: 'Marketing Manager', email: 'mike.davis@unisa.ac.za' }
  ],
  marsRover: [
    { id: 4, name: 'Dr. Emily Chen', role: 'Project Lead', email: 'emily.chen@unisa.ac.za' },
    { id: 5, name: 'Robert Taylor', role: 'Software Engineer', email: 'robert.taylor@unisa.ac.za' },
    { id: 6, name: 'Lisa Anderson', role: 'Systems Analyst', email: 'lisa.anderson@unisa.ac.za' }
  ]
};

export const initialAuditLog = [
  {
    id: 1,
    timestamp: '2024-01-20 14:32:15',
    user: 'John Smith',
    action: 'LOGIN',
    details: 'Successful login from IP 192.168.1.100',
    severity: 'INFO'
  },
  {
    id: 2,
    timestamp: '2024-01-20 14:35:22',
    user: 'Sarah Johnson',
    action: 'SYNC_INITIATED',
    details: 'Started large file transfer (1GB)',
    severity: 'INFO'
  },
  {
    id: 3,
    timestamp: '2024-01-20 14:40:10',
    user: 'Mike Davis',
    action: 'AD_CREATED',
    details: 'Created new marketing ad campaign',
    severity: 'INFO'
  },
  {
    id: 4,
    timestamp: '2024-01-20 14:45:33',
    user: 'Sarah Johnson',
    action: 'ACCESS_DENIED',
    details: 'Attempted to view file content in Vault (blocked by role)',
    severity: 'WARNING'
  },
  {
    id: 5,
    timestamp: '2024-01-20 15:00:00',
    user: 'John Smith',
    action: 'ROLE_MODIFIED',
    details: 'Updated user role permissions',
    severity: 'CRITICAL'
  }
];

export const initialSyncStatus = {
  autoSyncEnabled: true,
  lastSync: '2024-01-20 15:30:00',
  pendingUploads: 0,
  pendingDownloads: 0,
  syncQueue: []
};
