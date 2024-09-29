import { EditIcon, HistoryIcon, UserIcon, WalletIcon } from 'lucide-react';

export const MenuIconManager = () => {
  return (
    <>
      <ul className="menu rounded-box">
        <li className="pb-3">
          <a className="tooltip tooltip-right" data-tip="Home">
            <EditIcon />
          </a>
        </li>
        <li className="pb-3">
          <a className="tooltip tooltip-right" data-tip="Details">
            <HistoryIcon />
          </a>
        </li>
        <li className="pb-3">
          <a className="tooltip tooltip-right" data-tip="Stats">
            <WalletIcon />
          </a>
        </li>
        <li className="pb-3">
          <a className="tooltip tooltip-right" data-tip="Stats">
            <UserIcon />
          </a>
        </li>
      </ul>
    </>
  );
};
