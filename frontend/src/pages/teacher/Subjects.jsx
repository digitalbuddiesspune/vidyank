import { useState } from 'react';
import { teacherSubjects } from '../../data/teacherData';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

/**
 * Subjects Page
 * Show assigned subjects with batch name and subject name
 */
function Subjects() {
  const [subjects] = useState(teacherSubjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterBatch, setFilterBatch] = useState('');

  // Get unique subjects and batches for filters
  const uniqueSubjects = [...new Set(subjects.map((s) => s.subject))];
  const uniqueBatches = [...new Set(subjects.map((s) => s.batchName))];

  // Filter subjects
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.schedule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === '' || subject.subject === filterSubject;
    const matchesBatch = filterBatch === '' || subject.batchName === filterBatch;
    return matchesSearch && matchesSubject && matchesBatch;
  });

  const subjectOptions = uniqueSubjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  const batchOptions = uniqueBatches.map((batch) => ({
    value: batch,
    label: batch,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Subjects</h1>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search subjects, batches, or schedule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            options={[{ value: '', label: 'All Subjects' }, ...subjectOptions]}
          />
          <Select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            options={[{ value: '', label: 'All Batches' }, ...batchOptions]}
          />
        </div>

        {/* Subjects Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubjects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No subjects found
                  </td>
                </tr>
              ) : (
                filteredSubjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold">
                            {subject.subject.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {subject.subject}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {subject.batchName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subject.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Subjects</p>
            <p className="text-2xl font-bold text-blue-600">{uniqueSubjects.length}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Batches</p>
            <p className="text-2xl font-bold text-purple-600">{uniqueBatches.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Assignments</p>
            <p className="text-2xl font-bold text-green-600">{subjects.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subjects;
