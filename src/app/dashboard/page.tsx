'use client';
import { useState, useEffect } from 'react';

const SurveyDashboard = () => {
  // Sample data from API response
  const surveyData = {
    id: 25,
    organisation: "NSUK",
    quadrant: "Q1",
    cniir_score: "0.21",
    pre_event_rtd_score: "0.17",
    during_event_rtd_score: "0.12",
    post_event_rtd_score: "0.19",
    date_calculated: "2023-04-19T06:47:48.000000Z"
  };

  // User data (would typically come from auth context or API)
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 812 345 6789"
  });

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState(userData.phone);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    // Typically would redirect to login page
    // router.push('/login');
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhoneUpdate = () => {
    setUserData({...userData, phone: newPhone});
    setIsEditingPhone(false);
  };

  const handlePasswordChange = () => {
    // Add password validation and API call here
    if (passwordData.newPassword === passwordData.confirmPassword) {
      alert('Password changed successfully!');
      setIsEditingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      alert('New passwords do not match!');
    }
  };

  // Format date for display
  const formattedDate = new Date(surveyData.date_calculated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-500 ease-in-out ${isScrolled ? 'py-3' : 'py-6'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className={`flex flex-col items-start space-y-1`}>
              <h1 className={`font-bold text-gray-900 transition-all duration-500 ease-in-out ${isScrolled ? 'text-xl' : 'text-3xl'}`}>
                Resilience Dashboard
              </h1>
              <p className={`text-gray-600 transition-all duration-500 ease-in-out ${isScrolled ? 'text-sm' : 'text-base'}`}>
                Submitted on {formattedDate}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Logout Button - Always visible */}
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-full hover:bg-red-50 transition-colors duration-200"
                aria-label="Logout"
                title="Logout"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-red-500 hover:text-red-600 transition-colors duration-200" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                    className="opacity-0"  // Hidden plus sign
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                  />
                </svg>
              </button>

              {/* User Info - Only shows when scrolled */}
              {isScrolled && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 hidden sm:inline">
                    {userData.name}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-800">
                      {userData.name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* User Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* User Profile Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Profile</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1 text-sm text-gray-900">{userData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  {isEditingPhone ? (
                    <div className="mt-1 flex">
                      <input
                        type="tel"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <button
                        onClick={handlePhoneUpdate}
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <p className="mt-1 text-sm text-gray-900">{userData.phone}</p>
                      <button
                        onClick={() => setIsEditingPhone(true)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Password Change Section */}
                <div className="pt-4 border-t border-gray-200">
                  {isEditingPassword ? (
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                          type="password"
                          id="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                          type="password"
                          id="newPassword"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={handlePasswordChange}
                          className="flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Change Password
                        </button>
                        <button
                          onClick={() => setIsEditingPassword(false)}
                          className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditingPassword(true)}
                      className="w-full mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Change Password
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scores Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden md:col-span-2">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Resilience Scores</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">CNIIR Score</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">{surveyData.cniir_score}</p>
                  <p className="text-xs text-blue-600 mt-1">Composite National Infrastructure Impact Resilience</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Pre-Event RTD</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">{surveyData.pre_event_rtd_score}</p>
                  <p className="text-xs text-green-600 mt-1">Readiness to Disrupt</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">During Event RTD</p>
                  <p className="text-2xl font-bold text-yellow-900 mt-1">{surveyData.during_event_rtd_score}</p>
                  <p className="text-xs text-yellow-600 mt-1">Response Capacity</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-800">Post-Event RTD</p>
                  <p className="text-2xl font-bold text-purple-900 mt-1">{surveyData.post_event_rtd_score}</p>
                  <p className="text-xs text-purple-600 mt-1">Recovery Potential</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Chat */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Score Analysis</h2>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Your organization ({surveyData.organisation})</span> is in Quadrant {surveyData.quadrant}. 
                    Your CNIIR score of {surveyData.cniir_score} suggests moderate infrastructure resilience.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex-1">
                  <p className="text-sm text-gray-800">
                    Your <span className="font-medium">pre-event readiness</span> score of {surveyData.pre_event_rtd_score} indicates 
                    {parseFloat(surveyData.pre_event_rtd_score) > 0.15 ? " good" : " some"} preparation for potential disruptions.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex-1">
                  <p className="text-sm text-gray-800">
                    The <span className="font-medium">during-event response</span> score of {surveyData.during_event_rtd_score} suggests 
                    {parseFloat(surveyData.during_event_rtd_score) > 0.15 ? " strong" : " room for improvement in"} your capacity to manage disruptions.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg flex-1">
                  <p className="text-sm text-gray-800">
                    With a <span className="font-medium">post-event recovery</span> score of {surveyData.post_event_rtd_score}, your organization shows 
                    {parseFloat(surveyData.post_event_rtd_score) > 0.15 ? " good" : " moderate"} potential for bouncing back after disruptions.
                  </p>
                </div>
              </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SurveyDashboard;