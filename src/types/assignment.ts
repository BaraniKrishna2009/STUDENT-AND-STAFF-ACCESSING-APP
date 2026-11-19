export interface Assignment {
  assignment_id?: string;
  student_id: string;
  title: string;
  course_id?: string;
  due_date: string; // ISO date string
  status: 'pending' | 'completed' | 'overdue';
  description?: string;
  created_at?: string;
}
