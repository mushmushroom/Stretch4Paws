import DashboardWrapper from '../pageWrappers/DashboardWrapper';
import DashboardHeader from './DashboardHeader';
import FormInput from '../common/FormInput';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import PasswordRequirements from '../auth/PasswordRequirements';
import PasswordStrengthIndicator from '../auth/PasswordStrengthIndicator';
import useDashboardChangePassword from '../../hooks/useDashboardChangePassword';
import { AppRoutes } from '../../lib/constants';

export default function DashboardChangePasswordPage() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, passwordScore, saved } =
    useDashboardChangePassword();

  return (
    <DashboardWrapper>
      <div className="dashboard-page">
        <DashboardHeader title="Change password" text="Choose a strong new password." back={AppRoutes.DASHBOARD_PROFILE} />

        <form className="profile-card" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="New password"
            type="password"
            placeholder="••••••••"
            registration={register('password')}
            error={errors.password}
          />
          <PasswordRequirements />
          <PasswordStrengthIndicator passwordScore={passwordScore} />
          <FormInput
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            registration={register('confirmPassword')}
            error={errors.confirmPassword}
          />

          {errors.root && <ErrorMessage message={errors.root.message} />}
          {saved && <SuccessMessage message="Password changed" />}

          <button className="btn btn--purple" type="submit" disabled={isSubmitting}>
            Change password
          </button>
        </form>
      </div>
    </DashboardWrapper>
  );
}
