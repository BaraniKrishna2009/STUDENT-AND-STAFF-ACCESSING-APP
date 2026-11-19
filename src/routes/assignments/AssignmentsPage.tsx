// src/routes/assignments/AssignmentsPage.tsx
import React, { useEffect, useState } from "react";
import { useStudent } from "../../hooks/useStudent";
import { useAssignments, deleteAssignment } from "../../services/assignmentService";
import AssignmentModal from "../../components/AssignmentModal";
import type { Assignment } from "../../types/assignment";

const AssignmentsPage: React.FC = () => {
  const studentId = useStudent();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAssignment, setEditAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    if (!studentId) return;
    const unsub = useAssignments(studentId, setAssignments);
    return () => unsub();
  }, [studentId]);

  const handleDelete = async (id: string) => {
    await deleteAssignment(id);
  };

  const openEdit = (assignment: Assignment) => {
    setEditAssignment(assignment);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <button
          onClick={() => {
            setEditAssignment(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
        >
          + Add Assignment
        </button>
      </div>

      {assignments.length === 0 ? (
        <p className="text-gray-500">No assignments found.</p>
      ) : (
        <ul className="space-y-3">
          {assignments.map((a) => (
            <li key={a.assignment_id} className="border rounded p-4 bg-white dark:bg-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{a.title}</h2>
                <p className="text-sm text-gray-600">Due: {new Date(a.due_date).toLocaleDateString()}</p>
                <p className="text-sm">Status: {a.status}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEdit(a)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.assignment_id!)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AssignmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        existing={editAssignment}
        onSaved={() => {
          // assignments will refresh via listener
        }}
      />
    </div>
  );
};

export default AssignmentsPage;
