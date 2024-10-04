import { staffs } from '@/data/data';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import React from 'react';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  selectedStaff: {
    staffId?: string;
    fullName?: string;
    workShift?: string;
    roomInCharge?: string[];
    phoneNumber?: string;
    email?: string;
    dateOfHire?: string;
    workDays?: string[];
    status?: string;
  } | null;
  setSelectedStaff:
    | React.Dispatch<
        React.SetStateAction<{
          staffId?: string;
          fullName?: string;
          workShift?: string;
          roomInCharge?: string[];
          phoneNumber?: string;
          email?: string;
          dateOfHire?: string;
          workDays?: string[];
          status?: string;
        } | null>
      >
    | undefined;
}

const AdminStaffModal: React.FC<StaffModalProps> = ({
  isOpen,
  onClose,
  mode,
  selectedStaff,
  setSelectedStaff,
}) => {
  const isEditMode = mode === 'edit';

  // Default values for Selects
  const [valueStatus, setValueStatus] = React.useState(
    new Set([selectedStaff?.status || 'active'])
  );
  const [valueRoomType, setValueRoomType] = React.useState(
    new Set(selectedStaff?.workDays || [])
  );

  // Handle changes in form fields
  const handleFieldChange = (field: string, value: any) => {
    if (isEditMode && selectedStaff) {
      setSelectedStaff
        ? {
            ...selectedStaff,
            [field]: value,
          }
        : undefined;
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      placement="top-center"
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        base: 'max-w-[1000px] h-[300px]',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {isEditMode ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-wrap gap-4">
                {/* Nhân viên */}
                <Select
                  label="Nhân viên"
                  className="max-w-xl"
                  onSelectionChange={(keys) => {
                    const newFullName = Array.from(keys).join('');
                    handleFieldChange('fullName', newFullName);
                  }}
                  defaultSelectedKeys={
                    isEditMode && selectedStaff?.fullName
                      ? new Set([selectedStaff.fullName])
                      : undefined
                  }
                >
                  {staffs.map((staff) => (
                    <SelectItem key={staff.staffId}>
                      {staff.fullName}
                    </SelectItem>
                  ))}
                </Select>

                {/* Trạng thái */}
                <Select
                  label="Trạng thái"
                  className="max-w-xl"
                  onSelectionChange={(keys) => {
                    const newStatus = Array.from(keys).join('');
                    handleFieldChange('status', newStatus);
                  }}
                  defaultSelectedKeys={
                    isEditMode && selectedStaff?.status
                      ? new Set([selectedStaff.status])
                      : valueStatus
                  }
                >
                  <SelectItem key="active">Active</SelectItem>
                  <SelectItem key="inactive">Inactive</SelectItem>
                  <SelectItem key="vacation">Vacation</SelectItem>
                </Select>
              </div>

              <div className="flex flex-wrap gap-4">
                {/* Work Shift */}
                <Select
                  label="Ca làm việc"
                  className="max-w-xl"
                  onSelectionChange={(keys) => {
                    const newWorkShift = Array.from(keys).join('');
                    handleFieldChange('workShift', newWorkShift);
                  }}
                  defaultSelectedKeys={
                    isEditMode && selectedStaff?.workShift
                      ? new Set([selectedStaff.workShift])
                      : undefined
                  }
                >
                  <SelectItem key="Sáng">Sáng</SelectItem>
                  <SelectItem key="Chiều">Chiều</SelectItem>
                  <SelectItem key="Tối">Tối</SelectItem>
                </Select>

                {/* Ngày làm việc */}
                <Select
                  label="Ngày làm việc"
                  className="max-w-xl"
                  selectionMode="multiple"
                  onSelectionChange={(keys) => {
                    const newWorkDays = Array.from(keys);
                    handleFieldChange('workDays', newWorkDays);
                  }}
                  defaultSelectedKeys={
                    isEditMode && selectedStaff?.workDays
                      ? new Set(selectedStaff.workDays)
                      : undefined
                  }
                >
                  <SelectItem key="Monday">Monday</SelectItem>
                  <SelectItem key="Tuesday">Tuesday</SelectItem>
                  <SelectItem key="Wednesday">Wednesday</SelectItem>
                  <SelectItem key="Thursday">Thursday</SelectItem>
                  <SelectItem key="Friday">Friday</SelectItem>
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Đóng
              </Button>
              <Button color="primary" onPress={onClose}>
                {isEditMode ? 'Hoàn thành' : 'Tạo'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AdminStaffModal;
