import   { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { useChangePasswordMutation } from '@/redux/features/auth/auth.api';
import toast from 'react-hot-toast';

// Password validation schema
const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordChangeForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  });

  const newPassword = watch('newPassword');
  
  // Password strength indicators
  const hasMinLength = newPassword?.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword);

  const onSubmit = async (data: PasswordFormData) => {
    try {
      const result = await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword
      }).unwrap();

      if (result.success) {
        toast.success('Password updated successfully!');
        reset();
      }
    } catch (error: any) {
      console.error('Password change error:', error);
      toast.error(error?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('currentPassword')}
              type={showCurrentPassword ? 'text' : 'password'}
              id="currentPassword"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('newPassword')}
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Create new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Password Requirements */}
        {newPassword && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
            <div className="flex items-center text-sm">
              <CheckCircle className={`h-4 w-4 mr-2 ${hasMinLength ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={hasMinLength ? 'text-green-600' : 'text-gray-500'}>At least 8 characters</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className={`h-4 w-4 mr-2 ${hasUpperCase ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={hasUpperCase ? 'text-green-600' : 'text-gray-500'}>One uppercase letter</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className={`h-4 w-4 mr-2 ${hasLowerCase ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={hasLowerCase ? 'text-green-600' : 'text-gray-500'}>One lowercase letter</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className={`h-4 w-4 mr-2 ${hasNumber ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={hasNumber ? 'text-green-600' : 'text-gray-500'}>One number</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className={`h-4 w-4 mr-2 ${hasSpecialChar ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={hasSpecialChar ? 'text-green-600' : 'text-gray-500'}>One special character</span>
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Updating Password...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default PasswordChangeForm;