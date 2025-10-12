 
import { User, Shield, Package, Truck } from 'lucide-react';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import PersonalInfoForm from './PersonalInfoForm';
import PasswordChangeForm from './PasswordChangeForm';
 
 

const ProfilePage = () => {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const user = userData?.data?.user;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User not found</h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  // Role-based icons and colors
  const getRoleDetails = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return { icon: Shield, color: 'bg-purple-100 text-purple-600' };
      case 'SENDER':
        return { icon: Package, color: 'bg-blue-100 text-blue-600' };
      case 'RECEIVER':
        return { icon: Truck, color: 'bg-green-100 text-green-600' };
      default:
        return { icon: User, color: 'bg-gray-100 text-gray-600' };
    }
  };

  const { icon: RoleIcon, color } = getRoleDetails(user.role);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* Avatar */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className={`absolute -bottom-2 -right-2 p-2 rounded-full ${color}`}>
                  <RoleIcon className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* User Info */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-4">{user.email}</p>
            
            {/* Role Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-medium">
              <RoleIcon className="h-4 w-4 mr-2" />
              {user.role}
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            </div>
            <PersonalInfoForm userData={user} />
          </div>

          {/* Password Change */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Security</h2>
            </div>
            <PasswordChangeForm />
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Member Since</span>
              <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-gray-500">Account Status</span>
              <p className="font-medium text-green-600">Active</p>
            </div>
            <div>
              <span className="text-gray-500">Last Updated</span>
              <p className="font-medium">{new Date(user.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;