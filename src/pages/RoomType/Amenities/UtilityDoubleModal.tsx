import React from 'react';
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from '@nextui-org/react';
import {
  FaUsers,
  FaCoffee,
  FaClipboardList,
  FaChartLine,
  FaCogs,
} from 'react-icons/fa';
import { Building } from 'lucide-react';
interface UtilityDoubleModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const UtilityDoubleModal: React.FC<UtilityDoubleModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      closeButton
      isOpen={isOpen}
      onClose={onClose}
      placement="top-center"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="h-[400px] max-w-[800px]"
      backdrop="blur"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div id="modal-title" className="font-bold text-4xl ">
                Tiện ích
              </div>
            </ModalHeader>
            <ModalBody>
              <div
                id="modal-description"
                className="font-semibold text-lg flex flex-wrap p-4"
              >
                <div className="flex items-center w-1/2 md:w-1/4 p-2">
                  <FaUsers className="text-blue-500 mr-2" />
                  <span>Từ hội thảo đến tiệc tất niên</span>
                </div>
                <div className="flex items-center w-1/2 md:w-1/4 p-2">
                  <FaClipboardList className="text-blue-500 mr-2" />
                  <span>Sức chứa lên đến 150 người</span>
                </div>
                <div className="flex items-center w-1/2 md:w-1/4 p-2">
                  <FaCogs className="text-blue-500 mr-2" />
                  <span>
                    Thích hợp cho doanh nghiệp mới thành lập, nhà đầu tư và
                    doanh nhân
                  </span>
                </div>
                <div className="flex items-center w-1/2 md:w-1/4 p-2">
                  <FaCoffee className="text-blue-500 mr-2" />
                  <span>
                    Cung cấp dịch vụ ăn uống cho các loại sự kiện theo yêu cầu
                  </span>
                </div>
                <div className="flex items-center w-1/2 md:w-1/4 p-2">
                  <Building className="text-blue-500 mr-2" />
                  <span>
                    Bảng hiệu kỹ thuật số, bảng hiệu, áp phích, băng rôn, cờ
                    theo yêu cầu
                  </span>
                </div>
                <div className="flex items-center w-1/2 md:w-1/4 p-2">
                  <FaChartLine className="text-blue-500 mr-2" />
                  <span>Hỗ trợ quảng cáo và tiếp thị</span>
                </div>
                <div className="flex items-center w-1/2 md:w-1/4 p-2">
                  <FaCogs className="text-blue-500 mr-2" />
                  <span>Dịch vụ quản lý sự kiện</span>
                </div>
                <div className="flex items-center w-1/2 md:w-1/4 p-2">
                  <FaCoffee className="text-blue-500 mr-2" />
                  <span>
                    Dịch vụ ăn uống, trà, cà phê, nước có sẵn bất cứ lúc nào
                  </span>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UtilityDoubleModal;
