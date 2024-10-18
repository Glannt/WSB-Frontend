import ProfileEditor from '../ProfileEditor/ProfileEditor';

export const StaffProfile: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute w-full left-3 top-40">
        <ProfileEditor />
      </div>
    </div>
  );
};
