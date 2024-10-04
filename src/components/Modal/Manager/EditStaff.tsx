import { staffs } from '@/data/data';
import { Staff } from '@/types/staff.type';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import React, { Dispatch, SetStateAction } from 'react';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStaff: Staff | null;
  setSelectedStaff: Dispatch<SetStateAction<Staff | null>> | undefined;
}

const EditStaff: React.FC<StaffModalProps> = ({
  isOpen,
  onClose,
  selectedStaff,
  setSelectedStaff,
}) => {
  // Default values for Selects
  const [valueStatus, setValueStatus] = React.useState(
    new Set([selectedStaff?.status || 'active'])
  );
  const [valueRoomType, setValueRoomType] = React.useState(
    new Set(selectedStaff?.workDays || [])
  );

  // Handle changes in form fields
  const handleFieldChange = (field: string, value: any) => {
    if (selectedStaff) {
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
            <ModalHeader>{'Chỉnh sửa nhân viên'}</ModalHeader>
            <ModalBody>
              <div className="flex flex-wrap gap-4">
                {/* Nhân viên */}
                <Input
                  isClearable
                  autoFocus
                  isDisabled
                  label="Tên phòng"
                  variant="bordered"
                  classNames={{
                    label: 'text-black/50 dark:text-white/90 pb-2',
                    input: 'border-0 focus:outline-none focus:border-none',
                    clearButton: 'pb-4',
                  }}
                  defaultValue={selectedStaff ? selectedStaff?.fullName : ''}
                />

                {/* Trạng thái */}
                <Select
                  label="Trạng thái"
                  className="max-w-xl"
                  onSelectionChange={(keys) => {
                    const newStatus = Array.from(keys).join('');
                    handleFieldChange('status', newStatus);
                  }}
                  defaultSelectedKeys={
                    selectedStaff?.status
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
                    selectedStaff?.workShift
                      ? new Set([selectedStaff.workShift])
                      : undefined
                  }
                  //thêm register reacthookform
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
                    selectedStaff?.workDays
                      ? new Set(selectedStaff.workDays)
                      : undefined
                  }
                  //thêm register reacthookform
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
                {'Hoàn thành'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditStaff;
