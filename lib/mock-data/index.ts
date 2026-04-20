export * from './employees';

export const attendanceData = [
  { id: 'A001', employee: 'Sarah Chen', date: '2024-01-15', checkIn: '09:02', checkOut: '18:05', status: 'present', hours: '9h 3m' },
  { id: 'A002', employee: 'James Wilson', date: '2024-01-15', checkIn: '08:55', checkOut: '17:58', status: 'present', hours: '9h 3m' },
  { id: 'A003', employee: 'Priya Sharma', date: '2024-01-15', checkIn: '-', checkOut: '-', status: 'absent', hours: '-' },
  { id: 'A004', employee: 'Marcus Johnson', date: '2024-01-15', checkIn: '09:30', checkOut: '18:30', status: 'late', hours: '9h' },
  { id: 'A005', employee: 'Emma Thompson', date: '2024-01-15', checkIn: '09:00', checkOut: '13:00', status: 'half-day', hours: '4h' },
  { id: 'A006', employee: 'David Park', date: '2024-01-15', checkIn: '08:45', checkOut: '17:45', status: 'present', hours: '9h' },
  { id: 'A007', employee: 'Sofia Rodriguez', date: '2024-01-15', checkIn: '09:10', checkOut: '18:10', status: 'present', hours: '9h' },
  { id: 'A008', employee: 'Kevin O\'Brien', date: '2024-01-15', checkIn: '08:50', checkOut: '17:55', status: 'present', hours: '9h 5m' },
];

export const leaveRequests = [
  { id: 'L001', employee: 'Sarah Chen', type: 'Annual Leave', from: '2024-02-05', to: '2024-02-09', days: 5, status: 'pending', reason: 'Family vacation' },
  { id: 'L002', employee: 'James Wilson', type: 'Sick Leave', from: '2024-01-20', to: '2024-01-22', days: 3, status: 'approved', reason: 'Medical' },
  { id: 'L003', employee: 'David Park', type: 'Personal Leave', from: '2024-01-25', to: '2024-01-25', days: 1, status: 'approved', reason: 'Personal errand' },
  { id: 'L004', employee: 'Marcus Johnson', type: 'Annual Leave', from: '2024-02-12', to: '2024-02-16', days: 5, status: 'rejected', reason: 'Rest' },
  { id: 'L005', employee: 'Mei Lin', type: 'Maternity Leave', from: '2024-03-01', to: '2024-05-31', days: 92, status: 'pending', reason: 'Maternity' },
  { id: 'L006', employee: 'Isaac Brown', type: 'Sick Leave', from: '2024-01-18', to: '2024-01-18', days: 1, status: 'approved', reason: 'Fever' },
];

export const payrollData = [
  { id: 'P001', employee: 'Sarah Chen', department: 'Engineering', basic: 7917, hra: 3167, allowances: 1000, deductions: 1500, net: 10584, status: 'paid', month: 'January 2024' },
  { id: 'P002', employee: 'James Wilson', department: 'Marketing', basic: 6500, hra: 2600, allowances: 800, deductions: 1200, net: 8700, status: 'paid', month: 'January 2024' },
  { id: 'P003', employee: 'Marcus Johnson', department: 'Sales', basic: 7333, hra: 2933, allowances: 1200, deductions: 1400, net: 10066, status: 'processing', month: 'January 2024' },
  { id: 'P004', employee: 'Emma Thompson', department: 'Finance', basic: 6000, hra: 2400, allowances: 700, deductions: 1100, net: 8000, status: 'paid', month: 'January 2024' },
  { id: 'P005', employee: 'David Park', department: 'Design', basic: 6833, hra: 2733, allowances: 900, deductions: 1300, net: 9166, status: 'pending', month: 'January 2024' },
];

export const candidates = [
  { id: 'C001', name: 'Alex Turner', position: 'Senior Frontend Dev', stage: 'interview', score: 85, appliedDate: '2024-01-10', email: 'alex.t@email.com', experience: '5 years' },
  { id: 'C002', name: 'Rachel Green', position: 'Product Manager', stage: 'screening', score: 72, appliedDate: '2024-01-12', email: 'rachel.g@email.com', experience: '7 years' },
  { id: 'C003', name: 'Chris Evans', position: 'Data Analyst', stage: 'offer', score: 91, appliedDate: '2024-01-05', email: 'chris.e@email.com', experience: '4 years' },
  { id: 'C004', name: 'Maya Patel', position: 'Marketing Specialist', stage: 'applied', score: 68, appliedDate: '2024-01-14', email: 'maya.p@email.com', experience: '3 years' },
  { id: 'C005', name: 'Daniel Lee', position: 'Backend Engineer', stage: 'technical', score: 88, appliedDate: '2024-01-08', email: 'daniel.l@email.com', experience: '6 years' },
  { id: 'C006', name: 'Zoe Martinez', position: 'Sales Executive', stage: 'hired', score: 94, appliedDate: '2023-12-28', email: 'zoe.m@email.com', experience: '5 years' },
];

export const tickets = [
  { id: 'T001', subject: 'Cannot access payslip portal', category: 'IT', priority: 'high', status: 'open', assignee: 'IT Support', created: '2024-01-15', employee: 'Sarah Chen' },
  { id: 'T002', subject: 'Leave balance discrepancy', category: 'HR', priority: 'medium', status: 'in-progress', assignee: 'HR Team', created: '2024-01-14', employee: 'James Wilson' },
  { id: 'T003', subject: 'Office equipment request', category: 'Admin', priority: 'low', status: 'resolved', assignee: 'Facilities', created: '2024-01-12', employee: 'David Park' },
  { id: 'T004', subject: 'Salary revision query', category: 'Finance', priority: 'high', status: 'open', assignee: 'Finance Team', created: '2024-01-15', employee: 'Marcus Johnson' },
  { id: 'T005', subject: 'VPN configuration issue', category: 'IT', priority: 'medium', status: 'in-progress', assignee: 'IT Support', created: '2024-01-13', employee: 'Mei Lin' },
];

export const assets = [
  { id: 'AS001', name: 'MacBook Pro 16"', type: 'Laptop', serialNo: 'MBP2023-001', assignedTo: 'Sarah Chen', status: 'assigned', purchaseDate: '2023-01-15', value: 3499 },
  { id: 'AS002', name: 'iPhone 15 Pro', type: 'Mobile', serialNo: 'IP15-002', assignedTo: 'Marcus Johnson', status: 'assigned', purchaseDate: '2023-09-22', value: 1199 },
  { id: 'AS003', name: 'Dell Monitor 27"', type: 'Monitor', serialNo: 'DM27-003', assignedTo: 'David Park', status: 'assigned', purchaseDate: '2022-06-10', value: 649 },
  { id: 'AS004', name: 'Ergonomic Chair', type: 'Furniture', serialNo: 'EC-004', assignedTo: '-', status: 'available', purchaseDate: '2023-03-05', value: 899 },
  { id: 'AS005', name: 'iPad Pro', type: 'Tablet', serialNo: 'IPD-005', assignedTo: 'Emma Thompson', status: 'assigned', purchaseDate: '2023-07-18', value: 1099 },
];

export const projects = [
  { id: 'PR001', name: 'HRMS Redesign', status: 'in-progress', priority: 'high', lead: 'David Park', team: ['Sarah Chen', 'Mei Lin'], progress: 65, deadline: '2024-03-31', tasks: 24 },
  { id: 'PR002', name: 'Q1 Marketing Campaign', status: 'planning', priority: 'medium', lead: 'James Wilson', team: ['Liam Foster'], progress: 20, deadline: '2024-02-28', tasks: 15 },
  { id: 'PR003', name: 'Sales Pipeline Automation', status: 'in-progress', priority: 'high', lead: 'Marcus Johnson', team: ['Isaac Brown'], progress: 45, deadline: '2024-04-15', tasks: 18 },
  { id: 'PR004', name: 'Employee Onboarding Flow', status: 'completed', priority: 'medium', lead: 'Priya Sharma', team: ['Emma Thompson'], progress: 100, deadline: '2024-01-15', tasks: 12 },
];

export const leads = [
  { id: 'LD001', company: 'TechCorp Inc', contact: 'Brian White', email: 'b.white@techcorp.com', phone: '+1 555-0201', stage: 'qualified', value: 45000, source: 'LinkedIn', assigned: 'Marcus Johnson' },
  { id: 'LD002', company: 'Global Ventures', contact: 'Sandra Lee', email: 's.lee@gv.com', phone: '+1 555-0202', stage: 'proposal', value: 120000, source: 'Referral', assigned: 'Isaac Brown' },
  { id: 'LD003', company: 'Startup Hub', contact: 'Tony Stark', email: 't.stark@startup.io', phone: '+1 555-0203', stage: 'new', value: 28000, source: 'Website', assigned: 'Marcus Johnson' },
  { id: 'LD004', company: 'Enterprise Solutions', contact: 'Mary Johnson', email: 'm.j@enterprise.com', phone: '+1 555-0204', stage: 'negotiation', value: 250000, source: 'Cold Outreach', assigned: 'Isaac Brown' },
  { id: 'LD005', company: 'Cloud Systems', contact: 'Peter Parker', email: 'p.p@cloud.com', phone: '+1 555-0205', stage: 'won', value: 89000, source: 'Conference', assigned: 'Marcus Johnson' },
];

export const expenses = [
  { id: 'EX001', description: 'Team lunch - Q1 planning', category: 'Meals', amount: 285, date: '2024-01-15', submittedBy: 'Marcus Johnson', status: 'approved' },
  { id: 'EX002', description: 'Adobe Creative Suite license', category: 'Software', amount: 599, date: '2024-01-12', submittedBy: 'David Park', status: 'pending' },
  { id: 'EX003', description: 'Flight to NYC conference', category: 'Travel', amount: 420, date: '2024-01-10', submittedBy: 'James Wilson', status: 'approved' },
  { id: 'EX004', description: 'Office supplies', category: 'Office', amount: 145, date: '2024-01-08', submittedBy: 'Priya Sharma', status: 'approved' },
  { id: 'EX005', description: 'Client entertainment', category: 'Meals', amount: 650, date: '2024-01-14', submittedBy: 'Isaac Brown', status: 'rejected' },
];

export const monthlyChartData = [
  { month: 'Jan', employees: 48, revenue: 420000, expenses: 285000 },
  { month: 'Feb', employees: 51, revenue: 445000, expenses: 295000 },
  { month: 'Mar', employees: 54, revenue: 480000, expenses: 310000 },
  { month: 'Apr', employees: 55, revenue: 515000, expenses: 320000 },
  { month: 'May', employees: 58, revenue: 550000, expenses: 335000 },
  { month: 'Jun', employees: 60, revenue: 590000, expenses: 355000 },
  { month: 'Jul', employees: 62, revenue: 620000, expenses: 370000 },
  { month: 'Aug', employees: 63, revenue: 645000, expenses: 385000 },
  { month: 'Sep', employees: 65, revenue: 680000, expenses: 395000 },
  { month: 'Oct', employees: 68, revenue: 715000, expenses: 415000 },
  { month: 'Nov', employees: 70, revenue: 750000, expenses: 430000 },
  { month: 'Dec', employees: 72, revenue: 790000, expenses: 450000 },
];

export const departmentData = [
  { name: 'Engineering', value: 28, color: '#3b82f6' },
  { name: 'Sales', value: 18, color: '#10b981' },
  { name: 'Marketing', value: 12, color: '#f59e0b' },
  { name: 'Finance', value: 8, color: '#8b5cf6' },
  { name: 'HR', value: 6, color: '#ef4444' },
  { name: 'Design', value: 10, color: '#06b6d4' },
  { name: 'Operations', value: 10, color: '#ec4899' },
];

export const activityFeed = [
  { id: 1, user: 'Sarah Chen', action: 'submitted a leave request', time: '5 min ago', type: 'leave' },
  { id: 2, user: 'Marcus Johnson', action: 'closed deal with Enterprise Solutions', time: '28 min ago', type: 'deal' },
  { id: 3, user: 'Priya Sharma', action: 'onboarded a new employee', time: '1 hr ago', type: 'employee' },
  { id: 4, user: 'David Park', action: 'submitted project update', time: '2 hrs ago', type: 'project' },
  { id: 5, user: 'James Wilson', action: 'updated Q1 marketing report', time: '3 hrs ago', type: 'report' },
  { id: 6, user: 'Mei Lin', action: 'raised an IT support ticket', time: '4 hrs ago', type: 'ticket' },
];
