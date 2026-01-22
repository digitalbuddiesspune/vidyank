import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { initialSettings } from '../../data/superAdminData';

/**
 * Settings Page
 * Platform settings form with theme toggle
 */
function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleThemeToggle = () => {
    setSettings({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light',
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would upload the logo
      alert(`Logo selected: ${file.name}\n(In a real app, this would upload the file)`);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSettings(initialSettings);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Platform Settings</h1>

        <form onSubmit={handleSave}>
          {/* Platform Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Platform Information</h2>
            <div className="space-y-4">
              <Input
                label="Platform Name"
                name="platformName"
                value={settings.platformName}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
              
              <Input
                label="Support Email"
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />

              {/* Logo Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    {settings.logo ? (
                      <img
                        src={settings.logo}
                        alt="Logo"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No Logo</span>
                    )}
                  </div>
                  {isEditing && (
                    <div>
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
                          Upload Logo
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 200x200px, PNG or JPG
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="mb-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Theme Settings</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Theme Mode</p>
                <p className="text-sm text-gray-600">
                  Current theme: <span className="font-semibold capitalize">{settings.theme}</span>
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.theme === 'dark'}
                  onChange={handleThemeToggle}
                  className="sr-only peer"
                  disabled={!isEditing}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"></div>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {settings.theme === 'dark'
                ? 'Dark mode is enabled. The platform will use dark colors.'
                : 'Light mode is enabled. The platform will use light colors.'}
            </p>
          </div>

          {/* Admin Profile Settings */}
          <div className="mb-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Profile</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                  SA
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Super Admin</p>
                  <p className="text-sm text-gray-600">admin@examplatform.com</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Profile settings can be managed from the profile page.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 border-t pt-6">
            {isEditing ? (
              <>
                <Button type="button" variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Settings
                </Button>
              </>
            ) : (
              <Button type="button" variant="primary" onClick={() => setIsEditing(true)}>
                Edit Settings
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
