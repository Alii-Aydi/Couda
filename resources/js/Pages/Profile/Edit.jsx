import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from '../../Components/Profile/DeleteUserForm';
import UpdatePasswordForm from '../../Components/Profile/UpdatePasswordForm';
import UpdateProfileInformationForm from '../../Components/Profile/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import ProfilePictureInput from '@/Components/Profile/UploadPicture';
import SignatureUploadInput from '@/Components/Profile/UploadSignature';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="mt-16 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="py-4 sm:py-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <ProfilePictureInput initialImage={auth.user.profile_pic} userId={auth.user.id} className="max-w-xl" />
                        </div>

                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
