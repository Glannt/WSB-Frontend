// import { staffs } from '@/data/data';
import { updateStaff } from '@/service/manager.api';
import { Staff } from '@/types/staff.type';
import { schemaUpdateStaff, SchemaUpdateStaff } from '@/utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { useMutation } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStaff: Staff | null;
  setSelectedStaff: Dispatch<SetStateAction<Staff | null>> | undefined;
  refetchStaff: () => void;
}

const EditStaff: React.FC<StaffModalProps> = ({
  isOpen,
  onClose,
  selectedStaff,
  setSelectedStaff,
  refetchStaff,
}) => {
  // Default values for Selects
  const [valueStatus, setValueStatus] = React.useState(
    new Set([selectedStaff?.status || 'active'])
  );
  const [valueRoomType, setValueRoomType] = React.useState(
    new Set(selectedStaff?.workDays || [])
  );
  const translateStatusToVietnamese = (status: string): string => {
    switch (status) {
      case 'MORNING':
        return 'Sáng';
      case 'AFTERNOON':
        return 'Chiều';
      case 'EVENING':
        return 'Tối';
      default:
        return 'Không xác định'; // Default case for unknown status
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm<SchemaUpdateStaff>({
    resolver: yupResolver(schemaUpdateStaff),
    defaultValues: {
      status: selectedStaff?.status || '',
      workDays: selectedStaff?.workDays || '',
      workShift: selectedStaff?.workShift || '',
    },
  });

  const UpdateMutation = useMutation({
    mutationFn: ({
      staffId,
      body,
    }: {
      staffId: string | undefined;
      body: SchemaUpdateStaff;
    }) => updateStaff(staffId, body), // Use the updated function
  });

  // Handle changes in form fields
  const handleFieldChange = (field: string, value: any) => {
    if (selectedStaff) {
      setSelectedStaff?.({
        ...selectedStaff,
        [field]: value,
      });
    }

    // Update the field in the form state as well
    setValue(field as keyof SchemaUpdateStaff, value);

    console.log(selectedStaff);
  };
  const handleUpdateStaff = (
    data: SchemaUpdateStaff,
    staffId: string | undefined
  ) => {
    const body = {
      status: data.status,
      workDays: data.workDays,
      workShift: data.workShift,
    };

    UpdateMutation.mutate(
      { staffId, body }, // Pass an object with staffId and body
      {
        onSuccess: () => {
          console.log('Update success');
          refetchStaff(); // Replace with refetchStaff if fetching updated staff list
          onClose(); // Close the modal or perform any action on success
        },
        onError: (error) => {
          console.error('Error updating staff:', error);
        },
      }
    );
  };

  const onSubmit = handleSubmit((data) => {
    handleUpdateStaff(data, selectedStaff?.userId);
  });

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
      <form onSubmit={onSubmit}>
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
                        ? new Set([selectedStaff?.status])
                        : valueStatus
                    }
                  >
                    <SelectItem key="ACTIVE">Đang làm việc</SelectItem>
                    <SelectItem key="INACTIVE">Đã nghỉ</SelectItem>
                    <SelectItem key="VACATION">Đang nghỉ phép</SelectItem>
                  </Select>
                </div>

                <div className="flex flex-wrap gap-4">
                  {/* Work Shift */}
                  <Select
                    label="Ca làm việc"
                    className="max-w-xl"
                    defaultSelectedKeys={
                      Array.isArray(selectedStaff?.workShift)
                        ? selectedStaff.workShift
                        : selectedStaff?.workShift?.split(',') || []
                    }
                    onSelectionChange={(keys) => {
                      const newWorkShift = Array.from(keys).join(','); // Store keys as comma-separated values
                      handleFieldChange('workShift', newWorkShift);
                    }}
                  >
                    <SelectItem key="MORNING">Sáng</SelectItem>
                    <SelectItem key="AFTERNOON">Chiều</SelectItem>
                    <SelectItem key="EVENING">Tối</SelectItem>
                  </Select>

                  {/* Ngày làm việc */}
                  <Select
                    label="Ngày làm việc"
                    className="max-w-xl"
                    selectionMode="multiple"
                    defaultSelectedKeys={
                      Array.isArray(selectedStaff?.workDays)
                        ? selectedStaff.workDays
                        : selectedStaff?.workDays
                            ?.split(',')
                            .map((day) => day.trim()) || [] // Split string into an array and trim whitespace
                    }
                    onSelectionChange={(keys) => {
                      const newWorkDays = Array.from(keys).join(','); // Convert array back to comma-separated string
                      handleFieldChange('workDays', newWorkDays); // Update `workDays` in both form and `selectedStaff`
                    }}
                  >
                    <SelectItem key="MONDAY">Thứ 2</SelectItem>
                    <SelectItem key="TUESDAY">Thứ 3</SelectItem>
                    <SelectItem key="WEDNESDAY">Thứ 4</SelectItem>
                    <SelectItem key="THURSDAY">Thứ 5</SelectItem>
                    <SelectItem key="FRIDAY">Thứ 6</SelectItem>
                    <SelectItem key="SATURDAY">Thứ 7</SelectItem>
                    <SelectItem key="SUNDAY">Chủ nhật</SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="primary" type="submit">
                  {'Hoàn thành'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
};

export default EditStaff;
