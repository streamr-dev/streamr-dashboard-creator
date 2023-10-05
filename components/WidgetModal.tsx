import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartId: string;
}

export const WidgetModal = ({ isOpen, onClose, chartId }: ModalProps) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;
  const iframeLink = `<iframe class="w-full h-full" src="http://localhost:3001/embed/chart/${chartId}"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iframeLink);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {}
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative flex flex-col z-10 bg-white p-6 rounded shadow-lg max-w-3xl">
        <h2 className="font-medium text-xl">Embed Widget</h2>
        <div className="flex flex-row justify-between items-center">
          <p className="">html</p>
          <div>
            {isCopied ? (
              <div className=" cursor-default px-2 py-2 rounded flex justify-center items-center space-x-1">
                <img className="h-5" src="/icons/check.svg" alt="" />{' '}
                <p className="text-sm font-normal">Copied!</p>
              </div>
            ) : (
              <button
                onClick={handleCopy}
                className=" px-2 py-2 rounded flex justify-center items-center space-x-1"
              >
                <img className="h-5" src="/icons/copy.svg" alt="" />{' '}
                <p className="text-sm font-normal">Copy code</p>
              </button>
            )}
          </div>
        </div>

        <pre className="w-full p-2 pb-3 border text-sm font-light rounded-md overflow-x-auto">
          {iframeLink}
        </pre>
      </div>
    </div>
  );
};
