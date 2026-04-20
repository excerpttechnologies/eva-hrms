export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  salary: number;
  avatar: string;
  location: string;
  manager: string;
}

export const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design', 'Legal'];

export const employees: Employee[] = [
  { id: 'E001', name: 'Sarah Chen', email: 'sarah.chen@nexushr.com', phone: '+1 555-0101', department: 'Engineering', position: 'Senior Engineer', status: 'active', joinDate: '2022-03-15', salary: 95000, avatar: '', location: 'New York', manager: 'Alex Morrison' },
  { id: 'E002', name: 'James Wilson', email: 'james.w@nexushr.com', phone: '+1 555-0102', department: 'Marketing', position: 'Marketing Lead', status: 'active', joinDate: '2021-07-01', salary: 78000, avatar: '', location: 'San Francisco', manager: 'Emily Davis' },
  { id: 'E003', name: 'Priya Sharma', email: 'priya.s@nexushr.com', phone: '+1 555-0103', department: 'HR', position: 'HR Specialist', status: 'active', joinDate: '2023-01-10', salary: 65000, avatar: '', location: 'Austin', manager: 'Alex Morrison' },
  { id: 'E004', name: 'Marcus Johnson', email: 'marcus.j@nexushr.com', phone: '+1 555-0104', department: 'Sales', position: 'Sales Manager', status: 'active', joinDate: '2020-11-20', salary: 88000, avatar: '', location: 'Chicago', manager: 'Tom Harris' },
  { id: 'E005', name: 'Emma Thompson', email: 'emma.t@nexushr.com', phone: '+1 555-0105', department: 'Finance', position: 'Financial Analyst', status: 'on-leave', joinDate: '2022-08-05', salary: 72000, avatar: '', location: 'Boston', manager: 'Robert Kim' },
  { id: 'E006', name: 'David Park', email: 'david.p@nexushr.com', phone: '+1 555-0106', department: 'Design', position: 'UX Designer', status: 'active', joinDate: '2023-04-01', salary: 82000, avatar: '', location: 'Seattle', manager: 'Lisa Wang' },
  { id: 'E007', name: 'Sofia Rodriguez', email: 'sofia.r@nexushr.com', phone: '+1 555-0107', department: 'Engineering', position: 'Backend Developer', status: 'active', joinDate: '2021-09-15', salary: 91000, avatar: '', location: 'Miami', manager: 'Alex Morrison' },
  { id: 'E008', name: 'Kevin O\'Brien', email: 'kevin.o@nexushr.com', phone: '+1 555-0108', department: 'Operations', position: 'Operations Manager', status: 'active', joinDate: '2020-05-10', salary: 79000, avatar: '', location: 'Denver', manager: 'Tom Harris' },
  { id: 'E009', name: 'Amara Osei', email: 'amara.o@nexushr.com', phone: '+1 555-0109', department: 'Legal', position: 'Legal Counsel', status: 'inactive', joinDate: '2019-12-01', salary: 115000, avatar: '', location: 'New York', manager: 'Robert Kim' },
  { id: 'E010', name: 'Liam Foster', email: 'liam.f@nexushr.com', phone: '+1 555-0110', department: 'Marketing', position: 'Content Strategist', status: 'active', joinDate: '2023-06-20', salary: 58000, avatar: '', location: 'Portland', manager: 'Emily Davis' },
  { id: 'E011', name: 'Mei Lin', email: 'mei.l@nexushr.com', phone: '+1 555-0111', department: 'Engineering', position: 'DevOps Engineer', status: 'active', joinDate: '2022-01-08', salary: 98000, avatar: '', location: 'San Jose', manager: 'Alex Morrison' },
  { id: 'E012', name: 'Isaac Brown', email: 'isaac.b@nexushr.com', phone: '+1 555-0112', department: 'Sales', position: 'Account Executive', status: 'active', joinDate: '2023-02-14', salary: 62000, avatar: '', location: 'Atlanta', manager: 'Tom Harris' },
];
