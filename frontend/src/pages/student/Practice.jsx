import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import {
  practiceTests,
  practiceCategories,
  difficultyLevels,
} from '../../data/studentData';

/**
 * Practice Page
 * Practice tests list with categories and difficulty filters
 */
function Practice() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter practice tests
  const filteredTests = practiceTests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'all' ||
      test.subject.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesDifficulty =
      selectedDifficulty === 'all' || test.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleStartPractice = (testId) => {
    const test = practiceTests.find((t) => t.id === testId);
    alert(`Starting practice test: ${test?.title}\n\nThis would navigate to the practice test page in a real application.`);
    // In a real app, this would navigate to the practice test taking page
  };

  const getDifficultyColor = (difficulty) => {
    const level = difficultyLevels.find((d) => d.value === difficulty);
    return level ? level.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Practice Tests</h1>

        {/* Category Chips */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {practiceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === 'all' ? 'all' : category.name.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (selectedCategory === 'all' && category.id === 'all') ||
                  (selectedCategory === category.name.toLowerCase() && category.id !== 'all')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Search and Difficulty Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search practice tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Difficulties</option>
            {difficultyLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Practice Test Cards */}
        {filteredTests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No practice tests found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{test.title}</h3>
                    <p className="text-sm text-gray-600">{test.subject}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(
                      test.difficulty
                    )}`}
                  >
                    {test.difficulty}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{test.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">❓</span>
                    <span>{test.questionCount} questions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏰</span>
                    <span>{test.duration} minutes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📚</span>
                    <span>{test.category}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={() => handleStartPractice(test.id)}
                  className="w-full"
                >
                  Start Practice
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Tests</p>
            <p className="text-2xl font-bold text-blue-600">{practiceTests.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Available Now</p>
            <p className="text-2xl font-bold text-green-600">{filteredTests.length}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Categories</p>
            <p className="text-2xl font-bold text-purple-600">
              {practiceCategories.length - 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Practice;
