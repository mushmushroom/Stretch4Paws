import DashboardWrapper from '../pageWrappers/DashboardWrapper';
import DashboardHeader from './DashboardHeader';
import FormInput from '../common/FormInput';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import useEditProfile from '../../hooks/useEditProfile';
import { AppRoutes } from '../../lib/constants';

export default function EditProfilePage() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, isDirty, saved, isOAuthUser } =
    useEditProfile();

  return (
    <DashboardWrapper>
      <div className="dashboard-page">
        <DashboardHeader title="Edit profile" text="Update your name and email." back={AppRoutes.DASHBOARD_PROFILE} />

        <form className="profile-card" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            id="edit-name"
            label="Name"
            placeholder="John Doe"
            autoComplete="name"
            registration={register('name')}
            error={errors.name}
          />

          {!isOAuthUser && (
            <FormInput
              id="edit-email"
              label="Email"
              type="email"
              placeholder="johndoe@example.com"
              autoComplete="email"
              registration={register('email')}
              error={errors.email}
            />
          )}

          {isOAuthUser && (
            <p className="profile-card__hint">
              Email is managed by your sign-in provider and cannot be changed here.
            </p>
          )}

          {errors.root && <ErrorMessage message={errors.root.message} />}
          {saved && <SuccessMessage message="Profile updated" />}

          <button className="btn btn--purple" type="submit" disabled={isSubmitting || !isDirty}>
            Save changes
          </button>
        </form>
      </div>
    </DashboardWrapper>
  );
}
