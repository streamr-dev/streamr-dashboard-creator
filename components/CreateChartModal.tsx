import { useChartConfigs } from '@/hooks/useChartConfigs';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChartModal = ({ isOpen, onClose }: ModalProps) => {
  const { createChart, isCreating } = useChartConfigs();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;
    const streamId = formData.get('streamId') as string;
    const labelPath = formData.get('labelPath') as string;
    const dataPath = formData.get('dataPath') as string;
    try {
      await createChart(title, desc, streamId, labelPath, dataPath);

      onClose();
    } catch (error) {
      console.error('Error creating the chart:', error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative flex flex-col z-10 bg-white p-6 rounded shadow-lg max-w-3xl w-full">
        <h2 className="font-medium text-xl">Create Chart</h2>
        {isCreating ? <div>Loading...</div> : null}
        <form
          className={
            (isCreating ? 'opacity-0' : '') + ` flex flex-col space-y-3 py-2`
          }
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm" htmlFor="title">
              Title
            </label>
            <input
              required
              className="py-3 px-4 border-solid border border-background rounded"
              id="title"
              name="title"
              type="text"
              placeholder="Your title"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm" htmlFor="desc">
              Description
            </label>
            <input
              required
              className="py-3 px-4 border-solid border border-background rounded"
              id="desc"
              name="desc"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm" htmlFor="streamId">
              Stream ID
            </label>
            <input
              required
              className="py-3 px-4 border-solid border border-background rounded"
              id="streamId"
              name="streamId"
              type="text"
              placeholder="Stream ID"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm" htmlFor="labelPath">
              Label Path (x-axis)
            </label>
            <input
              required
              className="py-3 px-4 border-solid border border-background rounded"
              id="labelPath"
              name="labelPath"
              type="text"
              placeholder="e.g. value.your.data.timestamp"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm" htmlFor="dataPath">
              Data Path (y-axis)
            </label>
            <input
              required
              className="py-3 px-4 border-solid border border-background rounded"
              id="dataPath"
              name="dataPath"
              type="text"
              placeholder="e.g. value.your.data.temperature"
            />
          </div>
          <button className="btn-primary" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
