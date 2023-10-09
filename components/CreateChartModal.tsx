interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChartModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative flex flex-col z-10 bg-white p-6 rounded shadow-lg max-w-3xl">
        <h2 className="font-medium text-xl">Embed Widget</h2>
      </div>
    </div>
  );
};
