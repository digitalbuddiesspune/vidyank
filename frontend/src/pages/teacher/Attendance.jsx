import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialAttendance,
  teacherSubjects,
  teacherStudents,
  currentTeacher,
  getNextAttendanceId,
} from '../../data/teacherData';

/**
 * Attendance Page
 * Select batch and date, mark students present/absent, store in local state
 */
function Attendance() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Get students for selected batch
  const batchStudents = selectedBatch
    ? teacherStudents.filter((s) => s.batchId === parseInt(selectedBatch))
    : [];

  // Get subjects for selected batch
  const batchSubjects = selectedBatch
    ? teacherSubjects.filter((s) => s.batchId === parseInt(selectedBatch))
    : [];

  // Get attendance for selected batch and date
  const currentAttendance = attendance.filter(
    (a) =>
      a.batchId === parseInt(selectedBatch) &&
      a.date === selectedDate &&
      a.subject === selectedSubject
  );

  // Initialize attendance status for students
  const [studentStatus, setStudentStatus] = useState({});

  useEffect(() => {
    // Initialize student status from existing attendance records
    const statusMap = {};
    const currentAtt = attendance.filter(
      (a) =>
        a.batchId === parseInt(selectedBatch) &&
        a.date === selectedDate &&
        a.subject === selectedSubject
    );
    const batchStuds = selectedBatch
      ? teacherStudents.filter((s) => s.batchId === parseInt(selectedBatch))
      : [];
    
    currentAtt.forEach((record) => {
      statusMap[record.studentId] = record.status;
    });
    // Set default to 'present' for students without records
    batchStuds.forEach((student) => {
      if (!statusMap[student.id]) {
        statusMap[student.id] = 'present';
      }
    });
    setStudentStatus(statusMap);
  }, [selectedBatch, selectedDate, selectedSubject, attendance]);

  // Filter attendance records for display
  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === '' || record.batchId === parseInt(filterBatch);
    const matchesDate = filterDate === '' || record.date === filterDate;
    return matchesSearch && matchesBatch && matchesDate;
  });

  const handleStatusChange = (studentId, status) => {
    setStudentStatus({ ...studentStatus, [studentId]: status });
  };

  const handleSaveAttendance = () => {
    if (!selectedBatch || !selectedDate || !selectedSubject) {
      alert('Please select batch, date, and subject');
      return;
    }

    const batch = teacherSubjects.find((s) => s.batchId === parseInt(selectedBatch));

    batchStudents.forEach((student) => {
      const status = studentStatus[student.id] || 'present';
      const existingRecord = attendance.find(
        (a) =>
          a.studentId === student.id &&
          a.date === selectedDate &&
          a.subject === selectedSubject
      );

      if (existingRecord) {
        // Update existing record
        setAttendance(
          attendance.map((a) =>
            a.id === existingRecord.id
              ? { ...a, status }
              : a
          )
        );
      } else {
        // Add new record
        const newRecord = {
          id: getNextAttendanceId(),
          batchId: parseInt(selectedBatch),
          batchName: batch?.batchName || '',
          subject: selectedSubject,
          date: selectedDate,
          studentId: student.id,
          studentName: student.name,
          rollNumber: student.rollNumber,
          status,
        };
        setAttendance([...attendance, newRecord]);
      }
    });

    alert('Attendance saved successfully!');
  };

  const batchOptions = teacherSubjects
    .filter((s, index, self) => self.findIndex((t) => t.batchId === s.batchId) === index)
    .map((s) => ({
      value: s.batchId.toString(),
      label: s.batchName,
    }));

  const subjectOptions = batchSubjects.map((s) => ({
    value: s.subject,
    label: s.subject,
  }));

  const uniqueBatches = [...new Set(attendance.map((a) => a.batchId))];
  const batchFilterOptions = uniqueBatches.map((batchId) => {
    const batch = teacherSubjects.find((s) => s.batchId === batchId);
    return {
      value: batchId.toString(),
      label: batch?.batchName || `Batch ${batchId}`,
    };
  });

  // Calculate statistics
  const stats = {
    totalRecords: filteredAttendance.length,
    present: filteredAttendance.filter((r) => r.status === 'present').length,
    absent: filteredAttendance.filter((r) => r.status === 'absent').length,
    presentPercentage:
      filteredAttendance.length > 0
        ? (
            (filteredAttendance.filter((r) => r.status === 'present').length /
              filteredAttendance.length) *
            100
          ).toFixed(2)
        : 0,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Attendance</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Records</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalRecords}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Present</p>
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Absent</p>
            <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Present %</p>
            <p className="text-2xl font-bold text-purple-600">
              {stats.presentPercentage}%
            </p>
          </div>
        </div>

        {/* Mark Attendance Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Mark Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select
              label="Select Batch"
              value={selectedBatch}
              onChange={(e) => {
                setSelectedBatch(e.target.value);
                setSelectedSubject('');
              }}
              options={[{ value: '', label: 'Select Batch' }, ...batchOptions]}
            />
            <Select
              label="Select Subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              options={[{ value: '', label: 'Select Subject' }, ...subjectOptions]}
              disabled={!selectedBatch}
            />
            <Input
              label="Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {selectedBatch && selectedSubject && batchStudents.length > 0 && (
            <div className="mt-4">
              <div className="bg-white rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Mark Attendance for {batchSubjects.find((s) => s.subject === selectedSubject)?.batchName} - {selectedSubject}
                </h3>
                <div className="space-y-2">
                  {batchStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.rollNumber}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            studentStatus[student.id] === 'present'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            studentStatus[student.id] === 'absent'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="primary" onClick={handleSaveAttendance}>
                    Save Attendance
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            options={[{ value: '', label: 'All Batches' }, ...batchFilterOptions]}
          />
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filter by date"
          />
        </div>

        {/* Attendance Records Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.batchName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          record.status === 'present'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
